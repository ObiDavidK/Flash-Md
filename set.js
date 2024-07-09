const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1ByaG1rUWZrVHBmS2JVWDdDZlBiVFJDOVl0SWRyRUsrMi9NeURUL3Mzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVFGbUFrQy9UaitNaTF6YW95VVNqbU1zaFdkbnN6eUczZU9TM3ptd1hHWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTjhtb1J2VmdlY3d5RXFySWpEdDEwL09VamhLTmN6cmcvdHo2bWNZelhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKbVBsOXBJakZ6QzVjMXBpR1JDRWtxZ09WbkVmNFNYM25aUjVzbTZjSlc0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRDOTRhZEg1cEdhUzloNU00QTFzNEkxOHFBcWtoTVJYdkZrYkNabHl0Mjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJyWU0xMWp1a1Z1bmF2YTBDeHBjSm5zZU5Rb1lpbnVFYnNpeERNUUxvR0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUs1WEg3Y3dFcE1weTZuejVwY2ZERkNjd2Z5c25vYWt4amlod3NvbnhuRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUlk4NWFJYWo4TzF5Yjk4cEY0NWZ4NHlPMzJUSVpYN0x6WDlaeDZLZG8zWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkROeDRPVWF0WjViMzVnTmZ1SFBaK1BNL3UrOGFvVFI3MzBkN3JJaG5RM3VRcGJFMjRFSzBBSEZ2aXlZVFdVOGE1NGtFTkdYbldkTUxOa01Nc01LM0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUzLCJhZHZTZWNyZXRLZXkiOiJCYlovS1FwcTlRLzhRdGM3L3RnUC9IekRDYXBWa1d3L3BmQjh2ODUvUm5FPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYRTFWaERwMFJpQzJabjRJTHNtMk93IiwicGhvbmVJZCI6ImFjY2QxMzdkLTNhZjctNGIzMC1iYTNmLThiMGI3MDZjMDU1YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RngvVnB3WXZxM0t1WVlOd1JvVVNEM04yRzQ9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhGY1A3Nk9VYUhSdGlJWmdQY3ZVSUx0MmpJST0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01xRCtmWUhFSjNNdExRR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InNmRDJoM2JZakgwWVRObkpubjZuMzRRQ2VySDZ4enBucGk1S2wwSmNiU009IiwiYWNjb3VudFNpZ25hdHVyZSI6InZJYVYyQWZKQk00SG9Lbm84am1QalJCbmFxRE5QV0tFZWZGWXE5OVJkUDd3dDVkeFJWR29hTlp3eW13TXlTQTdVMG9lemx2UTZoN3hDdmxzMTc4Q0NRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ6MlN6bHJrMCtsUjBPYTkvNVl4NHhBSFVvd3E1NytiNXhwa3c1dWZ1ZStad3IxRUl4blc0U0Q4QityWldoM0QrYm5YbElUNFMzdXcwcGFITldySkpEZz09In0sIm1lIjp7ImlkIjoiMjM0ODE1NjE5ODM3MjoyNEBzLndoYXRzYXBwLm5ldCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTU2MTk4MzcyOjI0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJIdzlvZDIySXg5R0V6WnlaNStwOStFQW5xeCtzYzZaNll1U3BkQ1hHMGoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjA1MjYzNjgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQmZYIn0=',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "Obi David 😏😎",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2349018909938", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'Davis 😉',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || 'sk-proj-OIbqZQuG1gI6D2iiyjoLT3BlbkFJV1KogkiU2mt3P0M731Hq',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '2' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://obidavid:9i_xBQ-_mIDQvHXg3eurjQ@laventer-15662.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full" : "postgresql://obidavid:9i_xBQ-_mIDQvHXg3eurjQ@laventer-15662.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
