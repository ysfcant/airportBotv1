//THIS IS THE BACKUP FILE IF ANYTHING GOES WRONG AT INDEX.JS
const { Client, GatewayIntentBits, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { token, clientId, guildId } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Register commands
const commands = [
    { name: 'host', description: 'Submit flight details' },
    { name: 'delay', description: 'Notify a delay for a flight' },
    { name: 'cancel', description: 'Cancel a flight' },
    { name: 'dm', description: 'Send a DM to a user or everyone' },
    { name: 'start', description: 'Start a unlock server notification'}
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.member.roles.cache.has("1268564193930641419")) {
        if (interaction.isCommand()) {
            const { commandName } = interaction;

            if (commandName === 'host') {
                await handleHost(interaction);
            } else if (commandName === 'delay') {
                await handleDelay(interaction);
            } else if (commandName === 'cancel') {
                await handleCancel(interaction);
            } else if (commandName === 'dm') {
                await handleDM(interaction);
            } else if (commandName === 'start') {
                await handleStart(interaction);
            }
        } else if (interaction.isModalSubmit()) {
            await handleModal(interaction);
        }
    } else {
        interaction.reply("You don’t have permission to use that command!");
    }
});

async function handleHost(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('host_modal')
        .setTitle('Flight Details')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('flight_number')
                        .setLabel('Flight Number')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('server_time')
                        .setLabel('Server Unlock Time')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('departure_airport')
                        .setLabel('Departure Airport')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('destination_airport')
                        .setLabel('Destination Airport')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('gate')
                        .setLabel('Gate')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                )
        );

    await interaction.showModal(modal);
}

async function handleDelay(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('delay_modal')
        .setTitle(':warning: Flight Delay Notification')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('flight_number')
                        .setLabel('Flight Number')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('destination_airport')
                        .setLabel('Destination Airport')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('original_time')
                        .setLabel('Original Departure Time')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('newdeparture_time')
                        .setLabel('New Departure Time')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                )
        );

    await interaction.showModal(modal);
}

async function handleCancel(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('cancel_modal')
        .setTitle('Flight Cancellation')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('flight_number')
                        .setLabel('Flight Number')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('destination_cancel')
                        .setLabel('Destination')
                        .setStyle(TextInputStyle.Paragraph)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('departure_cancel')
                        .setLabel('Departure Time')
                        .setStyle(TextInputStyle.Paragraph)
                        .setRequired(true)
                )
        );

    await interaction.showModal(modal);
}

async function handleDM(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('dm_modal')
        .setTitle('Send a DM')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('user')
                        .setLabel('User ID or Username')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('message')
                        .setLabel('Message')
                        .setStyle(TextInputStyle.Paragraph)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('embed')
                        .setLabel('Embed (true/false)')
                        .setStyle(TextInputStyle.Short)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('embed_color')
                        .setLabel('Embed Color (Hex)')
                        .setStyle(TextInputStyle.Short)
                )
        );

    await interaction.showModal(modal);
}
async function handleStart(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('start_modal')
        .setTitle('Unlock Server')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('flight_number')
                        .setLabel('Flight Number')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('departure_airport')
                        .setLabel('Departure Airport')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('destination_airport')
                        .setLabel('Destination Airport')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('link')
                        .setLabel('link')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                )
        );

    await interaction.showModal(modal);
}

