import React, { useState, useEffect, useRef } from 'react';
import { Text, Box, useInput, useApp } from 'ink';
import { saveLogoColourIndex, getLogoColourIndexFromDb } from './database';
import { borderColourSchemes } from './colourScheme';
import RecordFlowScreen from './screens/RecordFlowScreen';
import ResultsFlowScreen from './screens/ResultsFlowScreen';

// cd /Users/guymarshman/Dev/Back_End_Dev/Github/Mood_Tracker
// npm start mood record

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

	const SELECTABLE_ELEMENTS = ["logo", "none", "record", "results"];

	const {exit} = useApp();

	const [seeResultsAnswer, setSeeResultsAnswer] = useState(true);
	const [showGoodbyeText, setShowGoodbyeText] = useState(false);

	const MIN_WIDTH = 150 + 10;
	const MIN_HEIGHT = 50 + 13;
	const [isTerminalTooSmall, setIsTerminalTooSmall] = useState(true);
	const [showInnerBorder, setShowInnerBorder] = useState(false);

	useEffect(() => {
		if (dimensions.height >= MIN_HEIGHT && dimensions.width >= MIN_WIDTH) {
			setIsTerminalTooSmall(false);
		} else {
			setIsTerminalTooSmall(true);
		}
	}, [dimensions.height, dimensions.width]);
	
	useInput((input, key) => {
		if (input === 'q' || key.escape || (key.ctrl && input === 'c')) {
			process.stdout.write('\x1b[?25h');
			exit();
		}
		if (input === 'b') {
			setShowInnerBorder(prev => !prev)
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
				if (menuSelectedIndex === 3) setCurrentScreen("results")
			}
			if (currentScreen === "mood") handleMoodEnter.current();
			if (currentScreen === "askToSeeResults") {
				if (seeResultsAnswer === true) setCurrentScreen("results");
				if (seeResultsAnswer === false && showGoodbyeText === false) { 
					setShowGoodbyeText(true);
				}
				if (seeResultsAnswer === false && showGoodbyeText === true) { 
					exit();
				}
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

	const Border = ({ children }) => {
		return (
			isTerminalTooSmall ? (
				<Box
					borderStyle="round"
					borderColor="red"
					width={dimensions.width}
					height={dimensions.height}	
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					gap="1"
				>
					{dimensions.width <= MIN_WIDTH ? (
						<Text >The width is {dimensions.width}, increase by {MIN_WIDTH - dimensions.width} to begin</Text>
					) : (
						<Text >The width is enough</Text>
					)}
					{dimensions.height <= MIN_HEIGHT ? (
						<Text >The height is {dimensions.height}, increase by {MIN_HEIGHT - dimensions.height} to begin</Text>
					) : (
						<Text >The height is enough</Text>
					)}
					
				</Box>
			) : (
				<Box
					borderStyle="round"
					borderColor={borderColourSchemes[logoColourIndex][0]}
					width={dimensions.width}
					height={dimensions.height}
				>
					<Box 
						borderStyle="round"
						borderColor={borderColourSchemes[logoColourIndex][1]}
						width="100%"
						height="100%"
					> 	
						<Box 
							borderStyle="round"
							borderColor={borderColourSchemes[logoColourIndex][2]}
							width="100%"
							height="100%"
						> 	
							<Box 
								borderStyle="round"
								borderColor={borderColourSchemes[logoColourIndex][3]}
								width="100%"
								height="100%"
								alignItems='center'
								justifyContent='space-between'
								flexDirection="column"
							> 	
								<Box
									flexDirection="column" 
									gap={1}
									alignItems='center' 
									justifyContent='center'
									height="100%"
								>
									<Box 
										borderStyle={showInnerBorder? "classic" : undefined}
										borderColor={showInnerBorder? "red" : undefined}
										flexDirection="column" 
										width={MIN_WIDTH - 10} 
										height={MIN_HEIGHT - 13} 
										alignItems='center' 
										justifyContent='center'
									>
										{children}
									</Box>
								</Box>
								{/* <Box flexDirection="column" width="100%" height="100%" alignItems='center' justifyContent='center'> */}
								<Text color="gray" alignSelf="center" >Press 'q' or ESC to quit</Text>	
							</Box>
						</Box>
					</Box>
				</Box>
			)
		)
	}

	return (
		<Border>
			{currentScreen !== 'results' ? (
				<RecordFlowScreen
					menuSelectedIndex={menuSelectedIndex}
					setMenuSelectedIndex={setMenuSelectedIndex}
					currentScreen={currentScreen}
					logoColourIndex={logoColourIndex}
					setLogoColourIndex={setLogoColourIndex}
					handleLogoColourChange={handleLogoColourChange}
					handleMoodLeftArrow={handleMoodLeftArrow}
					handleMoodRightArrow={handleMoodRightArrow}
					handleMoodEnter={handleMoodEnter}
					seeResultsAnswer={seeResultsAnswer}
					showGoodbyeText={showGoodbyeText}
					setCurrentScreen={setCurrentScreen}
				/>
			) : (
				<ResultsFlowScreen />
			)}
		</Border>
	);
};

export default App;