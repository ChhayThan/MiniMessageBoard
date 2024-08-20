#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const sql = `
CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR(255), message VARCHAR(255), date TIMESTAMP );
INSERT INTO messages (username, message, date) 
VALUES
  ('Amando', 'Hi there!', '2024-08-19 10:23:54'),
  ('Odin', 'Hello World!', '2024-08-19 11:03:24'),
  ('Damon', 'Greetings', '2024-08-20 08:51:17');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false, // This allows self-signed certificates. Set to true for strict SSL.
    },
  });

  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("Done");
}

main();
