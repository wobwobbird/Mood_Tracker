import Database from 'better-sqlite3';
// import { homedir } from 'os';
import { join } from 'path';
// import { mkdirSync } from 'fs';

const dbPath = join(process.cwd(), 'mood_tracker.db');

const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS mood_board (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mood_value INTEGER NOT NULL,
        timestamp TEXT NOT NULL DEFAULT (datetime('now')),
        notes TEXT
    )
`);

export function saveMoodEntry(moodValue, notes) {
    const stmt = db.prepare(`INSERT INTO mood_board (mood_value, notes) VALUES (?, ?)`);
    stmt.run(moodValue, notes || null);
}