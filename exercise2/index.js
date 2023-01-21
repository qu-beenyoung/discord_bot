const fs = require("fs");
const path = require("path");

const { Client, Collection, Events, GatewayIntentBits } = require("discord.js"); //collection이 중요함
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ],
});

//여기서부터는 커맨드 등록
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands"); //파일경로를 나타내는 변수
const commandFiles = fs
  .readdirSync(commandsPath) //파일을 다 읽을 때 까지
  .filter((file) => file.endsWith(".js")); // .js로 끝나는 파일만 filter에 넣는다

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log("데이터가 제대로 처리되지 않았습니다. 스킵합니다...");
  }
}

console.log(client.commands);

//여기서부터는 이벤트 처리
client.on(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});


client.on('ready', () => {
    console.log('준비되었습니다!');
  });
  
  // 새로운 멤버가 들어오면, 환영 메세지를 보냅니다
  client.on('guildMemberAdd', member => {
    member.guild.channels.get(process.env.CLIENT_ID).send("환영해요!"); 
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
  
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
  
    const command = interaction.client.commands.get(interaction.commandName);
  
    if (!command) {
      console.log("구현되지 않은 명령어입니다.");
      return;
    }
  
    try { //try문 안에서 오류가 발생하게 된다면 바로 catch문의 내용을 실행한다
      await command.execute(interaction);
    } catch (error) {
      interaction.reply("명령어를 실행하는데 요류가 발생했습니다.");
      console.log(error);
    }
  });

  client.login(process.env.TOKEN);