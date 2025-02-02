class ChatApp {
  constructor(options = {}) {
    this.initializeElements(options);
    this.initializeEventListeners();
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
    this.editMode = null; // Track which message is being edited
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
      this.addHistoryItem(`New Chat ${session}`, session, 'afterbegin');
    }

    this.root.classList.remove('initial');

    this.addMessage(userContent, 'user');
    this.addMessage('', 'assistant');
    this.scrollToBottom();

    this.addMessageToDB(session, { role: 'user', content: userContent });

    const lastContentBlock = this.contentContainer.querySelector('.chat__block.assistant:last-child .response_wrapper .response');

    const response = await ollama.chat({ model: model, messages: [{ role: 'user', content: userContent }], stream: true });

    let content = '';
    for await (const part of response) {
      content += part.message.content;
      lastContentBlock.innerHTML = marked.parse(content);
      this.scrollToBottom();
    }

    if (isNew) {
      await this.updateHistoryItem(session, `Updated Chat ${session}`);
    }

    await this.addMessageToDB(session, { role: 'assistant', content: content, model: model });
  }

  newChat() {
    this.root.classList.add('initial');
    this.contentContainer.innerHTML = '';
    this.textarea.value = '';
    this.root.removeAttribute('data-session-id');
  }

  async updateHistoryItem(sessionId, updatedTitle) {
    const historyItem = this.chatHistoryContainer.querySelector(`.item[data-session-id="${sessionId}"]`);
    if (historyItem) {
      historyItem.textContent = updatedTitle;
    }
    const sessionInfo = await db.get(config.stores.sessions.name, sessionId);
    sessionInfo.title = updatedTitle;
    await db.put(config.stores.sessions.name, sessionInfo);
    console.log(`History item updated: ${updatedTitle}`);
  }

  async showChatHistory(target) {
    const attributeValue = target.getAttribute('data-session-id');
    if (!attributeValue) return;
    this.root.classList.remove('initial');
    this.contentContainer.innerHTML = '';
    this.root.setAttribute('data-session-id', attributeValue);
    session = Number(attributeValue);
    let conversation = await db.get(config.stores.conversations.name, session);
    if (conversation.messages.length) {
      conversation.messages.forEach(message => {
        if (message.role == 'assistant') {
          this.addMessage(marked.parse(message.content), message.role);
        } else {
          this.addMessage(message.content, message.role);
        }
      });
    }
  }

  async updateSession() {
    session = Number(localStorage.getItem('chatSessions')) || 0;
    session += 1;
    this.root.setAttribute('data-session-id', session);
    await db.add(config.stores.conversations.name, { sessionId: session, messages: [] });
    await db.add(config.stores.sessions.name,
      { sessionId: session, creationTime: Date.now(), title: `New Chat ${session}`, updateTime: Date.now() }
    );
    localStorage.setItem('chatSessions', session);
  }

  async addMessageToDB(sessionId, message) {
    try {
      // Try to get the existing conversation record from the 'conversations' store
      let conversation = await db.get(config.stores.conversations.name, sessionId);
      let sessionInfo = await db.get(config.stores.sessions.name, sessionId);

      // Add the new message to the messages array
      conversation.messages.push(message);
      sessionInfo.updateTime = Date.now();

      await db.put(config.stores.conversations.name, conversation);
      await db.put(config.stores.sessions.name, sessionInfo);
      console.log(`Message added successfully to conversation: ${sessionId}`);
    } catch (error) {
      console.error(`Error adding message to conversation: ${error.message}`);
    }
  }

  async getLastItems(storeName, items = 10, indexName) { // indexName is optional, for filtering/indexing
    try {
      const store = await db.store(storeName);
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
      await db.open();
      localStorage.setItem('chatDB', true);
      console.log('Database initialized successfully!');
    } catch (error) {
      localStorage.setItem('chatDB', false);
      console.error('Database initialization failed:', error);
    }
  }

  init() {
    if (localStorage.getItem('chatDB')) {
      this.getLastItems(config.stores.sessions.name, 50, 'updateTime').then(chatHistoryItems => {
        if (chatHistoryItems.length) {
          chatHistoryItems.forEach(item => {
            this.addHistoryItem(item.title, item.sessionId);
          });
        }
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

// Initialize the chat application
const chatApp = new ChatApp();

import { IDB } from '../../../layx/others/idb/idb.js';

const config = {
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
  context: {}
};

const upgradeDatabase = (db, oldVersion, newVersion) => {
  console.log(`Upgrading database from version ${oldVersion} to ${newVersion}...`);

  const { stores } = config;

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
};

const db = new IDB(config.database.name, config.database.version, upgradeDatabase);

if (!localStorage.getItem('chatDB')) {
  chatApp.initDatabase();
}

chatApp.init();

let model = 'xAI';
let context = [];
let session;

import ollama from 'ollama/browser';
import { marked } from 'marked';