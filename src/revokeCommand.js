const { REST, Routes } = require('discord.js');
require('dotenv').config()
const {protobotAuthToken, protobotClientID} = process.env;

const rest = new REST({ version: '10' }).setToken(protobotAuthToken);

const tokenID = 'tokenID';

// for global commands
rest.delete(Routes.applicationCommand(protobotClientID, tokenID))
	.then(() => console.log('Successfully deleted application command with token ID:',tokenID))
	.catch(console.error);