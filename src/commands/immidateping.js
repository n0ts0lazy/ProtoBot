const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping2')
        .setDescription('maybe a faster ping'),
    execute(message) {
        message.reply("Faster Response maybe????")
    },
};