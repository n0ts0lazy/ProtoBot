const {REST, Routes} = require ('discord.js');
const fs = require('node:fs');
const path = require ('node:path');

require('dotenv').config()
const {authToken, clientID} = process.env;

const commands = [];

const commandFile= fs.readdirSync('./src/commands').filter(file=>file.endsWith('.js'));

for (const file of commandFile) {
    const command = require(path.join(__dirname,'commands',file));      //it works
    console.log(`./src/commands/${file}`);
    //const command = require(fs.readdirSync(`./src/commands/${file}`).filter(file=>file.endsWith('.js')));        //it doesnt work for some reason need explaination tnx
    commands.push(command.data.toJSON());
}

const rest =  new REST({version: '10'}).setToken(authToken);

(async () => {
    try {
        console.log('Importing:', commands.length , 'applications (/) commands.');
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

