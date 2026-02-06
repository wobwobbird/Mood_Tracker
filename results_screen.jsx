import React from 'react';
import { Text, Box } from 'ink';
import { getMoodEntriesFromDb } from './database.js';

const ResultsScreen = () => {
    const rawData = getMoodEntriesFromDb();
    
    if (!rawData || rawData.length === 0) {
        return <Text>No mood entries found.</Text>;
    }
    
    // Format the data for display
    const data = rawData.map(entry => {
        const { date, time } = formatTimestamp(entry.timestamp);
        return {
            mood: `${entry.mood_value} ${getMoodEmoji(entry.mood_value)}`,
            date,
            time,
            notes: entry.notes || '-'
        };
    });
    
    return (
        <Box flexDirection="column" padding={1} height={20}>
            <Text color="green" bold>Mood History</Text>
            <Text>{"─".repeat(140)}</Text>
            <Box flexDirection="row" marginBottom={1}>
                <Box width={15}>
                    <Text color="green" bold>Mood</Text>
                </Box>
                <Box width={10}>
                    <Text color="green" bold>Date</Text>
                </Box>
                <Box width={8}>
                    <Text color="green" bold>Time</Text>
                </Box>
                <Box width={100}>
                    <Text color="green" bold>Notes</Text>
                </Box>
            </Box>
            <Text>{"─".repeat(140)}</Text>
            {data.map((entry, index) => (
                <Box key={index} flexDirection="row" marginBottom={0}>
                    <Box width={15}>
                        <Text>{entry.mood}</Text>
                    </Box>
                    <Box width={10}>
                        <Text>{entry.date}</Text>
                    </Box>
                    <Box width={8}>
                        <Text>{entry.time}</Text>
                    </Box>
                    <Box width={100}>
                        <Text>{entry.notes}</Text>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

function formatTimestamp(timestamp) {
    if (!timestamp) return { date: '-', time: '-' };
    try {
        const d = new Date(timestamp);
        if (isNaN(d.getTime())) return { date: '-', time: '-' };
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = String(d.getFullYear()).slice(-2);
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return {
            date: `${day}/${month}/${year}`,
            time: `${hours}:${minutes}`
        };
    } catch {
        return { date: '-', time: '-' };
    }
}

function getMoodEmoji(value) {
    const emojis = {
        1: '🤩',
        2: '😀',
        3: '😐',
        4: '🙁',
        5: '😡'
    };
    return emojis[value] || '';
}

export default ResultsScreen;



