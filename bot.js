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
    west: new FiveM.Server('194.87.110.211:30121'),
    south: new FiveM.Server('194.87.110.211:30122'),
}

let online = {
    north: 'Сервер выключен',
    west: 'Сервер выключен',
    south: 'Сервер выключен',
}


bot.on('message', message => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd === 'online') {
        server.north.getPlayers().then(data => {
            online.north = data
            console.log(online);
        });
        // server.west.getPlayers().then(data => {
        //     online.west = data
        //     console.log(online);
        // });
        // server.south.getPlayers().then(data => {
        //     online.south = data
        //     console.log(online);
        // });

        const onlineMsg = new Discord.MessageEmbed()
        .setTitle('Онлайн серверов:')
        .addField('North', online.north + '/32')
        .addField('West', online.west + '/32')
        .addField('South', online.south + '/32')
        .setFooter('Made by M4NT4#0001')
        .setThumbnail(message.guild.iconURL())
        .setColor(0x00FF15);
        message.channel.send(onlineMsg);
    };
});

// Self-updating message
bot.on('ready', function () { 
    setInterval( function() {
        let msgChannel = 'null'
        bot.channels.fetch('734455536556179466').then(channel => {
            msgChannel = channel
        })

        server.north.getPlayers().then(data => {
            online.north = data
            console.log(online);
        });
        // server.west.getPlayers().then(data => {
        //     online.west = data
        //     console.log(online);
        // });
        // server.south.getPlayers().then(data => {
        //     online.south = data
        //     console.log(online);
        // });

        const onlineMsg = new Discord.MessageEmbed()
        .setTitle('Онлайн серверов:')
        .addField('North', online.north + '/32')
        .addField('West', online.west + '/32')
        .addField('South', online.south + '/32')
        .setFooter('Made by M4NT4#0001')
        .setThumbnail(bot.guilds.cache.get('703749823169429614').iconURL())
        .setColor(0x00FF15);
        
        msgChannel.messages.fetch({ limit: 1 }).then(message => {
            let lastMsg = message.first();
            lastMsg.delete();
            msgChannel.send(onlineMsg);
        });
    }, 3000);
});

bot.on('ready', function() {
    console.log('Bot is on air!')
});

bot.login(config.token);