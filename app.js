const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.login(process.env.TOKEN);
client.config = config;
const http = require("http");
http.createServer((_, res) => res.end("Alive")).listen(8080)

client.on("ready", () => {
  console.log("The bot has started!");
  // bot status
  client.user.setActivity(`GAME_HERE`, { type: "PLAYING" });

  
  console.log("Ready!");
});

// welcome
client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === '📈出入紀錄-memberlog');
	if (!channel) return;
    const channel1 = member.guild.channels.cache.find(ch => ch.name === '🛎入群通知-notices');
     if (!channel1) return;
	channel.send(`${member}, 歡迎光臨 **${member.guild.name}**! 進來就不要走啦, 順便觀看<#752733852237168783>, 感謝 :)`);
});
// leave
client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === '📈出入紀錄-memberlog');
  if (!channel) return;
    channel.send(`👋 ${member.user.username}#${member.user.discriminator}, 離開了本群組, 我們有緣再見`);
});

client.on("message", async message => {
  // command handler
  if (!message.content.startsWith(config.prefix)) return;

  if (message.author.bot) return undefined;
  if (!message.content.startsWith(prefix)) return undefined;

  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content
    .slice(prefix.length)
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
