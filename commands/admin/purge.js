const { Command } = require('discord.js-commando')
const Discord = require("discord.js");
const owners = require('../../config.json').OwnerId;

module.exports = class PurgeCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'purge',
            memberName: 'purge',
            group: 'admin',
            description: 'Deletes the last X messages from the channel, can also specify a user if desired',
            aliases: ['clean'],
            examples: ['purge 5', 'purge 5 @holo'],
            format: 'purge [amount] [user]',
            args: [
                {
                    key: 'deleteAmount',
                    prompt: 'How many messages do you want to delete?',
                    type: 'integer',
                    validate: number => {
                        if(number > 0){ return true;} else{
                            return 'Number must be above 0. Please reenter amount again.';
                        }
                    }
                },
                {
                    key: 'member',
                    prompt: `Which user's messages do you want to delete?`,
                    type: 'member',
                    default: ''
                }
            ],
            guildOnly: true,
        })
    }

    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message, {deleteAmount, member}) {

        if(member == ''){
            message.channel.fetchMessages({
                limit: deleteAmount + 1,
            }).then((messages) => {
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            });
            message.channel.send(`Deleting last ${deleteAmount} messages...`).then(msg => {
                msg.edit(`Successfully deleted ${deleteAmount} messages!`);
            });
            
            message.client.owners.forEach(owner => {
                owner.send(`=======================================================\n` + 
                `Guild Command Purge activated by ${message.author} (ID: ${message.author.id})\n` +
                `Purged ${deleteAmount} messages by everyone in ${message.channel}`);
            });

            console.log(`=======================================================\n` + 
            `Guild Command Purge activated by ${message.author} (ID: ${message.author.id})\n` +
            `Purged ${deleteAmount} messages by everyone in ${message.channel}`);
        } else {
            message.channel.fetchMessages({}).then((messages) => {
                let userMessages = messages.filter(m => m.author.id === member.id).array().slice(0, deleteAmount+1);
                message.channel.bulkDelete(userMessages).catch(error => console.log(error.stack));
            });
            message.channel.send(`Deleting last ${deleteAmount} messages by user mentioned: ${member}`).then(msg => {
                msg.edit(`Successfully deleted ${deleteAmount} messages by ${member}!`);
            });
            
            message.client.owners.forEach(owner => {
                owner.send(`=======================================================\n` + 
                `Guild Command Purge activated by ${message.author} (ID: ${message.author.id})\n` +
                `Purged ${deleteAmount} messages by ${member} in ${message.channel}`);
            });

            console.log(`=======================================================\n` + 
            `Guild Command Purge activated by ${message.author} (ID: ${message.author.id})\n` +
            `Purged ${deleteAmount} messages by ${member} in ${message.channel}`);
        }
    }
};