import { DOMUtils } from '../utils/utils.js';

export class ModelManager {
    constructor(root) {
        this.root = root;
        this.modelMenu = root.querySelector('#model-menu');
    }

    selectModel(target) {
        try {
            const selectedModel = target.getAttribute('data-model');
            if (!selectedModel) return;

            localStorage.setItem('selectedModel', selectedModel);
            // Update UI: mark selected model as active
            DOMUtils.findElements(this.modelMenu, '.model').forEach(modelBtn => {
                DOMUtils.removeClass(modelBtn, 'active');
            });
            const selectedModelElement = this.modelMenu.querySelector(`[data-model="${selectedModel}"]`);
            if (selectedModelElement) {
                DOMUtils.addClass(selectedModelElement, 'active');
            }

            DOMUtils.dispatchEvent(this.root, 'model-selected', { model: selectedModel });
        } catch (error) {
            console.error('Error selecting model:', error);
        }
    }

    populateModelMenu(models) {
        models.forEach(model => {
            const [modelName, modelInfo] = model.name.split(':');
            DOMUtils.insertHTML(this.modelMenu, 'beforeend', `
                <button class="model" data-model="${model.name}">
                    <span class="name">${modelName}</span>
                    <span class="info">${modelInfo || ''}</span>
                </button>
            `);
        });
    }

    setActiveModel(model) {
        const activeModelElement = this.modelMenu.querySelector(`[data-model="${model}"]`);
        if (activeModelElement) {
            DOMUtils.addClass(activeModelElement, 'active');
        }
    }
}
