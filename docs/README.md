# Dandelion Parade

Dandelion Parade is a polished front-end web app for tracking plant discoveries, recipes, and related notes. The project now includes a richer UI, a JSON-backed content experience, login state handling, search/filter/sort controls, favorites, and an admin dashboard.

### deployments, codebase, & repo features 

  resource                     link
  ---------------------------- ----------------------
  PROD codebase                [`main`](https://silver-ruins.github.io/CIS-376-Project/)
  PROD server                  [GCP](https://elizabeth.barrycumbie.com/)
  DEV codebase                 [`dev`](https://github.com/silver-ruins/CIS-376-Project/tree/dev)
  DEV server                   [Render](https://dandelionparade.onrender.com)
  docs                         [`docs/`](https://github.com/silver-ruins/CIS-376-Project/edit/main/docs/README.md)
  published docs               [GitHub Pages](https://github.com/silver-ruins)
  CI/CD workflow               [`deploy.yml`](https://github.com/silver-ruins/CIS-376-Project/blob/main/.github/workflows/deploy-main-to-gcp.yml)
  successful PROD deployment   [GitHub Action](https://github.com/silver-ruins/CIS-376-Project/actions/runs/35007172108)
  resolved GOLF issue          [issue \#](URL)

##

| requirement | evidence |
|---|---|
| MongoDB connection | [server code](https://github.com/silver-ruins/CIS-376-Project/commit/0edf048b8c23dd9d1550944a2a425dc2c7c86f0a) |
| GET all | [code](https://github.com/silver-ruins/CIS-376-Project/commit/e2e8bd90fac37464af4bc6bc62ca22604f1a378f) |
| GET one | [code](https://github.com/silver-ruins/CIS-376-Project/commit/e2e8bd90fac37464af4bc6bc62ca22604f1a378f) |
| filtered GET | [code](https://github.com/silver-ruins/CIS-376-Project/commit/e6dc4de1f146f93a70f15bf466117400680d1ea8) |
| POST | [code](https://github.com/silver-ruins/CIS-376-Project/commit/e6dc4de1f146f93a70f15bf466117400680d1ea8) |
| PATCH | [code](https://github.com/silver-ruins/CIS-376-Project/commit/e6dc4de1f146f93a70f15bf466117400680d1ea8) |
| DELETE | [code](https://github.com/silver-ruins/CIS-376-Project/commit/e6dc4de1f146f93a70f15bf466117400680d1ea8) |
| frontend `fetch()` | [client code](https://github.com/silver-ruins/CIS-376-Project/commit/e6dc4de1f146f93a70f15bf466117400680d1ea8) |
| PROD app | [app](https://github.com/silver-ruins/CIS-376-Project/commit/e6dc4de1f146f93a70f15bf466117400680d1ea8) |
| HOTEL milestone | [milestone](https://github.com/silver-ruins/CIS-376-Project/commit/e6dc4de1f146f93a70f15bf466117400680d1ea8) |
| example issue | [issue](URL) |
| development branch | [branch](https://github.com/silver-ruins/CIS-376-Project/tree/dev) |
| feature → dev | [PR](URL) |
| dev → main | [PR](https://github.com/silver-ruins/CIS-376-Project/pull/7) |
| PROD deployment | [Action](https://elizabeth.barrycumbie.com/) |

## Project goals
- Build a maintainable, modern single-page-style site for plant knowledge.
- Practice planning, UI refinement, authentication flows, and JSON-driven content.
- Keep the app lightweight and easy to run locally in any browser.

### architecture

``` text
LOCAL
  │
  ▼
GitHub
  │
  ├── dev  ──► Render ─────────► DEV
  │
  └── main ──► GitHub Actions ─► GCP ──► PROD
```

### stack

`HTML/CSS/JS` \| `Node.js` \| `Express` \| `Git/GitHub` \| `Render` \|
`GCP` \| `Linux` \| `Nginx` \| `PM2` \| `Certbot` \| `GitHub Actions`

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
- Wireframe: see the `public/docs/` folder for a simple page map.
- Future ideas: add real authentication API integration, richer admin reporting, and a persistent backend.

## Resources
- Bootstrap
- MDN
- GitHub Pages
- Google Fonts
- Course videos
- Devin Ai
