import { DOMUtils } from '../utils/utils.js';

export class SettingsManager {
    constructor(root) {
        this.root = root;
        this.wrapper = this.root.querySelector('.setting_wrapper .wrapper');
        this.settingsWindow = this.root.querySelector('.setting_wrapper');
        this.apiForm = this.root.querySelector('#api-form');
        this.settingsButton = this.root.querySelector('.block.settings');
        this.closeButton = this.root.querySelector('.setting_wrapper .close');
        this.linkWrapper = this.root.querySelector('.link_wrapper');

        this.settings = {
            api: {
                host: 'http://localhost:11434'
            },
            ui: {
                messageFormat: 'markdown',
                codeHighlighting: true,
                maxHistoryItems: 50
            },
            chat: {
                maxContextLength: 20,
                streamResponse: true,
                defaultModel: ''
            }
        };

        this.initialize();
        this.registerEventListeners();
    }

    initialize() {
        this.loadSettings();
        this.initializeWindows();
    }

    initializeWindows() {
        // Handle window navigation
        this.linkWrapper.addEventListener('click', (e) => {
            const target = e.target.closest('.link');
            if (!target) return;

            // Remove active class from all links
            this.linkWrapper.querySelectorAll('.link').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to clicked link
            target.classList.add('active');

            // Show corresponding window
            const window = this.wrapper.querySelector(`[data-window="${target.dataset.windowTarget}"]`);

            window.scrollIntoView({ behavior: "smooth" });
       
        });
    }

    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('appSettings');
            if (savedSettings) {
                this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            }
            this.applySettings();
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    applySettings() {
        // Apply API settings
        const hostInput = this.root.querySelector('input[name="host"]');
        if (hostInput) {
            hostInput.value = this.settings.api.host;
        }

        // Dispatch event for settings update
        DOMUtils.dispatchEvent(this.root, 'settings-updated', { settings: this.settings });
    }

    saveSettings() {
        try {
            localStorage.setItem('appSettings', JSON.stringify(this.settings));
            this.applySettings();
            this.showNotification('Settings saved successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
            this.showNotification('Error saving settings', 'error');
        }
    }

    registerEventListeners() {
        // API form submission
        this.apiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.settings.api.host = this.apiForm.querySelector('input[name="host"]').value;
            this.saveSettings();
        });

        // Settings toggle
        this.settingsButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleSettings();
        });

        this.closeButton.addEventListener('click', () => {
            this.toggleSettings();
        });

        // Export settings
        this.root.addEventListener('click', (e) => {
            if (e.target.matches('.export-settings')) {
                this.exportSettings();
            } else if (e.target.matches('.import-settings')) {
                this.importSettings();
            }
        });
    }

    toggleSettings() {
        let backdrop = this.root.querySelector('.ui-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('backdrop');
            DOMUtils.addClass(backdrop, 'ui-backdrop');
            backdrop.addEventListener('click', () => this.toggleSettings());
            this.root.appendChild(backdrop);
        }

        const isOpen = this.settingsWindow.classList.toggle('open');
        backdrop.classList.toggle('open');

        if (isOpen) {
            this.applySettings(); // Refresh settings when opening
        }
    }

    showNotification(message, type = 'success') {
        DOMUtils.dispatchEvent(this.root, 'show-notification', {
            message,
            type
        });
    }

    exportSettings() {
        const dataStr = JSON.stringify(this.settings, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'chat-settings.json';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }

    async importSettings() {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            
            input.onchange = async (e) => {
                const file = e.target.files[0];
                const text = await file.text();
                const newSettings = JSON.parse(text);
                this.settings = { ...this.settings, ...newSettings };
                this.saveSettings();
            };
            
            input.click();
        } catch (error) {
            console.error('Error importing settings:', error);
            this.showNotification('Error importing settings', 'error');
        }
    }

    getHost() {
        return this.settings.api.host;
    }

    getSetting(category, key) {
        return this.settings[category]?.[key];
    }

    updateSetting(category, key, value) {
        if (this.settings[category]) {
            this.settings[category][key] = value;
            this.saveSettings();
        }
    }
}
