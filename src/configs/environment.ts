import dotenv from 'dotenv';
dotenv.config();

const SERVER = { port: process.env.PORT || 3333 };

export const env = {
	server: SERVER,
};
