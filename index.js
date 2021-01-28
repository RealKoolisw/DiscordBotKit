const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.login(process.env.TOKEN);
client.config = config;
const http = require("http");
http.createServer((_, res) => res.end("Online!")).listen(8080)

client.on("ready", () => {
  console.log("The bot has started!");
  // Status
  //  - PLAYING
  //  - LISTENING
  //  - WATCHING
  client.user.setActivity(`GAMES`, { type: "PLAYING" });

  
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
