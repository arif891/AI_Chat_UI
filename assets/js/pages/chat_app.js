import { IDB } from '../../../layx/others/idb/idb.js';
import ollama from 'ollama/browser';
import { marked } from 'marked';

class ChatApp {
  constructor(config = {}) {
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
        model: 'qwen2.5:3b-instruct'
      },
      context: {
        max: 20,
      },
      ...config
    };
    this.db = new IDB(
      this.config.database.name,
      this.config.database.version,
      this.upgradeDatabase.bind(this)
    );

    this.modelList = [];
    this.model = '';
    this.sessionId = 0;
    this.context = [];

    this.initializeElements();
    this.initializeEventListeners();

    if (!localStorage.getItem('chatDB')) {
      this.initDatabase();
    }
    this.init();
  }

  upgradeDatabase(db, oldVersion, newVersion) {
    console.log(`Upgrading database from version ${oldVersion} to ${newVersion}...`);

    const { stores } = this.config;

    Object.values(stores).forEach(storeConfig => {
      const { name, options, indexes } = storeConfig;

      // Check if the store already exists
      if (!db.objectStoreNames.contains(name)) {
        const objectStore = db.createObjectStore(name, options);

        // Create indexes
        indexes?.forEach(({ name, keyPath, options }) => {
          objectStore.createIndex(name, keyPath, options);
        });

        console.log(`Created store: ${name}`);
      }
    });
  }

  initializeElements(options) {
    this.root = document.querySelector('#chat-app-root');
    if (!this.root) throw new Error('Root element not found');

    this.options = {
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

    this.sidebarTogglers = this.root.querySelectorAll(this.options.sidebarTogglers);
    this.textarea = this.root.querySelector(this.options.textarea);
    this.sendButton = this.root.querySelector(this.options.sendButton);
    this.newChatButton = this.root.querySelector(this.options.newChatButton);
    this.chatHistoryContainer = this.root.querySelector(this.options.chatHistoryContainer);
    this.contentScrollContainer = this.root.querySelector(this.options.contentScrollContainer);
    this.contentContainer = this.root.querySelector(this.options.contentContainer);
    this.modelMenu = this.root.querySelector(this.options.modelMenu);
    this.editMode = null;
  }

  initializeEventListeners() {
    // Sidebar togglers
    this.sidebarTogglers.forEach(toggler => {
      toggler.addEventListener('click', () => this.toggleSidebar());
    });

    // Restore sidebar state
    const isOpen = localStorage.getItem(this.options.sidebarStateName) === 'true';
    if (isOpen) this.root.classList.add('sidebar-open');

    // Handle Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.root.classList.contains('sidebar-open')) {
        this.toggleSidebar();
      }
    });

    this.sendButton.addEventListener('click', async () => {
      await this.chat();
    });

    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.chat();
      }
    });

    this.chatHistoryContainer.addEventListener('click', (e) => {
      this.showChatHistory(e.target);
    });

    // New chat button
    this.newChatButton.addEventListener('click', () => {
      this.newChat();
    });

    this.modelMenu.addEventListener('click', (e) => {
      this.updateModel(e.target);
    });

    window.addEventListener('offline', () => {
      this.updateNetworkStatus();
    });

    window.addEventListener('online', () => {
      this.updateNetworkStatus();
    });

    document.addEventListener('DOMContentLoaded', () => {
      this.updateNetworkStatus();
      this.root.classList.add('loaded');
    });

    // Add event delegation for edit buttons
    this.contentContainer.addEventListener('click', (e) => {
      const editButton = e.target.closest('.action__button.edit');
      if (editButton) {
        const messageBlock = editButton.closest('.chat__block');
        this.startEditMode(messageBlock);
      }
    });
  }

  toggleSidebar() {
    const isOpen = this.root.classList.toggle('sidebar-open');
    localStorage.setItem(this.options.sidebarStateName, isOpen);

    // Handle backdrop
    let backdrop = this.root.querySelector(this.options.backdrop);
    if (!backdrop && isOpen) {
      backdrop = document.createElement('backdrop');
      backdrop.classList.add('chat-backdrop');
      backdrop.addEventListener('click', () => this.toggleSidebar());
      this.root.appendChild(backdrop);
    }

    if (backdrop) {
      backdrop.classList.toggle('open');
    }
  }

  updateNetworkStatus() {
    this.root.classList.toggle('offline', !navigator.onLine);
  }

  sanitizeInput(input) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  addMessage(content, role) {
    const sanitizedContent = role === 'user' ? this.sanitizeInput(content) : content;
    const messageBlock = this.genContentBlock(sanitizedContent, role);
    this.contentContainer.insertAdjacentHTML('beforeend', messageBlock);
  }

  addHistoryItem(title, id, position = 'beforeend') {
    this.chatHistoryContainer.insertAdjacentHTML(position,
      ` <button class="item" data-session-id="${id}">${title}</button>`
    );
  }

  genContentBlock(content, role) {
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
                  <span class="massage">${content}</span>
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
    }
  }

  scrollToBottom() {
    this.contentScrollContainer.scrollTo({
      top: this.contentScrollContainer.scrollHeight,
      behavior: 'smooth'
    });
  }

  startEditMode(messageBlock) {
    if (this.editMode) return; // Prevent multiple edits

    const messageSpan = messageBlock.querySelector('.massage');
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
      messageSpan: messageSpan,
      original: originalText,
      textarea: textarea
    };

    // Add event listeners for save/cancel
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
    } else {
      this.cancelEdit();
    }

    this.cleanupEditMode();
  }

  cancelEdit() {
    if (!this.editMode) return;
    this.cleanupEditMode();
  }

  cleanupEditMode() {
    if (!this.editMode) return;

    this.editMode.block.classList.remove('editing');
    const editUI = this.editMode.block.querySelector('.edit__wrapper');
    if (editUI) editUI.remove();

    this.editMode = null;
  }

  async chat() {
    const userContent = this.textarea.value;
    this.textarea.value = '';
    if (!userContent) return;

    const isNew = !this.root.hasAttribute('data-session-id');

    if (isNew) {
      await this.updateSession();
      this.addHistoryItem(`New Chat ${this.sessionId}`, this.sessionId, 'afterbegin');
    }

    this.root.classList.remove('initial');

    this.addMessage(userContent, 'user');
    this.addMessage('', 'assistant');
    this.scrollToBottom();

    this.addMessageToDB(this.sessionId, { role: 'user', content: userContent });
    if (this.context.length >= this.config.context.max) {
      this.context.shift();
    }

    this.context.push({ role: 'user', content: userContent });

    const lastContentBlock = this.contentContainer.querySelector('.chat__block.assistant:last-child .response_wrapper .response');

    const response = await ollama.chat({
      model: this.model, messages:
        [
          {
            role: 'system',
            content: `
             You a friendly AI assistant. Follow user vibe, if needed do role play.
             Your responses should be helpful, informative, and engaging.
             You can use markdown to format your responses.
             Your model name is ${this.model}.
             You know current dateTime, here is: ${new Date().toLocaleString(undefined, {
              weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "long"
            })}, for realtime update don't look conversion history.
            `
          },
          ...this.context
        ],
      options: {
        temperature: 1
      },
      stream: true
    });
    let content = '';
    for await (const part of response) {
      content += part.message.content;
      lastContentBlock.innerHTML = marked.parse(content);
      this.scrollToBottom();
    }

    await this.addMessageToDB(this.sessionId, { role: 'assistant', content: content });
    if (this.context.length >= this.config.context.max) {
      this.context.shift();
    }
    this.context.push({ role: 'assistant', content: content });

    if (isNew) {
      const response = await ollama.chat({
        model: this.model,
        messages: [
          {
            "role": "system",
            "content": "You are an AI assistant. Generate a concise, engaging title under 6 words that reflects the core intent of the user's first message, from their perspective. The title should summarize the query clearly to aid in future searchability. Respond *only* with the title—no explanations."
          },
          {
            "role": "user",
            "content": `Generate a title for this message: '${userContent}'.`
          }
        ]
      });

      if (response.message.content) {
        await this.updateHistoryItem(this.sessionId, response.message.content.replaceAll('"', ''));
      }
    }

    console.log(this.context);
  }

  newChat() {
    this.root.classList.add('initial');
    this.contentContainer.innerHTML = '';
    this.textarea.value = '';
    this.root.removeAttribute('data-session-id');
    this.context = [];
  }

  async updateHistoryItem(sessionId, updatedTitle) {
    const historyItem = this.chatHistoryContainer.querySelector(`.item[data-session-id="${sessionId}"]`);
    if (historyItem) {
      historyItem.textContent = updatedTitle;
    }
    const sessionInfo = await this.db.get(this.config.stores.sessions.name, sessionId);
    sessionInfo.title = updatedTitle;
    await this.db.put(this.config.stores.sessions.name, sessionInfo);
    console.log(`History item updated: ${updatedTitle}`);
  }

  async showChatHistory(target) {
    const attributeValue = target.getAttribute('data-session-id');
    if (!attributeValue) return;
    this.root.classList.remove('initial');
    this.contentContainer.innerHTML = '';
    this.root.setAttribute('data-session-id', attributeValue);
    this.sessionId = Number(attributeValue);
    let conversation = await this.db.get(this.config.stores.conversations.name, this.sessionId);
    if (conversation.messages.length) {
      await conversation.messages.forEach(message => {
        if (message.role == 'assistant') {
          this.addMessage(marked.parse(message.content), message.role);
        } else {
          this.addMessage(message.content, message.role);
        }
      });
      this.scrollToBottom();
      this.updateContext(conversation.messages, this.config.context.max);
      console.log(this.context);
    }
  }

  updateModel(target) {
    const model = target.getAttribute('data-model');
    if (!model) return;
    localStorage.setItem('selectedModel', model);
  }

  async updateSession() {
    this.sessionId = Number(localStorage.getItem('chatSessions')) || 0;
    this.sessionId += 1;
    this.root.setAttribute('data-session-id', this.sessionId);
    await this.db.add(this.config.stores.conversations.name, { sessionId: this.sessionId, messages: [] });
    await this.db.add(this.config.stores.sessions.name,
      { sessionId: this.sessionId, creationTime: Date.now(), title: `New Chat ${this.sessionId}`, updateTime: Date.now() }
    );
    localStorage.setItem('chatSessions', this.sessionId);
  }

  async updateContext(messages, max = 10) {
    if (messages.length > max) {
      const halfMax = Math.floor(max / 2);

      // Get first half (user messages only)
      const firstHalf = messages
        .filter(msg => msg.role === 'user')
        .slice(0, halfMax);

      // Get last half (maintaining conversation flow with both user and assistant)
      const lastHalf = messages.slice(-halfMax);

      this.context = [...firstHalf, ...lastHalf];
    } else if (messages.length) {
      this.context = messages;
    }
  }

  async addMessageToDB(sessionId, message) {
    try {
      // Try to get the existing conversation record from the 'conversations' store
      let conversation = await this.db.get(this.config.stores.conversations.name, sessionId);
      let sessionInfo = await this.db.get(this.config.stores.sessions.name, sessionId);

      // Add the new message to the messages array
      conversation.messages.push(message);
      sessionInfo.updateTime = Date.now();

      await this.db.put(this.config.stores.conversations.name, conversation);
      await this.db.put(this.config.stores.sessions.name, sessionInfo);
      console.log(`Message added successfully to conversation: ${sessionId}`);
    } catch (error) {
      console.error(`Error adding message to conversation: ${error.message}`);
    }
  }

  async getLastItems(storeName, items = 10, indexName) { // indexName is optional, for filtering/indexing
    try {
      const store = await this.db.store(storeName);
      const index = indexName ? store.index(indexName) : null; // Use index if provided

      return new Promise((resolve, reject) => {
        const results = [];
        let count = 0;

        // Open a reverse cursor (from highest key to lowest) on the index or store
        const request = index
          ? index.openCursor(null, "prev") // Reverse on index
          : store.openCursor(null, "prev"); // Reverse on store

        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor && count < items) {
            results.push(cursor.value);
            count++;
            cursor.continue();
          } else {
            resolve(results);
          }
        };

        request.onerror = (event) => {
          console.error('Error getting last items:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error("Error in getLastItems:", error);
      throw error;
    }
  }

  async initDatabase() {
    try {
      await this.db.open();
      localStorage.setItem('chatDB', true);
      console.log('Database initialized successfully!');
    } catch (error) {
      localStorage.setItem('chatDB', false);
      console.error('Database initialization failed:', error);
    }
  }

  async init() {
    if (localStorage.getItem('chatDB')) {
      this.getLastItems(this.config.stores.sessions.name, 50, 'updateTime').then(chatHistoryItems => {
        if (chatHistoryItems.length) {
          chatHistoryItems.forEach(item => {
            this.addHistoryItem(item.title, item.sessionId);
          });
        }
      });
    }

    const list = await ollama.list();
    if (list.models.length) {
      this.modelList = list.models;
      if (!localStorage.getItem('selectedModel')) {
        localStorage.setItem('selectedModel', this.modelList[0].name);
      };

      this.modelList.forEach(model => {
         let modelInfo = model.name.split(':');
         this.modelMenu.insertAdjacentHTML('beforeend',
          ` <button class="model" data-model="${model.name}"><span class="name">${modelInfo[0]}</span><span class="info">${modelInfo[1]||''}</span></button>`
        );
      });
    }
  }


  initWindowControls() {
    if ('windowControlsOverlay' in navigator) {
      const updateTitlebarArea = (e) => {
        const isOverlayVisible = navigator.windowControlsOverlay.visible;
        const { x, y, width, height } = e?.titlebarAreaRect ||
          navigator.windowControlsOverlay.getTitlebarAreaRect();

        this.root.style.setProperty('--title-bar-height', `${height}px`);
        this.root.style.setProperty('--title-bar-width', `${width}px`);
        this.root.style.setProperty('--title-bar-x', `${x}px`);
        this.root.style.setProperty('--title-bar-y', `${y}px`);
        this.root.classList.toggle('overlay-visible', isOverlayVisible);
      };

      navigator.windowControlsOverlay.addEventListener('geometrychange', updateTitlebarArea);
      // Initial update
      updateTitlebarArea();
    }
  }
}

// Initialize with default or custom config
const chatApp = new ChatApp();