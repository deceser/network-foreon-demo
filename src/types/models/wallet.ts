type TWalletType =
  | 'begin'
  | 'eternl'
  | 'flint'
  | 'gerowallet'
  | 'lace'
  | 'nami'
  | 'nufi'
  | 'yoroi';

enum ENetworkId {
  MAINNET = 1,
  TESTNET = 0,
}

interface IWalletInfo {
  icon: string; // Moved up as per the linting rule
  key: TWalletType;
  link: string;
  name: string;
}

enum EConnectionStatus {
  Unavailable = 0, // Wallet is not in window.cardano object. That means wallet extension is not installed in users browser.
  Available, // Wallet is in window.cardano object. Extension installed.
  Enabled, // isEnabled() = true. Means user whitelisted URL in wallet extension.
  Connected, // Connector received and stored API object
}

// Single consolidated export
export { ENetworkId, EConnectionStatus };
export type { TWalletType, IWalletInfo };
