import React, {useState, useEffect} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';

const MoodSelection = () => {
	const [dimensions, setDimensions] = useState({
		width: process.stdout.columns || 80,
		height: process.stdout.rows || 24
	});



	return (
        // <Box flexDirection="column" width="100%" height="100%" alignItems='center' > 
        <Box flexDirection="column" > 
            <Text> </Text>
            <Text width="50"> Record how you are feeling now</Text>
            <Text> </Text>
            <Text> </Text>
            <Box alignItems='row' gap="10">
                <Box borderStyle="round" borderColor="cyan">
                    <Text width="50"> 1 🤩 </Text>
                </Box>

                <Box borderStyle="round" borderColor="cyan">
                    <Text width="50"> 2 😀 </Text>
                </Box>
                <Box borderStyle="round" borderColor="cyan">
                    <Text width="50"> 3 😐 </Text>
                </Box>
                <Box borderStyle="round" borderColor="cyan">
                    <Text width="50"> 4 🙁 </Text>
                </Box>
                <Box borderStyle="round" borderColor="cyan">
                    <Text width="50"> 5 😡 </Text>
                </Box>
            </Box>
            <Text> </Text>
        </Box>
	);
};

export default MoodSelection;