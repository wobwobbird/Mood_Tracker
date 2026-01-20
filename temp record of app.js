import React, {useState, useEffect} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';
import MoodSelection from './mood_selection';

const App = () => {
	const [dimensions, setDimensions] = useState({
		width: process.stdout.columns || 80,
		height: process.stdout.rows || 24
	});
	
	const [selectedIndex, setSelectedIndex] = useState(0);

	// const [logoIndex, setLogoIndex] = useState(0);
	const [logoColourIndex, setLogoColourIndex] = useState(0);

	const [currentScreen, setCurrentScreen] = useState("menu");

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
			setSelectedIndex((selectedIndex - 1 + SELECTABLE_ELEMENTS.length) % SELECTABLE_ELEMENTS.length);
		}
		if (key.return) {
			if (selectedIndex === 1) {
				// setLogoIndex((logoIndex + 1) % 3);
				// setLogoIndex(prev => (prev + 1) % 3);
				setLogoColourIndex((logoColourIndex + 1) % colorSchemes.length)

			}
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

	let colorSchemes = [
		["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"], //all white
		["red", "yellow", "yellow", "green", "blue", "magenta", "magenta", "red", "yellow", "green", "yellow"], // take from title 1 (orange→yellow, indigo→magenta, violet→magenta)
		["cyan", "magenta", "yellowBright", "greenBright", "blueBright", "redBright", "whiteBright", "cyanBright", "magentaBright", "yellow", "green"], // take from title 2
		["redBright", "red", "magenta", "magentaBright", "yellow", "yellowBright", "cyan", "cyanBright", "blue", "blueBright", "whiteBright"], // sunset theme - warm to cool transition
		["blue", "blueBright", "cyan", "cyanBright", "blue", "cyan", "blueBright", "cyanBright", "blue", "cyan", "blueBright"], // ocean theme - deep blues and cyans
		["magentaBright", "cyanBright", "yellowBright", "greenBright", "redBright", "magentaBright", "cyanBright", "yellowBright", "greenBright", "redBright", "whiteBright"] // neon/cyberpunk theme - vibrant bright colors
	];



	let line = [
	{
		line1: "red",
		line2: "yellow",
		line3: "blue"
	},
	{
		line1: "red",
		line2: "yellow",
		line3: "blue"
	},
	{
		line1: "red",
		line2: "yellow",
		line3: "blue"
	}
	]


	const SELECTABLE_ELEMENTS = ["none", "logo", "button"];

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

	return (
		<Box
			borderStyle={dimensions.height > 30 ? "round" : undefined}
			borderColor="cyan"
			width={dimensions.width}
			height={dimensions.height}
		> 
			<Box borderStyle={dimensions.height > 30 ? "round" : undefined} borderColor="cyan"> 	
				<Box borderStyle={dimensions.height > 30 ? "round" : undefined} borderColor="cyan"> 	
					<Box borderStyle={dimensions.height > 30 ? "round" : undefined} borderColor="cyan"> 	
						<Box flexDirection="column" width="100%" height="100%" alignItems='center' justifyContent='center'>
							<Text> </Text>
							{/* <Box borderStyle={selectedIndex === 1 ? "double" : undefined} padding={1} borderColor={undefined}> */}
							{/* <Box borderStyle="double" padding={1} borderColor={undefined}> */}
							<Box borderStyle="double" padding={1} borderColor={selectedIndex === 1 ? "white" : "black"}>
								{title()}
							</Box>
							<Text> </Text>
							{/* <Box borderStyle="double" padding={1} borderColor={selectedIndex === 2 ? "white" : "black"}>
								<Box borderStyle="round" borderColor="cyan">
									<Text  borderColor="Green" borderStyle="round">  Click/[enter] To Start  </Text>
								</Box>
							</Box>
							<Text> </Text>
							<Text> </Text> */}
							{MoodSelection()}
							<Text color="gray" alignSelf="center" >Press 'q' or ESC to quit</Text>	
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default App;