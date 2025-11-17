const {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  AttachmentBuilder
} = require('discord.js');
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.User, Partials.GuildMember]
});

client.on(Events.GuildMemberAdd, async (member) => {
  try {
    // --- Powitanie ---
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
    if (welcomeChannel) {

      const embedWelcome = new EmbedBuilder()
        .setColor("#000000")
        .setTitle("🔥  Hitmc.pl × WITAMY")
        .setDescription(
          `• 🧑‍🦱 ✖ Witaj **${member.user.username}** na Hitmc.pl!\n` +
          `• ✨ ✖ Dołączono na serwer **przed chwilą**\n` +
          `• 👥 ✖ Aktualnie jest nas: **${member.guild.memberCount}** osób!`
        )
        .setThumbnail(member.user.displayAvatarURL({ extension: "png", size: 512 }))
        .setImage("https://cdn.discordapp.com/attachments/1405565162429223004/1405577499395620864/lobby1.png")
        .setFooter({ text: "Witaj na serwerze!" });

      await welcomeChannel.send({ embeds: [embedWelcome], files: [lobbyBanner] });
    }

    // --- Wysyłanie wiadomości weryfikacyjnej z przyciskiem ---
    const verifyChannelId = process.env.VERIFY_CHANNEL_ID; // wpisz w .env ID kanału weryfikacji
    const verifyChannel = member.guild.channels.cache.get(verifyChannelId);
    if (verifyChannel) {
      const embedVerify = new EmbedBuilder()
        .setTitle("👋 Weryfikacja")
        .setDescription("Aby sie zweryfikować na naszym serwerze Discord, kliknij przycisk poniżej. Po weryfikacji dosatniesz range która umożliwi ci dostęp do kanałów. © Copyright Hitmc.pl - 2025")
        
        .setColor("#2b2d31");

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("verify_button")
          .setLabel("Zweryfikuj")
          .setStyle(ButtonStyle.Success)
      );

      await verifyChannel.send({ embeds: [embedVerify], components: [row] });
    }
  } catch (err) {
    console.log("Błąd w event GuildMemberAdd:", err);
  }
});

// --- Obsługa kliknięcia przycisku weryfikacji ---
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "verify_button") {
    try {
      const roleId = process.env.VERIFIED_ROLE_ID;
      if (!roleId) {
        return interaction.reply({ content: "Nie skonfigurowano roli weryfikacji.", ephemeral: true });
      }

      const member = interaction.member;
      if (!member) {
        return interaction.reply({ content: "Nie można znaleźć użytkownika na serwerze.", ephemeral: true });
      }

      if (member.roles.cache.has(roleId)) {
        return interaction.reply({ content: "Masz już nadaną rolę weryfikacji.", ephemeral: true });
      }

      await member.roles.add(roleId);

      await interaction.reply({ content: "Zweryfikowano pomyślnie!", ephemeral: true });

      setTimeout(() => {
        interaction.channel.send(`${member.user.tag} został pomyślnie zweryfikowany! 🎉`);
      }, 2000);
    } catch (error) {
      console.error("Błąd przy weryfikacji:", error);
      if (!interaction.replied) {
        interaction.reply({ content: "Coś poszło nie tak podczas weryfikacji.", ephemeral: true });
      }
    }
  }
});

client.login(process.env.TOKEN);
