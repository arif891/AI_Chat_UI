import { DOMUtils } from '../utils/utils.js';

export class HistoryManager {
    constructor(root) {
        this.root = root;
    }

    displayChatHistory(target) {
        const sessionIdAttribute = target.getAttribute('data-session-id');
        if (!sessionIdAttribute) return;

        DOMUtils.dispatchEvent(this.root, 'display-chat', { sessionId: sessionIdAttribute });
    }

    enableHistoryRenameMode(historyItem) {
        const metaTag = document.querySelector('meta[name="viewport"]');
        
        const titleSpan = historyItem.querySelector('.title');
        if (!titleSpan || DOMUtils.hasClass(historyItem, 'renaming')) return;

        const originalText = titleSpan.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;
        input.className = 'rename-input';

        const saveRename = async () => {

            const newTitle = input.value.trim();
            const sessionId = historyItem.dataset.sessionId;

            if (newTitle && newTitle !== originalText) {
                DOMUtils.dispatchEvent(this.root, 'rename-chat', { sessionId, title: newTitle });
                titleSpan.textContent = newTitle;
            } else {
                titleSpan.textContent = originalText;
            }

            DOMUtils.removeElement(input);
            DOMUtils.removeClass(historyItem, 'renaming');
            metaTag.setAttribute('content', 'width=device-width, initial-scale=1.0, interactive-widget=resizes-content');
        };

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();
            }
            if (e.key === 'Escape') {
                titleSpan.textContent = originalText;
                DOMUtils.removeElement(input);
                DOMUtils.removeClass(historyItem, 'renaming');
                metaTag.setAttribute('content', 'width=device-width, initial-scale=1.0, interactive-widget=resizes-content');
            }
        });

        input.addEventListener('blur', saveRename);

        DOMUtils.addClass(historyItem, 'renaming');
        metaTag.setAttribute('content', 'width=device-width, initial-scale=1.0, interactive-widget=resizes-visual');
        titleSpan.after(input);
        input.focus();
    }

    deleteHistoryItem(historyItem) {
        const sessionId = historyItem.dataset.sessionId;
        DOMUtils.dispatchEvent(this.root, 'delete-chat', { sessionId });
        DOMUtils.removeElement(historyItem);
    }
}
