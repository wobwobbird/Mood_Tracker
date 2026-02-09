import { getMoodEntriesFromDb } from './database.js';


function databaseData() {
    const data = getMoodEntriesFromDb();
    console.log(data);
    return data;
};

databaseData();