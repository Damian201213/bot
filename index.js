// index.js — komendy !are i !rules
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

// 🔹 Twoje emoji
const YES_EMOJI = '<:yes:>';
const NO_EMOJI  = '<:no:>';

client.once('ready', () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const cmd = args.shift().toLowerCase();

  // === !are ===
  if (cmd === 'are') {
    const embed = new EmbedBuilder()
      .setTitle('Are we legit?')
      .setDescription(
        `${YES_EMOJI} = **Yes**\n` +
        `${NO_EMOJI}  = **No**\n\n` +
        `- Saying **No** **without proof** will get you **banned within 24 hours!** unless evidence provided.`
      )
      .setColor('#1DB954')
      .setTimestamp()
      .setFooter({ text: 'DonutSMP MarketPlace' });

    try {
      const sent = await message.channel.send({ embeds: [embed] });
      try { await sent.react(YES_EMOJI); } catch { await sent.react('✅'); }
      try { await sent.react(NO_EMOJI); } catch { await sent.react('❌'); }
    } catch (err) {
      console.error('❌ Błąd przy wysyłaniu !are:', err);
      message.channel.send('Wystąpił błąd przy wysyłaniu komendy.');
    }
  }

  // === !rules ===
  else if (cmd === 'rules') {
    const embed = new EmbedBuilder()
      .setTitle('📜 The Rules')
      .setColor('#1DB954')
      .setDescription(
        `• No Spamming & Rioting\n` +
        `• No Harassing & Abusing Others\n` +
        `• No Sharing Others Information\n` +
        `• No Advertising or Promotion\n` +
        `• No Racism, Discrimination or Hate Speech\n` +
        `• No Death Threats & Suicide Encouragement\n` +
        `• No alt accounts\n` +
        `• No NSFW of any kind\n` +
        `• No impersonating staff / bots\n` +
        `• No Lying to staff\n\n` +
        `> Spam pinging any user or staff member without their consent will result in a punishment.\n` +
        `> Use common sense — don’t do things that will get you banned just because the specific rule isn’t up here.`
      )
      .setImage('https://cdn.discordapp.com/attachments/1379159241738158171/1428933277296758925/dsmpmarket_rules.png?ex=690f5411&is=690e0291&hm=aa91c627cb43e829e4f83f508e4f8e687447c2d89dbca67de8fbd832397df522&') // możesz tu wkleić swój baner "RULES"
      .setFooter({ text: 'DonutSmp | Market' })
      .setTimestamp();

    try {
      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error('❌ Błąd przy wysyłaniu !rules:', err);
      message.channel.send('Wystąpił błąd przy wysyłaniu zasad.');
    }
  }
});

client.login(process.env.BOT_TOKEN);




