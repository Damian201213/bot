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
const YES_EMOJI = '<:1436500904974221392:>';
const NO_EMOJI  = '<:1436500852532580542:>';

client.once('ready', () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const cmd = args.shift().toLowerCase();

   // === !our ===
  
  else if (cmd === "our") {
    const embed = new EmbedBuilder()
      .setTitle("3 BILLION ENDING SOON!")
      .setDescription(
        "discord.gg/dsmpmarket\n[dsmpmarket.gif](https://discord.gg/kjphM7nZJb)"
      )
      .setImage("https://example.com/dsmpmarket.gif") // <- tu możesz wkleić link do swojego gifa
      .setFooter({ text: "DONUTSMP MARKETPLACE" })
      .setColor(0x00ff66);
  
  // === KOMENDA !partner ===
  if (cmd === 'partner') {
    const embed = new EmbedBuilder()
      .setDescription(`
## __ᴘᴀʀᴛɴᴇʀꜱʜɪᴘ ʀᴇǫᴜɪʀᴇᴍᴇɴᴛꜱ__ 
> ### 1 - 2000 ᴍᴇᴍʙᴇʀꜱ
* *We do not ping*
* *You ping member/everyone*
> ### 2000 - 6000 ᴍᴇᴍʙᴇʀꜱ
* *We ping partnership*
* *You ping member/everyone*
> ### 6000 + ᴍᴇᴍʙᴇʀꜱ
* *We ping here + partnership*
* *You ping member/everyone*
## ᴀᴅᴅɪᴛɪᴏɴᴀʟ ʀᴜʟᴇꜱ

> - You must ping in our advertisement.
> - You must keep our advertisement in the partnership channel for at least **5 minutes**. If you place another ad below it during that time, we will not ping for your server.
> - Partnership cooldown with pings is **12 hours** (no cooldown if we don’t have to ping).

\`\`\`
Failure to follow rules will lead to no ping for your server even if you pinged for our ad
Edited Message will result in no partnership
\`\`\`
`)
      .setColor(0x00ff00) // Zielony
      .setImage('https://cdn.discordapp.com/attachments/1398689135903899719/1431439813986222140/dsmpmarket.gif?ex=690fe0b6&is=690e8f36&hm=b48768dddc036c2925da4abeef128f12f5ded9ac3637abafa346d693a0c6a29b&') // 🔁 <- Wklej tu link do swojego baneru
      .setTimestamp();

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

  if (cmd === 'buy') {
    const embedMain = new EmbedBuilder()
      .setTitle('🎯・PAID ADVERTISEMENTS')
      .setDescription(
        '> 📢 **Advertise YOUR Server on DonutSMP Marketplace!**\n' +
        '> Reach an audience of **5,000+ active users** and grow your community fast!'
      )
      .setColor(0x1DB954);

    const embedPrices = new EmbedBuilder()
      .setTitle('💲・PRICES')
      .setDescription(
        '✨ **@everyone Ping** — **€10**\n' +
        '⚡ **<@&1436495546415059044>** — **€7**\n' +
        '📣 **@here Ping** — **€5**'
      )
      .setColor(0x1DB954);

    const embedAddons = new EmbedBuilder()
      .setTitle('🧩・ADD-ONS')
      .setDescription(
        '💎 *Boost your results with Nitro Giveaways!*\n' +
        'Users **must** join your server to claim prizes — expect up to **3× more joins!**\n\n' +
        '🎁 **Nitro Premium Giveaway** — **+€11 (2 days)** or **+€20 (7 days)**\n' +
        '🎉 **Nitro Basic Giveaway** — **+€3 (2 days)** or **+€5 (7 days)**\n' +
        '📢 **Your Own Channel** — **+€5 (2 days)** or **+€7 (7 days)** *(Maximum reach!)*'
      )
      .setColor(0x1DB954);

    const embedPackages = new EmbedBuilder()
      .setTitle('⚙️・PACKAGES (DISCOUNTED BUNDLES)')
      .setDescription(
        '### 🪙・**IRON PACKAGE** — *25% OFF*\n' +
        '✅ Your own channel *(recommended!)*\n' +
        '📈 Maximized reach\n' +
        '🔔 3× **@here Pings** *(12h cooldown each)*\n' +
        '💵 **Price:** **€15** *(~25% OFF)*\n\n' +

        '### 🥇・**GOLD PACKAGE** — *35% OFF*\n' +
        '✅ Your own channel *(recommended!)*\n' +
        '📈 Maximized reach\n' +
        '🔔 3× **@everyone Pings** *(24h cooldown each)*\n' +
        '💵 **Price:** **€25** *(~35% OFF)*\n\n' +

        '### 💎・**DIAMOND PACKAGE** — *28% OFF*\n' +
        '✅ Your own channel *(recommended!)*\n' +
        '📈 Maximized reach\n' +
        '🎉 Nitro Premium Giveaway (7D)\n' +
        '🔔 2× **@everyone Pings** *(24h cooldown each)*\n' +
        '🔔 2× **@here Pings** *(12h cooldown each)*\n' +
        '⚡ 1× **<@1436495546415059044>**\n' +
        '💵 **Price:** **€50** *(~28% OFF)*'
      )
      .setColor(0x1DB954);

    const embedPurchase = new EmbedBuilder()
      .setTitle('🛒・HOW TO PURCHASE')
      .setDescription(
        'Open a ticket in <#1436492497437069352>\n' +
        '> 💬 *Wait for me to respond before sending payment — do **NOT** pay other staff.*'
      )
      .setColor(0x1DB954);

    const embedPayment = new EmbedBuilder()
      .setTitle('💵・ACCEPTED PAYMENT METHODS')
      .setDescription(
        '💳 **PayPal (Friends & Family)** or **Venmo**\n' +
        '-# ALL TRANSACTION FEES MUST BE COVERED BY YOU!\n\n' +
        '⭐ **Get noticed. Grow faster. Advertise smart — only on DonutSMP | Market!**'
      )
      .setColor(0x1DB954)
      .setFooter({ text: 'DonutSMP Market • Advertisement System' })
      .setTimestamp();

    try {
      await message.channel.send({ embeds: [
        embedMain,
        embedPrices,
        embedAddons,
        embedPackages,
        embedPurchase,
        embedPayment
      ]});
    } catch (err) {
      console.error('Błąd przy wysyłaniu komendy !buy:', err);
      message.channel.send('❌ Wystąpił błąd przy wysyłaniu komendy.');
    }
  }

    // === !rules ===
  }
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












