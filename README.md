# 💼 Portfolio Maker — Client Vault & Portfolio Studio

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](package.json)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-blue.svg)](https://nodejs.org/)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen.svg)](https://angsumi.github.io/Portfolio_Maker/)

> A privacy-focused, local-first web application for building, previewing, and hosting high-impact client document portfolios and credential vaults with one-click automated GitHub Pages deployment.

---

## ✨ Features

- 🛡️ **Local-First Privacy**: Build and manage portfolios locally without relying on third-party SaaS databases or external tracking.
- 🎨 **Studio Builder Interface**: Interactive visual studio (`generator.html`) for editing profile details, credentials, publications, and theme presets.
- 👁️ **Real-Time Live Preview**: Instant live previewing of client sites before publishing.
- 📄 **Categorized Document Vault**: Built-in support for Academic Degrees, Certifications, Work Experience, Research Publications, Identity Records, and Recommendations.
- 🚀 **Automated GitHub Pages Deployment**: Native HTTP endpoint (`/api/publish`) that packages client sites and automatically commits & pushes updates to GitHub Pages.
- 📱 **Modern Client Portfolios**: High-performance static client web apps with responsive design, search filtering, PDF previewing, and dark/light themes.

---

## 🛠️ Tech Stack

- **Backend**: Node.js (Built-in `http`, `fs`, `path`, `child_process`)
- **Frontend Studio**: Vanilla JS (ES6+), HTML5, CSS3, FontAwesome 6
- **Typography & UI**: Plus Jakarta Sans, JetBrains Mono, Cormorant Garamond
- **Client Template**: Responsive HTML/CSS/JS, jsPDF, HTML5 Canvas

---

## 📂 Repository Structure

```
Portfolio_Maker/
├── server.js              # Node.js local studio server & auto-git publish engine
├── generator.html         # Studio interface for creating client portfolios
├── generator.js           # Studio state management, preview, & export logic
├── generator.css          # Modern dark-mode studio design system
├── package.json           # Project manifest & scripts
├── client-template/       # Base static website template for clients
│   ├── index.html
│   ├── client.css
│   └── client.js
└── clients/               # Published client document vaults
    ├── angsuman/
    ├── dr-alex-vance/
    ├── shampoo-kakati/
    └── sumpimoni-das/
```

---

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Angsumi/Portfolio_Maker.git
cd Portfolio_Maker
```

### 2. Start the Local Studio Server
```bash
npm start
# or
node server.js
```

### 3. Open in Browser
Navigate to `http://localhost:8080/generator.html` to launch the Portfolio Maker Studio.

---

## 🚀 Publishing to GitHub Pages

1. Fill in client details and upload documents in the Studio UI.
2. Click **Publish & Push to GitHub Pages**.
3. The server will generate the site under `clients/<slug>/` and run automated git commands:
   ```bash
   git add clients/<slug>
   git commit -m "Publish client site: <clientName>"
   git push origin main
   ```
4. Access the live client portfolio at:
   `https://<your-username>.github.io/Portfolio_Maker/clients/<slug>/`

---

## 📄 License

This project is licensed under the [MIT License](package.json).
