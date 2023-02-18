const { REST, Routes } = require('discord.js');
require('dotenv').config()
const {authToken, clientID} = process.env;

const rest = new REST({ version: '10' }).setToken(authToken);

// for global commands
rest.delete(Routes.applicationCommand(clientID, 'command ID here'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);