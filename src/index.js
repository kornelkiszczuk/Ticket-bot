const { Client,
    IntentsBitField,
    EmbedBuilder,
    AttachmentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType } = require('discord.js')

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

const userChannelData = new Map();
// do zapisywania id usera ktory założył kanał

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isAnySelectMenu()) return;

    if (interaction.customId === "create-ticket") {

        const timestamp = interaction.createdTimestamp;
        const date = new Date(timestamp);
        const user = interaction.user;


        const channel = await interaction.guild.channels.create({
            name: `${interaction.values}-${interaction.user.tag}`,
            type: ChannelType.GuildText,
            parent: "1091071531507011624",
            permissionOverwrites: [
                {
                    id: '1091731417072930877',
                    allow: ['0x00000400']
                },
                {
                    id: '1091731492213895259',
                    allow: ['0x00000400']
                },
                {
                    id: '1091731552809009314',
                    allow: ['0x00000400']
                },
                {
                    id: '1091731587030339604',
                    allow: ['0x00000400']
                },
                {
                    id: '1091731637148069891',
                    allow: ['0x00000400']
                },
                {
                    id: interaction.user.id,
                    allow: ['0x00000400']
                }
            ]
        })
        await interaction.reply({
            content: `Kanał został stworzony! Klinkij, aby przejść: ${channel.toString()}`,
            ephemeral: true,
        });
        // poniżej zapisuje użytkownika
        userChannelData.set(channel.id, user.id)
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.avatarURL() })
            .setDescription("Wkrótcę zjawi się tu ktoś, aby Ci pomóc.")
            .setColor("#adecea")
            .setFooter({ text: date.toLocaleString(), iconURL: 'https://i.imgur.com/iZUkMPH.png' });

        const row = new ActionRowBuilder();

        row.components.push(
            new ButtonBuilder()
                .setCustomId("exit-ticket")
                .setLabel('Zamknij')
                .setStyle(ButtonStyle.Danger)
        )

        await channel.send({
            content: `<@${interaction.user.id}>`,
            embeds: [embed],
            components: [row]
        })

        switch (interaction.values[0]) {
            case "ck":
                channel.send('```Imię i nazwisko postaci: \nIndex postaci (numer w nawiasie pod id): \nJak długo odgrywasz swoją postać (pomiń przy CK dla innej osoby)): \nPoweód uśmiercenia postaci (opis):```')
                break;
            case "bledy":
                channel.send(' ```Zgłaszający gracz: \nKrótki opis błędu: \nCzy próbowałeś odtworzyć błąd: \nCzy udało ci się odtworzyć błąd?: \nJak odtworzyć błąd: Film:``` ')
                break;
            default:
                break;
        }
    }
})


client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "exit-ticket") {
        await interaction.deferReply()
        const btns = [
            {
                customId: "confirm-exit-ticket",
                label: "Potwierdź",
                color: ButtonStyle.Primary
            },
            {
                customId: "cancel",
                label: "Anuluj",
                color: ButtonStyle.Secondary
            },
        ]

        const embed = new EmbedBuilder()
            .setDescription("Napewno chcesz zamknąć ticket ?")
            .setColor("#adecea")

        const row = new ActionRowBuilder();

        btns.forEach((btn) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(btn.customId)
                    .setLabel(btn.label)
                    .setStyle(btn.color)
            )
        })

        await interaction.editReply({
            content: `<@${interaction.user.id}>`,
            embeds: [embed],
            components: [row]
        })
    }
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "cancel") {
        await interaction.message.delete();
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "confirm-exit-ticket") {
        try {
            const timestamp = interaction.createdTimestamp;
            const date = new Date(timestamp);
            const channel = client.channels.cache.get(interaction.channelId);
            const transcriptChannel = client.channels.cache.get("1092099439725903912")
            const getUserId = userChannelData.get(channel.id)
            const userOfTicket = await client.users.fetch(getUserId);
            const messages = await channel.messages.fetch();
            const transcript = [];

            messages.forEach(msg => {
                const timestamp = msg.createdTimestamp;
                const date = new Date(timestamp);

                const line = `
                <div class="ticket-message">
                    <img src="${msg.author.avatarURL()}" width="40px" style="border-radius: 50%;">
                    <div class="ticket-message-content">
                        <div class="ticket-message-content-info">
                            <p class="ticket-message-content-info-author">${msg.author.username}</p>
                            <p class="ticket-message-content-info-date">${date.toLocaleString()}</p>
                        </div>
                        <p>${msg.content}</p>
                    </div>
                </div>`
                transcript.push(line);
            });

            const htmlCode = `<html>
            <head>
                <meta name="viewport" content="width=device-width">
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
                <style>
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }

                    html {
                        font-size: 62.5%;
                    }

                    body {
                        font-family: 'Roboto', sans-serif;
                        background-color: #36393E;
                        color: white;
                        line-height: 1;
                    }


                    p {
                        font-size: 1.6rem;
                    }

                    .ticket-header {
                        display: flex;
                        align-items: center;
                        gap: 2rem;
                        padding: 1.2rem 1rem;
                        border-bottom: 1px solid rgba(79, 84, 92, 0.48);
                    }

                    .ticket-header p {
                        margin-bottom: 1.2rem;
                    }

                    .ticket-header p:nth-last-child(1) {
                        margin-bottom: 0px;
                    }

                    .ticket-header .ticket-header-title {
                        font-size: 2.5rem;
                        font-weight: 500;
                    }

                    .ticket-message {
                        height: 50px;
                        margin-top: 1rem;
                        padding-inline: 1rem;
                        display: flex;
                        align-items: center;
                        gap: 20px;
                    }

                    .ticket-message:hover {
                        background-color: #32353A;
                    }

                    .ticket-message .ticket-message-content-info {
                        display: flex;
                        align-items: center;
                        gap: .5rem;
                        margin-bottom: 1rem;
                    }

                    .ticket-message .ticket-message-content-info-author {
                        font-weight: 500;
                    }

                    .ticket-message .ticket-message-content-info-date {
                        font-size: 1.2rem;
                    }
                </style>
            </head>

            <body>
                <div class="ticket-header">
                    <img class="ticket-header-logo" src="https://i.imgur.com/iZUkMPH.png" width="75px">
                    <div class="ticket-header-text">
                        <p class="ticket-header-title">Heaven Project</p>
                        <p class="ticket-header-name">#ticket-${userOfTicket.tag}</p>
                        <p class="ticket-user-id">${userOfTicket.id}</p>
                    </div>
                </div>
                ${transcript.join('\n')}
            </body>
            </html>
            `
            const attachment = new AttachmentBuilder(Buffer.from(htmlCode), { name: 'transcript.html' });
            await transcriptChannel.send({ content: `<@${userOfTicket.id}> - ${date.toLocaleString()}`, files: [attachment] })
            await userOfTicket.send({ content: `Ticket został zamknięty przez <@${interaction.user.id}>.`, files: [attachment] })
            interaction.guild.channels.delete(interaction.channelId)

        } catch (error) {
            console.error(error);
        }
    }
});

client.login(process.env.TOKEN)