# Mood Tracker

A **terminal-based mood tracker** built with Node.js. It’s a full-screen TUI (Terminal User Interface) that lets you log how you’re feeling and review your history, all from the command line.

I built this as a **learning project** to practice building a CLI in Node and to explore making something that felt visual and “app-like” in the terminal, with a TUI that takes over the full screen. A mood tracker was a small, well-scoped idea that still gave room to try layout, keyboard navigation, and persistence.

[![My Skills](https://skillicons.dev/icons?i=javascript,nodejs,sqlite,react)](https://skillicons.dev)  

---

## Check it out

![Dashboard demo](github/mood_tracker_demo.gif)

---

## What it does

- **Record mood** — Choose a mood (1–5 scale), optionally add a note, and save. Entries are stored in a local SQLite database.
- **View results** — Browse your mood history with “All Records” and “By Day” views, with pagination and keyboard navigation.
- **Customise** — Change the app’s colour scheme (logo and borders) from the main menu.
- **Full-screen TUI** — The app uses the whole terminal: borders, responsive layout, and a minimum terminal size so the UI stays readable.

Everything is driven by the keyboard (arrows, Enter, Ctrl+Q to quit). No mouse required.

---

## Tech stack

- **Node.js** — Runtime
- **Ink** — React-based rendering for the terminal (components, state, input)
- **better-sqlite3** — Local SQLite database for mood entries and settings
- **ink-big-text** — Large ASCII-style text for the logo
- **ink-text-input** — Text input for optional notes when recording a mood

The UI is built as React components (e.g. `RecordFlowScreen`, `ResultsFlowScreen`, `MoodSelection`, `Border`) that Ink renders in the terminal, so the structure will feel familiar if you’ve used React on the web.

---

## Getting started

**Requirements:** Node.js (v18+ recommended)

1. Clone the repo and install dependencies:

   ```bash
   git clone <repo-url>
   cd Mood_Tracker
   npm install
   ```

2. Run the app:

   | Command | Description |
   |--------|-------------|
   | `npm start mood record` | Open the main TUI to **record** your current mood and use the menu (Record, Results, colour change). |
   | `npm start mood results` | Open the **results** TUI directly to view your mood history. |
   | `npm start mood` | Show short help for the above commands. |

3. **Quit:** `Ctrl+Q`, `Ctrl+C`, or `Escape`.

For the best experience, use a terminal that supports at least the minimum size the app reports (it will show a message if the window is too small).

---

## Project structure (overview)

- `index.js` — Entry point; parses `mood` / `mood record` / `mood results` and mounts the right Ink app.
- `App.jsx` — Root component: layout, screen state (menu / record / results), terminal resize, and global shortcuts.
- `setupTerminal.js` — Raw mode, cursor visibility, clear screen, and cleanup on exit/errors.
- `database.js` — SQLite setup, mood table, settings table; helpers to save/load mood entries and logo colour.
- `screens/` — `RecordFlowScreen.jsx` (menu + record flow), `ResultsFlowScreen.jsx` (history + views).
- `components/` — `Border.jsx`, `logo.jsx`, `mood_selection.jsx`, `results_screen.jsx`, etc.
- `constants.js` — Screen names and shared constants.

Data is stored in `mood_tracker.db` in the project directory (created automatically).

---

## License

ISC
