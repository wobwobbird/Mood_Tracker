import React from 'react';
import { Text, Box } from 'ink';
import { getMoodEntriesFromDb } from './database.js';

const ResultsScreen = () => {
    const rawData = getMoodEntriesFromDb();
    
    if (!rawData || rawData.length === 0) {
        return <Text>No mood entries found.</Text>;
    }
    
    // Format the data for display
    const data = rawData.map(entry => ({
        mood: `${entry.mood_value} ${getMoodEmoji(entry.mood_value)}`,
        timestamp: entry.timestamp || '-',
        notes: entry.notes || '-'
    }));
    
    return (
        <Box flexDirection="column" padding={1} height={20}>
            <Text color="green" bold>Mood History</Text>
            <Text>{"─".repeat(140)}</Text>
            <Box flexDirection="row" marginBottom={1}>
                <Box width={15}>
                    <Text color="green" bold>Mood</Text>
                </Box>
                <Box width={25}>
                    <Text color="green" bold>Timestamp</Text>
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
                    <Box width={25}>
                        <Text>{entry.timestamp}</Text>
                    </Box>
                    <Box width={100}>
                        <Text>{entry.notes}</Text>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

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



