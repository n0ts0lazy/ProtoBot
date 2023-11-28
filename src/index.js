const {Client,Collection, Events, GatewayInternBits} = require ('discord.js');
const {joinVoiceChannel} = require ('@discordjs/voice')
const fs = require('node:fs');
const path = require ('node:path');


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


client.login(protobotAuthToken);
