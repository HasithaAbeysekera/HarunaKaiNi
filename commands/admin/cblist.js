const { Command } = require('discord.js-commando');
const logger = require('../../util/logging');

module.exports = class CBListCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'cblist', 
            memberName: 'cblist', 
            group: 'admin', 
            description: 'Shows list of all CB players who have responded to rollcall',
            aliases: ['cbwho', 'cwlist'],
            guildOnly: true,
        })
    }
    
    hasPermission(message) {
        let PermissionLevel = 1;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message) {
        
        // logging
        logger();
        // message.client.owners.forEach(owner => {
        //     owner.send(`=======================================================\n` + 
        //     `Guild Command CBList activated by ${message.author} (ID: ${message.author.id})`);
        // });

        // console.log(`=======================================================\n` + 
        // `Guild Command CBList activated by ${message.author.username} (ID: ${message.author.id})`);

        let cwconfirmed = message.guild.roles.cache.find(u => u.name == "CB Confirmed");
  
        let msg = "";

        if (cwconfirmed.members.array().length == 0){
            return message.channel.send("CBList is currently empty");
        } else {
            msg = msg.concat("**CB Confirmed**\n\n");
            cwconfirmed.members.forEach(member => {
                msg = msg.concat(member.user.username,`\n`);
            });
            return message.channel.send(msg);
        }
    }
};