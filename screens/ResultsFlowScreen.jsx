import React from 'react';
import { Text, Box, useInput } from 'ink';
import ResultsScreen from '../results_screen';

const ResultsFlowScreen = ({ setCurrentScreen }) => {

	return (
		<Box flexDirection="column" width="100%" height="100%">
			<Box
				flexDirection="row"
				height={8}
				flexShrink={0}
				width="100%"
				backgroundColor="pinkBright"
				paddingY={1}
				paddingX={3}
				gap={2}
			>
				<Box
					borderColor="green"
					borderStyle="double"
					flexGrow={1}
					maxHeight={25}
					alignItems="center"
					justifyContent="center"
				>
					<Text>See All Records</Text>
				</Box>
				<Box
					borderColor="green"
					borderStyle="double"
					flexGrow={1}
					maxHeight={25}
					alignItems="center"
					justifyContent="center"
				>
					<Text>Show by day</Text>
				</Box>
				<Box
					borderColor="green"
					borderStyle="double"
					flexGrow={1}
					maxHeight={25}
					alignItems="center"
					justifyContent="center"
				>
					<Text>Graph</Text>
				</Box>
			</Box>

			<Box
				flexDirection="row"
				flexShrink={0}
				backgroundColor="pinkBright"
				paddingX={3}
				marginBottom={1}
				gap={2}
				width="50%"
			>
				<Box
					borderColor="green"
					borderStyle="double"
					flexGrow={1}
					alignItems="center"
					justifyContent="center"
				>
					<Text>Next</Text>
				</Box>
				<Box
					borderColor="green"
					borderStyle="double"
					flexGrow={1}
					alignItems="center"
					justifyContent="center"
				>
					<Text>Prev</Text>
				</Box>
				<Box
					borderColor="green"
					borderStyle="double"
					flexGrow={1}
					alignItems="center"
					justifyContent="center"
				>
					<Text>Back</Text>
				</Box>
			</Box>

			<Box width="100%" backgroundColor="blue" flexGrow={1} paddingX={3}>
				<ResultsScreen />
			</Box>
		</Box>
	);
};

export default ResultsFlowScreen;
