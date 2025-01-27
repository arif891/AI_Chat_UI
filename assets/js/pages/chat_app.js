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

    this.sendButton.addEventListener('click', () => {
      exampleChat();
    });

    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        exampleChat();
      }
    });

    // New chat button
    this.newChatButton.addEventListener('click', () => {
      this.root.classList.add('initial');
      this.contentContainer.innerHTML = '';
    });

    this.chatHistoryItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.root.classList.remove('initial');
        this.contentContainer.innerHTML = '';
        showChatHistory();
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
}



const ui = new ChatUI();

// Replace contentBlocks with messageHistory array
const messageHistory = [
  {
    content: "What is LayX framework?",
    role: "user"
  },
  {
    content: `<div class="text__block">
       <p>LayX is a next-generation CSS framework that revolutionizes how developers
         approach web layouts. Built with modern web standards in mind, it combines the
         power of CSS Grid, Flexbox, and Custom Properties to deliver a flexible,
         maintainable, and performant solution for web development.</p>
    </div>
    <div class="text__block">
        <h6>Core Features</h6>
        <ul>
          <li>Zero-dependency architecture</li>
          <li>Modern CSS Grid and Flexbox based layout system</li>
          <li>Built-in responsive design capabilities</li>
          <li>Performance-first approach</li>
          <li>Component-driven development</li>
        </ul>
    </div>`,
    role: "model"
  }
];


// Replace example function
function exampleChat() {
  const userContent = ui.textarea.value;
  ui.textarea.value = '';
  if (!userContent) return;
  ui.root.classList.remove('initial');

  // Add user message
  ui.addMessage(userContent, 'user');

  // Simulate response delay
  setTimeout(() => {
    // For demo purposes, just show the first model response from messageHistory
    const modelResponse = messageHistory[1];
    ui.addMessage(modelResponse.content, modelResponse.role);
    ui.contentContainer.lastElementChild.classList.add('new');
    ui.scrollToBottom();
  }, 500);
}

function showChatHistory() {
  messageHistory.forEach((message) => {
    ui.addMessage(message.content, message.role);
  });
}