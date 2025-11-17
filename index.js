require("dotenv").config();
client.on("guildMemberAdd", async (member) => {
  const channelId = process.env.WELCOME_CHANNEL_ID;
  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) return;

  const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

  // grafika LOBBY (opcjonalnie)
  const lobbyBanner = new AttachmentBuilder("./assets/lobby.png");

  const embed = new EmbedBuilder()
    .setColor("#000000")
    .setTitle("'''🔥  Hitmc.pl × WITAMY'''")
    .setDescription(
      `• 🧑‍🦱 ✖ Witaj **${member.user.username}** na Hitmc.pl!\n` +
      `• ✨ ✖ Dołączono na serwer **przed chwilą**\n` +
      `• 👥 ✖ Aktualnie jest nas: **${member.guild.memberCount}** osób!`
    )
    // ✔ avatar osoby, która dołączyła
    .setThumbnail(member.user.displayAvatarURL({ extension: "png", size: 512 }))
    .setImage("https://cdn.discordapp.com/attachments/1405565162429223004/1405577499395620864/lobby1.png?ex=691beb4e&is=691a99ce&hm=79d4537d7bf4bbed0da181c91743eeb89641b44ee19802a01458628a1d513976&")
    .setFooter({ text: "Witaj na serwerze!" });

  channel.send({ embeds: [embed], files: [lobbyBanner] });
});

