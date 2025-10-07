import { Blockfrost, Lucid } from 'lucid-cardano';

import {
  BLOCKFROST_API_KEY,
  BLOCKFROST_URL,
  CARDANO_NETWORK,
} from '@/constants/env';

export async function createLucid() {
  const lucid = await Lucid.new(
    new Blockfrost(BLOCKFROST_URL, BLOCKFROST_API_KEY),
    CARDANO_NETWORK,
  );

  return lucid;
}
