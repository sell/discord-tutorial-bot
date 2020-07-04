module.exports = client => {
  let botStatus = [
    `${client.guilds.cache.size} servers!`,
    "!help or !h",
    `Over ${client.users.cache.size} users!`,
    `Over ${client.channels.cache.size} channels!`
]

    setInterval(function() {
    let status = botStatus[Math.floor(Math.random() * botStatus.length)];
    client.user.setActivity(status, {type: "WATCHING"});

    }, 5000)

    client.user.setUsername('<bot name>'); // sets the bots name
    client.user.setStatus("online"); // sets the bots status
    
  console.log(`Hello ${client.user.username} is now online!`); // consoles logs this when bot is turned on
   
};
