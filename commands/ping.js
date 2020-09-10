const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  const start = Date.now()
message.channel.send("Pinging...").then(message => {

const end = Date.now()
message.edit(`Network Delay: **${(end - start)}**ms!`)
})
}
