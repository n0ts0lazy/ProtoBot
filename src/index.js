const {Client,Collection, Events, GatewayInternBits} = require ('discord.js');
const fs = require('node:fs');
const path = require ('node:path');


require('dotenv').config()
const {authToken, clientID} = process.env;

const client = new Client({ intents:['Guilds','GuildMessages'] });

console.log('logged in as ', authToken)


const commandFile = fs.readdirSync(`./src/commands`).filter(file => file.endsWith('.js'));
//const functionFile = fs.readdirSync(`./src/functions`);

client.commands = new Collection();

/*
for (const file of functionFile){
    const functionFile = fs.readdirSync(`./src/functions/${folder}`).filter(file =>file.endsWith('.js'));
    for (const file of functionFile) require(`./functions/${folder}/${file}`)(client);
}
*/
for (const file of commandFile){
    const command = require(path.join(__dirname,'commands',file));
    //const command = require (`./src/commands/${file}`);       //IDK why this is not working
    client.commands.set(command.data.name, command);
}

client.on('ready',()=> {
    client.user.setActivity(`This piece of shit is alive for the moment- Lazy (currenty working)`);
});

client.on(Events.InterationCreate, async interation => {
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