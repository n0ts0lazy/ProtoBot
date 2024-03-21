
const { EmbedBuilder } = require('discord.js');

require('dotenv').config();
const { protobotAuditChannel,protobotAdminRoleID,protobotEveryoneRoleID } = process.env;

// Map to store message counts for each user and content
const messageCounts = new Map();

// Set the threshold and the time span
const threshold = 3; // Number of messages
const timeSpan = 10000; // 10 seconds

// Audit channel ID where the notifications will be sent
const auditChannelId = `${protobotAuditChannel}`;
const mentionAdminRole = `${protobotAdminRoleID}`;
const roleToAlert = `${protobotEveryoneRoleID}`;

module.exports = {
    name: 'messageTracker',
    execute(message) {
        
        // Check if the message is from a bot or a DM
        if (message.author.bot || !message.guild) return;

        // Get the user ID and message content
        const userId = message.author.id;
        const msgcontent = message.content;


        // Initialize or increment the message count for the user and content
        const userMessageKey = `${userId}-${msgcontent}`;
        const userMessageCount = messageCounts.get(userMessageKey) || 0;
        messageCounts.set(userMessageKey, userMessageCount + 1);

        // Check if the user exceeded the threshold within the time span
        setTimeout(() => {
            const finalMessageCount = messageCounts.get(userMessageKey) || 0;

            if (finalMessageCount >= threshold) {
                console.log(`User: ${message.author.tag}\nMessages: ${finalMessageCount} (Content: ${userMessageKey})`);
                // Get the audit channel
                const auditChannel = message.guild.channels.cache.get(auditChannelId);

                // Send the message to the audit channel
                const auditEmbed = new EmbedBuilder()
                    .setColor('#fe4657')
                    .setTitle('Sussy baka found')
                    .addFields({ name: `<:dolund:744786199159373844> shall strike`, value: `${message.author.tag} sent in total: ${finalMessageCount} messages in the server monitored by this bot`, inline: true })
                    .setTimestamp();
                
                auditChannel.send(`${'<@&' +roleToAlert + '>'} stay alert of the user mentioned above`)
                auditChannel.send({ embeds: [auditEmbed] });
                auditChannel.send(`${'<@&' + mentionAdminRole + '>'} please take action against the user`);
                auditChannel.send(`${message.member.toString()} has kommited krimes against humanity their in server alias of _@${message.author.tag}_`);
                // audit role-1210284967805063168

            }

            // Reset the message count for the user and content
            messageCounts.set(userMessageKey, 0);
        }, timeSpan);
    },
};
