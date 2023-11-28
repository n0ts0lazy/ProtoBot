const {SlashCommandBuilder,EmbedBuilder,AttachmentBuilder} = require('discord.js')

module.exports={
    // Slash sub-commands
    data: new SlashCommandBuilder()
    .setName('vrandom')
    .setDescription('testing randomizer with images with corresponding asset')
    .addSubcommand(command => command .setName('agent')
        .setDescription('Valorant Agent selected from one of 22 available agents')
    )
    .addSubcommand(command => command .setName('role')
        .setDescription('Valorant Role selected from one of 4 available roles')
    )
    .addSubcommand(command => command .setName('agent-role')
        .setDescription('Play the given Agent (22) with the given Role(4)')
    )
    .addSubcommand(command => command .setName('primary-gun')
        .setDescription('Valorant Weapon selected from one of 12 available primary guns')
    )
    .addSubcommand(command => command .setName('secondary-gun')
        .setDescription('Valorant Weapon selected from one of 5 available secondary guns')
    )
    .addSubcommand(command => command .setName('gun')
        .setDescription('Valorant Weapon selected from one of 17 available gun')
    )
    .addSubcommand(command => command .setName('gun-pair')
        .setDescription('Valorant Weapon Pair selected from one of 17 available gun')
    )
    .addSubcommand(command => command .setName('agent-gun')
        .setDescription('Valorant Agent & Weapon Pair selected from one of 22 available agents & 12 available primary gun')
    )
    .addSubcommand(command => command .setName('whole-loadout')
        .setDescription('Valorant Entire Loadout is now Randomized')
    ),
    async execute (interaction){
        const command = interaction.options.getSubcommand();
        // Randomizer pool
        const agents = [
            'Astra',    'Brimstone',    'Harbor',   'Omen',     'Viper',            
            'Iso',      'Jett',         'Neon',     'Phoenix',  'Raze',     'Reyna',    'Yoru',
            'Breach',   'Fade',         'Gekko',    'KAY/O',    'Skye',    'Sova',       
            'Chamber',  'Cypher',       'Deadlock', 'Killjoy',  'Sage'
        ]
        const roles = [
            'Controller',
            'Duelist',
            'Initiator',
            'Sentinel'
        ]
        const primaryArmoury = [
            'Ares',     'Odin',
            'Bucky',    'Judge',    
            'Bulldog',  'Guardian', 'Phantom',  'Vandal',
            'Marshal',  'Operator',
            'Spectre',  'Stinger'
        ]
        const secondaryArmoury = [
            'Classic',
            'Frenzy',
            'Ghost',
            'Sheriff',  'Shorty'
        ]
        const entireArmoury = [
            ...primaryArmoury,
            ...secondaryArmoury
        ]

        // Bot Logo
        const bot = new AttachmentBuilder('src/assets/proto.png');

        // Randomizer Function
        let resultAgent= agents[Math.floor(Math.random() * agents.length)];
        let resultRole= roles[Math.floor(Math.random() * roles.length)]
        let resultPrimary= primaryArmoury[Math.floor(Math.random() * primaryArmoury.length)]
        let resultSecondary= secondaryArmoury[Math.floor(Math.random() * secondaryArmoury.length)]
        const resultGun= entireArmoury[Math.floor(Math.random() * entireArmoury.length)]
        
        // Temporary Vaules to store and send 
        let agentSelected;
        let exceptionAgent;

        // Randomize Agent 
        if (resultAgent === 'KAY/O'){
            exceptionAgent= 'KAYO';
            agentSelected = new AttachmentBuilder(`src/assets/valorant/agent/${exceptionAgent}.png`);
            var sendAgent= String(resultAgent);
        }
        else{
            exceptionAgent= resultAgent;
            agentSelected = new AttachmentBuilder(`src/assets/valorant/agent/${exceptionAgent}.png`);
            var sendAgent= String(exceptionAgent);
        }

        const roleSelected = new AttachmentBuilder(`src/assets/valorant/agent/${resultRole}.png`);
        var sendRole= String(resultAgent);

        const primaryselected = new AttachmentBuilder(`src/assets/valorant/agent/${resultAgent}.png`);
        var sendPrimary= String(primaryselected);

        const secondaryselected = new AttachmentBuilder(`src/assets/valorant/agent/${resultAgent}.png`);
        var sendSecondary= String(secondaryselected);

        const gunselected = new AttachmentBuilder(`src/assets/valorant/agent/${resultAgent}.png`);
        var sendGun= String(gunselected);

        
        const embedAgent = new EmbedBuilder()
        .setColor('#fe4657')
        .setTitle('Randomizer Result')
        .setThumbnail('attachment://proto.png')
        .setImage(`attachment://${exceptionAgent}.png`)
        .addFields({name: 'Your Agent', value: `${sendAgent}`})
        .setTimestamp();
        
            //await interaction.reply({embeds : [embed1], files : [bot,agentSelected]});
        switch (command){
            case 'agent':
                await interaction.reply({embeds : [embedAgent], files : [bot,agentSelected]})
        }
}};