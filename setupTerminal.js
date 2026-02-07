/**
 * Shared terminal setup and teardown for Ink-based TUI mode.
 * Use when running mood record or mood results (full-screen takeover).
 */

export function setupTerminal() {
	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	// Clear screen and hide cursor
	process.stdout.write('\x1b[2J\x1b[H');
	process.stdout.write('\x1b[?25l');
}

export function teardownTerminal() {
	process.stdout.write('\x1b[?25h'); // Show cursor
	process.stdin.setRawMode(false);
	process.stdin.pause();
}

export function setupErrorHandlers() {
	process.on('uncaughtException', (error) => {
		teardownTerminal();
		console.error('\n\nError:', error.message);
		process.exit(1);
	});

	process.on('unhandledRejection', (error) => {
		teardownTerminal();
		console.error('\n\nUnhandled Rejection:', error);
		process.exit(1);
	});
}

/**
 * Returns a cleanup function for normal app exit (SIGINT/SIGTERM).
 * Calls teardownTerminal, unmounts the Ink instance, and exits.
 */
export function createAppCleanup(instance) {
	return () => {
		teardownTerminal();
		instance.unmount();
		process.exit(0);
	};
}
