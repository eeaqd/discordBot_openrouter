require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const TEST_GUILD_ID = process.env.TEST_GUILD_ID;

if (!DISCORD_TOKEN || !CLIENT_ID || !TEST_GUILD_ID) {
    console.error('❌ Error: Ensure that DISCORD_TOKEN, CLIENT_ID, and TEST_GUILD_ID are set in the .env');
    process.exit(1);
}

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

async function deployCommands(scope) {
    try {
        console.log('🔄 Update commands...');

        if (scope === 'global') {
            console.log('🌍 We register global commands...');
            await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
            console.log('✅ Global commands have been updated!');
        } else {
            console.log('🏠 Registering local commands for the server...');
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), { body: commands });
            console.log('✅ Local commands have been updated!');
        }
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }
}

const args = process.argv.slice(2);
const scope = args[0] === 'global' ? 'global' : 'local';
deployCommands(scope);

// const { REST, Routes } = require('discord.js');
// const fs = require('node:fs');
// const path = require('node:path');
// require('dotenv').config();
//
// const commands = [];
// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
//
// // Завантаження кожної команди та додавання її даних у масив
// for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//     const command = require(filePath);
//     if ('data' in command && 'execute' in command) {
//         commands.push(command.data.toJSON());
//     } else {
//         console.log(`[WARNING] Команда у файлі ${filePath} не містить властивостей data або execute.`);
//     }
// }
//
// const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
//
// (async () => {
//     try {
//         console.log('Розпочато оновлення slash-команд.');
//         await rest.put(
//             Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
//             { body: commands }
//         );
//         console.log('Slash-команди успішно оновлено.');
//     } catch (error) {
//         console.error(error);
//     }
// })();
