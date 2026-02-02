import Table from "ink-table";
import { getMoodEntriesFromDb } from './database.js';

// console.log(getMoodEntriesFromDb());

export default ResultsScreen = () => {
    const data = getMoodEntriesFromDb();
    return <Table data={data} columns={['mood_value', 'timestamp', 'notes']} />
};