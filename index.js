const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
    disableEveryone: true,
  });
const config = require("./botconfig.json");
const token = config.token;
client.categories = fs.readdirSync("./commands/");
client.prefix = config.prefix;

['commands', 'events'].map(handler => require(`./handlers/${handler}`)(client));
['commands', 'aliases'].map(x => client[x] = new Collection());

client.login(token);
