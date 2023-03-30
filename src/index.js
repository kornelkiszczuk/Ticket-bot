const { Client, IntentsBitField, EmbedBuilder } = require('discord.js')
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is ready`)
})

// client.on('messageCreate', (msg) => {
//     if (msg.content === "dupa" && !msg.author.bot) {
//         msg.reply("dupa")
//     }

// })

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "embed") {
        const embed = new EmbedBuilder()
            .setTitle("Embed title")
            .setDescription("This is an embed description")
            .setColor('Random')


        interaction.reply({ embeds: [embed] })

    }

    // if (interaction.commandName === "add") {
    //     const num1 = interaction.options.get('first-number')
    //     const num2 = interaction.options.get('second-number')
    //     const result = num1.value + num2.value
    //     interaction.reply(`wynik dodawania: ${result}`)
    // }



})

client.login(process.env.TOKEN)