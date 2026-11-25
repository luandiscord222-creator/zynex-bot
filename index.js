
const {
  Client,
  GatewayIntentBits,
  Events,
  SlashCommandBuilder,
  REST,
  Routes
} = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token) {
  console.error('ERRO: DISCORD_TOKEN não foi encontrado!');
  process.exit(1);
}

if (!clientId || !guildId) {
  console.error('ERRO: CLIENT_ID ou GUILD_ID não encontrado!');
  process.exit(1);
}

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

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
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

client.login(token).catch(erro => {
  console.error('Erro ao conectar o ZYNEX BOT:', erro);
});
  console.log("CLIENT_ID carregado:", !!clientId);
console.log("GUILD_ID carregado:", !!guildId);
console.log("DISCORD_TOKEN carregado:", !!token);
