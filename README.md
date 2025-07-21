# 🌳 Invent-Tree

Invent-Tree is a full-stack MERN-based web platform built for a political, survey, and geospatial consultancy firm. Inspired by the vision of YUI Tech, the application delivers a seamless, multilingual experience with powerful admin tools, survey tracking, blog features, and more.

## 🔧 Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS, Framer Motion
- **State Management:** React Hooks
- **Internationalization:** i18next
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth (JWT + MongoDB)
- **File Handling:** Cloudinary for image uploads
- **Package Manager:** pnpm

## ✨ Features

- 🌐 Multilingual support with i18next
- 🌗 Dark/Light mode toggle
- 📝 Blog creation & management (admin-only)
- 🗳️ Political survey & opinion collection tools
- 🧠 Geospatial data handling for analytics (upcoming)
- 🔒 Role-based authentication with JWT
- 📦 Fully typed REST API
- 📂 File/image uploads via Cloudinary
- 📊 Admin dashboard for content & user management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm installed globally:  
  npm install -g pnpm

# Clone the Repository
git clone https://github.com/kaushalji451/Invent-Tree
Install Dependencies
pnpm install
Environment Variables
Create a .env.local file in the root directory and configure the following:

# MongoDB
MONGODB_URI=your_mongo_connection_string

# NextAuth
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Google Provider (if using)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Run Development Server

pnpm dev
Open http://localhost:3000 in your browser.

# Scripts
Script	Description
pnpm dev	Starts the development server
pnpm build	Builds the project
pnpm start	Starts the production server
pnpm lint	Runs ESLint

# Security
JWT-based authentication via NextAuth.

Admin routes are protected via middleware.

File uploads are validated and securely stored on Cloudinary.

# License
MIT License. See LICENSE file for more details.

# Contact
For questions or collaboration:

💼 Author: Abhishek Kumar Kaushal

📧 Email: [abhishekkaushal2526@gmail.com]