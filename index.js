import React from 'react';
import { render } from 'ink';
import App from './App';
import { setupTerminal, teardownTerminal, setupErrorHandlers, createAppCleanup } from './setupTerminal.js';

// npm start mood record  |  npm start mood results
if (process.argv[2] === 'mood') {
	if (process.argv[3] === 'results') {
		setupTerminal();
		setupErrorHandlers();

		import('./results_screen.jsx').then(({ default: ResultsScreen }) => {
			const instance = render(React.createElement(ResultsScreen));
			const cleanup = createAppCleanup(instance);
			process.on('SIGINT', cleanup);
			process.on('SIGTERM', cleanup);
		}).catch((error) => {
			teardownTerminal();
			console.error('\n\nError loading results screen:', error);
			process.exit(1);
		});
	} else if (process.argv[3] === 'record') {
		setupTerminal();
		setupErrorHandlers();

		const instance = render(React.createElement(App));
		const cleanup = createAppCleanup(instance);
		process.on('SIGINT', cleanup);
		process.on('SIGTERM', cleanup);
	} else {
		console.log('funkytest speed test keywords');
		console.log('"npm start mood" - view keywords');
		console.log('"npm start mood record" - record current mood');
		console.log('"npm start mood results" - see the record of your moods');
	}
}