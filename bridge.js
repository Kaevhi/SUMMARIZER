const { exec } = require('child_process');
const fs = require('fs');

function getTranscript(videoUrl) {
    exec(`python server.py "${videoUrl}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`Transcript: ${stdout}`);
        
        // Save the output to a file so the frontend can read it
        fs.writeFileSync('output.json', stdout);
    });
}

// Get the URL from the command line arguments (for demonstration purposes)
const videoUrl = process.argv[2];
getTranscript(videoUrl);
