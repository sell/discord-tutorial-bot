const glob = require('fast-glob');
const path = require('path');
module.exports = async (client) => {
    const commands = await glob('./commands/**/*.js');
    if(!commands) return console.log(`No commands found`);
    for(const command of commands) {
        const cmd = require(path.resolve(command));
        if(!cmd.name) return console.log(`${command} is missing a name export`);
        if(!cmd.run || !(cmd.run instanceof Function)) return console.log(`${command} is missing a run function!`)
        else {
            client.commands.set(cmd.name, cmd);
            if(cmd.aliases && Array.isArray(cmd.aliases))
                for(const alias of cmd.aliases) client.aliases.set(alias, cmd.name);
        }
        console.log(`Command | ${cmd.name} was loaded successfully`);
    }
};
