import dotenv from 'dotenv';
dotenv.config();

export const server = { port: process.env.PORT || 3333 };
