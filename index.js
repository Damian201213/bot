const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const DROP_CHANNEL_ID = process.env.DROP_CHANNEL_ID || '1428466122432315472';
const cooldowns = new Map();
const COOLDOWN_TIME = 60 * 60 * 1000; // 1 godzina

const dropTable = [
  { item: '💎 Schemat pół auto totki', chance: 5 },
  { item: '🪙 1k na anarchi', chance: 5 },
  { item: '🥇 Mały ms', chance: 5 },
  { item: '🥇 Własna ranga (do wyboru)', chance: 5 },
  { item: '💀 Pusty drop', chance: 80 },
];

function losujDrop(table) {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const drop of table) {
    cumulative += drop.chance;
    if (rand < cumulative) return drop.item;
  }
  return '💀 Nic...';
}

// Rejestracja komendy /drop
const commands = [
  new SlashCommandBuilder()
    .setName('drop')
    .setDescription('🎁 Otwórz drop i wylosuj nagrodę!')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🔄 Rejestrowanie komendy /drop...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Komenda /drop zarejestrowana!');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'drop') {

    if (interaction.channelId !== DROP_CHANNEL_ID) {
      return interaction.reply({ content: `❌ Komenda /drop może być używana tylko na <#${1428466122432315472}>!`, ephemeral: true });
    }

    const userId = interaction.user.id;
    const now = Date.now();

    if (cooldowns.has(userId)) {
      const expirationTime = cooldowns.get(userId) + COOLDOWN_TIME;
      if (now < expirationTime) {
        const remaining = Math.ceil((expirationTime - now) / 60000);
        return interaction.reply({ content: `⏳ Musisz poczekać jeszcze ${remaining} minut zanim użyjesz /drop!`, ephemeral: true });
      }
    }

    const nagroda = losujDrop(dropTable);
    cooldowns.set(userId, now);

    if (nagroda === '💀 Pusty drop') {
      await interaction.reply('❌ Niestety, tym razem nic nie wypadło!');
    } else {
      await interaction.reply(`🎁 Gratulacje! Trafiłeś: **${nagroda}**`);
    }
  }
});

client.once('clientReady', () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);
});

client.login(process.env.TOKEN);

// na początku index.js (jeśli używasz discord.js)
import express from 'express';
// ... reszta importów discord.js

const app = express();
app.get('/', (req, res) => res.send('OK'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Keepalive listening on ${port}`));

// dalej twój client.login(process.env.TOKEN)