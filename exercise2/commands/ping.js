const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("핑") //command 이름
    .setDescription("퐁 이라고 대답할까요?"), //command 설명
  async execute(interaction) {
    await interaction.reply("퐁");
  },
};