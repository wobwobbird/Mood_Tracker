import React, {useState, useEffect} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';
import { saveMoodEntry } from './database.js';
import TextInput from "ink-text-input";
import BigText from 'ink-big-text';

const Face1 = () => (
    <>
        <Text>      </Text>
        <Text>  ██  ██</Text>
        <Text>      </Text>
        <Text>  ██████</Text>
        <Text>  █    █</Text>
        <Text>   ████ </Text>
        <Text>      </Text>

    </>
);
const Face2 = () => (
    <>
        <Text>      </Text>
        <Text>  ██  ██</Text>
        <Text>      </Text>
        <Text>  █    █</Text>
        <Text>  █    █</Text>
        <Text>   ████ </Text>
        <Text>      </Text>

    </>
);

const Face3 = () => (
    <>
        <Text>      </Text>
        <Text>  ██  ██</Text>
        <Text>      </Text>
        <Text>      </Text>
        <Text>  ██████</Text>
        <Text>      </Text>
        <Text>      </Text>

    </>
);

const Face4 = () => (
    <>
        <Text>      </Text>
        <Text>  ██  ██</Text>
        <Text>      </Text>
        <Text>   ████ </Text>
        <Text>  █    █</Text>
        <Text>  █    █</Text>
        <Text>      </Text>

    </>
);

const Face5 = () => (
    <>
        <Text>      </Text>
        <Text>  █    █</Text>
        <Text>  ██  ██</Text>
        <Text>      </Text>
        <Text>   ████ </Text>
        <Text>  █    █</Text>
        <Text>      </Text>
        <Text>      </Text>
    </>
);






// Unicode block faces (10x10)
const ASCII_FACES = {
    1: `  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░██░░██░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░███░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░`,  // Very Happy (🤩) - big smile
    2: `  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░██░░██░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░███░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░`,  // Happy (😀) - smile
    3: `  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░██░░██░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░███░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░`,  // Neutral (😐) - straight mouth
    4: `  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░██░░██░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░███░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░`,  // Sad (🙁) - frown
    5: `  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░██░░██░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░███░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░`   // Angry (😡) - angry expression
};

// Unicode block faces (10x10)
const ASCII_FACES_2 = {
    1: `░░░░░░░░░░
  ░░░░░░░░░░
  ░░██░░██░░
  ░░██░░██░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░████░░░
  ░░░████░░░
  ░░░░░░░░░░
  ░░░░░░░░░░`,  // Very Happy (🤩) - big open smile
  
    2: `░░░░░░░░░░
  ░░░░░░░░░░
  ░░██░░██░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░████░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░`,  // Happy (😀) - smile
  
    3: `░░░░░░░░░░
  ░░░░░░░░░░
  ░░██░░██░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░████░░░
  ░░░░░░░░░░
  ░░░░░░░░░░`,  // Neutral (😐) - straight mouth
  
    4: `░░░░░░░░░░
  ░░░░░░░░░░
  ░░██░░██░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░████░░
  ░░░░░░░░░░
  ░░░░░░░░░░`,  // Sad (🙁) - frown
  
    5: `░░░░░░░░░░
  ░░██░░░░██░
  ░░░░██░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░░░░░░░
  ░░░░████░░
  ░░░░████░░
  ░░░░░░░░░░
  ░░░░░░░░░░`   // Angry (😡) - angled brows + clenched mouth
  };


const MoodSelection = ({onLeftArrowRef, onRightArrowRef, onEnterRef}) => {

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
                    exit();
                }
                if (writeNote === true) {
                    if (moodInputVisable === false) {
                        setMoodInputVisable(true);
                    } else {
                        if (textInput !== "") {
                            saveMoodEntry(selectButtonIndex, textInput);
                            setInputOver(true);
                            exit();
                        }
                    }
                }
            }
            if (inputOver === true) {
                // exit();
            }
        };
    }, [onEnterRef, selectButtonIndex, writeNote, moodSelected, inputOver, moodInputVisable, textInput]);

	return (
        // <Box flexDirection="column" width="100%" height="100%" alignItems='center' > 
        <Box flexDirection="column" alignItems='center' > 
            <Text> </Text>
            <Text> </Text>
            {/* {moodSelected === false && (
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
            )} */}
            {moodSelected === false && (
                <>
                    <BigText text="Record how you are feeling now" font="tiny"/>
                    <Text> </Text>
                    <Box alignItems='row' gap="10">
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 1 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 1 ? "green" : undefined}
                            minWidth={15}
                            flexDirection="column"
                            alignItems="center"
                        >
                            <BigText text="1"/>
                            {/* <Text>🤩</Text> */}
                            {/* <Text>🤩\uFE0F</Text>
                            <Text>🤩\e#3😑\n\e#4😶\n</Text>
                            <BigText text=":D"/> */}
                            <BigText text=":D" font="tiny"/>
                            {/* {ASCII_FACES[0]} */}
                            {Face1}
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░██░░██░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░░███░░░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 2 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 2 ? "green" : undefined}
                            minWidth={15}
                            flexDirection="column"
                            alignItems="center"
                            >
                            <BigText text="2" />
                            {/* <Text>😀</Text> */}
                            <BigText text=":D" font="tiny"/>
                            {/* {ASCII_FACES[1]} */}
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░██░░██░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░█░░░░█░░</Text>
                            <Text>  ░░█░░░░█░░</Text>
                            <Text>  ░░░████░░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░░░░░░░░░</Text>
                            <Text>  ░░░░░░░░░░</Text>

                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 3 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 3 ? "green" : undefined}
                            minWidth={15}
                            flexDirection="column"
                            alignItems="center"
                        >
                            <BigText text="3" />
                            {/* <Text>😐</Text> */}
                            <BigText text=":|" font="tiny"/>
                            {/* {ASCII_FACES[2]} */}
                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 4 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 4 ? "green" : undefined}
                            minWidth={15}
                            flexDirection="column"
                            alignItems="center"
                        >
                            <BigText text="4" />
                            {/* <Text>🙁</Text> */}
                            <BigText text=":(" font="tiny"/>
                            {/* {ASCII_FACES[3]} */}
                        </Box>
                        <Box 
                            borderStyle="round" 
                            borderColor={selectButtonIndex === 5 ? "green" : "cyan"}
                            backgroundColor={selectButtonIndex === 5 ? "green" : undefined}
                            minWidth={15}
                            flexDirection="column"
                            alignItems="center"
                        >
                            <BigText text="5" />
                            {/* <Text>😡</Text> */}
                            <BigText text=">:(" font="tiny"/>
                            {/* {ASCII_FACES[4]} */}
                        </Box>
                    </Box>
                </>
            )}
            {moodSelected === true && moodInputVisable === false && inputOver === false && (
                <>
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
                </>
            )}
            {moodSelected === true && moodInputVisable === true && inputOver === false && (
                <>
                    <TextInput
                        value={textInput}
                        onChange={setTextInput}
                    />
                    <BigText text={textInput} font="tiny"/>
                </>
            )}
            {inputOver === true && <Text>Thank you have a good day</Text>}
            <Text> </Text>
        </Box>
	);
};

export default MoodSelection;