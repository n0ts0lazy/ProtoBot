const {SlashCommandBuilder,EmbedBuilder,AttachmentBuilder} = require('discord.js')

module.exports={
    data: new SlashCommandBuilder()
    .setName('betarandomizer')
    .setDescription('testing randomizer with images with corresponding asset')
    .addSubcommand(command => command .setName('agent')
        .setDescription('Valorant Agent selected from one of 20 available agents')
    )
    .addSubcommand(command => command .setName('role')
        .setDescription('Valorant Role selected from one of 4 available roles')
    )
    .addSubcommand(command => command .setName('agent-role')
        .setDescription('Valorant Agent and Role selected from one of 20 available agents and one of 4 available roles')
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
        .setDescription('Valorant Agent & Weapon Pair selected from one of 20 available agents & 12 available primary gun')
    )
    .addSubcommand(command => command .setName('whole-loadout')
        .setDescription('Valorant Entire Loadout is now Randomized')
    ),
    async execute (interaction){
        const command = interaction.options.getSubcommand();
        const agents = [
            'Astra',    'Brimstone',    'Harbor',  'Omen',     'Viper',            
            'Jett',     'Neon',         'Phoenix',  'Raze',     'Reyna',    'Yoru',
            'Breach',   'Fade',         'Gekko',    'KAY/O',    'Skye',    'Sova',       
            'Chamber',  'Cypher',       'Deadlock', 'Killjoy',  'Sage'
        ]
        const roles = [
            'Controller',
            'Duelist',
            'Initiator',
            'Sentinel']
        const primaryArmoury = [
            'Ares',     'Odin',
            'Bucky',    'Judge',    
            'Bulldog',  'Guardian', 'Phantom',  'Vandal',
            'Marshal',  'Operator',
            'Spectre',  'Stinger']
        const secondaryArmoury = [
            'Classic',
            'Frenzy',
            'Ghost',
            'Sheriff',  'Shorty']
        const entireArmoury = [
            ...primaryArmoury,
            ...secondaryArmoury]

        const bot = new AttachmentBuilder('src/assets/proto.png');

        let resultAgent= agents[Math.floor(Math.random() * agents.length)];
        let agentselected;
        let exceptionAgent;
        if (resultAgent === 'KAY/O'){
            exceptionAgent= 'KAYO';
            agentselected = new AttachmentBuilder(`src/assets/valorant/agent/${exceptionAgent}.png`);
            var sendAgent= String(resultAgent);
        }
        else{
            exceptionAgent= resultAgent;
            agentselected = new AttachmentBuilder(`src/assets/valorant/agent/${exceptionAgent}.png`);
            var sendAgent= String(exceptionAgent);
        }

        const resultRole= roles[Math.floor(Math.random() * roles.length)]
        const roleselected = new AttachmentBuilder(`src/assets/valorant/agent/${resultRole}.png`);
        var sendRole= String(resultAgent);

        const resultPrimary= primaryArmoury[Math.floor(Math.random() * primaryArmoury.length)]
        const primaryselected = new AttachmentBuilder(`src/assets/valorant/agent/${resultAgent}.png`);
        var sendPrimary= String(primaryselected);

        const resultSecondary= secondaryArmoury[Math.floor(Math.random() * secondaryArmoury.length)]
        const secondaryselected = new AttachmentBuilder(`src/assets/valorant/agent/${resultAgent}.png`);
        var sendSecondary= String(secondaryselected);

        const resultGun= entireArmoury[Math.floor(Math.random() * entireArmoury.length)]
        const gunselected = new AttachmentBuilder(`src/assets/valorant/agent/${resultAgent}.png`);
        var sendGun= String(gunselected);

        //console.log(resultAgent,String(resultAgent));
        
        const embedAgent = new EmbedBuilder()
        .setColor('#fe4657')
        .setTitle('Randomizer Result')
        .setThumbnail('attachment://proto.png')
        .setImage(`attachment://${exceptionAgent}.png`)
        .addFields({name: 'Your Agent', value: `${sendAgent}`})
        .setTimestamp();
        
            //await interaction.reply({embeds : [embed1], files : [bot,agentselected]});
        switch (command){
            case 'agent':
                await interaction.reply({embeds : [embedAgent], files : [bot,agentselected]})
        }
}};