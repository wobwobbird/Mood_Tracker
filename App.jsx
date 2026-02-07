import React, { useState, useEffect, useRef } from 'react';
import { Text, Box, useInput, useApp } from 'ink';
import { getLogoColourIndexFromDb } from './database';
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

	const { exit } = useApp();

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
		if ((input === 'q') || key.escape || (key.ctrl && input === 'c')) {
			process.stdout.write('\x1b[?25h');
			exit();
		}
		if (input === 'b' && currentScreen !== 'results') {
			setShowInnerBorder((prev) => !prev);
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
					setSeeResultsAnswer={setSeeResultsAnswer}
					showGoodbyeText={showGoodbyeText}
					setShowGoodbyeText={setShowGoodbyeText}
					setCurrentScreen={setCurrentScreen}
				/>
			) : (
				<ResultsFlowScreen setCurrentScreen={setCurrentScreen} />
			)}
		</Border>
	);
};

export default App;