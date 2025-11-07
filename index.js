// index.js (discord.js v14) - minimalny przykład komendy !are
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

const PREFIX = '!';

// podmień na swoje emoji ID / nazwy
const YES_EMOJI = '<:yes:>'; // dokładnie tak jak w Twoim przykładzie
const NO_EMOJI  = '<:no:>';

client.once('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // ignoruj wiadomości od bota i wiadomości bez prefixu
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const cmd = args.shift().toLowerCase();

  if (cmd === 'are') {
    // Tworzymy embed
    const embed = new EmbedBuilder()
      .setTitle('Are we legit?')
      .setDescription(
        `${YES_EMOJI}  = **Yes**\n` +
        `${NO_EMOJI}   = **No**\n\n` +
        `- Saying **No** **without proof** will get you **banned within 24 hours** unless evidence provided.`
      )
      .setColor(0x1DB954) // zielony — zmień jeśli chcesz inny odcień
      .setTimestamp();

    try {
      const sent = await message.channel.send({ embeds: [embed] });

      // Spróbuj dodać custom emoji jako reakcje. Jeśli nie będzie dostępne -> fallback na unicode.
      // Dla message.react() przy custom emoji można użyć formatu 'name:id' lub '<:name:id>'.
      // Spróbujemy z pełnym formatem '<:name:id>' i w razie błędu dodamy fallback.
      try {
        await sent.react(YES_EMOJI); // spróbuje <:yes:ID>
      } catch (err) {
        // fallback
        await sent.react('✅');
      }

      try {
        await sent.react(NO_EMOJI);
      } catch (err) {
        await sent.react('❌');
      }
    } catch (err) {
      console.error('Błąd przy wysyłaniu embedu !are:', err);
      message.channel.send('Wystąpił błąd przy wysyłaniu komendy.');
    }
  }
});

// Uruchamianie
client.login(process.env.BOT_TOKEN);
