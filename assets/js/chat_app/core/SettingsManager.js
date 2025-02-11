import { DOMUtils } from '../utils/utils.js';

export class SettingsManager {
    constructor(root) {
        this.root = root;
        this.wrapper = this.root.querySelector('.setting_wrapper .wrapper');
        this.hostInput = this.root.querySelector('input[name="host"]');
        this.saveButton = this.root.querySelector('.window.api .submit-btn');
        this.settingsWindow = this.root.querySelector('.setting_wrapper');
        this.apiWindow = this.root.querySelector('.window[data-window="api"]');
        this.settingsButton = this.root.querySelector('.block.settings');
        this.closeButton = this.root.querySelector('.setting_wrapper .close');

        this.loadSettings();
        this.registerEventListeners();
    }

    loadSettings() {
        const host = localStorage.getItem('host') || 'http://localhost:11434';
        this.hostInput.value = host;
    }

    saveSettings() {
        const host = this.hostInput.value;
        localStorage.setItem('host', host);
    }

    registerEventListeners() {
        this.saveButton.addEventListener('click', () => {
            this.saveSettings();
        });

        this.settingsButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleSetting();
        });

        this.closeButton.addEventListener('click', () => {
            this.toggleSetting();
        });
    }

    toggleSetting() {
        let backdrop = this.root.querySelector('.ui-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('backdrop');
            DOMUtils.addClass(backdrop, 'ui-backdrop');
            backdrop.addEventListener('click', () => this.toggleSetting());
            this.root.appendChild(backdrop);
        }
        this.settingsWindow.classList.toggle('open');
        backdrop.classList.toggle('open');
    }

    getHost() {
        return localStorage.getItem('host') || 'http://localhost:11434';
    }
}
