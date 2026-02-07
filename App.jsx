import React, { useState, useEffect, useRef } from 'react';
import { Text, Box, useInput, useApp } from 'ink';
import { getLogoColourIndexFromDb } from './database';
import RecordFlowScreen from './screens/RecordFlowScreen';
import ResultsFlowScreen from './screens/ResultsFlowScreen';
import Border from './components/Border';

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
	}, [dimensions.height, dimensions.width, MIN_HEIGHT, MIN_WIDTH]);
	
	useInput((input, key) => {
		if ((key.ctrl && input === 'q') || key.escape || (key.ctrl && input === 'c')) {
			process.stdout.write('\x1b[?25h');
			exit();
		}
		if ((key.ctrl && input === 'b') && currentScreen !== 'results') {
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

	return (
		<Border
			dimensions={dimensions}
			minWidth={MIN_WIDTH}
			minHeight={MIN_HEIGHT}
			logoColourIndex={logoColourIndex}
			isTerminalTooSmall={isTerminalTooSmall}
			showInnerBorder={showInnerBorder}
		>
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