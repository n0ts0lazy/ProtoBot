const { SlashCommandBuilder, EmbedBuilder,AttachmentBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Lemme see that beautiful profile pic mate')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Lemme see that beautiful profile pic mate')
                .setRequired(true)),
    async execute(interaction) {
        // Get the mentioned user from the command's options
        const mentionedUser = interaction.options.getUser('user');

        const avatarURL = mentionedUser.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
        const bot = new AttachmentBuilder('ProtoBot//src/assets/proto.png');

        // Build the embed
        const embed = new EmbedBuilder()
            .setColor('#6eeb34')
            .setTitle('Say Cheese')
            .setThumbnail('attachment://proto.png')
            .setDescription(`Look at this dude`)
            .setImage(avatarURL)
            .addFields({ name: 'Discord Username: ', value: `${mentionedUser.username}` })
            .setTimestamp();

        // Reply with the embed
        await interaction.reply({ embeds: [embed] ,files: [bot]});
    }
};
