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

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | Next.js (App Router), React   |
| Styling     | Tailwind CSS                  |
| Auth        | Google OAuth 2.0              |
| LLM         | Ollama                        |
| Backend     | API Routes in Next.js         |
| Database    | Prisma ORM + SQLite           |

---

🧩 Architecture Overview

/app
└── api/
└── chat/ # App Router API for chat
└── layout.js # App layout file
└── page.js # Chat UI

/lib
└── google.js # Google Calendar logic
└── auth.js # OAuth & session utils

/pages
└── api/
└── chat.js # Pages API (LLM endpoint)
└── login.js # login route
└── register.js # register route

/prisma
└── schema.prisma # DB schema
└── dev.db # SQLite DB file

/public 
tailwind.config.js # Tailwind config

---

📦 Setup Instructions

1. Clone the repo
----------------------------------------
git clone https://github.com/ai-assistant.git
cd ai-assistant

2. Install dependencies
----------------------------------------
npm install

3. Install Ollama & Download a Model
----------------------------------------
Make sure you have Ollama installed and running locally.

ollama run llama3

You can also replace `llama3` with another supported model like `mistral` or `gemma`.

4. Set Up Environment Variables
----------------------------------------
Create a `.env` file at the root of your project with the following:

GOOGLE_CLIENT_ID=your-google-client-id  
GOOGLE_CLIENT_SECRET=your-google-client-secret  
NEXT_PUBLIC_BASE_URL=http://localhost:3000

5. Initialize the Database
----------------------------------------
npx prisma migrate dev --name init

6. Run the Development Server
----------------------------------------
npm run dev

Visit: http://localhost:3000 to start chatting with your AI assistant 🚀
