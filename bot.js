const Discord = require('discord.js');
const FiveM = require('fivem');
require('dotenv-flow').config();
const bot = new Discord.Client();
const prefix = '/';

const config = {
    token: process.env.TOKEN,
};

// WesternRP (to be replaced with a DB)
const server = {
    north: new FiveM.Server('194.87.110.211:30120'),
    west: new FiveM.Server('194.87.110.211:30123'),
    south: new FiveM.Server('194.87.110.211:30122'),
}

let online = {
    north: 'Сервер выключен ',
    west: 'Сервер выключен ',
    south: 'Сервер выключен ',
}


bot.on('message', message => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd === 'online') {
        server.north.getPlayers().then(data => {
            online.north = data;
        });
        // server.west.getPlayers().then(data => {
        //     online.west = data;
        // });
        server.south.getPlayers().then(data => {
            online.south = data;
        });

        const onlineMsg = new Discord.MessageEmbed()
        .setTitle('Онлайн серверов:')
        .addField('North', online.north + '/32')
        // .addField('West', online.west + '/32')
        .addField('South', online.south + '/32')
        .setFooter('Made by M4NT4#0001')
        .setThumbnail(message.guild.iconURL())
        .setColor(0x00FF15);
        message.channel.send(onlineMsg);
    };
});

bot.on('ready', function() {
    console.log('Bot is on air!')
});

bot.login(config.token);