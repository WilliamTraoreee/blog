import Pocketbase from 'pocketbase';
import { getPublicEnv } from '~/root';

export const pb = new Pocketbase(getPublicEnv('POCKETBASE_URL'));
