# Christopher Malhas, astronomy site

A React site with a home page, research list, code page, and an interactive
outflow data explorer. Built with Vite and deployed to GitHub Pages.

## Run it on your computer

    npm install
    npm run dev

Then open the address it prints (usually http://localhost:5173).

## Put it on GitHub Pages

1. Create a repository on GitHub and upload every file and folder in this project.
2. In the repository, go to Settings > Pages, and set Source to "GitHub Actions".
3. Push to the main branch. The Actions tab builds the site and publishes it.
4. The site appears at https://YOUR-USERNAME.github.io/YOUR-REPO/

## Where to edit

- src/content.js: your name, bio, publications, experience, projects, and code example.
- src/pages/Explorer.jsx: defaults for the data explorer (which line and quantity to show first).
- src/ThemeContext.jsx: set THEMES to ['regular'] or ['aero'] to ship only one design.
- public/data/JohnDataTransfer.csv: the data. Keep the same column names, or update src/lib/outflows.js.
- public/CV_Malhas_2026.pdf: the file the Download CV button serves.
