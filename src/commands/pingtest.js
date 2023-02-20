const { SlashCommandBuilder } = require("discord.js");

module.exports={
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('This idiot will respond'),
    async execute (interaction) {

        await interaction.reply('I IS ALIVE AND EAT THE PONG');    
}};
