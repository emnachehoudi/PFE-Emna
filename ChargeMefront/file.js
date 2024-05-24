const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const targetProjectPath = './';
// Liste des ports à utiliser
const ports = [4000, 4200, 5000, 5200];

// Vérifier si le répertoire existe
if (fs.existsSync(targetProjectPath)) {
    // Changer de répertoire
    process.chdir(targetProjectPath);

    // Exécuter chaque commande séquentiellement
    ports.forEach(port => {
        const command = `ng serve --port ${port}`;
        const childProcess = exec(command);

        childProcess.stdout.on('data', data => {
            console.log(data.toString());
        });

        childProcess.stderr.on('data', data => {
            console.error(data.toString());
        });
    });
} else {
    console.error('Le répertoire du projet cible n\'existe pas.');
}
