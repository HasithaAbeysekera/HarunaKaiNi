/*
    The following comment examples where taken from the discord.js-commando docs.
    This file is basically an organization sheet for commands.
    This helps keeps commands consistent in organization.
*/

const { Command } = require('discord.js-commando')

module.exports = class StyleSheetCommand extends Command {
    constructor (client) {
        super(client, {
            name: '', // Name of this command.
            memberName: '', // Name of this command.
            group: 'StyleSheet', // The group the command belongs to, assigned upon registration.
            description: 'A short description goes here.', // Short description of the command.
            details:` A long description for your command goes here.`,
            aliases: [ // Aliases for this command.
                'SheetStyle',
                'CommandExample'
            ],
            examples: [ // Example usage strings.
                'StyleSheet This is not a command.',
                'StyleSheet There are arguments.',
                'StyleSheet This is just an example.'
            ],
            userPermissions: [ // Permissions required by the user to use the command.
                'SEND_MESSAGES',
                'VIEW_CHANNEL'
            ],
            clientPermissions: [ // Permissions required by the client to use the command.
                'SEND_MESSAGES',
                'VIEW_CHANNEL'
            ],
            throttling: { // Options for throttling command usages.
                usages: 2,
                duration: 10
            },
            format: '[Test/Testing/Testing123]', // Usage format string of the command.
            args: [ // Go here for argument help: http://discord.js.org/#/docs/commando/master/class/Argument
                {
                    key: 'message',
                    label: 'text',
                    prompt: 'What text would you like to provide?',
                    type: 'string'
                }
            ],
            guarded: false, // Whether the command is protected from being disabled.
            guildOnly: false, // Whether the command can only be run in a guild channel.
            ownerOnly: false // Whether the command can only be used by an owner.
        })
    }

    //to check if correct permission level. check hasPermission() in bot.js to see levels
    /*
    hasPermission(message) 
        if(message.channel.type == "text"){
        let PermissionLevel = 0;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
        }
        else {return true;}
    }
    */

    async run (message, args) {
        // Code goes here etc.
    }
};