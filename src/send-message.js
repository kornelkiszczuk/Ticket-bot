require('dotenv').config();
const {
    Client,
    IntentsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get("1091071468001042512")
        if (!channel) return;
        const embed = new EmbedBuilder()
            .setTitle("Pomoc")
            .setDescription("Naciśnij 📩 aby otworzyć nowy ticket!")
            .setColor("#adecea")
            .setFooter({ text: 'Infinity Gaming', iconURL: 'https://i.imgur.com/iZUkMPH.png' });

        const row = new ActionRowBuilder();

        row.components.push(
            new StringSelectMenuBuilder()
                .addOptions([
                    { label: 'ck☠️', value: 'ck' },
                    { label: 'pytanie📝', value: 'pytanie' },
                    { label: 'Zwrot✨', value: 'zwrot' },
                    { label: 'Skarga🤬', value: 'skarga' },
                    { label: 'Podanie o ub🪧', value: 'ub' },
                    { label: 'błędy🛠️', value: 'bledy' },
                    { label: 'inne🛡️', value: 'inne' },
                ])
                .setCustomId('create-ticket')
                .setPlaceholder('Wybierz kategorię 😎')
        )
        await channel.send({
            embeds: [embed],
            components: [row]
        })
        process.exit()
    } catch (error) {
        console.log(error)
    }
});

client.login(process.env.TOKEN);