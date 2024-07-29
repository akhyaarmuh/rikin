import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

dotenv.config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const LOCATION = process.env.LOCATION;
export const API_VERSION = process.env.API_VERSION;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
export const LICENSE_TOKEN = process.env.LICENSE_TOKEN;

export const __dirname = path.dirname(path.join(__filename, '../'));
