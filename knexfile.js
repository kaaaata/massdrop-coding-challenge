module.exports = {
  production: {
    client: 'pg',
    debug: true,
    connection: null, // deployed database URL
    ssl: true,
    migrations: {
      commands: 'migrations'
    },
  },
  development: {
    client: 'postgresql',
    connection: {
      database: 'massdrop-catherine-han',
    },
  },
};
