import React from 'react';
import { Box, useInput, useApp } from 'ink';
import BigText from 'ink-big-text';
import MoodSelection from '../mood_selection';
import Logo from '../logo';
import { saveLogoColourIndex } from '../database';

const SELECTABLE_ELEMENTS = ['logo', 'none', 'record', 'results'];

const RecordFlowScreen = ({
	menuSelectedIndex,
	setMenuSelectedIndex,
	currentScreen,
	logoColourIndex,
	setLogoColourIndex,
	handleLogoColourChange,
	handleMoodLeftArrow,
	handleMoodRightArrow,
	handleMoodEnter,
	seeResultsAnswer,
	setSeeResultsAnswer,
	showGoodbyeText,
	setShowGoodbyeText,
	setCurrentScreen,
}) => {
	const { exit } = useApp();

	useInput((input, key) => {
		if (key.downArrow || key.rightArrow) {
			if (currentScreen === 'menu') {
				setMenuSelectedIndex((menuSelectedIndex + 1) % SELECTABLE_ELEMENTS.length);
			}
			if (currentScreen === 'mood') handleMoodLeftArrow.current();
			if (currentScreen === 'askToSeeResults') setSeeResultsAnswer((prev) => !prev);
		}
		if (key.upArrow || key.leftArrow) {
			if (currentScreen === 'menu') {
				setMenuSelectedIndex((menuSelectedIndex - 1 + SELECTABLE_ELEMENTS.length) % SELECTABLE_ELEMENTS.length);
			}
			if (currentScreen === 'mood') handleMoodRightArrow.current();
			if (currentScreen === 'askToSeeResults') setSeeResultsAnswer((prev) => !prev);
		}
		if (key.return) {
			if (currentScreen === 'menu') {
				if (menuSelectedIndex === 0) handleLogoColourChange.current();
				if (menuSelectedIndex === 2) {
					saveLogoColourIndex(logoColourIndex);
					setCurrentScreen('mood');
				}
				if (menuSelectedIndex === 3) setCurrentScreen('results');
			}
			if (currentScreen === 'mood') handleMoodEnter.current();
			if (currentScreen === 'askToSeeResults') {
				if (seeResultsAnswer === true) setCurrentScreen('results');
				if (seeResultsAnswer === false && showGoodbyeText === false) {
					setShowGoodbyeText(true);
				}
				if (seeResultsAnswer === false && showGoodbyeText === true) {
					exit();
				}
			}
		}
	});

	return (
		<Box flexDirection="column" width="100%" height="100%" alignItems="center" justifyContent="center">
			<Box borderStyle="double" padding={1} marginTop={2} borderColor={menuSelectedIndex === 0 ? 'white' : 'black'}>
				<Logo
					onColourChangeRef={handleLogoColourChange}
					logoColourIndex={logoColourIndex}
					setLogoColourIndex={setLogoColourIndex}
				/>
			</Box>
			<Box flexDirection="column" width="100%" flexGrow={1} alignItems="center" justifyContent="center">
				{currentScreen === 'menu' && (
					<Box flexDirection="column" flexGrow={1} justifyContent="center" gap={3}>
						<Box
							borderStyle="round"
							borderColor={menuSelectedIndex === 2 ? 'green' : 'cyan'}
							backgroundColor={menuSelectedIndex === 2 ? 'green' : undefined}
							onMouseEnter={() => setMenuSelectedIndex(2)}
							onMouseLeave={() => setMenuSelectedIndex(0)}
							width={50}
							justifyContent="center"
						>
							<BigText text="Record Mood" font="tiny" />
						</Box>
						<Box
							borderStyle="round"
							borderColor={menuSelectedIndex === 3 ? 'green' : 'cyan'}
							backgroundColor={menuSelectedIndex === 3 ? 'green' : undefined}
							onMouseEnter={() => setMenuSelectedIndex(3)}
							onMouseLeave={() => setMenuSelectedIndex(0)}
							width={50}
							justifyContent="center"
						>
							<BigText text="See Results" font="tiny" />
						</Box>
					</Box>
				)}
				{currentScreen === 'mood' && (
					<MoodSelection
						onLeftArrowRef={handleMoodLeftArrow}
						onRightArrowRef={handleMoodRightArrow}
						onEnterRef={handleMoodEnter}
						setCurrentScreen={setCurrentScreen}
					/>
				)}
				{currentScreen === 'askToSeeResults' && showGoodbyeText === false && (
					<>
						<BigText text="See Results?" font="tiny" />
						<Box alignItems="row" gap="5" paddingX={2} paddingY={2}>
							<Box
								borderStyle="round"
								backgroundColor={seeResultsAnswer === true ? 'green' : undefined}
							>
								<BigText text="Yes" />
							</Box>
							<Box
								borderStyle="round"
								backgroundColor={seeResultsAnswer === false ? 'green' : undefined}
							>
								<BigText text="No" />
							</Box>
						</Box>
					</>
				)}
				{currentScreen === 'askToSeeResults' && showGoodbyeText === true && (
					<BigText text="Good Bye" lineHeight={3} />
				)}
			</Box>
		</Box>
	);
};

export default RecordFlowScreen;
