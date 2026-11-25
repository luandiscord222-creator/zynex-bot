const token = process.env.DISCORD_TOKEN;

console.log('Token carregado:', Boolean(token));
console.log('Tamanho do token:', token?.length || 0);

client.login(token);
