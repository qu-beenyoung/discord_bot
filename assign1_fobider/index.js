const { Client, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
});

client.on(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});


client.on('ready', () => {
    console.log('준비되었습니다!');
  });
  
  // 메세지에 대한 이벤트 리스너를 생성합니다.
  client.on(Events.MessageCreate, (message) => {
    const re = /부(.*)호(.*)호/;
    if (message.member.user.bot) return;

    // 메세지가 만약 "부호호" 라면,
    if (re.test(message.content)) {
      // 메세지를 보낸 사람을 언급 한뒤 채널에 "부호호 금지."를 전송
      const user = message.author;
      message.delete();
      return message.channel.send(`<@${user.id}> 부호호 금지령.`);
    }
  });

  client.login(process.env.TOKEN);