const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')
require('dotenv').config();

const commands = [
    {
        name: "deletefromticket",
        description: "Usuwa użytkownikowi dostęp do przeglądania danego ticketu, w którym została użyta komenda",
        option: [
            {
                name: 'userid',
                description: 'numer id użytkownika',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
        ]
    },
    {
        name: "addtoticket",
        description: "Dodaje użytkownikowi dostęp do przeglądania danego ticketu, w którym została użyta komenda",
        option: [
            {
                name: 'userid',
                description: 'numer id użytkownika',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
        ]
    }
]

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);


(async () => {
    try {

        console.log('registering slash commands...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('slash commands were registered successfully!')
    } catch (error) {
        console.log(error)
    }
})();