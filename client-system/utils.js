const {exec} = require('child_process');
const os = require('os');

function runCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during command ${command}: ${error.message}`);
        } else {
            console.log(`Command success: ${stdout}`);
        }
    });
}

function reboot() {
    let command;

    // Choose the appropriate command based on the operating system
    switch (os.platform()) {
        case 'win32':
            command = 'shutdown /r /t 0';
            break;

        case 'darwin':
        case 'linux':
            command = 'sudo shutdown -r now';
            break;

        default:
            console.error('Unsupported operating system for reboot');
            return;
    }

    // Execute the chosen command
    runCommand(command);
}

function halt() {
    let command;

    // Choose the appropriate command based on the operating system
    switch (os.platform()) {
        case 'win32':
            command = 'shutdown /s /t 0';
            break;

        case 'darwin':
        case 'linux':
            command = 'sudo shutdown -h now';
            break;

        default:
            console.error('Unsupported operating system for halt');
            return;
    }

    // Execute the chosen command
    runCommand(command);
}

module.exports = { reboot, halt }