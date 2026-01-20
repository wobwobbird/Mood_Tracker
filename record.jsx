import React, {useState, useEffect} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';

const Record = () => {
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
		if (key.downArrow || key.rightArrow) {
			setSelectedIndex((selectedIndex + 1) % SELECTABLE_ELEMENTS.length);
		}
		if (key.upArrow || key.leftArrow) {
			setSelectedIndex(SELECTABLE_ELEMENTS.length % (selectedIndex - 1));

		}
	});

	// const [stage1, stage2, stage3, stage4, stage5] = useState(stage1);

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

	const [selectedIndex, setSelectedIndex] = useState(0);

	const SELECTABLE_ELEMENTS = ["none", "logo", "button"];
	// 0 = none selected
	// 1 = Text color
	// 2 = enter button




    const title0 = () => {
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

    const title1 = () => {
        return (
            <Box flexDirection="column">
                <Text color="red">{'$$\\      $$\\                           $$\\       $$\\                                                        '}</Text>
                <Text color="orange">{'$$$\\    $$$ |                          $$ |      $$ |                                                       '}</Text>
                <Text color="yellow">{'$$$$\\  $$$$ | $$$$$$\\   $$$$$$\\   $$$$$$$ |      $$ |      $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\  '}</Text>
                <Text color="green">{'$$\\$$\\$$ $$ |$$  __$$\\ $$  __$$\\ $$  __$$ |      $$ |     $$  __$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ '}</Text>
                <Text color="blue">{'$$ \\$$$  $$ |$$ /  $$ |$$ /  $$ |$$ /  $$ |      $$ |     $$ /  $$ |$$ /  $$ |$$ /  $$ |$$$$$$$$ |$$ |  \\__|'}</Text>
                <Text color="indigo">{'$$ |\\$  /$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |      $$ |     $$ |  $$ |$$ |  $$ |$$ |  $$ |$$   ____|$$ |      '}</Text>
                <Text color="violate">{'$$ | \\_/ $$ |\\$$$$$$  |\\$$$$$$  |\\$$$$$$$ |      $$$$$$$$\\\\$$$$$$  |\\$$$$$$$ |\\$$$$$$$ |\\$$$$$$$\\ $$ |      '}</Text>
                <Text color="red">{'\\__|     \\__| \\______/  \\______/  \\_______|      \\________|\\______/  \\____$$ | \\____$$ | \\_______|\\__|      '}</Text>
                <Text color="orange">{'                                                                    $$\\   $$ |$$\\   $$ |                    '}</Text>
                <Text color="green">{'                                                                    \\$$$$$$  |\\$$$$$$  |                    '}</Text>
                <Text color="yellow">{'                                                                     \\______/  \\______/                     '}</Text>
            </Box>
        )
    } 

    const title2 = () => {
        return (
            <Box flexDirection="column">
                <Text color="cyan">{'$$\\      $$\\                           $$\\       $$\\                                                        '}</Text>
                <Text color="magenta">{'$$$\\    $$$ |                          $$ |      $$ |                                                       '}</Text>
                <Text color="yellowBright">{'$$$$\\  $$$$ | $$$$$$\\   $$$$$$\\   $$$$$$$ |      $$ |      $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\  '}</Text>
                <Text color="greenBright">{'$$\\$$\\$$ $$ |$$  __$$\\ $$  __$$\\ $$  __$$ |      $$ |     $$  __$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ '}</Text>
                <Text color="blueBright">{'$$ \\$$$  $$ |$$ /  $$ |$$ /  $$ |$$ /  $$ |      $$ |     $$ /  $$ |$$ /  $$ |$$ /  $$ |$$$$$$$$ |$$ |  \\__|'}</Text>
                <Text color="redBright">{'$$ |\\$  /$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |      $$ |     $$ |  $$ |$$ |  $$ |$$ |  $$ |$$   ____|$$ |      '}</Text>
                <Text color="whiteBright">{'$$ | \\_/ $$ |\\$$$$$$  |\\$$$$$$  |\\$$$$$$$ |      $$$$$$$$\\\\$$$$$$  |\\$$$$$$$ |\\$$$$$$$ |\\$$$$$$$\\ $$ |      '}</Text>
                <Text color="cyanBright">{'\\__|     \\__| \\______/  \\______/  \\_______|      \\________|\\______/  \\____$$ | \\____$$ | \\_______|\\__|      '}</Text>
                <Text color="magentaBright">{'                                                                    $$\\   $$ |$$\\   $$ |                    '}</Text>
                <Text color="yellow">{'                                                                    \\$$$$$$  |\\$$$$$$  |                    '}</Text>
                <Text color="green">{'                                                                     \\______/  \\______/                     '}</Text>
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
						<Box flexDirection="column" width="100%" height="100%" alignItems='center' justifyContent='center'>
							<Text> </Text>
							<Box borderStyle={selectedIndex === 1 ? "double" : undefined} padding={1} borderColor={undefined}>
                            	{title2()}
							<Text> </Text>
							</Box>
							<Text> </Text>
							<Text> </Text>
							<Box borderStyle={selectedIndex === 2 ? "double" : undefined} padding={1} borderColor={undefined}>
								<Box borderStyle="round" borderColor="cyan">
									<Text  borderColor="Green" borderStyle="round">  Click/[enter] To Start  </Text>
								</Box>
							</Box>
							<Text> </Text>
							<Text> </Text>
							{/* <Text color="yellow">daba dee daba daaa</Text> */}
							<Text color="gray">Press 'q' or ESC to quit</Text>
							<Text> </Text>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Record;