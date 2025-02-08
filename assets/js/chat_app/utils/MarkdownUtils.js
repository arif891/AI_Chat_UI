import { marked } from '../lib/marked.js';
import { default_renderer, parser, parser_write } from '../lib/smd.js';
import { highlightAll } from '../../../../layx/others/syntax_highlighter/syntax_highlighter.js';

export class MarkdownUtils {
    static parseMarkdown(markdownText) {
        return marked.parse(markdownText);
    }

    static getParser(element) {
        const renderer = default_renderer(element);
        return parser(renderer);
    }

    static parserWrite(parserInstance, content) {
        parser_write(parserInstance, content);
    }

    static highlightCode() {
        highlightAll();
    }
}
