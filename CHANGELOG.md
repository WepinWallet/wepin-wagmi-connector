## [Version 0.1.2](https://github.com/WepinWallet/wepin-wagmi-connector/releases/tag/v0.1.2) (2024-01-18)

### Updates:

- **New Network Support: Ethereum Sepolia Testnet**

  Added support for Ethereum Sepolia testnet network with the following details:

  | Chain ID | Network Name     | Network Variable |
  | -------- | ---------------- | ---------------- |
  | 11155111 | Ethereum Sepolia | evmeth sepolia   |

### New Features:

- **Selectable Login Provider**

  The Connector now supports the selection of Login Providers. Introducing the attribute.loginProviders parameter in Connector options for a more customized login experience.

  _Usage Example:_

  ```js
  const connectorOptions = {
    attribute: {
      loginProviders: ['google', 'apple'],
      // Other settings...
    },
    // Other Connector settings...
  }
  ```

### Support Version:

![wagmi version](https://img.shields.io/badge/wagmi-1.x.x-green)

## [Version 0.0.3-alpha](https://github.com/WepinWallet/wepin-wagmi-connector/releases/tag/v0.0.3-alpha) (2024-01-09)

### Updates:

- **New Network Support: Ethereum Sepolia Testnet**

  Added support for Ethereum Sepolia testnet network with the following details:

  | Chain ID | Network Name     | Network Variable |
  | -------- | ---------------- | ---------------- |
  | 11155111 | Ethereum Sepolia | evmeth sepolia   |

### New Features:

- **Selectable Login Provider**

  The Connector now supports the selection of Login Providers. Introducing the attribute.loginProviders parameter in Connector options for a more customized login experience.

  _Usage Example:_

  ```js
  const connectorOptions = {
    attribute: {
      loginProviders: ['google', 'apple'],
      // Other settings...
    },
    // Other Connector settings...
  }
  ```

### Support Version:

![wagmi version](https://img.shields.io/badge/wagmi-0.12.x-green)

## [Version 0.1.1](https://github.com/WepinWallet/wepin-wagmi-connector/releases/tag/v0.1.1) (2024-01-05)

### Updates:

- **Compatibility Update: wagmi Major Version Upgrade**

  Updated to align with wagmi major update from version `0.12.x` to `1.x.x`.

### Support Version:

![wagmi version](https://img.shields.io/badge/wagmi-1.x.x-green)

## [Version 0.0.2-alpha](https://github.com/WepinWallet/wepin-wagmi-connector/releases/tag/v0.0.2-alpha) (2023-12-15)

### Updates:

- **Compatibility Update: Legacy Version Support Only**

  This release exclusively supports wagmi version 0.12.x.

  ![wagmi version](https://img.shields.io/badge/wagmi-0.12.x-green)

- **New Network Support: Anttime Testnet**

  Added support for anttime testnet network with the following details:

  | Chain ID | Network Name | Network Variable  |
  | -------- | ------------ | ----------------- |
  | 2731     | Time Testnet | evmtime-elizabeth |
