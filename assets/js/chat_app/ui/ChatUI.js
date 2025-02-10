import { DOMUtils, debounce, sanitizeInput} from '../utils/utils.js';
import { HistoryManager } from '../core/HistoryManager.js';
import { ModelManager } from '../core/ModelManager.js';
import { TemplateUtils } from '../utils/TemplateUtils.js';

export class ChatUI {
  constructor(options = {}) {
    this.uiOptions = {
      root: '#chat-app-root',
      sidebarTogglers: '.sidebar-toggler',
      textarea: '#chat-massage',
      sendButton: '#chat-send-button',
      newChatButton: '#new-chat-button',
      chatHistoryContainer: '#chat-history-container',
      contentScrollContainer: '#content-scroll-container',
      contentContainer: '#content-container',
      modelMenu: '#model-menu',
      scrollButton: '#scroll-button',
      sidebarStateName: 'chat-sidebar-open',
      backdrop: '.chat-backdrop',
      ...options
    };

    this.root = document.querySelector(this.uiOptions.root);


    this.historyManager = new HistoryManager(this.root);
    this.modelManager = new ModelManager(this.root);

    this.initWindowControls();
    this.initializeElements();
    this.registerEventListeners();

    this.editMode = null;
    this.activeHistoryItem = null;
  }

  initializeElements() {
    this.sidebarTogglers = DOMUtils.findElements(this.root, this.uiOptions.sidebarTogglers);
    this.textarea = DOMUtils.findElement(this.root, this.uiOptions.textarea);
    this.sendButton = DOMUtils.findElement(this.root, this.uiOptions.sendButton);
    this.newChatButton = DOMUtils.findElement(this.root, this.uiOptions.newChatButton);
    this.chatHistoryContainer = DOMUtils.findElement(this.root, this.uiOptions.chatHistoryContainer);
    this.contentScrollContainer = DOMUtils.findElement(this.root, this.uiOptions.contentScrollContainer);
    this.contentContainer = DOMUtils.findElement(this.root, this.uiOptions.contentContainer);
    this.modelMenu = DOMUtils.findElement(this.root, this.uiOptions.modelMenu);
    this.scrollButton = DOMUtils.findElement(this.root, this.uiOptions.scrollButton);
  }

  setActiveHistoryItem(historyItem) {
    if (this.activeHistoryItem) {
      DOMUtils.removeClass(this.activeHistoryItem, 'active');
    }
    this.activeHistoryItem = historyItem;
    if (historyItem) {
      DOMUtils.addClass(this.activeHistoryItem, 'active');
    }
  }

