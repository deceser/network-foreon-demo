enum ECardanoNetwork {
  Mainnet = 'Mainnet',
  Preprod = 'Preprod',
  Preview = 'Preview',
}

type TCardanoNetwork = keyof typeof ECardanoNetwork;
type TCardanoNetworkWalletValue = { [key in TCardanoNetwork]: number };
type TNetworkValue = 0 | 1;

const CardanoNetworkWalletValue = {
  [ECardanoNetwork.Mainnet]: 1,
  [ECardanoNetwork.Preview]: 0,
  [ECardanoNetwork.Preprod]: 0,
} as const;

export { ECardanoNetwork, CardanoNetworkWalletValue };

export type { TCardanoNetworkWalletValue, TNetworkValue };
