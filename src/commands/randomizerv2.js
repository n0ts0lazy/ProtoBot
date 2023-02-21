const {SlashCommandBuilder} = require ('discord.js')

module.exports= {

    data: new SlashCommandBuilder()
    .setName('vrandom')
    .setDescription('Original Randomizer Bot has been integrated into ProtoBot')
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
    async execute(interaction){
        const command = interaction.options.getSubcommand();
        const agents = [
            'Astra',    'Brimstone',    'Harbour',  'Omen', 'Viper',            
            'Jett',     'Neon',         'Phoenix',  'Raze', 'Reyna',    'Yoru',
            'Breach',   'Fade',         'KAY/O',    'Skye', 'Sova',       
            'Chamber',  'Cypher',       'Killjoy',  'Sage']
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
        switch (command){
            case 'agent':
                await interaction.reply(`Your agent is ${agents[Math.floor(Math.random() * agents.length)]}.`);
        }
        switch (command){
            case 'role':
                await interaction.reply(`Your role is ${roles[Math.floor(Math.random() * roles.length)]}.`);
        }
        switch (command){
            case 'agent-role':
                await interaction.reply(`Your Agent is ${agents[Math.floor(Math.random() * agents.length)]} & Your role is ${roles[Math.floor(Math.random() * roles.length)]}.`);
        }
        switch (command){
            case 'primary-gun':
                await interaction.reply(`Your Primary Weapon is ${primaryArmoury[Math.floor(Math.random() * primaryArmoury.length)]}.`);
        }
        switch (command){
            case 'secondary-gun':
                await interaction.reply(`Your Secondary Weapon is ${secondaryArmoury[Math.floor(Math.random() * secondaryArmoury.length)]}.`);
        }
        switch (command){
            case 'gun':
                await interaction.reply(`Your Weapon is ${entireArmoury[Math.floor(Math.random() * entireArmoury.length)]}.`);
        }
        switch (command){
            case 'gun-pair':
                await interaction.reply(`Your Primary Weapon is ${primaryArmoury[Math.floor(Math.random() * primaryArmoury.length)]} & Secondary Weapon is ${secondaryArmoury[Math.floor(Math.random() * secondaryArmoury.length)]}.`);
        }
        switch (command){
            case 'agent-gun':
                await interaction.reply(`Your agent is ${agents[Math.floor(Math.random() * agents.length)]} & Your Primary Weapon is ${primaryArmoury[Math.floor(Math.random() * primaryArmoury.length)]}.`);
        }
        switch (command){
            case 'whole-loadout':
                await interaction.reply(`Your agent is ${agents[Math.floor(Math.random() * agents.length)]} & Your role is ${roles[Math.floor(Math.random() * roles.length)]}\nYour Primary Weapon is ${primaryArmoury[Math.floor(Math.random() * primaryArmoury.length)]} & Secondary Weapon is ${secondaryArmoury[Math.floor(Math.random() * secondaryArmoury.length)]}.`);
        }

}};