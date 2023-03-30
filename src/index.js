const { Client, IntentsBitField, EmbedBuilder, GatewayIntentBits, AttachmentBuilder } = require('discord.js')

const fs = require('fs');
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

// client.on('interactionCreate', (interaction) => {
//     if (!interaction.isChatInputCommand()) return;

//     if (interaction.commandName === "embed") {
//         // const embed = new EmbedBuilder()
//         //     .setTitle("Embed title")
//         //     .setDescription("This is an embed description")
//         //     .setColor('Random')


//         // interaction.reply({ embeds: [embed] })
//         const channel = client.channels.cache.get('1091071503220613211');
//         const messages = channel.messages.fetch();

//         const transcript = [];

//         messages.forEach(message => {
//             const line = `${message.author.username} (${message.createdAt}): ${message.content}`;
//             transcript.push(line);
//         });

//         // fs.writeFileSync('transcript.txt', transcript.join('\n'));
//         console.log(transcript)

//     }
// })
const CHANNEL_ID = '1091071503220613211';


client.on('messageCreate', async message => {
    if (message.channel.id === CHANNEL_ID && message.content === '/transcript') {
        try {
            const channel = client.channels.cache.get(CHANNEL_ID);
            const user = await client.users.fetch("424665559724982275");
            const messages = await channel.messages.fetch();
            const transcript = [];

            messages.forEach(msg => {
                const line = `${msg.author.username}: ${msg.content}`;
                transcript.push(line);
            });

            const attachment = new AttachmentBuilder(Buffer.from(transcript.join('\n')), { name: 'transcript.txt' });
            await channel.send({ content: "Here is the transcript", files: [attachment] })
            await user.send({ content: "Here is the transcript", files: [attachment] })

        } catch (error) {
            console.error(error);
        }
    }
});





// if (interaction.commandName === "add") {
//     const num1 = interaction.options.get('first-number')
//     const num2 = interaction.options.get('second-number')
//     const result = num1.value + num2.value
//     interaction.reply(`wynik dodawania: ${result}`)
// }




client.login(process.env.TOKEN)