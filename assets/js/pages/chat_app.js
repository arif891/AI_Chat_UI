import { IDB } from '../../../layx/others/idb/idb.js';
import { marked } from '../lib/marked.esm.js';
import { highlightAll } from '../../../layx/others/syntax_highlighter/syntax_highlighter.js';

import ollama from 'ollama/browser';

class ChatApplication {
  constructor(config = {}) {
    // Merge default config with user-specified config
    this.config = {
      database: {
        name: 'chatHistoryDB',
        version: 1
      },
      stores: {
        sessions: {
          name: 'sessions',
          options: { keyPath: 'sessionId', autoIncrement: false },
          indexes: [
            { name: 'updateTime', keyPath: 'updateTime', options: { unique: false } },
            { name: 'title', keyPath: 'title', options: { unique: false } }
          ]
        },
        conversations: {
          name: 'conversations',
          options: { keyPath: 'sessionId', autoIncrement: false }
        }
      },
      ai: {
        system: `
          You are a friendly AI assistant. Follow the user's vibe, and if needed, do role play.
          Your responses should be helpful, informative, and engaging.
          You can use markdown to format your responses.
          The current date and time is: ${new Date().toLocaleString(undefined, {
            weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "long"
          })}.
        `,
        options: {}
      },
      ...config
    };

    // Initialize database with upgrade callback
    this.db = new IDB(
      this.config.database.name,
      this.config.database.version,
      this.upgradeDatabase.bind(this)
    );

    // Initialize runtime properties
    this.sessionId = 0;
    this.context = [];
    this.maxContext = 20;
    this.aiOptions = {};
    this.systemPrompt = this.config.ai.system;
    this.model = '';
    this.modelList = [];
    this.editMode = null;

    // Initialize UI and events
    this.initializeUIElements();
    this.registerEventListeners();

    // Initialize the database if not already done
    if (!localStorage.getItem('chatDB')) {
      this.initializeDatabase();
    }

    this.initializeChat();
  }

  /* ================================
     Database and Storage Methods
     ================================ */

  upgradeDatabase(db, oldVersion, newVersion) {
    console.log(`Upgrading database from version ${oldVersion} to ${newVersion}...`);
    const { stores } = this.config;

    Object.values(stores).forEach(storeConfig => {
      const { name, options, indexes } = storeConfig;
      if (!db.objectStoreNames.contains(name)) {
        const objectStore = db.createObjectStore(name, options);
        indexes?.forEach(({ name, keyPath, options }) => {
          objectStore.createIndex(name, keyPath, options);
        });
        console.log(`Created store: ${name}`);
      }
    });
  }

  async initializeDatabase() {
    try {
      await this.db.open();
      localStorage.setItem('chatDB', true);
      console.log('Database initialized successfully!');
    } catch (error) {
      localStorage.setItem('chatDB', false);
      console.error('Database initialization failed:', error);
    }
  }

  async addMessageToDatabase(sessionId, message) {
    try {
      // Get conversation and session info from the database
      const conversation = await this.db.get(this.config.stores.conversations.name, sessionId);
      const sessionInfo = await this.db.get(this.config.stores.sessions.name, sessionId);

      // Append the new message and update the session timestamp
      conversation.messages.push(message);
      sessionInfo.updateTime = Date.now();

      await this.db.put(this.config.stores.conversations.name, conversation);
      await this.db.put(this.config.stores.sessions.name, sessionInfo);
      console.log(`Message added successfully to conversation: ${sessionId}`);
    } catch (error) {
      console.error(`Error adding message to conversation: ${error.message}`);
    }
  }

