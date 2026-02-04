import React, {useState, useEffect, useRef} from 'react';
import {render, Text, Box, useInput, useApp} from 'ink';
import MoodSelection from './mood_selection';
import Logo from './logo';
import { saveLogoColourIndex, getLogoColourIndexFromDb } from './database';
import { borderColourSchemes } from './colourScheme';
import BigText from 'ink-big-text';
import ResultsScreen from './results_screen';

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

	const [seeResultsAnswer, setSeeResultsAnswer] = useState(true);

	const MIN_WIDTH = 150;
	const MIN_HEIGHT = 50;
	let isTerminalTooSmall;
	let showBorder;
	const MIN_WIDTH_BORDER = MIN_WIDTH + 10;
	const MIN_HEIGHT_BORDER = MIN_HEIGHT + 10;

	useEffect(() => {
		if (dimensions.height >= MIN_HEIGHT && dimensions.width >= MIN_WIDTH) {
			isTerminalTooSmall = false;
		} else {
			isTerminalTooSmall = true;
		}
	}, [dimensions.height, dimensions.width]);

	useEffect(() => {
		if (dimensions.height >= MIN_HEIGHT_BORDER && dimensions.width >= MIN_WIDTH_BORDER) {
			showBorder = false;
		} else {
			showBorder = true;
		}
	}, [dimensions.height, dimensions.width]);
	
	useInput((input, key) => {
		if (input === 'q' || key.escape || (key.ctrl && input === 'c')) {
			process.stdout.write('\x1b[?25h');
			exit();
		}
		if (key.downArrow || key.rightArrow) {
			if (currentScreen === "menu") setMenuSelectedIndex((menuSelectedIndex + 1) % SELECTABLE_ELEMENTS.length);
			if (currentScreen === "mood") handleMoodLeftArrow.current();
			if (currentScreen === "askToSeeResults") setSeeResultsAnswer(!seeResultsAnswer);
		}
		if (key.upArrow || key.leftArrow) {
			if (currentScreen === "menu") setMenuSelectedIndex((menuSelectedIndex - 1 + SELECTABLE_ELEMENTS.length) % SELECTABLE_ELEMENTS.length);
			if (currentScreen === "mood") handleMoodRightArrow.current();
			if (currentScreen === "askToSeeResults") setSeeResultsAnswer(!seeResultsAnswer);
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
			if (currentScreen === "askToSeeResults") {
				if (seeResultsAnswer === true) setCurrentScreen("results");
				if (seeResultsAnswer === false) exit();
			}
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

	const border = () => {
		return (
			isTerminalTooSmall ? (
				<Box
					borderStyle="round"
					borderColor="red"
					width={dimensions.width}
					height={dimensions.height}		
				>
					
	
				</Box>
			) : (
				<Box
					borderStyle={showBorder ? "round" : undefined}
					borderColor={borderColourSchemes[logoColourIndex][0]}
					width={dimensions.width}
					height={dimensions.height}		
				>
					<Box borderStyle={showBorder ? "round" : undefined} borderColor={borderColourSchemes[logoColourIndex][1]}> 	
						<Box borderStyle={showBorder ? "round" : undefined} borderColor={borderColourSchemes[logoColourIndex][2]}> 	
							<Box borderStyle={showBorder ? "round" : undefined} borderColor={borderColourSchemes[logoColourIndex][3]}> 	
								{/* <Box flexDirection="column" width="100%" height="100%" alignItems='center' justifyContent='center'>
								</Box> */}
							</Box>
						</Box>
					</Box>
				</Box>
			)
		)
	}

	return (
		{border}
		// <Box
		// 	borderStyle={dimensions.height > 30 ? "round" : undefined}
		// 	borderColor={borderColourSchemes[logoColourIndex][0]}
		// 	width={dimensions.width}
		// 	height={dimensions.height}
		// > 
		// 	<Box borderStyle={dimensions.height > 30 ? "round" : undefined} borderColor={borderColourSchemes[logoColourIndex][1]}> 	
		// 		<Box borderStyle={dimensions.height > 30 ? "round" : undefined} borderColor={borderColourSchemes[logoColourIndex][2]}> 	
		// 			<Box borderStyle={dimensions.height > 30 ? "round" : undefined} borderColor={borderColourSchemes[logoColourIndex][3]}> 	
		// 				<Box flexDirection="column" width="100%" height="100%" alignItems='center' justifyContent='center'>
		// 					<Text> </Text>
		// 					<Box borderStyle="double" padding={1} borderColor={menuSelectedIndex === 0 ? "white" : "black"}>
		// 						{<Logo onColourChangeRef={handleLogoColourChange} logoColourIndex={logoColourIndex} setLogoColourIndex={setLogoColourIndex} />}
		// 					</Box>
		// 					<Text> </Text>
		// 					{currentScreen === "menu" && (
		// 						<Box borderStyle="round" borderColor={menuSelectedIndex === 2 ? "green" : "cyan"} backgroundColor={menuSelectedIndex === 2 ? "green" : undefined}>
		// 							{/* <Text color="white">  Press [enter] To Start  </Text> */}
		// 							<BigText text="Press [enter] To Start" font="tiny" />
		// 						</Box>
		// 					)}
		// 					{currentScreen === "mood" && (
		// 						<MoodSelection
		// 							onLeftArrowRef={handleMoodLeftArrow}
		// 							onRightArrowRef={handleMoodRightArrow}
		// 							onEnterRef={handleMoodEnter}
		// 							setCurrentScreen={setCurrentScreen}
		// 						/>
		// 					)}
		// 					{currentScreen === "askToSeeResults" && (
		// 						<>
		// 							<BigText text="See Results?" font="tiny"/>
		// 							<Box alignItems='row' gap="5" paddingx={2} paddingY={2}>
		// 								<Box
		// 									borderStyle="round" 
		// 									backgroundColor={seeResultsAnswer === true ? "green" : undefined}                        
		// 								>
		// 									<BigText text="Yes"/>
		// 								</Box>
		// 								<Box
		// 									borderStyle="round" 
		// 									backgroundColor={seeResultsAnswer === false ? "green" : undefined}     
		// 								>
		// 									<BigText text="No"/>
		// 								</Box>
		// 							</Box>
		// 							{/* <Text>YOOOO DANTE</Text> */}
		// 						</>
		// 					)}
		// 					{currentScreen === "results" && (
		// 						<>
		// 							<Box>
		// 								<ResultsScreen/>

		// 							</Box>
		// 						</>
		// 					)}
		// 					<Text> </Text>
		// 					<Text> </Text>
		// 					<Text color="gray" alignSelf="center" >Press 'q' or ESC to quit</Text>	
		// 				</Box>
		// 			</Box>
		// 		</Box>
		// 	</Box>
		// </Box>
	);
};

export default App;