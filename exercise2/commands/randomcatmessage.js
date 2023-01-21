const { SlashCommandBuilder } = require("discord.js");

const scriptlist = ["냐옹", "냐", "먉", "왥옭","왥","냥","뇨","냐냥뇨"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("고양이") //command 이름
    .setDescription("양이 나오세요"), //command 설명
  async execute(interaction) {
    const index = Math.floor(Math.random() * scriptlist.length);
    await interaction.reply(scriptlist[index]);
  },
};