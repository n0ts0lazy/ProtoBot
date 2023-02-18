const { SlashCommandBuilder } = require("discord.js");

module.exports={
    data: new SlashCommandBuilder()
        .setName('sample')
        .setDescription('sample command'),
    async execute (interaction) {
        await interaction.reply('simpol');
    },
};