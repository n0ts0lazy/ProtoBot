const { Client, Collection, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');
//const messageTracker = require('./events/messageTracker'); // Adjust the path accordingly

require('dotenv').config();
const { protobotAuthToken } = process.env;

<<<<<<< Updated upstream
require('dotenv').config()
const {protobotAuthToken, protobotClientID} = process.env;

const client = new Client({ intents:['Guilds','GuildMessages','GuildVoiceStates','GuildEmojisAndStickers'] });

console.log('logged in as ', protobotAuthToken)

client.commands = new Collection();

var buildState = 'Live'     //buildState is for switching between Live and Beta build of bot easier to deploy so that no need to keep commenting out the code to change build

switch (buildState){
    case 'Live':
        //Live Command Deployment
        const commandFile = fs.readdirSync(`./src/commands`).filter(file => file.endsWith('.js'));
        for (const file of commandFile){
            const command = require(path.join(__dirname,'commands',file));
            console.log(file);
            client.commands.set(command.data.name, command);
        }
        client.on('ready',()=> {
            client.user.setActivity(`Valorant Randomizer is active test it out in #command-the-army using vrandom command`);
        });
}
switch (buildState){
    case 'Beta':
        //Beta Command Deployment
        const commandFile = fs.readdirSync(`./src/betacommands`).filter(file => file.endsWith('.js'));
        for (const file of commandFile){
            const command = require(path.join(__dirname,'betacommands',file));
            console.log(file);
            client.commands.set(command.data.name, command);
        }
        client.on('ready',()=> {
            client.user.setActivity(`This piece of shit is alive for the moment- Lazy (currenty working)`);
        });
        
}

client.on(Events.InteractionCreate, async interation => {
    if (!interation.isChatInputCommand()) return;
    const command = client.commands.get(interation.commandName);
    if (!command) return;
    try{
        await command.execute(interation);
    } catch (error){
        console.error(error);
        await interation.reply({content: `Error has occured while executing`})
    }
});


=======
const client = new Client({
    intents: ['MessageContent','Guilds', 'GuildMessages', 'GuildVoiceStates', 'GuildEmojisAndStickers'],
});



client.commands = new Collection();

const buildState = 'Live'; // Change this according to your build state

switch (buildState) {
    case 'Live':
        // Live Command Deployment
        const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
        console.log('Loading commands')
        for (const file of commandFiles) {
            const command = require(path.join(__dirname, 'commands', file));
            console.log('Command loaded', file);
            client.commands.set(command.data.name, command);
        }
        client.on('ready', () => {
            console.log('logged in as ', client.user.username);
            client.user.setActivity(`Protobot Release V1.1 is active.`);
        });
        break;
    case 'Beta':
        // Beta Command Deployment
        const betaCommandFiles = fs.readdirSync('./src/betacommands').filter(file => file.endsWith('.js'));
        console.log('Loading BETA commands')
        for (const file of betaCommandFiles) {
            const command = require(path.join(__dirname, 'betacommands', file));
            console.log('Command loaded', file);
            client.commands.set(command.data.name, command);
        }
        client.on('ready', () => {
            client.user.setActivity(`This piece of shit is alive for the moment- Lazy (currently working)`);
            console.log('logged in as ', client.user.username);
        });
        break;
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: `Error has occurred while executing` });
    }
});

 //Execute the messageTracker module for every message event
//client.on(Events.MessageCreate, message => {
//    messageTracker.execute(message);
//});

>>>>>>> Stashed changes
client.login(protobotAuthToken);
