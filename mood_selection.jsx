import React, {useState, useEffect} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';
import { saveMoodEntry } from './database.js';
import TextInput from "ink-text-input";

const MoodSelection = ({onLeftArrowRef, onRightArrowRef, onEnterRef}) => {

    const [selectButtonIndex, setSelectButtonIndex] = useState(0);

    const [moodSelected, setMoodSelected] = useState(false);

    const [writeNote, setWriteNote] = useState(true);

    const [moodInputVisable, setMoodInputVisable] = useState(false);

    const [textInput, setTextInput] = useState("");

    useEffect(() => {
        onLeftArrowRef.current = () => {
            if (moodSelected === false) {
                setSelectButtonIndex(prev => (prev + 1) % 6);
            }
            if (moodSelected === true) {
                setWriteNote(prev => !prev);
            }
        };
    }, [onLeftArrowRef, moodSelected]);
    
    useEffect(() => {
        onRightArrowRef.current = () => {
            if (moodSelected === false) {
                setSelectButtonIndex(prev => ((prev - 1 + 6) % 6));
            }
            if (moodSelected === true) {
                setWriteNote(prev => !prev);
            }
        };
    }, [onRightArrowRef, moodSelected]);
    
    useEffect(() => {
        onEnterRef.current = () => {
            if (moodSelected === false && selectButtonIndex !== 0) {
                setMoodSelected(true);
            }
            if (moodSelected === true) {
                if (writeNote === false) {
                    saveMoodEntry(selectButtonIndex, null);
                }
                if (writeNote === true) {
                    // saveMoodEntry(selectButtonIndex, null);
                    setMoodInputVisable(true);
                }
            }
        };
    }, [onEnterRef, selectButtonIndex, writeNote]);

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
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 1 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 1 ? "green" : undefined}
                        >
                            <Text width="50"> 1 🤩 </Text>
                        </Box>

                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 2 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 2 ? "green" : undefined}
                        >
                            <Text width="50"> 2 😀 </Text>
                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 3 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 3 ? "green" : undefined}
                        >
                            <Text width="50"> 3 😐 </Text>
                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 4 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 4 ? "green" : undefined}
                        >
                            <Text width="50"> 4 🙁 </Text>
                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 5 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 5 ? "green" : undefined}
                        >
                            <Text width="50"> 5 😡 </Text>
                        </Box>
                    </Box>
                </>
            )}
            {moodSelected === true && moodInputVisable === false && (
                <>
                    {/* <Text width="50"> Thank you for choosing</Text> */}
                    <Text > Would you like to leave a note?</Text>
                    <Box alignItems='row' gap="5" paddingx={2} paddingY={2}>
                        <Text 
                            borderStyle="round" 
                            backgroundColor={writeNote === true ? "green" : undefined}
                            >Yes</Text>
                        <Text 
                            borderStyle="round" 
                            backgroundColor={writeNote === false ? "green" : undefined}
                        >No</Text>
                    </Box>
                </>
            )}
            {moodSelected === true && moodInputVisable === true && (
                <TextInput
                    value={textInput}
                    onChange={setTextInput}
                />
            )}

            <Text> </Text>
        </Box>
	);
};

export default MoodSelection;