import {spawn} from 'child_process';

export async function callTrashDetector(){
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['middleware/trashDetector.py']);

        let scriptOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            scriptOutput += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            console.log(`Script works`);
            console.log(scriptOutput);
            resolve(scriptOutput);
        });

        pythonProcess.on('error', (error) => {
            reject(error);
        });
    });
}

