import React, {useState, useEffect, useRef} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';
import MoodSelection from './mood_selection';
import Logo from './logo';
import { saveLogoColourIndex, getLogoColourIndexFromDb } from './database';
import { borderColourSchemes } from './colourScheme';
import BigText from 'ink-big-text';

const App = () => {
	const [dimensions, setDimensions] = useState({
		width: process.stdout.columns || 80,
		height: process.stdout.rows || 24
	});
	
	const [menuSelectedIndex, setMenuSelectedIndex] = useState(1);

	const [currentScreen, setCurrentScreen] = useState("menu");
	
	const [logoColourIndex, setLogoColourIndex] = useState(getLogoColourIndexFromDb());

	const handleLogoColourChange = useRef(() => {});
	const handleMoodLeftArrow = useRef(() => {});
	const handleMoodRightArrow = useRef(() => {});
	const handleMoodEnter = useRef(() => {});

	const SELECTABLE_ELEMENTS = ["logo", "none", "button"];

	const {exit} = useApp();
	
	useInput((input, key) => {
		if (input === 'q' || key.escape || (key.ctrl && input === 'c')) {
			process.stdout.write('\x1b[?25h');
			exit();
		}
		if (key.downArrow || key.rightArrow) {
			if (currentScreen === "menu") setMenuSelectedIndex((menuSelectedIndex + 1) % SELECTABLE_ELEMENTS.length);
			if (currentScreen === "mood") handleMoodLeftArrow.current();
		}
		if (key.upArrow || key.leftArrow) {
			if (currentScreen === "menu") setMenuSelectedIndex((menuSelectedIndex - 1 + SELECTABLE_ELEMENTS.length) % SELECTABLE_ELEMENTS.length);
			if (currentScreen === "mood") handleMoodRightArrow.current();
		}
		if (key.return) {
			if (currentScreen === "menu") {
				if (menuSelectedIndex === 0) handleLogoColourChange.current();
				if (menuSelectedIndex === 2) {
					saveLogoColourIndex(logoColourIndex);
					setCurrentScreen("mood");
				}
			}
			if (currentScreen === "mood") handleMoodEnter.current();
		}
	});

	useEffect(() => {
		const handleResize = () => {
			setDimensions({
				width: process.stdout.columns || 80,
				height: process.stdout.rows || 24
			});
		};

		process.stdout.on('resize', handleResize);
	
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

	return (
		<Box
			borderStyle={dimensions.height > 30 ? "round" : undefined}
			borderColor={borderColourSchemes[logoColourIndex][0]}
			width={dimensions.width}
			height={dimensions.height}
		> 
			<Box borderStyle={dimensions.height > 30 ? "round" : undefined} borderColor={borderColourSchemes[logoColourIndex][1]}> 	
				<Box borderStyle={dimensions.height > 30 ? "round" : undefined} borderColor={borderColourSchemes[logoColourIndex][2]}> 	
					<Box borderStyle={dimensions.height > 30 ? "round" : undefined} borderColor={borderColourSchemes[logoColourIndex][3]}> 	
						<Box flexDirection="column" width="100%" height="100%" alignItems='center' justifyContent='center'>
							<Text> </Text>
							<Box borderStyle="double" padding={1} borderColor={menuSelectedIndex === 0 ? "white" : "black"}>
								{<Logo onColourChangeRef={handleLogoColourChange} logoColourIndex={logoColourIndex} setLogoColourIndex={setLogoColourIndex} />}
							</Box>
							<Text> </Text>
							{currentScreen === "menu" && (
								<Box borderStyle="round" borderColor={menuSelectedIndex === 2 ? "green" : "cyan"} backgroundColor={menuSelectedIndex === 2 ? "green" : undefined}>
									{/* <Text color="white">  Press [enter] To Start  </Text> */}
									<BigText text="Press [enter] To Start" font="tiny" />
								</Box>
							)}
							{currentScreen === "mood" && (
								<MoodSelection
									onLeftArrowRef={handleMoodLeftArrow}
									onRightArrowRef={handleMoodRightArrow}
									onEnterRef={handleMoodEnter}
								/>
							)}
							<Text> </Text>
							<Text> </Text>
							<Text color="gray" alignSelf="center" >Press 'q' or ESC to quit</Text>	
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default App;