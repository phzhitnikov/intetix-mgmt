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
    switch (os.platform()) {
        case 'win32':
            runCommand('shutdown /r /t 0');
            break;

        case 'darwin':
        case 'linux':
            runCommand('sudo shutdown -r now');
            break;

        default:
            console.error('Unsupported operating system for reboot');
            return;
    }
}

function halt() {
    switch (os.platform()) {
        case 'win32':
            runCommand('shutdown /s /t 0');
            break;

        case 'darwin':
        case 'linux':
            runCommand('sudo shutdown -h now');
            break;

        default:
            console.error('Unsupported operating system for halt');
            return;
    }
}

function sleep() {
    switch (os.platform()) {
        case 'win32':
            runCommand("powershell.exe -Command \"& {Add-Type -Assembly System.Windows.Forms;[System.Windows.Forms.Application]::SetSuspendState('Suspend', $false, $false)}\"");
            break;

        case 'darwin':
            runCommand('pmset sleepnow');
            break;

        case 'linux':
            runCommand('systemctl suspend');
            break;

        default:
            console.error('Unsupported operating system for sleep');
            return;
    }
}

module.exports = { reboot, halt, sleep }