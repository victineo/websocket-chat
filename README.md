# websocket-chat

This is a practical challenge about **WebSockets** with Python.

_The initial idea was to only build the backend with Python and use a HTML template to render the chat, but I decided to build the frontend with React and Next.js to make the application more dynamic and interactive, and also to put my knowledge to practice with these technologies._

## Dependencies (backend)
### Flask
Flask is a lightweight WSGI web application framework in Python. It is designed to make getting started quick and easy, with the ability to scale up to complex applications. Flask is known for its simplicity, flexibility, and fine-grained control, making it a popular choice for web developers.

### Flask-SocketIO
Flask-SocketIO is an extension that adds Socket.IO support to your Flask application. Socket.IO is a library that enables real-time, bidirectional communication between the browser and the server. This is achieved through the use of WebSockets, which provide a persistent connection between the client and the server, allowing for real-time updates without the need for page reloads.

### TinyDB
TinyDB is a lightweight, document-oriented database for Python that stores data in JSON format. It's perfect for small projects and prototypes, offering a simple, file-based storage solution without the need for a full-scale database server. TinyDB allows you to easily store, query, and manage data with minimal setup, making it an excellent choice for applications requiring quick and straightforward data persistence.

## Dependencies (frontend)
### React
React is a JavaScript library for building user interfaces. It is used to create interactive and dynamic web applications. React allows you to build reusable UI components and manage the state of your application efficiently.

### Next.js
Next.js is a framework for building server-side rendered React applications. It is used to create fast, scalable, and SEO-friendly web applications. Next.js provides a set of tools and features that help you build modern web applications, including server-side rendering, automatic code splitting, and built-in support for routing.

### Socket.IO-Client
Socket.IO-Client is a library that enables real-time, bidirectional communication between the browser and the server. It is used to create a connection between the client and the server, allowing for real-time updates without the need for page reloads.

### Lucide-React
Lucide-React is an icon library for React. It is used to create beautiful and functional icons for your application. Lucide-React provides a set of tools and features that help you create beautiful and functional icons for your application.