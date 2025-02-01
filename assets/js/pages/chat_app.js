/**
 * @typedef {Object} ChatUIOptions
 * @property {string} sidebarTogglers - Selector for sidebar toggle buttons
 * @property {string} textarea - Selector for chat textarea
 * @property {string} sendButton - Selector for send button
 * @property {string} chatHistoryContainer - Selector for chat history container
 * @property {string} contentContainer - Selector for main content container
 * @property {string} sidebarStateName - Name for localStorage sidebar state
 * @property {string} backdrop - Selector for backdrop element
 */

class ChatUI {
  /**
   * @param {string} selector 
   * @param {ChatUIOptions} options 
   */
  constructor(selector = '#chat-app-root', options = {}) {
    this.root = document.querySelector(selector);
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
    this.chatHistoryItems = this.chatHistoryContainer.querySelectorAll('.item');
    this.contentScrollContainer = this.root.querySelector(this.options.contentScrollContainer);
    this.contentContainer = this.root.querySelector(this.options.contentContainer);
    this.editMode = null; // Track which message is being edited

    this.init();
  }

  init() {
    this.initEventListeners();
    this.initWindowControls();
  }


  initEventListeners() {
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
      await Chat();
    });

    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        Chat();
      }
    });

    // New chat button
    this.newChatButton.addEventListener('click', () => {
      this.root.classList.add('initial');
      this.root.removeAttribute('data-chat-id')
      this.contentContainer.innerHTML = '';
      this.textarea.value = '';
    });

    this.chatHistoryItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.root.classList.remove('initial');
        this.contentContainer.innerHTML = '';
        showChatHistory(e.target);
      });
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

  addHistoryItem(title, id) {
    this.chatHistoryContainer.insertAdjacentElement('beforeend',
       ` <button class="item" data-chat-id="${id}">${title}</button>`
      );
  }

  genContentBlock(content, role) {
    switch (role) {
      case 'user':
        return `<div class="chat__block user">
                  <div class="actions__wrapper">
                      <button class="action__button edit" title="Edit message">
                      <svg class="icon">
                        <use href="#edit-icon" />
                      </svg>
                      </button>
                  </div>
                  <span class="massage">${content}</span>
                </div>`;

      case 'model':
        return `<div class="chat__block model">
                   <svg class="icon model__logo">
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



const ui = new ChatUI();

// import ollama from 'ollama/browser';
// import { marked } from 'marked';

// const STORAGE_KEY = 'chat_history';
// let chatHistory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// // Replace example function
// async function Chat() {
//   const userContent = ui.textarea.value;
//   ui.textarea.value = '';
//   if (!userContent) return;
//   ui.root.classList.remove('initial');

//   ui.addMessage(userContent, 'user');
//   ui.addMessage('', 'model');
//   ui.scrollToBottom();

//    // Add user's message to history
//   chatHistory.push({ role: 'user', content: userContent });

//   const lastContentBlock = ui.contentContainer.querySelector('.chat__block.model:last-child .response_wrapper .response');

//   const response = await ollama.chat({ model: 'xAI', messages: chatHistory, stream: true });

//   let content = '';
//   for await (const part of response) {
//     content += part.message.content;
//     lastContentBlock.innerHTML = marked.parse(content);
//     ui.scrollToBottom();
//   }

//   // Save AI response in history
//   chatHistory.push({ role: 'assistant', content: content });


//   // Store updated history
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));

// }

function showChatHistory(target) {
  let attributeValue = target.getAttribute('data-chat-id');
  ui.root.setAttribute('data-chat-id', attributeValue);
}