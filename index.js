import React from "react";
import { render } from 'ink';
import Record from "./record";
import Record2 from "./record_2";

// to run 
if (process.argv[2] === 'mood') {
    if (process.argv[3] === 'record') {
        // Set up terminal like blessed does
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        
        // Clear screen and hide cursor
        process.stdout.write('\x1b[2J\x1b[H');
        process.stdout.write('\x1b[?25l');
        
        // Render with Ink - it will take over the terminal
        const instance = render(React.createElement(Record));
        
        // Cleanup on exit
        const cleanup = () => {
            process.stdout.write('\x1b[?25h'); // Show cursor
            process.stdin.setRawMode(false);
            process.stdin.pause();
            instance.unmount();
            process.exit(0);
        };
        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);
    } else if (process.argv[3] === 'record2') {
        // Set up terminal like blessed does
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        
        // Clear screen and hide cursor
        process.stdout.write('\x1b[2J\x1b[H');
        process.stdout.write('\x1b[?25l');
        
        // Render with Ink - it will take over the terminal
        const instance = render(React.createElement(Record2));
        
        // Cleanup on exit
        const cleanup = () => {
            process.stdout.write('\x1b[?25h'); // Show cursor
            process.stdin.setRawMode(false);
            process.stdin.pause();
            instance.unmount();
            process.exit(0);
        };
        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);
    
    } else {
        console.log("funkytest speed test keywords");
        console.log("\"npm start mood\" - view keywords")
        console.log("\"npm start mood record\" - record current mood")
        console.log("\"npm start mood results\" - see the record of your moods")

    }
}