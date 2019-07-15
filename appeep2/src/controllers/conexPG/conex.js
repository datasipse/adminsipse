const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  
  });

  module.exports=client;