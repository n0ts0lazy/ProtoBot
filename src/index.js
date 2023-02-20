const {Client,Collection, Events, GatewayInternBits} = require ('discord.js');
const fs = require('node:fs');
const path = require ('node:path');


require('dotenv').config()
const {authToken, clientID} = process.env;

const client = new Client({ intents:['Guilds','GuildMessages','GuildVoiceStates','GuildEmojisAndStickers'] });

console.log('logged in as ', authToken)


const commandFile = fs.readdirSync(`./src/commands`).filter(file => file.endsWith('.js'));

client.commands = new Collection();

for (const file of commandFile){
    const command = require(path.join(__dirname,'commands',file));
    console.log(file);
    client.commands.set(command.data.name, command);
}

client.on('ready',()=> {
    client.user.setActivity(`This piece of shit is alive for the moment- Lazy (currenty working)`);
});

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


client.login(authToken);
