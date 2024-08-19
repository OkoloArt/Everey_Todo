import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import entities from "../typeorm/index.entity";

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities,
  logging: false,
  synchronize: true,
  ssl: {
    rejectUnauthorized: true, // Set to true in production for a secure connection
  },
});
