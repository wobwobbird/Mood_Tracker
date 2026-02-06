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

	const SELECTABLE_ELEMENTS = ["logo", "none", "record", "results"];

	const {exit} = useApp();

	const [seeResultsAnswer, setSeeResultsAnswer] = useState(true);

	const MIN_WIDTH = 150 + 10;
	const MIN_HEIGHT = 50 + 13;
	const [isTerminalTooSmall, setIsTerminalTooSmall] = useState(true);

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
										borderStyle="classic" 
										borderColor="red" 
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

	const AppLogicRecord = () => {
		return (
			<Box flexDirection="column" width="100%" height="100%" alignItems='center' justifyContent='center'>
				<Box borderStyle="double" padding={1} marginTop={2} borderColor={menuSelectedIndex === 0 ? "white" : "black"}>
					{<Logo onColourChangeRef={handleLogoColourChange} logoColourIndex={logoColourIndex} setLogoColourIndex={setLogoColourIndex} />}
				</Box>
				<Box flexDirection="column" width="100%" flexGrow={1} alignItems='center' justifyContent='center'>
					{currentScreen === "menu" && (
						<Box flexDirection='column'   flexGrow={1} justifyContent="center" gap={3} >
							<Box 
								borderStyle="round"
								borderColor={menuSelectedIndex === 2 ? "green" : "cyan"} 
								backgroundColor={menuSelectedIndex === 2 ? "green" : undefined}
								onMouseEnter={() => setMenuSelectedIndex(2)}
								onMouseLeave={() => setMenuSelectedIndex(0)}
								width={50}
								justifyContent='center'
							>
								{/* <Text color="white">  Press [enter] To Start  </Text> */}
								<BigText text="Record Mood" font="tiny" />
							</Box>
							<Box 
								borderStyle="round" 
								borderColor={menuSelectedIndex === 3 ? "green" : "cyan"} 
								backgroundColor={menuSelectedIndex === 3 ? "green" : undefined}
								onMouseEnter={() => setMenuSelectedIndex(3)}
								onMouseLeave={() => setMenuSelectedIndex(0)}
								width={50}
								justifyContent='center'
							>
								{/* <Text color="white">  Press [enter] To Start  </Text> */}
								<BigText text="See Results" font="tiny" />
							</Box>
						</Box>
					)}
					{currentScreen === "mood" && (
						<MoodSelection
							onLeftArrowRef={handleMoodLeftArrow}
							onRightArrowRef={handleMoodRightArrow}
							onEnterRef={handleMoodEnter}
							setCurrentScreen={setCurrentScreen}
						/>
					)}
					{currentScreen === "askToSeeResults" && (
						<>
							<BigText text="See Results?" font="tiny"/>
							<Box alignItems='row' gap="5" paddingx={2} paddingY={2}>
								<Box
									borderStyle="round" 
									backgroundColor={seeResultsAnswer === true ? "green" : undefined}                        
								>
									<BigText text="Yes"/>
								</Box>
								<Box
									borderStyle="round" 
									backgroundColor={seeResultsAnswer === false ? "green" : undefined}     
								>
									<BigText text="No"/>
								</Box>
							</Box>
							{/* <Text>YOOOO DANTE</Text> */}
						</>
					)}
				</Box>
			</Box>
		)
	}

	const AppLogicResults = () => {
		return (
			<Box flexDirection="column" width="100%" height="100%" alignItems='center' justifyContent='center' >
				<Box
					flexDirection='row'
					height={25}
					minHeight={25}
					maxHeight={25}
					flexShrink={0}				
					width="100%"
					margin={1}
					backgroundColor="pinkBright"
				>
					<Box
						borderColor="green"
						borderStyle="double"
						flexGrow={1}
						maxHeight={25}
					>
					</Box>
					<Box
						borderColor="green"
						borderStyle="double"
						flexGrow={1}
						maxHeight={25}
					>
					</Box>
					<Box
						borderColor="green"
						borderStyle="double"
						flexGrow={1}
						maxHeight={25}
					>
					</Box>
					<Box
						borderColor="green"
						borderStyle="double"
						flexGrow={1}
						maxHeight={25}
					>
					</Box>
				</Box>
				<Box
					width="100%"
					height="80%"
				>
					<ResultsScreen/>
				</Box>
			</Box>
		)
	}

	return (
		<Border>
			{currentScreen !== "results" ? (
				<AppLogicRecord/>
			) : (
				<AppLogicResults/>
			)}
		</Border>
	);
};

export default App;