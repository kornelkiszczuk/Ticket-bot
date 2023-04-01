const { Client, IntentsBitField, EmbedBuilder, GatewayIntentBits, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Chann, ChannelType } = require('discord.js')

require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', async (client) => {
    console.log(`${client.user.username} is ready!`)
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "create-ticket") {

        const channel = await interaction.guild.channels.create({
            name: interaction.user.tag,
            type: ChannelType.GuildText,
            parent: "1091071531507011624"
        })
        interaction.reply({
            content: `The channel was created! Here's the link: ${channel.toString()}`,
            ephemeral: true,
        });
    }

})


// client.on('messageCreate', async message => {
//     const CHANNEL_ID = '1091071503220613211';
//     if (message.channel.id === CHANNEL_ID && message.content === '/transcript') {
//         try {

//             const user = await client.users.fetch("424665559724982275");
//             const channel = client.channels.cache.get("1091071503220613211");
//             const messages = await channel.messages.fetch();
//             const transcript = [];

//             messages.forEach(msg => {
//                 const timestamp = msg.createdTimestamp;
//                 const date = new Date(timestamp);

//                 const line = `
//                 <div class="ticket-message">
//                     <img src="${message.author.avatarURL()}" width="40px" style="border-radius: 50%;">
//                     <div class="ticket-message-content">
//                         <div class="ticket-message-content-info">
//                             <p class="ticket-message-content-info-author">${msg.author.username}</p>
//                             <p class="ticket-message-content-info-date">${date.toLocaleString()}</p>
//                         </div>
//                         <p>${msg.content}</p>
//                     </div>
//                 </div>`
//                 transcript.push(line);
//             });

//             const htmlCode = `<html>
//             <head>
//                 <meta name="viewport" content="width=device-width">
//                 <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
//                 <style>
//                     * {
//                         box-sizing: border-box;
//                         margin: 0;
//                         padding: 0;
//                     }

//                     html {
//                         font-size: 62.5%;
//                     }

//                     body {
//                         font-family: 'Roboto', sans-serif;
//                         background-color: #36393E;
//                         color: white;
//                         line-height: 1;
//                     }


//                     p {
//                         font-size: 1.6rem;
//                     }

//                     .ticket-header {
//                         display: flex;
//                         align-items: center;
//                         gap: 2rem;
//                         padding: 1.2rem 1rem;
//                         border-bottom: 1px solid rgba(79, 84, 92, 0.48);
//                     }

//                     .ticket-header p {
//                         margin-bottom: 1.2rem;
//                     }

//                     .ticket-header p:nth-last-child(1) {
//                         margin-bottom: 0px;
//                     }

//                     .ticket-header .ticket-header-title {
//                         font-size: 2.5rem;
//                         font-weight: 500;
//                     }

//                     .ticket-message {
//                         height: 50px;
//                         margin-top: 1rem;
//                         padding-inline: 1rem;
//                         display: flex;
//                         align-items: center;
//                         gap: 20px;
//                     }

//                     .ticket-message:hover {
//                         background-color: #32353A;
//                     }

//                     .ticket-message .ticket-message-content-info {
//                         display: flex;
//                         align-items: center;
//                         gap: .5rem;
//                         margin-bottom: 1rem;
//                     }

//                     .ticket-message .ticket-message-content-info-author {
//                         font-weight: 500;
//                     }

//                     .ticket-message .ticket-message-content-info-date {
//                         font-size: 1.2rem;
//                     }
//                 </style>
//             </head>

//             <body>
//                 <div class="ticket-header">
//                     <img class="ticket-header-logo" src="https://i.imgur.com/iZUkMPH.png" width="75px">
//                     <div class="ticket-header-text">
//                         <p class="ticket-header-title">Infinity Gaming</p>
//                         <p class="ticket-header-name">#ticket-kondziu6386</p>
//                         <p class="ticket-user-id">201056229370363906</p>
//                     </div>
//                 </div>
//                 ${transcript.join('\n')}
//             </body>

//             </html>
//             `
//             const attachment = new AttachmentBuilder(Buffer.from(htmlCode), { name: 'transcript.html' });
//             await channel.send({ content: "Here is the transcript", files: [attachment] })
//             // await user.send({ content: "Here is the transcript", files: [attachment] })

//         } catch (error) {
//             console.error(error);
//         }
//     }
// });





client.login(process.env.TOKEN)