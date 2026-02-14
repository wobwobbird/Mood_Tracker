import React, { useState, useMemo } from 'react';
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


	const viewMode = ["All Records", "By Day"];

	const PAGE_SIZE = 30; //35

	const VIEW_OPTIONS = 2; // Records, Graph
	const NAV_OPTIONS = 4; // View, Next, Prev, Back

	useInput((input, key) => {
		if (focusedSection === 'top') {
			if (key.downArrow || key.upArrow || key.leftArrow || key.rightArrow) {
				const direction = (key.downArrow || key.rightArrow) ? 1 : -1;
				setFocusedViewIndex(prev => (prev + direction + VIEW_OPTIONS) % VIEW_OPTIONS);
			}
			if (key.return) {
				setActiveViewIndex(focusedViewIndex);
				setFocusedSection('bottom');
			}
		} else {
			if (key.downArrow || key.upArrow || key.leftArrow || key.rightArrow) {
				const direction = (key.downArrow || key.rightArrow) ? 1 : -1;
				setFocusedNavIndex(prev => (prev + direction + NAV_OPTIONS) % NAV_OPTIONS);
			}
			if (key.return && focusedNavIndex === 1) {
				setFocusedSection('top');
				setActiveViewIndex(-1);
			}
			if (key.return && focusedNavIndex === 2) {
				setCurrentPage(prev => Math.min(prev + 1, Math.ceil(databaseData.length / PAGE_SIZE) - 1));
			}
			if (key.return && focusedNavIndex === 3) {
				setCurrentPage(prev => Math.max(prev - 1, 0));
			}
		}
	});

	
	const databaseData = useMemo(() => {
		const data = getMoodEntriesFromDb();
		return data;
	}, []);

	const pageEntries = databaseData.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
	
	// setMenuSelectedIndex((menuSelectedIndex - 1 + MENU_SELECTABLE_ELEMENTS.length) % MENU_SELECTABLE_ELEMENTS.length);
	// setMenuSelectedIndex((menuSelectedIndex + 1) % MENU_SELECTABLE_ELEMENTS.length);

	return (
		<Box
			flexDirection="column"
			width="100%"
			height="100%"
			justifyContent="flex-start"
			alignItems="flex-start"
			marginX={3}
			marginY={1}
		>
			<Box 
				flexDirection="column"
				flexGrow={0}
				alignItems="flex-start"
				width="100%"
				height={6}
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
							width="100%"
							justifyContent="space-between"

						>
							<Box flexDirection="row" width="auto" gap={2}>
								<Box
									borderColor="green"
									borderStyle="double"
									backgroundColor={focusedSection === 'bottom' && focusedNavIndex === 0 ? 'green' : undefined}
									flexGrow={1}
									alignItems="center"
									justifyContent="center"
									paddingX={4}
								>
									<Text>View: {viewMode[activeViewIndex]}</Text>
								</Box>
								<Box
									borderColor="green"
									borderStyle="double"
									backgroundColor={focusedSection === 'bottom' && focusedNavIndex === 1 ? 'green' : undefined}
									flexGrow={1}
									alignItems="center"
									justifyContent="center"
									paddingX={4}
								>
									<Text>Back</Text>
								</Box>
							</Box>

							<Box flexDirection="row" width="auto" gap={2}>
								<Box
									borderColor="green"
									borderStyle="double"
									backgroundColor={focusedSection === 'bottom' && focusedNavIndex === 2 ? 'green' : undefined}
									flexGrow={1}
									alignItems="center"
									justifyContent="center"
									paddingX={4}
								>
									<Text>Next {'=>'}</Text>
								</Box>
								<Box
									borderColor="green"
									borderStyle="double"
									backgroundColor={focusedSection === 'bottom' && focusedNavIndex === 3 ? 'green' : undefined}
									flexGrow={1}
									alignItems="center"
									justifyContent="center"
									paddingX={4}
								>
									<Text>Prev {'<='}</Text>
								</Box>
								<Box borderColor="green" borderStyle="single" flexGrow={1} alignItems="center" justifyContent="center" paddingX={4}>
									<Text>Page {currentPage + 1} of {Math.ceil(databaseData.length / PAGE_SIZE)}</Text>
								</Box>
							</Box>		
						</Box>
						
					)
				}

			</Box>

			<Box
				width="100%"
				flexGrow={1}
				minHeight={20}
			>
				{focusedSection === 'bottom' && focusedViewIndex === 0 && (
					
					<ResultsScreen pageEntries={pageEntries} />
				)}
			</Box>
		</Box>
	);
};

export default ResultsFlowScreen;
