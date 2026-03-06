# Portfolio — Saksham Manchanda

A minimal React portfolio for a video editor.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Install & Run

```bash
# 1. Navigate into the folder
cd portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm start
```

The app will open at **http://localhost:3000**

---

## 📁 Folder Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Sidebar.js / .css     ← Fixed left sidebar
│   │   ├── Marquee.js / .css     ← Scrolling skills strip
│   │   └── Footer.js  / .css
│   ├── sections/
│   │   ├── Hero.js    / .css     ← Landing hero
│   │   ├── Work.js    / .css     ← Bento grid portfolio
│   │   ├── Clients.js / .css     ← Edited For section
│   │   ├── Showreel.js / .css    ← Video player UI
│   │   ├── Services.js / .css    ← Services list
│   │   └── Contact.js / .css     ← Contact form
│   ├── App.js / App.css          ← Root layout
│   ├── index.js
│   └── index.css                 ← Global vars & reset
└── package.json
```

---

## ✏️ Customising

- **Name / bio / stats** → `src/components/Sidebar.js`
- **Projects** → `src/sections/Work.js` (PROJECTS array)
- **Clients** → `src/sections/Clients.js` (CLIENTS array)
- **Services & pricing** → `src/sections/Services.js`
- **Colors** → `src/index.css` (CSS variables at top)
- **Fonts** → `public/index.html` + `src/index.css`

---

## 🎨 Color Palette

| Variable       | Value      | Usage             |
|----------------|------------|-------------------|
| `--bg`         | `#050505`  | Page background   |
| `--lime`       | `#c8ff00`  | Primary accent    |
| `--white`      | `#f2f2f0`  | Text              |
| `--mid`        | `#888888`  | Secondary text    |
| `--border`     | `#1c1c1c`  | Borders           |
