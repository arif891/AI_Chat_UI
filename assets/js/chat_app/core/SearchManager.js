import { DOMUtils, debounce } from '../utils/utils.js';

export class SearchManager {
    constructor(root) {
        this.root = root;
        this.searchWrapper = this.root.querySelector('.search__wrapper');
        this.searchInput = this.searchWrapper.querySelector('.search-input');
        this.resultWrapper = this.searchWrapper.querySelector('.result-wrapper');
        this.searchButton = this.root.querySelector('.search-btn');
        this.closeButton = this.root.querySelector('.search__wrapper .close');
        
        this.registerEventListeners();
    }

    registerEventListeners() {
        this.searchButton.addEventListener('click', () => this.toggleSearch());
        
        this.searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.trim().toLowerCase();
            if (query) {
                this.performSearch(query);
            } else {
                this.clearResults();
            }
        }, 300));

        // Close search on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchWrapper.classList.contains('open')) {
                this.toggleSearch();
            }
        });

        this.closeButton.addEventListener('click', () => {
            this.toggleSearch();
        });
    }

    toggleSearch() {
        let backdrop = this.root.querySelector('.ui-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('backdrop');
            DOMUtils.addClass(backdrop, 'ui-backdrop');
            backdrop.addEventListener('click', () => this.toggleSearch());
            this.root.appendChild(backdrop);
        }

        const isOpen = this.searchWrapper.classList.toggle('open');
        backdrop.classList.toggle('open');

        if (isOpen) {
            this.searchInput.focus();
        } else {
            this.searchInput.value = '';
            this.clearResults();
        }
    }

    async performSearch(query) {
        const historyItems = Array.from(this.root.querySelectorAll('#chat-history-container .item'));
        const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);

        const results = historyItems.filter(item => {
            const title = item.querySelector('.title').textContent.toLowerCase();
            // Match all search terms
            return searchTerms.every(term => title.includes(term));
        });

        this.displayResults(results, searchTerms);
    }

    displayResults(results, searchTerms) {
        this.clearResults();
        
        if (results.length === 0) {
            this.resultWrapper.innerHTML = `
                <div class="no-results">
                    <p>No results found for "${searchTerms.join(' ')}"</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(item => {
            const title = item.querySelector('.title').textContent;
            const sessionId = item.dataset.sessionId;
            return `
                <div class="item" data-session-id="${sessionId}">
                    <svg class="icon">
                        <use href="/assets/image/svg/icons.svg#chat-icon" />
                    </svg>
                    <span class="title">${this.highlightQuery(title, searchTerms)}</span>
                </div>
            `;
        }).join('');

        this.resultWrapper.innerHTML = resultsHTML;

        // Add click handlers to results
        this.resultWrapper.querySelectorAll('.item').forEach(item => {
            item.addEventListener('click', () => {
                const sessionId = item.dataset.sessionId;
                DOMUtils.dispatchEvent(this.root, 'display-chat', { sessionId });
                this.toggleSearch();
            });
        });
    }

    highlightQuery(text, searchTerms) {
        let highlightedText = text;
        searchTerms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        return highlightedText;
    }

    clearResults() {
        this.resultWrapper.innerHTML = '';
    }
}
