const {
  Client,
  GatewayIntentBits,
  Events,
  SlashCommandBuilder,
  REST,
  Routes
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const comandos = [
  new SlashCommandBuilder()
    .setName('zb')
    .setDescription('Central de comandos do ZYNEX BOT')
    .addSubcommand(s =>
      s.setName('ajuda')
        .setDescription('Mostra os comandos disponíveis')
    )
].map(comando => comando.toJSON());

client.once(Events.ClientReady, async () => {
  console.log(`ZYNEX BOT conectado como ${client.user.tag}`);

  const rest = new REST({ version: '10' })
    .setToken(process.env.DISCORD_TOKEN);

  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: comandos }
    );

    console.log('Comandos registrados com sucesso!');
  } catch (erro) {
    console.error('Erro ao registrar comandos:', erro);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'zb') {
    if (interaction.options.getSubcommand() === 'ajuda') {
      await interaction.reply({
        content: '🇧🇷 **ZYNEX BOT — EB DO PRO**\n\nBot conectado e funcionando!',
        ephemeral: true
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
