# 🧠 Srivanth's AI Assistant

A web-based AI assistant built with **Next.js**, integrated with **Google Calendar** via OAuth, and powered by **LLM tool calling using Ollama**.

---

## 🚀 Features

- 🔹 Conversational AI assistant (LLM tool calling)
- 🔹 Google OAuth 2.0 login
- 🔹 Fetch your Google Calendar events
- 🔹 Session-based memory (stored in SQLite via Prisma)
- 🔹 Fully responsive chat UI (Next.js + Tailwind CSS)
- 🔹 Modular structure for future integrations

---

## ⚙️ Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | Next.js (App Router), React   |
| Styling   | Tailwind CSS                  |
| Auth      | Google OAuth 2.0              |
| LLM       | Ollama                        |
| Backend   | API Routes in Next.js         |
| Database  | Prisma ORM + SQLite           |

---

## 🖇️ Project Structure

```
ai-assistant/
├── app/
│   ├── api/
│   │   └── chat/               # App Router API for chat
│   ├── layout.js               # App layout
│   └── page.js                 # Chat page UI
├── lib/
│   ├── auth.js                 # Auth logic for sessions
│   └── google.js               # Google Calendar integration
├── pages/
│   └── api/
│       ├── chat.js             # Pages API route (LLM chat)
│       ├── login.js            # Login API
│       └── register.js         # Register API
├── prisma/
│   ├── schema.prisma           # Prisma schema definition
│   └── dev.db                  # SQLite database file
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind CSS configuration
└── .env                        # Environment variables
```

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/ai-assistant.git
cd ai-assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Ollama & Download a Model

Make sure you have [Ollama](https://ollama.com) installed and running locally.

```bash
ollama run llama3
```

> You can also replace `llama3` with another supported model like `mistral` or `gemma`.

### 4. Set Up Environment Variables

Create a `.env` file in the root of your project:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
```

### 5. Initialize the Database

```bash
npx prisma migrate dev --name init
```

### 6. Run the Development Server

```bash
npm run dev
```

Now visit: [http://localhost:3000](http://localhost:3000) to start chatting with your AI assistant 🚀

---


