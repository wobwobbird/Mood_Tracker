import React, {useState, useEffect} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';
import { saveMoodEntry } from './database.js';

const MoodSelection = ({onLeftArrowRef, onRightArrowRef, onEnterRef}) => {

    const [selectButtonIndex, setSelectButtonIndex] = useState(0);

    const [moodSelected, setMoodSelected] = useState(false);

    useEffect(() => {
        onLeftArrowRef.current = () => {
            setSelectButtonIndex(prev => (prev + 1) % 6);
        };
    }, [onLeftArrowRef]);

    useEffect(() => {
        onRightArrowRef.current = () => {
            setSelectButtonIndex(prev => ((prev - 1 + 6) % 6));
        };
    }, [onRightArrowRef]);

    useEffect(() => {
        onEnterRef.current = () => {
            if (selectButtonIndex !== 0) {
                setMoodSelected(true);
                saveMoodEntry(selectButtonIndex, null);
                
            }
        };
    }, [onEnterRef, selectButtonIndex]);

    // if (currentScreen === "menu") setMenuSelectedIndex((menuSelectedIndex - 1 + SELECTABLE_ELEMENTS.length) % SELECTABLE_ELEMENTS.length);



	return (
        // <Box flexDirection="column" width="100%" height="100%" alignItems='center' > 
        <Box flexDirection="column" alignItems='center' > 
            <Text> </Text>
            <Text> </Text>
            {moodSelected === false && (
                <>
                    <Text width="50"> Record how you are feeling now</Text>
                    <Text> </Text>
                    <Box alignItems='row' gap="10">
                        <Box borderStyle="round" borderColor={selectButtonIndex === 1 ? "green" : "cyan"} backgroundColor={selectButtonIndex === 1 ? "green" : undefined}>
                            <Text width="50"> 1 🤩 </Text>
                        </Box>

                        <Box borderStyle="round" borderColor={selectButtonIndex === 2 ? "green" : "cyan"} backgroundColor={selectButtonIndex === 2 ? "green" : undefined}>
                            <Text width="50"> 2 😀 </Text>
                        </Box>
                        <Box borderStyle="round" borderColor={selectButtonIndex === 3 ? "green" : "cyan"} backgroundColor={selectButtonIndex === 3 ? "green" : undefined}>
                            <Text width="50"> 3 😐 </Text>
                        </Box>
                        <Box borderStyle="round" borderColor={selectButtonIndex === 4 ? "green" : "cyan"} backgroundColor={selectButtonIndex === 4 ? "green" : undefined}>
                            <Text width="50"> 4 🙁 </Text>
                        </Box>
                        <Box borderStyle="round" borderColor={selectButtonIndex === 5 ? "green" : "cyan"} backgroundColor={selectButtonIndex === 5 ? "green" : undefined}>
                            <Text width="50"> 5 😡 </Text>
                        </Box>
                    </Box>
                </>
            )}
            {moodSelected === true && <Text width="50"> Thank you for choosing</Text>}
            <Text> </Text>
        </Box>
	);
};

export default MoodSelection;