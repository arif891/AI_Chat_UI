export class ChatService {
    constructor(host) {
        this.host = host;
        this.abortController = new AbortController();
    }

    async getTitle(model, userContent) {
        const titleResponse = await this.chat({
            model: model,
            messages: [
                {
                    role: "system",
                    content: "You are an AI assistant. Generate a concise, engaging title under 6 words that reflects the core intent of the user's first message, from their perspective. The title should summarize the query clearly to aid in future searchability. Respond *only* with the title—no explanations."
                },
                {
                    role: "user",
                    content: `Generate a title for this message: '${userContent}'.`
                }
            ]
        },null);

        if (titleResponse.message.content) {
            return titleResponse.message.content.replaceAll('"', '');
        }
        return null;
    }

    async chat(options, signal = this.abortController.signal) {
        try {
            const response = await fetch(`http://${this.host}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...options, stream: false }),
                signal: signal
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn('Request aborted by user.');
            } else {
                console.error('Error in chat:', error);
                throw error;
            }
        }
    }

    async *streamChat(options, signal = this.abortController.signal) {
        try {
            const response = await fetch(`http://${this.host}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...options, stream: true }),
                signal: signal
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            try {
                while (true) {
                    const { done, value } = await reader.read();

                    if (done) {
                        break;
                    }

                    buffer += decoder.decode(value);

                    let newlineIndex = buffer.indexOf('\n');
                    while (newlineIndex !== -1) {
                        const line = buffer.substring(0, newlineIndex);
                        buffer = buffer.substring(newlineIndex + 1);

                        if (line) {
                            try {
                                const json = JSON.parse(line);
                                yield json;
                            } catch (parseError) {
                                console.error('Error parsing JSON:', parseError, line);
                            }
                        }

                        newlineIndex = buffer.indexOf('\n');
                    }
                }
            } finally {
                reader.releaseLock();
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn('Request aborted by user.');
            } else {
                console.error('Error in streamChat:', error);
                throw error;
            }
        }
    }

    async list() {
        try {
            const response = await fetch(`http://${this.host}/api/tags`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in list:', error);
            throw error;
        }
    }

    abort() {
        this.abortController.abort();
        this.abortController = new AbortController();
        console.warn('ChatService Aborted');
    }
}