import Pocketbase from 'pocketbase';

export const pb = new Pocketbase(process.env.POCKETBASE_URL);
