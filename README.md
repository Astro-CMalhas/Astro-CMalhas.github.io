# Christopher Malhas, astronomy site

A React site with a home page, research list, code page, and an interactive
outflow data explorer. Built with Vite and deployed to GitHub Pages.


- src/content.js: your name, bio, publications, experience, projects, and code example.
- src/pages/Explorer.jsx: defaults for the data explorer (which line and quantity to show first).
- src/ThemeContext.jsx: set THEMES to ['regular'] or ['aero'] to ship only one design.
- public/data/JohnDataTransfer.csv: the data. Keep the same column names, or update src/lib/outflows.js.
- public/CV_Malhas_2026.pdf: the file the Download CV button serves.
