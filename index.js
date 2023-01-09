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
    // 메세지가 만약 "핑" 이라면,
    if (message.content === '핑') {
      // 채널에 "퐁"을 전송
      message.channel.send('퐁');
    }
  });

  client.login(process.env.TOKEN);