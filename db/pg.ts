import { Pool, Client } from 'pg';
import 'dotenv/config'

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

const pool = new Pool();
const client = new Client(config);

export { client, pool }