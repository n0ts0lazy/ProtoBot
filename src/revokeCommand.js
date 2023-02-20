const { REST, Routes } = require('discord.js');
require('dotenv').config()
const {authToken, clientID} = process.env;

const rest = new REST({ version: '10' }).setToken(authToken);

const tokenID = 'tokenID';

// for global commands
rest.delete(Routes.applicationCommand(clientID, tokenID))
	.then(() => console.log('Successfully deleted application command with token ID:',tokenID))
	.catch(console.error);