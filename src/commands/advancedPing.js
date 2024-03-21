const { SlashCommandBuilder,AttachmentBuilder,EmbedBuilder } = require("discord.js");

module.exports={
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('This idiot will respond but more glorified'),
    async execute (interaction) {
        const bot = new AttachmentBuilder('src/assets/proto.png');
        const embed = new EmbedBuilder()
        .setColor('#ffdd00')
        .setTitle('Ping Result')
        .setDescription(`I IS ALIVE AND EAT THE PONG\n🏓 response: ${interaction.createdTimestamp - Date.now()} ms.`)
        .setThumbnail('attachment://proto.png')
        .setTimestamp();
        await interaction.reply({embeds:[embed],files: [bot]});    
}};
