const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.login(process.env.TOKEN);
client.config = config;
const fs = require("fs");
const http = require("http");
http.createServer((_, res) => res.end("Alive")).listen(8080)

client.on("ready", () => {
  console.log("The bot has started!");
  client.user.setActivity(`GAME_HERE`, { type: "PLAYING" });

  
  console.log("Ready!");
});

client.on("message", async message => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;
  
  if (!message.content.startsWith(prefix)) return;

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
