import { highlightAll } from '../../../../layx/others/syntax_highlighter/syntax_highlighter.js';
import { marked } from '../lib/marked.esm.js';

export class ChatUI {
  constructor(root, options = {}) {
    this.root = root;
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

    this.initializeElements();
    this.registerEventListeners();

    this.editMode = null;
  }

  initializeElements() {
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
    this.sendButton.addEventListener('click', async (e) => {
      const event = new CustomEvent('send-message', {
        bubbles: true,
        cancelable: true,
        composed: false,
      });
      this.root.dispatchEvent(event);
    });
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const event = new CustomEvent('send-message', {
          bubbles: true,
          cancelable: true,
          composed: false,
        });
        this.root.dispatchEvent(event);
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
      const event = new CustomEvent('new-chat', {
        bubbles: true,
        cancelable: true,
        composed: false,
      });
      this.root.dispatchEvent(event);
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

  displayChatHistory(target) {
    const sessionIdAttribute = target.getAttribute('data-session-id');
    if (!sessionIdAttribute) return;

    const event = new CustomEvent('display-chat', {
      detail: { sessionId: sessionIdAttribute },
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    this.root.dispatchEvent(event);
  }

  selectModel(target) {
    try {
      const selectedModel = target.getAttribute('data-model');
      if (!selectedModel) return;

      localStorage.setItem('selectedModel', selectedModel);
      // Update UI: mark selected model as active
      this.modelMenu.querySelectorAll('.model').forEach(modelBtn => {
        modelBtn.classList.remove('active');
      });
      this.modelMenu.querySelector(`[data-model="${selectedModel}"]`)?.classList.add('active');

      const event = new CustomEvent('model-selected', {
        detail: { model: selectedModel },
        bubbles: true,
        cancelable: true,
        composed: false,
      });
      this.root.dispatchEvent(event);
    } catch (error) {
      console.error('Error selecting model:', error);
    }
  }

  populateModelMenu(models) {
    models.forEach(model => {
      const [modelName, modelInfo] = model.name.split(':');
      this.modelMenu.insertAdjacentHTML('beforeend', `
        <button class="model" data-model="${model.name}">
          <span class="name">${modelName}</span>
          <span class="info">${modelInfo || ''}</span>
        </button>
      `);
    });
  }

  setActiveModel(model) {
    this.modelMenu.querySelector(`[data-model="${model}"]`)?.classList.add('active');
  }

  clearChatHistory() {
    this.contentContainer.innerHTML = '';
  }

  addSystemMessage(content) {
    this.renderMessage(content, 'system');
  }
}
