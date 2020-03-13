const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const ownerid = require('../../config.json').OwnerId;

module.exports = class RunpikaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'runpika',
            memberName: 'runpika',
            group: 'reactions',
            description: 'Whoa Whoa! Whoa Whoa!',
            examples: ['runpika'],
            aliases: ['runepika'],
        });
    }

    async run (message, args) {

        let owner = message.guild.members.get(ownerid);
        
        const embed = new Discord.RichEmbed()
            .setImage(assets["runpika"])
            .setColor(0x00FFFF)

        owner.send(`Runpika command activated by ${message.author.tag} (${message.author.id})`);
        return message.embed(embed).then(message.delete());
    }
};