const glob = require('fast-glob');
const path = require('path');
module.exports = async client => {
    // allows events in as many subfolders as i want
    const events = await glob('./events/**/*.js');
    for(const file of events) {
        const event = require(path.resolve(file));
        const { name } = path.parse(file);
        client.on(name, event.bind(null, client));
        console.log(`Event | ${name} was loaded successfully`)
    }
};
