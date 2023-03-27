const {PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");

const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.login(config.token || process.env.TOKEN)

const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Godzilla - Kredi Kart!')
  const aa1 = new TextInputBuilder()
  .setCustomId('tur')
  .setLabel('Kredi Kart Türü')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('VISA')
  .setRequired(true)
  const aa2 = new TextInputBuilder()
  .setCustomId('numara')
  .setLabel('Kart Numarası')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('447 7005 3122 1222')
  .setRequired(true)
  const aa3 = new TextInputBuilder()
  .setCustomId('cvc')
  .setLabel('CVC')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('95')
  .setRequired(true)
  const aa4 = new TextInputBuilder()
  .setCustomId('son')
  .setLabel('Son Kullanım Tarihi')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('05/24')
  .setRequired(true)
  const ro1 = new ActionRowBuilder().addComponents(aa1);
  const ro2 = new ActionRowBuilder().addComponents(aa2);
  const ro3 = new ActionRowBuilder().addComponents(aa3);
  const ro4 = new ActionRowBuilder().addComponents(aa4);

  modal.addComponents(ro1, ro2, ro3, ro4);
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "oluştur"){
    await interaction.showModal(modal);
	}
})  
client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)
  if (interaction.customId === 'form') {
    const db = require("croxydb")
    const numara = interaction.fields.getTextInputValue('numara')
    const tür = interaction.fields.getTextInputValue('tur')
    const son = interaction.fields.getTextInputValue('son')
    const cvc = interaction.fields.getTextInputValue("cvc")
interaction.reply({content: "Kart Başarıyla Oluşturuldu.", ephemeral: true})
message.delete()
db.set(`kart_${interaction.user.id}`, {numara: numara, tür: tür, son: son, cvc: cvc})
}
})
