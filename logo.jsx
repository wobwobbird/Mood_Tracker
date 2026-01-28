import React, {useState, useEffect} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';
import { getLogoColourIndex } from './database.js';

const Logo = ({ onColourChangeRef }) => {
	const [logoColourIndex, setLogoColourIndex] = useState(getLogoColourIndex());



	let colorSchemes = [

		["blue", "blueBright", "cyan", "cyanBright", "blue", "cyan", "blueBright", "cyanBright", "blue", "cyan", "blueBright"], // ocean theme - deep blues and cyans
		["green", "greenBright", "cyanBright", "green", "greenBright", "cyanBright", "green", "greenBright", "cyanBright", "green", "greenBright"], // neon green theme - vibrant greens and cyans
		["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"], //all white
		["red", "yellow", "yellow", "green", "blue", "magenta", "magenta", "red", "yellow", "green", "yellow"], // take from title 1 (orange→yellow, indigo→magenta, violet→magenta)
		["cyan", "magenta", "yellowBright", "greenBright", "blueBright", "redBright", "whiteBright", "cyanBright", "magentaBright", "yellow", "green"], // take from title 2
		["redBright", "red", "magenta", "magentaBright", "yellow", "yellowBright", "cyan", "cyanBright", "blue", "blueBright", "whiteBright"], // sunset theme - warm to cool transition
		["magentaBright", "cyanBright", "yellowBright", "greenBright", "redBright", "magentaBright", "cyanBright", "yellowBright", "greenBright", "redBright", "whiteBright"] // neon/cyberpunk theme - vibrant bright colors
	];

    useEffect(() => {
        onColourChangeRef.current = () => {
            setLogoColourIndex(prev => (prev + 1) % colorSchemes.length);
        };
    }, [onColourChangeRef]);

    const title = () => {
        return (
            <Box flexDirection="column">
                <Text color={colorSchemes[logoColourIndex][0]}>{'$$\\      $$\\                           $$\\       $$\\                                                        '}</Text>
                <Text color={colorSchemes[logoColourIndex][1]}>{'$$$\\    $$$ |                          $$ |      $$ |                                                       '}</Text>
                <Text color={colorSchemes[logoColourIndex][2]}>{'$$$$\\  $$$$ | $$$$$$\\   $$$$$$\\   $$$$$$$ |      $$ |      $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\  '}</Text>
                <Text color={colorSchemes[logoColourIndex][3]}>{'$$\\$$\\$$ $$ |$$  __$$\\ $$  __$$\\ $$  __$$ |      $$ |     $$  __$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ '}</Text>
                <Text color={colorSchemes[logoColourIndex][4]}>{'$$ \\$$$  $$ |$$ /  $$ |$$ /  $$ |$$ /  $$ |      $$ |     $$ /  $$ |$$ /  $$ |$$ /  $$ |$$$$$$$$ |$$ |  \\__|'}</Text>
                <Text color={colorSchemes[logoColourIndex][5]}>{'$$ |\\$  /$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |      $$ |     $$ |  $$ |$$ |  $$ |$$ |  $$ |$$   ____|$$ |      '}</Text>
                <Text color={colorSchemes[logoColourIndex][6]}>{'$$ | \\_/ $$ |\\$$$$$$  |\\$$$$$$  |\\$$$$$$$ |      $$$$$$$$\\\\$$$$$$  |\\$$$$$$$ |\\$$$$$$$ |\\$$$$$$$\\ $$ |      '}</Text>
                <Text color={colorSchemes[logoColourIndex][7]}>{'\\__|     \\__| \\______/  \\______/  \\_______|      \\________|\\______/  \\____$$ | \\____$$ | \\_______|\\__|      '}</Text>
                <Text color={colorSchemes[logoColourIndex][8]}>{'                                                                    $$\\   $$ |$$\\   $$ |                    '}</Text>
                <Text color={colorSchemes[logoColourIndex][9]}>{'                                                                    \\$$$$$$  |\\$$$$$$  |                    '}</Text>
                <Text color={colorSchemes[logoColourIndex][10]}>{'                                                                     \\______/  \\______/                     '}</Text>
            </Box>
        )
    } 

	return title();
};

export default Logo;