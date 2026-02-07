import React, {useState, useEffect} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';
import { saveMoodEntry } from '../database.js';
import TextInput from "ink-text-input";
import BigText from 'ink-big-text';
import { SCREENS } from '../constants.js';


const MoodSelection = ({onLeftArrowRef, onRightArrowRef, onEnterRef, setCurrentScreen}) => {

    const [selectButtonIndex, setSelectButtonIndex] = useState(0);

    const [moodSelected, setMoodSelected] = useState(false);

    const [writeNote, setWriteNote] = useState(true);

    const [moodInputVisable, setMoodInputVisable] = useState(false);

    const [inputOver, setInputOver] = useState(false);

    const [textInput, setTextInput] = useState("");

    const {exit} = useApp();

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
            if (moodSelected === true && inputOver === false) {
                if (writeNote === false) {
                    saveMoodEntry(selectButtonIndex, null);
                    setInputOver(true);
                    // exit();
                    setCurrentScreen(SCREENS.ASK_RESULTS);
                }
                if (writeNote === true) {
                    if (moodInputVisable === false) {
                        setMoodInputVisable(true);
                    } else {
                        if (textInput !== "") {
                            saveMoodEntry(selectButtonIndex, textInput);
                            setInputOver(true);
                            // exit();
                            setCurrentScreen(SCREENS.ASK_RESULTS);
                        }
                    }
                }
            }
            if (inputOver === true) {
                // exit();
            }
        };
    }, [onEnterRef, selectButtonIndex, writeNote, moodSelected, inputOver, moodInputVisable, textInput]);

    const Face1 = () => (
        <>
            <Text> </Text>
            <Text>██  ██</Text>
            <Text>    </Text>
            <Text>██████</Text>
            <Text>█    █</Text>
            <Text> ████ </Text>
        </>
    );
    const Face2 = () => (
        <>
            <Text> </Text>
            <Text>██  ██</Text>
            <Text>    </Text>
            <Text>█    █</Text>
            <Text>█    █</Text>
            <Text> ████ </Text>
        </>
    );
    
    const Face3 = () => (
        <>
            <Text> </Text>
            <Text>██  ██</Text>
            <Text>    </Text>
            <Text>    </Text>
            <Text>██████</Text>
            <Text>    </Text>
        </>
    );
    
    const Face4 = () => (
        <>
            <Text> </Text>
            <Text>██  ██</Text>
            <Text>    </Text>
            <Text> ████ </Text>
            <Text>█    █</Text>
            <Text>█    █</Text>
    
        </>
    );
    
    const Face5 = () => (
        <>
            <Text> </Text>
            <Text>█    █</Text>
            <Text>██  ██</Text>
            <Text>    </Text>
            <Text> ████ </Text>
            <Text>█    █</Text>
        </>
    );

	return (
        // <Box flexDirection="column" width="100%" height="100%" alignItems='center' > 
        <Box 
            flexDirection="column"
            alignItems='center'
            justifyContent='center'
            flexGrow={1}
            
        > 
            {moodSelected === false && (
                <Box 
                    flexDirection="column"
                    alignItems="center"
                    flexGrow={1}
                    justifyContent="space-evenly"
                >
                    <BigText text="Record how you are feeling now" font="tiny"/>
                    <Box alignItems='row' gap="10" >
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 1 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 1 ? "green" : undefined}
                            minWidth={15}
                            height={19}
                            flexDirection="column"
                            alignItems="center"
                            paddingTop={1}
                        >
                            <Face1 />
                            <BigText text="1" />
                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 2 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 2 ? "green" : undefined}
                            minWidth={15}
                            height={19}
                            flexDirection="column"
                            alignItems="center"
                            paddingTop={1}
                            >
                            <Face2 />
                            <BigText text="2" />

                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 3 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 3 ? "green" : undefined}
                            minWidth={15}
                            height={19}
                            flexDirection="column"
                            alignItems="center"
                            paddingTop={1}
                        >
                            <Face3 />
                            <BigText text="3" />
                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 4 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 4 ? "green" : undefined}
                            minWidth={15}
                            height={19}
                            flexDirection="column"
                            alignItems="center"
                            paddingTop={1}
                        >
                            <Face4 />
                            <BigText text="4" />
                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 5 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 5 ? "green" : undefined}
                            minWidth={15}
                            height={19}
                            flexDirection="column"
                            alignItems="center"
                            paddingTop={1}
                        >
                            <Face5 />
                            <BigText text="5" />
                        </Box>
                    </Box>
                </Box>
            )}
            {moodSelected === true && moodInputVisable === false && inputOver === false && (
                <Box 
                    flexDirection="column"
                    alignItems="center"
                    flexGrow={1}
                    justifyContent='center'
                >
                    <BigText text="Leave a note?" font="tiny"/>
                    <Box alignItems='row' gap="5" paddingx={2} paddingY={2}>
                        <Box
                            borderStyle="round" 
                            backgroundColor={writeNote === true ? "green" : undefined}                        
                        >
                            <BigText text="Yes"/>
                        </Box>
                        <Box
                            borderStyle="round" 
                            backgroundColor={writeNote === false ? "green" : undefined}     
                        >
                            <BigText text="No"/>
                        </Box>
                    </Box>
                </Box>
            )}
            {moodSelected === true && moodInputVisable === true && inputOver === false && (
                <Box 
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                    flexGrow={1}
                    justifyContent='center'
                    backgroundColor="pink"
                >
                    <TextInput
                        value={textInput}
                        onChange={setTextInput}
                    />
                    <BigText text={textInput} font="tiny"/>
                </Box>
            )}
            {inputOver === true && <Text>Thank you have a good day</Text>}
        </Box>
	);
};

export default MoodSelection;

