import {
  type Lucid,
  type Wallet,
  type WalletApi,
  fromText,
  toUnit,
} from 'lucid-cardano';

import { USDM_POLICY_ID } from '@/constants/env';
import { WALLET_STORAGE_KEY } from '@/constants/storage';
import { LOVELACE_IN_ADA } from '@/constants/units';
import type { TNetworkValue } from '@/enums';
import { createLucid } from '@/lib/lucid';
import type { TWalletType } from '@/types/models/wallet';
import { asciiToHex } from '@/utils/formats';

const SIGNING_MESSAGE = 'foreon-2024';
const USDM_ASSET_NAME = toUnit(USDM_POLICY_ID, fromText('USDM'));

class Web3 {
  /**
   * The singleton instance of the Web3 class.
   */
  private static _instance: Web3;
  /**
   * The Lucid instance.
   */
  public lucid: Lucid | undefined;
  /**
   * The raw wallet API from the browser extension.
   */
  public rawWalletApi: WalletApi | undefined;
  /**
   * Promise that resolves when the the Lucid instance is initialized.
   */
  private initPromise: Promise<void> | null = null;
  /**
   * Whether the Lucid instance is currently initializing.
   */
  private isInitializing = false;

  private constructor() {
    if (!this.lucid && !this.isInitializing) {
      this.initPromise = this.initLucid();
    }
  }

  public static get instance(): Web3 {
    this._instance ||= new Web3();
    return this._instance;
  }

  public static isWalletInstalled(wallet: string) {
    return Boolean(window.cardano?.[wallet]);
  }

  async connect(wallet: TWalletType) {
    await this.initPromise;
    if (!this.lucid) throw new Error('Failed to initialize Lucid');
    this.rawWalletApi = await window.cardano?.[wallet].enable();
    if (!this.rawWalletApi) {
      throw new Error('Failed to enable the wallet');
    }
    this.lucid.selectWallet(this.rawWalletApi);
    const [address, network] = await Promise.all([
      this.getWalletAddress(),
      this.rawWalletApi.getNetworkId(),
    ]);

    window.localStorage.setItem(
      WALLET_STORAGE_KEY,
      JSON.stringify({ address, wallet, network }),
    );
    return this.lucid;
  }

  async disconnect() {
    await this.initPromise;
    if (!this.lucid) throw new Error('Failed to initialize Lucid');

    this.lucid.wallet = undefined as any as Wallet;
    window.localStorage.removeItem(WALLET_STORAGE_KEY);
  }

  // async getBalance() {
  //   await this.initPromise;
  //   if (!this.lucid) throw new Error('Failed to initialize Lucid');

  //   const utxos = await this.lucid.wallet.getUtxos();
  //   // eslint-disable-next-line no-console
  //   console.log(utxos, 'utxos');
  //   const balance =
  //     utxos.reduce((sum, utxo) => sum + utxo.assets.lovelace, BigInt(0)) /
  //     BigInt(LOVELACE_IN_ADA);

  //   return balance;
  // }
  async getBalance() {
    await this.initPromise;
    if (!this.lucid) throw new Error('Failed to initialize Lucid');

    const utxos = await this.lucid.wallet.getUtxos();

    const balances = utxos.reduce(
      (acc, utxo) => {
        Object.entries(utxo.assets).forEach(([assetId, amount]) => {
          acc[assetId] = (acc[assetId] || BigInt(0)) + amount;
        });
        return acc;
      },
      {} as Record<string, bigint>,
    );

    Object.keys(balances).forEach((assetId) => {
      balances[assetId] = balances[assetId] / BigInt(LOVELACE_IN_ADA);
    });

    return balances;
  }

  getUSDMAssetName() {
    return USDM_ASSET_NAME;
  }

  async getWalletAddress() {
    await this.initPromise;
    if (!this.lucid) throw new Error('Failed to initialize Lucid');
    return this.lucid.wallet.address();
  }

  async getWalletNetwork(): Promise<TNetworkValue> {
    await this.initPromise;
    if (!this.lucid) throw new Error('Failed to initialize Lucid');
    return (await this.rawWalletApi?.getNetworkId()) as TNetworkValue;
  }

  async initLucid() {
    try {
      this.isInitializing = true;
      this.lucid = await createLucid();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to create Lucid instance:', error);
    } finally {
      this.isInitializing = false;
    }
  }

  async reconnectWallet() {
    const storedWallet = window.localStorage.getItem(WALLET_STORAGE_KEY);
    if (storedWallet) {
      const { wallet } = JSON.parse(storedWallet);
      try {
        await this.connect(wallet);
      } catch {
        throw new Error('Failed to reconnect wallet:');
      }
    }
  }

  async signMessage(address: string) {
    await this.initPromise;
    if (!this.lucid) throw new Error('Failed to initialize Lucid');

    return this.lucid.newMessage(address, asciiToHex(SIGNING_MESSAGE)).sign();
  }
}

const web3 = Web3.instance;

export { Web3, web3 };
