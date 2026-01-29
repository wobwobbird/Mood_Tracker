import React, {useEffect} from 'react';
import {Text, Box} from 'ink';
import { logoColourSchemes } from './colourScheme';

const Logo = ({ onColourChangeRef, logoColourIndex, setLogoColourIndex }) => {

    useEffect(() => {
        onColourChangeRef.current = () => {
            setLogoColourIndex(prev => (prev + 1) % logoColourSchemes.length);
        };
    }, [onColourChangeRef, setLogoColourIndex, logoColourSchemes.length]);

    const title = () => {
        return (
            <Box flexDirection="column">
                <Text color={logoColourSchemes[logoColourIndex][0]}>{'$$\\      $$\\                           $$\\       $$\\                                                        '}</Text>
                <Text color={logoColourSchemes[logoColourIndex][1]}>{'$$$\\    $$$ |                          $$ |      $$ |                                                       '}</Text>
                <Text color={logoColourSchemes[logoColourIndex][2]}>{'$$$$\\  $$$$ | $$$$$$\\   $$$$$$\\   $$$$$$$ |      $$ |      $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\  '}</Text>
                <Text color={logoColourSchemes[logoColourIndex][3]}>{'$$\\$$\\$$ $$ |$$  __$$\\ $$  __$$\\ $$  __$$ |      $$ |     $$  __$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ '}</Text>
                <Text color={logoColourSchemes[logoColourIndex][4]}>{'$$ \\$$$  $$ |$$ /  $$ |$$ /  $$ |$$ /  $$ |      $$ |     $$ /  $$ |$$ /  $$ |$$ /  $$ |$$$$$$$$ |$$ |  \\__|'}</Text>
                <Text color={logoColourSchemes[logoColourIndex][5]}>{'$$ |\\$  /$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |      $$ |     $$ |  $$ |$$ |  $$ |$$ |  $$ |$$   ____|$$ |      '}</Text>
                <Text color={logoColourSchemes[logoColourIndex][6]}>{'$$ | \\_/ $$ |\\$$$$$$  |\\$$$$$$  |\\$$$$$$$ |      $$$$$$$$\\\\$$$$$$  |\\$$$$$$$ |\\$$$$$$$ |\\$$$$$$$\\ $$ |      '}</Text>
                <Text color={logoColourSchemes[logoColourIndex][7]}>{'\\__|     \\__| \\______/  \\______/  \\_______|      \\________|\\______/  \\____$$ | \\____$$ | \\_______|\\__|      '}</Text>
                <Text color={logoColourSchemes[logoColourIndex][8]}>{'                                                                    $$\\   $$ |$$\\   $$ |                    '}</Text>
                <Text color={logoColourSchemes[logoColourIndex][9]}>{'                                                                    \\$$$$$$  |\\$$$$$$  |                    '}</Text>
                <Text color={logoColourSchemes[logoColourIndex][10]}>{'                                                                     \\______/  \\______/                     '}</Text>
            </Box>
        )
    } 

	return title();
};

export default Logo;