  async getRecentItems(storeName, count = 10, indexName) {
    try {
      const store = await this.db.store(storeName);
      const index = indexName ? store.index(indexName) : null;
      return new Promise((resolve, reject) => {
        const results = [];
        let counter = 0;
        const request = index
          ? index.openCursor(null, "prev")
          : store.openCursor(null, "prev");

        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor && counter < count) {
            results.push(cursor.value);
            counter++;
            cursor.continue();
          } else {
            resolve(results);
          }
        };

        request.onerror = (event) => {
          console.error('Error getting recent items:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error("Error in getRecentItems:", error);
      throw error;
    }
  }

  /* ================================
     UI Initialization & Event Binding
     ================================ */

  initializeUIElements(options) {
    this.root = document.querySelector('#chat-app-root');
    if (!this.root) throw new Error('Root element not found');

    // Default selectors and options for UI elements
    this.uiOptions = {
      sidebarTogglers: '.sidebar-toggler',
      textarea: '#chat-massage',
      sendButton: '#chat-send-button',
      newChatButton: '#new-chat-button',
      chatHistoryContainer: '#chat-history-container',
      contentScrollContainer: '#content-scroll-container',
      contentContainer: '#content-container',
      modelMenu: '#model-menu',
      sidebarStateName: 'chat-sidebar-open',
      backdrop: '.chat-backdrop',
      ...options
    };

    // Query all necessary UI elements
    this.sidebarTogglers = this.root.querySelectorAll(this.uiOptions.sidebarTogglers);
    this.textarea = this.root.querySelector(this.uiOptions.textarea);
    this.sendButton = this.root.querySelector(this.uiOptions.sendButton);
    this.newChatButton = this.root.querySelector(this.uiOptions.newChatButton);
    this.chatHistoryContainer = this.root.querySelector(this.uiOptions.chatHistoryContainer);
    this.contentScrollContainer = this.root.querySelector(this.uiOptions.contentScrollContainer);
    this.contentContainer = this.root.querySelector(this.uiOptions.contentContainer);
    this.modelMenu = this.root.querySelector(this.uiOptions.modelMenu);
  }

  registerEventListeners() {
    // Sidebar toggling
    this.sidebarTogglers.forEach(toggler => {
      toggler.addEventListener('click', () => {
        try {
          this.toggleSidebar();
        } catch (error) {
          console.error('Error toggling sidebar:', error);
        }
      });
    });

    // Restore sidebar state from localStorage
    const sidebarIsOpen = localStorage.getItem(this.uiOptions.sidebarStateName) === 'true';
    if (sidebarIsOpen) this.root.classList.add('sidebar-open');

    // Close sidebar on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.root.classList.contains('sidebar-open')) {
        try {
          this.toggleSidebar();
        } catch (error) {
          console.error('Error handling Escape key:', error);
        }
      }
    });

