const { Client, GatewayIntentBits } = require('discord.js');

// Replace 'YOUR_TOKEN_HERE' with your bot's token
const TOKEN = "TOKEN_HERE"
// Role ID of the role you want to check
const role_id = 'Role_ID_Here';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
client.once('ready', () => {
    console.log('Logged in as ' + client.user.tag);
});

client.on('messageCreate', async message => {
    // Check if the message author is the bot itself
    if (message.author.bot) return;

    // Check if the message contains the command to list users with the specified role
    if (message.content.startsWith('!list_users_with_role')) {
        // Get the role object based on the role ID
        const role = message.guild.roles.cache.get(role_id);
        if (!role) {
            message.channel.send("Role not found.");
            return;
        }

        // Get a list of members with the specified role
        const members_with_role = message.guild.members.cache.filter(member => member.roles.cache.has(role.id)).map(member => member.user.username);

        // Send the list of usernames to the channel
        message.channel.send(Users with role ** ${ role.name }**: ${ members_with_role.join(',') });
    }
});

client.login(TOKEN);