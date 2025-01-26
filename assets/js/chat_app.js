/**
 * @typedef {Object} ChatUIOptions
 * @property {string} sidebarTogglers - Selector for sidebar toggle buttons
 * @property {string} chatTextarea - Selector for chat textarea
 * @property {string} chatButton - Selector for send button
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
            chatTextarea: '#chat-massage',
            chatButton: '#chat-send-button',
            chatHistoryContainer: '#chat-history-container',
            contentContainer: '#content-container',
            sidebarStateName: 'chat-sidebar-open',
            backdrop: '.chat-backdrop',
            ...options
        };

        this.sidebarTogglers = document.querySelectorAll(this.options.sidebarTogglers);
        this.chatTextarea = document.querySelector(this.options.chatTextarea);
        this.chatButton = document.querySelector(this.options.chatButton);
        this.chatHistoryContainer = document.querySelector(this.options.chatHistoryContainer);
        this.chatHistoryItems = this.chatHistoryContainer.querySelectorAll('.item');
        this.contentContainer = document.querySelector(this.options.contentContainer);

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

        this.chatHistoryItems.forEach((item) => {
           item.addEventListener('click', () => {
            this.root.classList.remove('initial');
           });
        });

        window.addEventListener('offline', () => {
            this.root.classList.add('offline');
        });

        window.addEventListener('online', () => {
            this.root.classList.remove('offline');
        });

        document.addEventListener('DOMContentLoaded', () => {
            if (navigator.offline) {
                this.root.classList.add('offline');
            }
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
}

// Export for module usage
export default ChatUI;
