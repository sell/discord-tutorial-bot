const api = require('../../botconfig.json');
const api_key = api.api_key;
const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: "weather",
    category: "extra",
    run: async (client, message, args) => {
        if(!args[0]) {
            return message.channel.send(`Please enter a city`)
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${args}&units=imperial&appid=${api_key}`;

        let response, city;

        try {
            response = await axios.get(url);
            city = response.data
            console.log(city)
        } catch (e) {
            return message.channel.send(`Couldn't find that city`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Weather in: ${city.name}`)
            .setThumbnail(`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`)
            .setDescription(city.weather[0].description)
            .addFields(
                {
                    name: "Current Temperature: ",
                    value: `${city.main.temp} °F`,
                    inline: true
                },
                {
                    name: "Weather: ",
                    value: city.weather[0].main
                },
                {
                    name: "Feels like: ",
                    value: `${city.main.feels_like} °F`,
                    inline: true
                },
                {
                    name: "Highest: ",
                    value: `${city.main.temp_max} °F`,
                    inline: true
                },
                {
                    name: "Lowest: ",
                    value: `${city.main.temp_min} °F`,
                    inline: true
                },
                {
                    name: "Sunrise: ",
                    value: city.sys.sunrise,
                    inline: true
                },
                {
                    name: "Sunrise: ",
                    value: city.sys.sunset,
                    inline: true
                }
            )

        await message.channel.send(embed)
    }
}