# Dandelion Parade

Dandelion Parade is a polished front-end web app for tracking plant discoveries, recipes, and related notes. The project now includes a richer UI, a JSON-backed content experience, login state handling, search/filter/sort controls, favorites, and an admin dashboard.

## Deployments
- dev server: https://silver-ruins.github.io/CIS-376-Project/
- server: [http://136.64.42.219](https://elizabeth.barrycumbie.com/)

## Project goals
- Build a maintainable, modern single-page-style site for plant knowledge.
- Practice planning, UI refinement, authentication flows, and JSON-driven content.
- Keep the app lightweight and easy to run locally in any browser.

## Structure
```txt
dev-charlie project/
├── .github/
│   ├── deploy-main-to-gcp.yml
├── public/
│   ├── index.html
│   ├── AGENTS.md
│   ├── pages/
│   │   ├── about.html
│   │   ├── projects.html
│   │   ├── admin.html
│   |   ├── auth.html
│   |   └── contact.html
│   ├── assets/
│   |   ├── css/
│   │   |   └── style.css
│   │   ├── js/
│   │   │   └── auth.js
│   │   │   └── main.js
│   │   │   └── admin.js
│   │   └── img/
│   ├── data/
│       └── projects.json
├── server/
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
├── README.md
```

## Agile planning notes
- Wireframe: see the docs folder for a simple page map.
- Future ideas: add real authentication API integration, richer admin reporting, and a persistent backend.

## Resources
- Bootstrap
- MDN
- GitHub Pages
- Google Fonts
- Course videos
- Devin Ai
