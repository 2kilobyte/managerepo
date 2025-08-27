import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once('ready', () => {
  console.log(`✅ Bot logged in as ${client.user?.tag}`);
});

// Ensure bot is logged in once
if (!client.isReady()) {
  client.login(process.env.DISCORD_TOKEN);
}

// Function to create voice channel
export const createVoiceChannel = async (teamName: string, userLimit: number): Promise<string> => {
    const guild = await client.guilds.fetch(process.env.GUILD_ID!);

    const channel = await guild.channels.create({
        name: teamName,
        type: 2, // Voice channel
        parent: process.env.VOICE_CHANNEL_CATEGORY_ID || undefined,
        userLimit, // Limit to 5 users
        reason: `Voice channel created for team ${teamName}`,
    });

    return channel.id;
};

// ✅ Function to assign a role to a user by their Discord ID
export const assignRoleToUser = async (
  discordId: string,
): Promise<void> => {
  const guild = await client.guilds.fetch(process.env.GUILD_ID!);
  try {
    const member = await guild.members.fetch(discordId);
    // @ts-expect-error Reason: I will handle role id
    await member.roles.add(process.env.DISCORD_ROLE_ID);
    console.log(`✅ Assigned role to ${member.user.tag}`);
  } catch (err) {
    console.warn(`⚠️ Could not assign role to ${discordId}:`, err);
  }
};