    // Send message events
    this.sendButton.addEventListener('click', async () => {
      await this.processChat();
    });
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.processChat();
      }
    });

    // Chat history item click event
    this.chatHistoryContainer.addEventListener('click', (e) => {
      try {
        this.displayChatHistory(e.target);
      } catch (error) {
        console.error('Error showing chat history:', error);
      }
    });

    // New chat button event
    this.newChatButton.addEventListener('click', () => {
      this.startNewChat();
    });

    // Model selection event
    this.modelMenu.addEventListener('click', (e) => {
      this.selectModel(e.target);
    });

    // Network status updates
    window.addEventListener('offline', () => this.updateNetworkStatus());
    window.addEventListener('online', () => this.updateNetworkStatus());
    document.addEventListener('DOMContentLoaded', () => {
      this.updateNetworkStatus();
      this.root.classList.add('loaded');
    });

    // Delegate click events for editing messages
    this.contentContainer.addEventListener('click', (e) => {
      const editButton = e.target.closest('.action__button.edit');
      if (editButton) {
        const messageBlock = editButton.closest('.chat__block');
        this.enableEditMode(messageBlock);
      }
    });
  }

  toggleSidebar() {
    try {
      const isOpen = this.root.classList.toggle('sidebar-open');
      localStorage.setItem(this.uiOptions.sidebarStateName, isOpen);

      // Handle the backdrop for the sidebar
      let backdrop = this.root.querySelector(this.uiOptions.backdrop);
      if (!backdrop && isOpen) {
        backdrop = document.createElement('backdrop');
        backdrop.classList.add('chat-backdrop');
        backdrop.addEventListener('click', () => this.toggleSidebar());
        this.root.appendChild(backdrop);
      }
      if (backdrop) {
        backdrop.classList.toggle('open');
      }
    } catch (error) {
      console.error('Error in toggleSidebar:', error);
    }
  }

  updateNetworkStatus() {
    this.root.classList.toggle('offline', !navigator.onLine);
  }

  /* ================================
     UI Rendering Methods
     ================================ */

  sanitizeInput(input) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  renderMessage(content, role) {
    // Sanitize user input if needed and generate HTML for the message block
    const finalContent = role === 'user' ? this.sanitizeInput(content) : content;
    const messageHTML = this.generateMessageBlock(finalContent, role);
    this.contentContainer.insertAdjacentHTML('beforeend', messageHTML);
  }

  addChatHistoryItem(title, sessionId, position = 'beforeend') {
    this.chatHistoryContainer.insertAdjacentHTML(position,
      `<button class="item" data-session-id="${sessionId}">${title}</button>`
    );
  }

  generateMessageBlock(content, role) {
    switch (role) {
      case 'user':
        return `<div class="chat__block user" data-role="${role}">
                  <div class="actions__wrapper">
                    <button class="action__button edit" title="Edit message">
                      <svg class="icon">
                        <use href="#edit-icon" />
                      </svg>
                    </button>
                  </div>
                  <span class="message">${content}</span>
                </div>`;
      case 'assistant':
        return `<div class="chat__block assistant" data-role="${role}">
                  <svg class="icon assistant__logo">
                    <use href="#stars-icon" />
                  </svg>
                  <div class="response_wrapper">
                    <div class="response">
                      ${content}
                    </div>
                    <div class="actions__wrapper">
                      <button class="action__button copy" title="Copy message">
                        <svg class="icon">
                          <use href="#copy-icon" />
                        </svg>
                      </button>
                      <button class="action__button repeat" title="Regenerate response">
                        <svg class="icon">
                          <use href="#repeat-icon" />
                        </svg>
                      </button>
                      <button class="action__button like" title="Good response">
                        <svg class="icon">
                          <use href="#like-icon" />
                        </svg>
                      </button>
                      <button class="action__button dislike" title="Bad response">
                        <svg class="icon">
                          <use href="#dislike-icon" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>`;
      case 'system':
        return `<div class="chat__block system">
                  ${content} 
                </div>`;
      default:
        return '';
    }
  }

  scrollToBottom() {
    this.contentScrollContainer.scrollTo({
      top: this.contentScrollContainer.scrollHeight,
      behavior: 'smooth'
    });
  }

  /* ================================
     Message Editing Methods
     ================================ */

  enableEditMode(messageBlock) {
    if (this.editMode) return; // Prevent multiple concurrent edits

    const messageSpan = messageBlock.querySelector('.message');
    const originalText = messageSpan.textContent;
    const editUI = `
      <div class="edit__wrapper">
        <textarea class="edit-textarea">${originalText}</textarea>
        <div class="edit__actions">
          <button class="dark r save-edit">Save</button>
          <button class="r cancel-edit">Cancel</button>
        </div> 
      </div>
    `;

    messageBlock.classList.add('editing');
    messageBlock.insertAdjacentHTML('beforeend', editUI);

    const textarea = messageBlock.querySelector('.edit-textarea');
    textarea.focus();

    this.editMode = {
      block: messageBlock,
      messageSpan,
      original: originalText,
      textarea
    };

    // Bind save and cancel events for editing
    messageBlock.querySelector('.save-edit').addEventListener('click', () => this.saveEdit());
    messageBlock.querySelector('.cancel-edit').addEventListener('click', () => this.cancelEdit());
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.saveEdit();
      }
      if (e.key === 'Escape') {
        this.cancelEdit();
      }
    });
  }

  saveEdit() {
    if (!this.editMode) return;
    const newText = this.editMode.textarea.value.trim();
    if (newText && newText !== this.editMode.original) {
      this.editMode.messageSpan.textContent = newText;
    }
    this.exitEditMode();
  }

  cancelEdit() {
    if (!this.editMode) return;
    this.exitEditMode();
  }

  exitEditMode() {
    if (!this.editMode) return;
    this.editMode.block.classList.remove('editing');
    const editUI = this.editMode.block.querySelector('.edit__wrapper');
    if (editUI) editUI.remove();
    this.editMode = null;
  }

  /* ================================
     Chat Logic Methods
     ================================ */

  async processChat() {
    try {
      const userContent = this.textarea.value.trim();
      this.textarea.value = '';
      if (!userContent) return;

      const isNewSession = !this.root.hasAttribute('data-session-id');

      if (isNewSession) {
        await this.createNewSession();
        this.addChatHistoryItem(`New Chat ${this.sessionId}`, this.sessionId, 'afterbegin');
      }

      this.root.classList.remove('initial');

      // Render the user message and add a placeholder for the assistant
      this.renderMessage(userContent, 'user');
      this.renderMessage('', 'assistant');
      this.scrollToBottom();

      // Save the user message to the DB and update the conversation context
      await this.addMessageToDatabase(this.sessionId, { role: 'user', content: userContent });
      this.context.push({ role: 'user', content: userContent });

      // Get the assistant response element for streaming updates
      const lastAssistantBlock = this.contentContainer.querySelector(
        '.chat__block.assistant:last-child .response_wrapper .response'
      );

      // Stream the assistant response
      const responseStream = await ollama.chat({
        model: this.model,
        messages: [
          { role: 'system', content: this.systemPrompt },
          ...this.context
        ],
        options: this.aiOptions,
        stream: true
      });

      let assistantContent = '';
      for await (const part of responseStream) {
        assistantContent += part.message.content;
        lastAssistantBlock.innerHTML = marked.parse(assistantContent);
        this.scrollToBottom();
        highlightAll();
      }
      await this.addMessageToDatabase(this.sessionId, { role: 'assistant', content: assistantContent });
      this.context.push({ role: 'assistant', content: assistantContent });

      // If this is a new session, update the chat history title
      if (isNewSession) {
        const titleResponse = await ollama.chat({
          model: this.model,
          messages: [
            {
              role: "system",
              content: "You are an AI assistant. Generate a concise, engaging title under 6 words that reflects the core intent of the user's first message, from their perspective. The title should summarize the query clearly to aid in future searchability. Respond *only* with the title—no explanations."
            },
            {
              role: "user",
              content: `Generate a title for this message: '${userContent}'.`
            }
          ]
        });

        if (titleResponse.message.content) {
          const updatedTitle = titleResponse.message.content.replaceAll('"', '');
          await this.updateChatHistoryTitle(this.sessionId, updatedTitle);
        }
      }

      // Update context if necessary
      if (this.context.length >= this.maxContext) {
        await this.refreshContext(this.context, this.maxContext);
      }

      console.log(this.context);
    } catch (error) {
      console.error('Error processing chat:', error);
    }
  }

  startNewChat() {
    this.root.classList.add('initial');
    this.contentContainer.innerHTML = '';
    this.textarea.value = '';
    this.root.removeAttribute('data-session-id');
    this.context = [];
  }

  async createNewSession() {
    try {
      this.sessionId = Number(localStorage.getItem('chatSessions')) || 0;
      this.sessionId += 1;
      this.root.setAttribute('data-session-id', this.sessionId);

      await this.db.add(this.config.stores.conversations.name, { sessionId: this.sessionId, messages: [] });
      await this.db.add(this.config.stores.sessions.name, {
        sessionId: this.sessionId,
        creationTime: Date.now(),
        title: `New Chat ${this.sessionId}`,
        updateTime: Date.now()
      });
      localStorage.setItem('chatSessions', this.sessionId);
    } catch (error) {
      console.error('Error creating new session:', error);
    }
  }

  async updateChatHistoryTitle(sessionId, newTitle) {
    try {
      const historyItem = this.chatHistoryContainer.querySelector(`.item[data-session-id="${sessionId}"]`);
      if (historyItem) {
        historyItem.textContent = newTitle;
      }
      const sessionInfo = await this.db.get(this.config.stores.sessions.name, sessionId);
      sessionInfo.title = newTitle;
      await this.db.put(this.config.stores.sessions.name, sessionInfo);
      console.log(`History item updated: ${newTitle}`);
    } catch (error) {
      console.error('Error updating chat history title:', error);
    }
  }

  async refreshContext(messages, maxCount = 10) {
    try {
      if (messages.length > maxCount) {
        const halfMax = Math.floor(maxCount / 2);
        const firstHalf = messages.filter(msg => msg.role === 'user').slice(0, halfMax);
        const lastHalf = messages.slice(-halfMax);
        this.context = [...firstHalf, ...lastHalf];
      } else if (messages.length) {
        this.context = messages;
      }
    } catch (error) {
      console.error('Error updating context:', error);
    }
  }

  /* ================================
     Chat History and Model Selection
     ================================ */

  async displayChatHistory(target) {
    try {
      const sessionIdAttribute = target.getAttribute('data-session-id');
      if (!sessionIdAttribute) return;

      this.root.classList.remove('initial');
      this.contentContainer.innerHTML = '';
      this.root.setAttribute('data-session-id', sessionIdAttribute);
      this.sessionId = Number(sessionIdAttribute);

      const conversation = await this.db.get(this.config.stores.conversations.name, this.sessionId);
      if (conversation.messages.length) {
        for (const message of conversation.messages) {
          if (message.role === 'assistant') {
            this.renderMessage(marked.parse(message.content), message.role);
          } else {
            this.renderMessage(message.content, message.role);
          }
        }  
        this.scrollToBottom();
        highlightAll();
        await this.refreshContext(conversation.messages, this.maxContext);
        console.log(this.context);
      }
    } catch (error) {
      console.error('Error displaying chat history:', error);
    }
  }

  selectModel(target) {
    try {
      const selectedModel = target.getAttribute('data-model');
      if (!selectedModel) return;

      localStorage.setItem('selectedModel', selectedModel);
      this.model = selectedModel;
      // Update UI: mark selected model as active
      this.modelMenu.querySelectorAll('.model').forEach(modelBtn => {
        modelBtn.classList.remove('active');
      });
      this.modelMenu.querySelector(`[data-model="${selectedModel}"]`)?.classList.add('active');
    } catch (error) {
      console.error('Error selecting model:', error);
    }
  }

  /* ================================
     Initialization of Chat and Models
     ================================ */

  async initializeChat() {
    try {
      // Load chat history if DB is already initialized
      if (localStorage.getItem('chatDB')) {
        const chatHistoryItems = await this.getRecentItems(this.config.stores.sessions.name, 50, 'updateTime');
        if (chatHistoryItems.length) {
          chatHistoryItems.forEach(item => {
            this.addChatHistoryItem(item.title, item.sessionId);
          });
        }
      }

      // Load available models from the AI service
      const modelListResponse = await ollama.list();
      if (modelListResponse.models.length) {
        this.modelList = modelListResponse.models;
        if (!localStorage.getItem('selectedModel')) {
          localStorage.setItem('selectedModel', this.modelList[0].name);
        }
        this.model = localStorage.getItem('selectedModel');

        // Populate the model menu
        this.modelList.forEach(model => {
          const [modelName, modelInfo] = model.name.split(':');
          this.modelMenu.insertAdjacentHTML('beforeend', `
            <button class="model" data-model="${model.name}">
              <span class="name">${modelName}</span>
              <span class="info">${modelInfo || ''}</span>
            </button>
          `);
        });
        this.modelMenu.querySelector(`[data-model="${this.model}"]`)?.classList.add('active');
      } else {
        console.error('At least one model is required');
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  }

  /* ================================
     Optional: Window Controls Overlay
     ================================ */

  initWindowControls() {
    if ('windowControlsOverlay' in navigator) {
      const updateTitlebarArea = (e) => {
        try {
          const isOverlayVisible = navigator.windowControlsOverlay.visible;
          const { x, y, width, height } = e?.titlebarAreaRect || navigator.windowControlsOverlay.getTitlebarAreaRect();
          this.root.style.setProperty('--title-bar-height', `${height}px`);
          this.root.style.setProperty('--title-bar-width', `${width}px`);
          this.root.style.setProperty('--title-bar-x', `${x}px`);
          this.root.style.setProperty('--title-bar-y', `${y}px`);
          this.root.classList.toggle('overlay-visible', isOverlayVisible);
        } catch (error) {
          console.error('Error updating titlebar area:', error);
        }
      };

      navigator.windowControlsOverlay.addEventListener('geometrychange', updateTitlebarArea);
      // Initial update
      updateTitlebarArea();
    }
  }
}

// Instantiate the chat application with default (or custom) configuration
const chatApp = new ChatApplication();