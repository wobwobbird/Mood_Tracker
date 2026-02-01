import Table from "ink-table";
import { getMoodEntriesFromDb } from 'database.js';

export default ResultsScreen = () => {
    <Table data={getMoodEntriesFromDb()} />
}