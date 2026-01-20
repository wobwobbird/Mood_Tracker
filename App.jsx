import React, {useState, useEffect, useRef} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';
import MoodSelection from './mood_selection';
import Logo from './logo';

const App = () => {
	const [dimensions, setDimensions] = useState({
		width: process.stdout.columns || 80,
		height: process.stdout.rows || 24
	});
	
	const [selectedIndex, setSelectedIndex] = useState(0);

	const [currentScreen, setCurrentScreen] = useState("menu");

	const handleLogoColourChange = useRef(() => {});

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
				// setLogoColourIndex((logoColourIndex + 1) % colorSchemes.length)
				handleLogoColourChange.current();;
			}
			if (selectedIndex === 2) {
				setCurrentScreen("mood");
			}
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

	const SELECTABLE_ELEMENTS = ["none", "logo", "button"];

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
								{<Logo onColourChangeRef={handleLogoColourChange} />}
							</Box>
							<Text> </Text>
							{currentScreen === "menu" && (
								<Box borderStyle="double" padding={1} borderColor={selectedIndex === 2 ? "white" : "black"}>
									<Box borderStyle="round" borderColor="cyan">
										<Text  borderColor="Green" borderStyle="round">  Press [enter] To Start  </Text>
									</Box>
								</Box>
							)}
							{currentScreen === "mood" && (
								<Text>Hello I'm mood</Text>
							)}
							<Text> </Text>
							<Text> </Text>
							{/* {MoodSelection()} */}
							<Text color="gray" alignSelf="center" >Press 'q' or ESC to quit</Text>	
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default App;