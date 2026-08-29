# 💼 Portfolio Maker — Client Vault & Portfolio Studio

[![Render Deployment](https://img.shields.io/badge/Deployment-Render.com-brightgreen.svg?logo=render)](https://portfolio-maker-aovl.onrender.com/generator.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](package.json)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-blue.svg)](https://nodejs.org/)

> A privacy-focused web application and Node.js server engine for building, previewing, and hosting high-impact client document portfolios and credential vaults live on **Render.com**.

---

## 🌐 Live Deployments

| Component | Live URL |
| :--- | :--- |
| 🎨 **Studio Builder UI** | [https://portfolio-maker-aovl.onrender.com/generator.html](https://portfolio-maker-aovl.onrender.com/generator.html) |
| 💼 **Live Client Portfolio (`angsuman`)** | [https://portfolio-maker-aovl.onrender.com/clients/angsuman/](https://portfolio-maker-aovl.onrender.com/clients/angsuman/) |
| 💼 **Live Client Portfolio (`angsuman-das`)** | [https://portfolio-maker-aovl.onrender.com/clients/angsuman-das/](https://portfolio-maker-aovl.onrender.com/clients/angsuman-das/) |
| ⚡ **Live Publish API** | `https://portfolio-maker-aovl.onrender.com/api/publish` |

---

## ✨ Features

- 🌐 **Direct Render Cloud Hosting**: Software Studio and client portfolio sites are hosted live directly on Render.com (`https://portfolio-maker-aovl.onrender.com`).
- 🎨 **Studio Builder Interface**: Interactive visual studio (`generator.html`) for editing profile details, credentials, publications, and theme presets.
- 👁️ **Real-Time Live Preview**: Instant live previewing of client sites before publishing.
- 📄 **Categorized Document Vault**: Built-in support for Academic Degrees, Certifications, Work Experience, Research Publications, Identity Records, and Recommendations.
- 🚀 **Instant Live Publishing**: Native HTTP endpoint (`/api/publish`) that dynamically packages client sites and publishes them live at `https://<domain>/clients/<slug>/`.
- 📱 **Modern Client Portfolios**: High-performance static client web apps with responsive design, search filtering, PDF previewing, and dark/light themes.
- 📄 **Render Blueprint Ready**: Includes `render.yaml` for automatic 1-click deployment.

---

## 🛠️ Tech Stack

- **Backend**: Node.js (Built-in `http`, `fs`, `path`, dynamic PORT binding)
- **Frontend Studio**: Vanilla JS (ES6+), HTML5, CSS3, FontAwesome 6
- **Typography & UI**: Plus Jakarta Sans, JetBrains Mono, Cormorant Garamond
- **Client Template**: Responsive HTML/CSS/JS, jsPDF, HTML5 Canvas

---

## 📂 Repository Structure

```
Portfolio_Maker/
├── server.js              # Node.js studio server & dynamic publishing engine
├── render.yaml            # Render.com Blueprint deployment spec
├── generator.html         # Studio interface for creating client portfolios
├── generator.js           # Studio state management, preview, & export logic
├── generator.css          # Modern dark-mode studio design system
├── package.json           # Project manifest & scripts
├── client-template/       # Base static website template for clients
│   ├── index.html
│   ├── client.css
│   └── client.js
└── clients/               # Live published client document vaults
    ├── angsuman/
    ├── angsuman-das/
    ├── dr-alex-vance/
    ├── shampoo-kakati/
    └── sumpimoni-das/
```

---

## ⚡ Running Locally

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

## 🚀 Deploying to Render.com

1. Fork or clone this repository to your GitHub account (`Angsumi/Portfolio_Maker`).
2. Go to **[Render.com Dashboard](https://dashboard.render.com)** → **New +** → **Blueprint**.
3. Select `Angsumi/Portfolio_Maker`. Render will automatically detect `render.yaml` and launch your service!

---

## 📄 License

This project is licensed under the [MIT License](package.json).
