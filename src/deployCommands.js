const {REST, Routes} = require ('discord.js');
const fs = require('node:fs');
const path = require ('node:path');

require('dotenv').config()
const {authToken, clientID} = process.env;

const commands = [];

var buildState = 'Live'     //buildState is for switching between Live and Beta build of bot easier to deploy so that no need to keep commenting out the code to change build

switch (buildState){
    case 'Live':
        //Live Command Deployment
        const commandFile= fs.readdirSync('./src/commands').filter(file=>file.endsWith('.js'));

        for (const file of commandFile) {
            const command = require(path.join(__dirname,'commands',file));      //it works
            console.log(`loading ./src/commands/${file}`);
            commands.push(command.data.toJSON());
        }

        console.log('Importing:', commands.length , 'applications (/) commands.');
        const rest =  new REST({version: '10'}).setToken(authToken);
        
        (async () => {
            try {
                const data = await rest.put(
                    Routes.applicationCommands(clientID),
                    {body: commands},
                );
                console.log('Successfully loaded:', data.length, 'application (/)  commands.');
            }
            catch (error){
                console.error(error);
            }
        })();                 
}

switch (buildState){
    case 'Beta':
        //Beta Command Deployment
        const commandFile = fs.readdirSync('./src/betacommands').filter(file => file.endsWith('.js'));

        for (const file of commandFile) {
            const command = require(path.join(__dirname, 'betacommands', file));      //it works
            console.log(`loading ./src/betacommands/${file}`);
            commands.push(command.data.toJSON());
        }

        console.log('Importing:', commands.length, 'beta commands.');
        const rest = new REST({ version: '10' }).setToken(authToken);

        (async () => {
            try {
                const data = await rest.put(
                    Routes.applicationCommands(clientID),
                    { body: commands },
                );
                console.log('Successfully loaded:', data.length, 'beta commands.');
            }
            catch (error) {
                console.error(error);
            }
        })();
}