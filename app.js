const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.login(config.TOKEN);
client.config = config;
const http = require("http");
http.createServer((_, res) => res.end("如果您觀看此消息，則表示您的機器人已成功運行，並將網址添加到uptimerobot")).listen(8080)

client.on("ready", () => {
  console.log("The bot has started!");
  // 機器人狀態
  // 玩 -PLAYING
  // 聽 - LISTENING
  // 看 - WATCHING
  client.user.setActivity(`機器人遊戲`, { type: "PLAYING" });

  
  console.log("Ready!");
});

// welcome
client.on("message", async message => {
  // command handler
  if (!message.content.startsWith(config.prefix)) return;

  if (message.author.bot) return undefined;
  if (!message.content.startsWith(config.prefix)) return undefined;

  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(config.prefix.length);
  let args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args);
  } catch (e) {
    console.log(e.message);
  } finally {
    console.log(`${message.author.username} using command ${cmd}`);
  }
    
    
    
   
    
    
    

  

});
