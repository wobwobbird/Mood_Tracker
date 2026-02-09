import React, { useState } from 'react';
import { Text, Box, useInput } from 'ink';
import ResultsScreen from '../components/results_screen';
import { SCREENS } from '../constants.js';
import { getMoodEntriesFromDb } from '../database.js';

const ResultsFlowScreen = ({ setCurrentScreen }) => {

	const [focusedSection, setFocusedSection] = useState('top'); // 'top' = Records/Graph, 'bottom' = Next/Prev/Back\

	const [focusedViewIndex, setFocusedViewIndex] = useState(0);  
	const [activeViewIndex, setActiveViewIndex] = useState(-1);   

	const [focusedNavIndex, setFocusedNavIndex] = useState(0);
	const [activeNavIndex, setActiveNavIndex] = useState(-1);


	const [currentPage, setCurrentPage] = useState(0);


	const viewMode = ['byDay', 'trends', 'graph'];

	const PAGE_SIZE = 10;

	const VIEW_OPTIONS = 2; // Records, Graph
	const NAV_OPTIONS = 3; // Next, Prev, Back

	useInput((input, key) => {
		if (focusedSection === 'top') {
			if (key.downArrow || key.upArrow || key.leftArrow || key.rightArrow) {
				// down/right = forward (+1), up/left = backward (-1)
				const direction = (key.downArrow || key.rightArrow) ? 1 : -1;
				setFocusedViewIndex(prev => (prev + direction + VIEW_OPTIONS) % VIEW_OPTIONS);
			}
			if (key.return) {
				setActiveViewIndex(focusedViewIndex);
				setFocusedSection('bottom');
			}
		} else {
			// focusedSection === 'bottom'
			if (key.downArrow || key.upArrow || key.leftArrow || key.rightArrow) {
				// down/right = forward (+1), up/left = backward (-1)
				const direction = (key.downArrow || key.rightArrow) ? 1 : -1;
				setFocusedNavIndex(prev => (prev + direction + NAV_OPTIONS) % NAV_OPTIONS);
			}
			if (key.return && focusedNavIndex === 2) {
				// Back pressed - return to top section
				setFocusedSection('top');
				setActiveViewIndex(-1);
			}
		}
	});

	// setMenuSelectedIndex((menuSelectedIndex - 1 + MENU_SELECTABLE_ELEMENTS.length) % MENU_SELECTABLE_ELEMENTS.length);
	// setMenuSelectedIndex((menuSelectedIndex + 1) % MENU_SELECTABLE_ELEMENTS.length);

	return (
		<Box flexDirection="column" width="100%" height="100%">
			<Box 
				flexDirection="column"
				justifyContent="flex-start"
				alignItems="flex-start"
				width="100%"
				height={25}
				marginX={3}
				marginY={1}
				gap={0}
			>
				<Box
					flexDirection="row"
					flexShrink={0}
					width="100%"
					gap={2}
				>
					<Box
						borderColor="green"
						borderStyle="double"
						backgroundColor={activeViewIndex === 0 ? 'green' : focusedSection === 'top' && focusedViewIndex === 0 ? 'gray' : undefined}
						flexGrow={1}
						alignItems="center"
						justifyContent="center"
					>
						<Text>Records</Text>
					</Box>
					<Box
						borderColor="green"
						borderStyle="double"
						backgroundColor={activeViewIndex === 1 ? 'green' : focusedSection === 'top' && focusedViewIndex === 1 ? 'gray' : undefined}
						flexGrow={1}
						alignItems="center"
						justifyContent="center"
					>
						<Text>Graph</Text>
					</Box>
				</Box>

				{focusedSection === 'bottom' && focusedViewIndex === 0 && (
						<Box
							flexDirection="row"
							width={80}
							gap={2}

						>
							<Box
								borderColor="green"
								borderStyle="double"
								backgroundColor={focusedSection === 'bottom' && focusedNavIndex === 0 ? 'green' : undefined}
								flexGrow={1}
								alignItems="center"
								justifyContent="center"
							>
								<Text>Next</Text>
							</Box>
							<Box
								borderColor="green"
								borderStyle="double"
								backgroundColor={focusedSection === 'bottom' && focusedNavIndex === 1 ? 'green' : undefined}
								flexGrow={1}
								alignItems="center"
								justifyContent="center"
							>
								<Text>Prev</Text>
							</Box>
							<Box
								borderColor="green"
								borderStyle="double"
								backgroundColor={focusedSection === 'bottom' && focusedNavIndex === 2 ? 'green' : undefined}
								flexGrow={1}
								alignItems="center"
								justifyContent="center"
							>
								<Text>Back</Text>
							</Box>
						</Box>
						
					)
				}

			</Box>

			<Box width="100%" backgroundColor="blue" flexGrow={1} paddingX={3}>
				<ResultsScreen />
			</Box>
		</Box>
	);
};

export default ResultsFlowScreen;
