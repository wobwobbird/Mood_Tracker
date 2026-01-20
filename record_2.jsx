import React, {useState, useEffect} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';

const skdcmkmdc = () => {
	const [dimensions, setDimensions] = useState({
		width: process.stdout.columns || 80,
		height: process.stdout.rows || 24
	});
	
	const {exit} = useApp();

	// Handle keyboard input (like blessed's screen.key)
	useInput((input, key) => {
		if (input === 'q' || key.escape || (key.ctrl && input === 'c')) {
			process.stdout.write('\x1b[?25h'); // Show cursor
			exit();
		}
	});

	useEffect(() => {
		// Handle terminal resize
		const handleResize = () => {
			setDimensions({
				width: process.stdout.columns || 80,
				height: process.stdout.rows || 24
			});
		};

		process.stdout.on('resize', handleResize);
		
		// Initial dimensions check
		if (process.stdout.columns && process.stdout.rows) {
			setDimensions({
				width: process.stdout.columns,
				height: process.stdout.rows
			});
		}

		return () => {
			process.stdout.removeListener('resize', handleResize);
		};
	}, []);

    const title = () => {
        return (
            <Box flexDirection="column">
                <Text>{'$$\\      $$\\                           $$\\       $$\\                                                        '}</Text>
                <Text>{'$$$\\    $$$ |                          $$ |      $$ |                                                       '}</Text>
                <Text>{'$$$$\\  $$$$ | $$$$$$\\   $$$$$$\\   $$$$$$$ |      $$ |      $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\  '}</Text>
                <Text>{'$$\\$$\\$$ $$ |$$  __$$\\ $$  __$$\\ $$  __$$ |      $$ |     $$  __$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ '}</Text>
                <Text>{'$$ \\$$$  $$ |$$ /  $$ |$$ /  $$ |$$ /  $$ |      $$ |     $$ /  $$ |$$ /  $$ |$$ /  $$ |$$$$$$$$ |$$ |  \\__|'}</Text>
                <Text>{'$$ |\\$  /$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |      $$ |     $$ |  $$ |$$ |  $$ |$$ |  $$ |$$   ____|$$ |      '}</Text>
                <Text>{'$$ | \\_/ $$ |\\$$$$$$  |\\$$$$$$  |\\$$$$$$$ |      $$$$$$$$\\\\$$$$$$  |\\$$$$$$$ |\\$$$$$$$ |\\$$$$$$$\\ $$ |      '}</Text>
                <Text>{'\\__|     \\__| \\______/  \\______/  \\_______|      \\________|\\______/  \\____$$ | \\____$$ | \\_______|\\__|      '}</Text>
                <Text>{'                                                                    $$\\   $$ |$$\\   $$ |                    '}</Text>
                <Text>{'                                                                    \\$$$$$$  |\\$$$$$$  |                    '}</Text>
                <Text>{'                                                                     \\______/  \\______/                     '}</Text>
            </Box>
        )
    } 

	return (
		<Box
			borderStyle="round" 
			borderColor="cyan"
			width={dimensions.width}
			height={dimensions.height}
		> 
			<Box borderStyle="round" borderColor="cyan"> 	
				<Box borderStyle="round" borderColor="cyan"> 	
					<Box borderStyle="round" borderColor="cyan"> 	
						<Box flexDirection="column" width="100%" height="100%" alignItems='center' > 
							<Text> </Text>
                            {title()}
							<Text> </Text>
							<Text> </Text>
                            <Text width="50"> Record how you are feeling now</Text>
							<Text> </Text>
							<Text> </Text>
                            <Box alignItems='row' gap="10">
                                {/* <Text width="50"> 1 </Text>
                                <Text width="50"> 2 </Text>
                                <Text width="50"> 3 </Text>
                                <Text width="50"> 4 </Text>
                                <Text width="50"> 5 </Text> */}
                                <Box borderStyle="round" borderColor="cyan">
                                    <Text width="50"> 1 🤩 </Text>
                                </Box>

                                <Box borderStyle="round" borderColor="cyan">
                                    <Text padding={5} > 2 😀 </Text>
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
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default skdcmkmdc;