  clearActiveHistoryItem() {
    if (this.activeHistoryItem) {
      DOMUtils.removeClass(this.activeHistoryItem, 'active');
      this.activeHistoryItem = null;
    }
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
    if (sidebarIsOpen) DOMUtils.addClass(this.root, 'sidebar-open');

    // Close sidebar on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOMUtils.hasClass(this.root, 'sidebar-open')) {
        try {
          this.toggleSidebar();
        } catch (error) {
          console.error('Error handling Escape key:', error);
        }
      }
    });

    // Send message events
    this.sendButton.addEventListener('click', async (e) => {
      DOMUtils.dispatchEvent(this.root, 'send-message');
    });
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        DOMUtils.dispatchEvent(this.root, 'send-message');
      }
    });

    this.contentScrollContainer.addEventListener('scroll', debounce(() => this.updateScrollState()), { passive: true });

    this.scrollButton.addEventListener('click', () => {
      this.scrollToBottom();
    });

    // Chat history item click event
    this.chatHistoryContainer.addEventListener('click', (e) => {

      const renameButton = e.target.closest('.menu__item.rename');
      if (renameButton) {
        e.stopPropagation();
        const historyItem = renameButton.closest('.item');
        this.historyManager.enableHistoryRenameMode(historyItem);
        return;
      }

      const deleteButton = e.target.closest('.menu__item.delete');
      if (deleteButton) {
        e.stopPropagation();
        const historyItem = deleteButton.closest('.item');
        this.historyManager.deleteHistoryItem(historyItem);
        return;
      }

      const historyItem = e.target.closest('.item');
      if (historyItem) {
        this.setActiveHistoryItem(historyItem);
      }

      try {
        this.historyManager.displayChatHistory(e.target);
      } catch (error) {
        console.error('Error showing chat history:', error);
      }
    });

    // New chat button event
    this.newChatButton.addEventListener('click', () => {
      DOMUtils.dispatchEvent(this.root, 'new-chat');
    });

    // Model selection event
    this.modelMenu.addEventListener('click', (e) => {
      this.modelManager.selectModel(e.target);
    });

    // Network status updates
    // window.addEventListener('offline', () => this.updateNetworkStatus());
    // window.addEventListener('online', () => this.updateNetworkStatus());

    document.addEventListener('DOMContentLoaded', () => {
      DOMUtils.addClass(this.root, 'loaded');
    });

    // Delegate click events for editing messages
    this.contentContainer.addEventListener('click', (e) => {
      const editButton = e.target.closest('.action__button.edit');
      if (editButton) {
        const messageBlock = editButton.closest('.chat__block');
        this.enableEditMode(messageBlock);
      }

      const copyButton = e.target.closest('.action__button.copy');
      if (copyButton) {
        const messageBlock = copyButton.closest('.chat__block.assistant');
        const messageText = messageBlock.querySelector('.response').textContent.trim();
        DOMUtils.dispatchEvent(this.root, 'copy-message', {block: messageBlock, content: messageText });
      }

      const regenerateButton = e.target.closest('.action__button.regenerate');
      if (regenerateButton) {
        const messageBlock = regenerateButton.closest('.chat__block.assistant');
        const messageIndex = Array.from(messageBlock.parentNode.children).indexOf(messageBlock);
        DOMUtils.dispatchEvent(this.root, 'regenerate-message', { messageBlock, messageIndex });
      }
    });
  }

  toggleSidebar() {
    try {
      const isOpen = this.root.classList.toggle('sidebar-open');
      localStorage.setItem(this.uiOptions.sidebarStateName, isOpen);

      // Handle the backdrop for the sidebar
      let backdrop = DOMUtils.findElement(this.root, this.uiOptions.backdrop);
      if (!backdrop && isOpen) {
        backdrop = document.createElement('backdrop');
        DOMUtils.addClass(backdrop, 'chat-backdrop');
        backdrop.addEventListener('click', () => this.toggleSidebar());
        this.root.appendChild(backdrop);
      }
      if (backdrop) {
        DOMUtils.toggleClass(backdrop, 'open');
      }
    } catch (error) {
      console.error('Error in toggleSidebar:', error);
    }
  }

  updateNetworkStatus() {
    this.root.classList.toggle('offline', !navigator.onLine);
  }



  renderMessage(content, role) {
    // Sanitize user input if needed and generate HTML for the message block
    const finalContent = role === 'user' ? sanitizeInput(content) : content;
    const messageHTML = TemplateUtils.generateMessageBlock(finalContent, role);
    DOMUtils.insertHTML(this.contentContainer, 'beforeend', messageHTML);
  }

  addChatHistoryItem(title, sessionId, position = 'beforeend') {
    DOMUtils.insertHTML(this.chatHistoryContainer, position, TemplateUtils.generateChatHistoryItem(title, sessionId));
  }

  scrollToBottom() {
    this.contentScrollContainer.scrollTo({
      top: this.contentScrollContainer.scrollHeight,
      behavior: 'smooth'
    });
  }


  updateScrollState(threshold = 400) {
    const container = this.contentScrollContainer;
    const isBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + threshold;
    
    this.root.classList[isBottom ? 'add' : 'remove']('bottom');
    this.root.classList.add('scrolled')
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

    DOMUtils.addClass(messageBlock, 'editing');
    DOMUtils.insertHTML(messageBlock, 'beforeend', editUI);

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
      const messageBlock = this.editMode.block;
      const content = newText;
      const messageIndex = Array.from(messageBlock.parentNode.children).indexOf(messageBlock);

      DOMUtils.dispatchEvent(this.root, 'save-edit', { messageBlock, content, messageIndex });
    }
    this.exitEditMode();
  }

  cancelEdit() {
    if (!this.editMode) return;
    this.exitEditMode();
  }

  exitEditMode() {
    if (!this.editMode) return;
    DOMUtils.removeClass(this.editMode.block, 'editing');
    const editUI = this.editMode.block.querySelector('.edit__wrapper');
    if (editUI) DOMUtils.removeElement(editUI);
    this.editMode = null;
  }

  clearChatHistory() {
    DOMUtils.clearInnerHTML(this.contentContainer);
  }

  addSystemMessage(content) {
    this.renderMessage(content, 'system');
  }

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

  removeBlocksAfter(index) {
    const blocks = Array.from(this.contentContainer.children);
    blocks.slice(index).forEach(block => {
      DOMUtils.removeElement(block);
    });
  }
}
