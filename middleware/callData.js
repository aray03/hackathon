import {spawn} from 'child_process';

export async function callTrashDetector(){
//    const { arg1, arg2 } = req.params;


    
    //const pythonProcess = spawn('python', ['isTrash.py', arg1, arg2]);
    const pythonProcess = spawn('python3', ['middleware/trashDetector.py']);

    let scriptOutput = '';

    // Collect data from the Python script's stdout
    pythonProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
    });

    // Handle any errors from stderr
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // When the process closes, send the output as the response
    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        console.log(`Script works`);
        return scriptOutput;
    });
}