async function handleModal(interaction) {
    if (interaction.customId === 'host_modal') {
        // Handle 'host' modal submission
        const flightDetails = {
            flightNumber: interaction.fields.getTextInputValue('flight_number'),
            serverUnlockTime: interaction.fields.getTextInputValue('server_time'),
            departureAir: interaction.fields.getTextInputValue('departure_airport'),
            destinationAir: interaction.fields.getTextInputValue('destination_airport'),
            gate: interaction.fields.getTextInputValue('gate')
        };

        const publicChannel = interaction.guild.channels.cache.find(c => c.name === 'public');
        const staffChannel = interaction.guild.channels.cache.find(c => c.name === 'staff');

        if (publicChannel) {
            const publicEmbed = new EmbedBuilder()
                .setTitle('✈️  Upcoming Flight Notification')
                .setColor('#194681')
                .setDescription(`*We have an upcoming flight scheduled. Here are the details:*\n\n***✈️ Flight Number:*** ${flightDetails.flightNumber}\n***⏰ Server Unlock Time:*** ${flightDetails.serverUnlockTime}\n***🛫 Departure Airport:*** ${flightDetails.departureAir}\n***🛬 Destination Airport:*** ${flightDetails.destinationAir}\n***🚪 Gate:*** ${flightDetails.gate}`)
                .setImage('https://media.discordapp.net/attachments/1186825650653376603/1264277807631175690/FlyRyan_Banner_Template_3.png?ex=66a68476&is=66a532f6&hm=61f66774ff2ef3a9a48d1916faca6334ae3907a04c32a4c0c4c88e2657a077a3&')
                .setFooter({ text: 'Make sure to check-in on time. Safe travels!' });
            await publicChannel.send({ embeds: [publicEmbed] });
        }

        if (staffChannel) {
            const staffEmbed = new EmbedBuilder()
                .setTitle('✈️  Upcoming Flight Notification')
                .setColor('#194681')
                .setDescription(`Attention staff! We have an upcoming flight scheduled. Please react with ✅ if you can attend.\n\n***✈️ Flight Number:*** ${flightDetails.flightNumber}\n***⏰ Server Unlock Time:*** ${flightDetails.serverUnlockTime}\n***🛫 Departure Airport:*** ${flightDetails.departureAir}\n***🛬 Destination Airport:*** ${flightDetails.destinationAir}\n***🚪 Gate:*** ${flightDetails.gate}`)
                .setImage('https://media.discordapp.net/attachments/1186825650653376603/1264277807631175690/FlyRyan_Banner_Template_3.png?ex=66a68476&is=66a532f6&hm=61f66774ff2ef3a9a48d1916faca6334ae3907a04c32a4c0c4c88e2657a077a3&')
                .setFooter({ text: 'If you react you MUST attend or you will face disciplinary action. Please keep track with the departures channel for flight updates.' });
            await staffChannel.send({ embeds: [staffEmbed] });
        }

        await interaction.reply({ content: 'Flight details have been submitted!', ephemeral: true });
    } else if (interaction.customId === 'delay_modal') {
        // Handle 'delay' modal submission
        const flightNumber = interaction.fields.getTextInputValue('flight_number');
        const destinationAirport = interaction.fields.getTextInputValue('destination_airport');
        const originalTime = interaction.fields.getTextInputValue('original_time');
        const newDeparture = interaction.fields.getTextInputValue('newdeparture_time');
        const publicChannel = interaction.guild.channels.cache.find(c => c.name === 'public');

        if (publicChannel) {
            const delayEmbed = new EmbedBuilder()
                .setTitle(':warning:  Flight Delay Notification')
                .setColor('#194681')
                .setDescription(`Dear passengers, we regret to inform you that flight ${flightNumber} to ${destinationAirport} scheduled for ${originalTime} has been delayed. The new departure time is ${newDeparture}.`)
                .setImage('https://media.discordapp.net/attachments/1186825650653376603/1264277807631175690/FlyRyan_Banner_Template_3.png?ex=66a68476&is=66a532f6&hm=61f66774ff2ef3a9a48d1916faca6334ae3907a04c32a4c0c4c88e2657a077a3&')
                .setFooter({ text: 'We apologize for any inconvenience caused. Thank you for your understanding.' });
            await publicChannel.send({ embeds: [delayEmbed] });
        }

        await interaction.reply({ content: 'Delay notification sent!', ephemeral: true });
    } else if (interaction.customId === 'cancel_modal') {
        // Handle 'cancel' modal submission
        const flightNumber = interaction.fields.getTextInputValue('flight_number');
        const destination_cancel = interaction.fields.getTextInputValue('destination_cancel');
        const departure_cancel = interaction.fields.getTextInputValue('departure_cancel');
        const publicChannel = interaction.guild.channels.cache.find(c => c.name === 'public');

        if (publicChannel) {
            const cancelEmbed = new EmbedBuilder()
                .setTitle(':x:  Flight Cancellation Notification')
                .setColor('#194681')
                .setDescription(`Dear passengers, we regret to inform you that flight ${flightNumber} to ${destination_cancel} scheduled for ${departure_cancel} has been cancelled. Please contact our customer service for rebooking options.`)
                .setImage('https://media.discordapp.net/attachments/1186825650653376603/1264277807631175690/FlyRyan_Banner_Template_3.png?ex=66a68476&is=66a532f6&hm=61f66774ff2ef3a9a48d1916faca6334ae3907a04c32a4c0c4c88e2657a077a3&')
                .setFooter({ text: 'We apologize for any inconvenience caused. Thank you for your understanding.' });
            await publicChannel.send({ embeds: [cancelEmbed] });
        }

        await interaction.reply({ content: 'Flight cancelled!', ephemeral: true });
    } else if (interaction.customId === 'dm_modal') {
        // Handle 'dm' modal submission
        const userInput = interaction.fields.getTextInputValue('user');
        const message = interaction.fields.getTextInputValue('message');
        const isEmbed = interaction.fields.getTextInputValue('embed') === 'true';
        const embedColor = interaction.fields.getTextInputValue('embed_color') || '#0099ff';

        let userToMessage = null;

        // Determine if input is a username or ID
        if (userInput.startsWith('<@') && userInput.endsWith('>')) {
            const userId = userInput.replace(/[<@!>]/g, '');
            userToMessage = await client.users.fetch(userId);
        } else {
            try {
                userToMessage = await client.users.fetch(userInput);
            } catch {
                // If fetching by ID fails, assume it's a username
                const member = interaction.guild.members.cache.find(m => m.user.username === userInput || m.user.tag === userInput);
                if (member) {
                    userToMessage = member.user;
                }
            }
        }

        if (userToMessage) {
            try {
                if (isEmbed) {
                    const embed = new EmbedBuilder()
                        .setColor(embedColor)
                        .setDescription(message);
                    await userToMessage.send({ embeds: [embed] });
                } else {
                    await userToMessage.send(message);
                }
            } catch (error) {
                console.error(`Failed to DM user ${userToMessage.tag}:`, error);
            }
        } else if (userInput === '@everyone' || userInput === 'everyone') {
            await interaction.guild.members.fetch();
            for (const member of interaction.guild.members.cache.values()) {
                // Skip bots
                if (member.user.bot) continue;
                
                try {
                    if (isEmbed) {
                        const embed = new EmbedBuilder()
                            .setColor(embedColor)
                            .setDescription(message);
                        await member.user.send({ embeds: [embed] });
                    } else {
                        await member.user.send(message);
                    }
                } catch (error) {
                    console.error(`Failed to DM user ${member.user.tag}:`, error);
                }
            }
        }

        await interaction.reply({ content: 'DM sent!', ephemeral: true });
    }
    else if (interaction.customId === 'start_modal') {
        // Handle 'cancel' modal submission
        const flightNumber = interaction.fields.getTextInputValue('flight_number');
        const destination_start = interaction.fields.getTextInputValue('destination_airport');
        const departure_start = interaction.fields.getTextInputValue('departure_airport');
        const link = interaction.fields.getTextInputValue('link');
        const publicChannel = interaction.guild.channels.cache.find(c => c.name === 'public');

        if (publicChannel) {
            const delayEmbed = new EmbedBuilder()
                .setTitle(':unlock: Server Unlock Notification')
                .setColor('#194681')
                .setDescription(`Dear passengers, the server for flight ${flightNumber} from ${departure_start} to ${destination_start} is now open. Please join the server using the link below!***\n:link: Server Link:*** ${link}`)
                .setImage('https://media.discordapp.net/attachments/1186825650653376603/1264277807631175690/FlyRyan_Banner_Template_3.png?ex=66a68476&is=66a532f6&hm=61f66774ff2ef3a9a48d1916faca6334ae3907a04c32a4c0c4c88e2657a077a3&')
                .setFooter({ text: 'We look forward to having you on board. Thank you for flying with us.' });
            await publicChannel.send({ embeds: [delayEmbed] });
        }

        await interaction.reply({ content: 'Unlock Server notification sent!', ephemeral: true });

    }
}

client.login(token);
