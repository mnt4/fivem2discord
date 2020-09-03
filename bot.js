const Discord = require('discord.js');
const FiveM = require('fivem');
require('dotenv-flow').config();
const bot = new Discord.Client();
const prefix = '/';

const config = {
    token: process.env.TOKEN,
};

// WesternRP
const server = {
    first: new FiveM.Server('194.87.110.211:30120'),
    second: new FiveM.Server('194.87.110.211:30123'),
    third: new FiveM.Server('194.87.110.211:30122'),
}

let online = {
    first: 'Сервер выключен ',
    second: 'Сервер выключен ',
    third: 'Сервер выключен ',
}


bot.on('message', message => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd === 'online') {
        server.first.getPlayers().then(data => {
            online.first = data
            console.log(online);
        });
        // server.second.getPlayers().then(data => {
        //     online.second = data
        //     console.log(online);
        // });
        // server.third.getPlayers().then(data => {
        //     online.third = data
        //     console.log(online);
        // });

        const onlineMsg = new Discord.MessageEmbed()
        .setTitle('Онлайн серверов:')
        .addField('North', online.first + '/32')
        // .addField('West', online.second + '/32')
        .addField('South', online.third + '/32')
        .setFooter('Made by M4NT4#0001')
        .setThumbnail(message.guild.iconURL())
        .setColor(0x00FF15);
        message.channel.send(onlineMsg);
    };

    if (cmd === 'update') {
        let lastMsg = message.channel.lastMessage;

        // if (message.author.id != '357930008100077569') return;
        
        setInterval(() => {
            lastMsg.delete();

            server.first.getPlayers().then(data => {
                online.first = data
            });
            // server.second.getPlayers().then(data => {
            //     online.second = data
            // });
            // server.third.getPlayers().then(data => {
            //     online.third = data
            // });
    
            const onlineMsg = new Discord.MessageEmbed()
            .setTitle('Онлайн серверов:')
            .addField('North', online.first + '/32')
            .addField('West', online.second + '/32')
            .addField('South', online.third + '/32')
            .setFooter('Made by M4NT4#0001')
            .setThumbnail(message.guild.iconURL())
            .setColor(0x00FF15);
            lastMsg.edit(onlineMsg);
        }, 15000);
    };
});

bot.on('ready', function() {
    console.log('Bot is on air!')
});

bot.login(config.token);