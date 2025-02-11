# AI Chat UI for local LLM

A modern, responsive chat interface built with the LayX framework, designed for AI-powered conversations using local Large Language Models (LLMs) such as **Ollama**.

## Setup

No setup required, just visit [Chat UI](https://aichatui.layx.xyz) and use. You can also install this PWA for a better experience and offline support. Ensure **Ollama** is running in the background and configured correctly.

**Note:** This application requires a local LLM like Ollama to be running. Make sure you have Ollama installed and running before using the chat interface.

## Features

- 🎨 Modern, clean UI design
- 📱 Fully responsive layout
- 🌙 Light/Dark theme support
- 💾 PWA support with offline capabilities
- 🔄 Real-time chat updates, including streaming responses
- 📚 Chat history management with local storage
- ⚡ High performance with zero dependencies

## Tech Stack

- HTML5
- CSS3 (with modern features like Grid, Flexbox, Container Queries)
- JavaScript (Vanilla, ES6+)
- LayX Framework
- Service Workers for PWA
- Fetch API

## Project Structure

```
AI_Chat_UI/
├── assets/
│   ├── brand/          # Logos and brand assets
│   ├── css/           # Stylesheets
│   ├── font/          # Web fonts
│   ├── image/         # Images and icons
│   └── js/            # JavaScript files
├── layx/              # LayX framework files
│   ├── components/    # UI components
│   ├── main/         # Core framework files
│   └── others/       # Additional utilities
└── pages/            # Static pages
```

## Development

### Customization

#### Themes

Modify theme variables in:

```
/layx/main/base/variable.css
/layx/main/base/variable_color.css
```

#### Chat UI

You can customize the chat UI by modifying the following files:

- `assets/css/chat_app/main.css`: Main stylesheet for the chat interface.
- `assets/js/chat_app/main.js`: Main script for the chat interface.

## PWA Support

The application includes Progressive Web App features:

- Offline support
- App manifest
- Service worker for caching
- Installation capability

## Browser Support

- Chrome (latest)
- Edge (latest)
- Safari (latest)
- Firefox (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Add support for more LLMs.
- Add more customization options for the chat interface.
- Implement voice input and output.