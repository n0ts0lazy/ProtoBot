const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const agents = [
    'Astra', 'Brimstone', 'Clove', 'Harbor', 'Omen', 'Viper',
    'Iso', 'Jett', 'Neon', 'Phoenix', 'Raze', 'Reyna', 'Yoru',
    'Breach', 'Fade', 'Gekko', 'KAY/O', 'Skye', 'Sova',
    'Chamber', 'Cypher', 'Deadlock', 'Killjoy', 'Sage', 'Vyse'
]
const roles = [
    'Controller',
    'Duelist',
    'Initiator',
    'Sentinel'
]
const primaryArmoury = [
    'Ares', 'Odin',
    'Bucky', 'Judge',
    'Bulldog', 'Guardian', 'Phantom', 'Vandal',
    'Marshal', 'Operator', 'Outlaw',
    'Spectre', 'Stinger'
]
const secondaryArmoury = [
    'Classic',
    'Frenzy',
    'Ghost',
    'Sheriff', 'Shorty'
]
const entireArmoury = [
    ...primaryArmoury,
    ...secondaryArmoury,
    'Melee'
]
module.exports = {
    // Slash sub-commands
    data: new SlashCommandBuilder()
        .setName('vrandom')
        .setDescription('Valorant randomizer command check subcommands for more')
        .addSubcommand(command => command.setName('agent')
            .setDescription(`Valorant Agent selected from one of ${agents.length} available agents`)
        )
        .addSubcommand(command => command.setName('role')
            .setDescription(`Valorant Role selected from one of ${roles.length} available roles`)
        )
        .addSubcommand(command => command.setName('agent-role')
            .setDescription(`Play the given Agent (${agents.length}) with the given Role(${roles.length})`)
        )
        .addSubcommand(command => command.setName('primary-gun')
            .setDescription(`Valorant Weapon selected from one of ${primaryArmoury.length} available primary guns`)
        )
        .addSubcommand(command => command.setName('secondary-gun')
            .setDescription(`Valorant Weapon selected from one of ${secondaryArmoury.length} available secondary guns`)
        )
        .addSubcommand(command => command.setName('gun')
            .setDescription(`Valorant Weapon selected from one of ${entireArmoury.length} available weapons`)
        )
        .addSubcommand(command => command.setName('gun-pair')
            .setDescription(`Valorant Weapon Pair selected from one of ${primaryArmoury.length} Primaries and ${secondaryArmoury.length} Secondaries`)
        )
        .addSubcommand(command => command.setName('agent-gun')
            .setDescription(`Valorant Agent & Weapon Pair selected from one of ${agents.length} available agents & ${secondaryArmoury.length + primaryArmoury.length} available gun`)
        )
        .addSubcommand(command => command.setName('whole-loadout')
            .setDescription(`Valorant Entire Loadout is now Randomized with at least 1 Gun, 1 Role and 1 Agent`)
        ),
    async execute(interaction) {
        const command = interaction.options.getSubcommand();
        // Randomizer pool

        // Bot Logo
        const bot = new AttachmentBuilder('ProtoBot/src/assets/proto.png');

        // Randomizer Function

        let resultAgent = agents[Math.floor(Math.random() * agents.length)];
        let agentSelected;
        let exceptionAgent;

        let resultRole = roles[Math.floor(Math.random() * roles.length)];
        let roleSelected;

        let resultPrimary = primaryArmoury[Math.floor(Math.random() * primaryArmoury.length)];
        let primaryselected;

        let resultSecondary = secondaryArmoury[Math.floor(Math.random() * secondaryArmoury.length)];
        let secondaryselected;

        let resultGun = entireArmoury[Math.floor(Math.random() * entireArmoury.length)];
        let gunselected;



        //await interaction.reply({embeds : [embed1], files : [bot,agentSelected]});
        switch (command) {
            case 'agent':
                // Randomize Agent 
                if (resultAgent === 'KAY/O') {
                    exceptionAgent = 'KAYO';
                    agentSelected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/agent/${exceptionAgent}.png`);
                    var sendAgent = String(resultAgent);
                }
                else {
                    exceptionAgent = resultAgent;
                    agentSelected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/agent/${exceptionAgent}.png`);
                    var sendAgent = String(exceptionAgent);
                }

                const embedAgent = new EmbedBuilder()
                    .setColor('#fe4657')
                    .setTitle('Randomizer Result')
                    .setThumbnail('attachment://proto.png')
                    .setImage(`attachment://${exceptionAgent}.png`)
                    .addFields({ name: 'Your Agent', value: `${sendAgent}` })
                    .setTimestamp();

                await interaction.reply({ embeds: [embedAgent], files: [bot, agentSelected] })
                break;

            case 'role':
                roleSelected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/role/${resultRole}.png`);
                var sendRole = String(resultRole);

                const embedRole = new EmbedBuilder()
                    .setColor('#FFFFFF')
                    .setTitle('Randomizer Result')
                    .setThumbnail('attachment://proto.png')
                    .setImage(`attachment://${sendRole}.png`)
                    .addFields({ name: 'Your Role', value: `${sendRole}` })
                    .setTimestamp();

                await interaction.reply({ embeds: [embedRole], files: [bot, roleSelected] })
                break;

            case 'primary-gun':
                primaryselected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/gun/${resultPrimary}.png`);
                var sendPrimary = String(resultPrimary);

                const embedPrimary = new EmbedBuilder()
                    .setColor('#FFFFFF')
                    .setTitle('Randomizer Result')
                    .setThumbnail('attachment://proto.png')
                    .setImage(`attachment://${sendPrimary}.png`)
                    .addFields({ name: 'Your Primary', value: `${sendPrimary}` })
                    .setTimestamp();

                await interaction.reply({ embeds: [embedPrimary], files: [bot, primaryselected] })
                break;

            case 'secondary-gun':
                secondaryselected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/gun/${resultSecondary}.png`);
                var sendSecondary = String(resultSecondary);

                const embedSecondary = new EmbedBuilder()
                    .setColor('#FFFFFF')
                    .setTitle('Randomizer Result')
                    .setThumbnail('attachment://proto.png')
                    .setImage(`attachment://${sendSecondary}.png`)
                    .addFields({ name: 'Your Secondary', value: `${sendSecondary}` })
                    .setTimestamp();

                await interaction.reply({ embeds: [embedSecondary], files: [bot, secondaryselected] })
                break;

            case 'gun':
                gunselected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/gun/${resultGun}.png`);
                var sendGun = String(resultGun);

                const embedGun = new EmbedBuilder()
                    .setColor('#FFFFFF')
                    .setTitle('Randomizer Result')
                    .setThumbnail('attachment://proto.png')
                    .setImage(`attachment://${sendGun}.png`)
                    .addFields({ name: 'Your Weapon', value: `${sendGun}` })
                    .setTimestamp();

                await interaction.reply({ embeds: [embedGun], files: [bot, gunselected] })
                break;

            case 'agent-gun':
                if (resultAgent === 'KAY/O') {
                    exceptionAgent = 'KAYO';
                    agentSelected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/agent/${exceptionAgent}.png`);
                    var sendAgent = String(resultAgent);
                } else {
                    exceptionAgent = resultAgent;
                    agentSelected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/agent/${exceptionAgent}.png`);
                    var sendAgent = String(exceptionAgent);
                }

                gunselected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/gun/${resultGun}.png`);
                var sendGun = String(resultGun);

                try {
                    // Load agent and gun images
                    const agentImage = await loadImage(`ProtoBot/src/assets/valorant/agent/${exceptionAgent}.png`);
                    const gunImage = await loadImage(`ProtoBot/src/assets/valorant/gun/${resultGun}.png`);

                    // Create a canvas and draw the agent and gun images with outline and drop shadow, scaling gunImage to 1.25x
                    const canvas = createCanvas(Math.max(agentImage.width, gunImage.width), agentImage.height + gunImage.height);
                    const ctx = canvas.getContext('2d');

                    // Set outline properties
                    ctx.strokeStyle = 'white'; // Set outline color
                    ctx.lineWidth = 25; // Set outline width

                    ctx.drawImage(agentImage, 0, 0);

                    // Scale only the gunImage to 1.25x
                    ctx.save();  // Save the current state
                    ctx.scale(1.25, 1.25);
                    ctx.drawImage(gunImage, (canvas.width / 1.25 - gunImage.width), (agentImage.height - gunImage.height) / 1.25);
                    ctx.restore();  // Restore to the previous state

                    // Reset outline properties to avoid affecting other drawings
                    ctx.strokeStyle = 'transparent';
                    ctx.lineWidth = 0;

                    // Apply drop shadow
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Set drop shadow color
                    ctx.shadowBlur = 10; // Set drop shadow blur radius
                    ctx.shadowOffsetX = 5; // Set drop shadow horizontal offset
                    ctx.shadowOffsetY = 10; // Set drop shadow vertical offset

                    // Draw the image again to apply drop shadow
                    ctx.drawImage(canvas, 0, 0);

                    // Reset drop shadow properties
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                    ctx.shadowOffsetX = 5;
                    ctx.shadowOffsetY = 10;


                    //ctx.drawImage(gunImage, 0, agentImage.height);

                    // Save the composite image as a temporary file
                    const relativeCachePath = 'ProtoBot/src/assets/cache';
                    const tempFilePath = `${relativeCachePath}/tempComposite.png`;

                    // Ensure the cache directory exists
                    if (!fs.existsSync(relativeCachePath)) {
                        fs.mkdirSync(relativeCachePath, { recursive: true });
                    }

                    // Write the composite image buffer to the temporary file
                    fs.writeFileSync(tempFilePath, canvas.toBuffer());

                    // Create a new AttachmentBuilder for the temporary composite image
                    const compositeImage = new AttachmentBuilder(tempFilePath);

                    // Create the main embed
                    let mainEmbed = new EmbedBuilder()
                        .setColor('#fe4657')
                        .setTitle('Randomizer Result')
                        .setThumbnail('attachment://proto.png')  // Set the thumbnail image here
                        .setImage(`attachment://tempComposite.png`)  // Set the composite image here
                        .addFields(
                            { name: 'Your Agent', value: `${sendAgent}`, inline: true },
                            { name: 'Your Weapon', value: `${sendGun}`, inline: true }

                        )
                        .setTimestamp();

                    // Reply with the main embed and the composite image
                    await interaction.reply({ embeds: [mainEmbed], files: [bot, compositeImage] });
                } catch (error) {
                    console.error('Error:', error.message);
                    await interaction.reply('An error occurred while processing the randomizer. Please try again.');
                }
                break;

            case 'whole-loadout':
                if (resultAgent === 'KAY/O') {
                    exceptionAgent = 'KAYO';
                    agentSelected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/agent/${exceptionAgent}.png`);
                    var sendAgent = String(resultAgent);
                } else {
                    exceptionAgent = resultAgent;
                    agentSelected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/agent/${exceptionAgent}.png`);
                    var sendAgent = String(exceptionAgent);
                }

                gunselected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/gun/${resultGun}.png`);
                var sendGun = String(resultGun);

                roleSelected = new AttachmentBuilder(`ProtoBot/src/assets/valorant/role/${resultRole}.png`);
                var sendRole = String(resultRole);

                try {
                    // Load agent and gun images
                    const agentImage = await loadImage(`ProtoBot/src/assets/valorant/agent/${exceptionAgent}.png`);
                    const gunImage = await loadImage(`ProtoBot/src/assets/valorant/gun/${resultGun}.png`);
                    const roleImage = await loadImage(`ProtoBot/src/assets/valorant/role/${resultRole}.png`);

                    // Create a canvas and draw the agent and gun images with outline and drop shadow, scaling gunImage to 1.25x
                    const canvas = createCanvas(Math.max(agentImage.width, gunImage.width), agentImage.height + gunImage.height);
                    const ctx = canvas.getContext('2d');

                    // Set outline properties
                    ctx.strokeStyle = 'white'; // Set outline color
                    ctx.lineWidth = 25; // Set outline width

                    ctx.drawImage(roleImage, 10, 10);
                    ctx.drawImage(agentImage, 0, 0);

                    // Scale only the gunImage to 1.25x
                    ctx.save();  // Save the current state
                    ctx.scale(1.25, 1.25);
                    ctx.drawImage(gunImage, (canvas.width / 1.25 - gunImage.width), (agentImage.height - gunImage.height) / 1.25);
                    ctx.restore();  // Restore to the previous state

                    // Reset outline properties to avoid affecting other drawings
                    ctx.strokeStyle = 'transparent';
                    ctx.lineWidth = 0;

                    // Apply drop shadow
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Set drop shadow color
                    ctx.shadowBlur = 10; // Set drop shadow blur radius
                    ctx.shadowOffsetX = 5; // Set drop shadow horizontal offset
                    ctx.shadowOffsetY = 10; // Set drop shadow vertical offset

                    // Draw the image again to apply drop shadow
                    ctx.drawImage(canvas, 0, 0);

                    // Reset drop shadow properties
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                    ctx.shadowOffsetX = 5;
                    ctx.shadowOffsetY = 10;


                    //ctx.drawImage(gunImage, 0, agentImage.height);

                    // Save the composite image as a temporary file
                    const relativeCachePath = 'ProtoBot/src/assets/cache';
                    const tempFilePath = `${relativeCachePath}/tempComposite.png`;

                    // Ensure the cache directory exists
                    if (!fs.existsSync(relativeCachePath)) {
                        fs.mkdirSync(relativeCachePath, { recursive: true });
                    }

                    // Write the composite image buffer to the temporary file
                    fs.writeFileSync(tempFilePath, canvas.toBuffer());

                    // Create a new AttachmentBuilder for the temporary composite image
                    const compositeImage = new AttachmentBuilder(tempFilePath);

                    // Create the main embed
                    let mainEmbed = new EmbedBuilder()
                        .setColor('#fe4657')
                        .setTitle('Randomizer Result')
                        .setThumbnail('attachment://proto.png')  // Set the thumbnail image here
                        .setImage(`attachment://tempComposite.png`)  // Set the composite image here
                        .addFields(
                            { name: 'Your Agent', value: `${sendAgent}`, inline: true },
                            { name: 'Your Weapon', value: `${sendGun}`, inline: true },
                            { name: 'Your Role', value: `${sendRole}`, inline: true }

                        )
                        .setTimestamp();

                    // Reply with the main embed and the composite image
                    await interaction.reply({ embeds: [mainEmbed], files: [bot, compositeImage] });
                } catch (error) {
                    console.error('Error:', error.message);
                    await interaction.reply('An error occurred while processing the randomizer. Please try again.');
                }
                break;
        }
    }
};