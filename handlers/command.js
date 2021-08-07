const glob = require('fast-glob');
const { resolve } = require('path');

module.exports = async (client) => {
	const commandFiles = await glob(`${__dirname}/../commands/**/*.js`);
	for (const commandFile of commandFiles) {
		const command = require(resolve(commandFile));

		if (!command.name) {
			throw Error(`${command} is missing a name key`);
		}
		if (!command.run || (typeof command.run !== 'function')) {
			throw Error(`${command.name} is missing a run function`);
		}

		client.commands.set(command.name, command);
	}
};
