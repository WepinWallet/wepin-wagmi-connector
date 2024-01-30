## [Version 0.1.3](https://github.com/WepinWallet/wepin-wagmi-connector/releases/tag/v0.1.3) (2024-01-26)

### Updates:

- Added Ability to Retrieve LoginData after Connect

### New Features:

- **Retrieve Login Data after Connecting to Wepin**

  You can now retrieve Login Data after connecting to Wepin.
  Access the `getLoginData()` method through the WepinConnector.  
  The loginData conforms to the `IWepinUser` interface from [@wepin/types](https://github.com/WepinWallet/wepin-js-sdk-types).

  <details>
  <summary><i>Usage Example:</i></summary>

  ```ts
  import { useState } from 'react'
  import { useAccount, useConnect, useDisconnect } from 'wagmi'
  import { WepinConnector } from '@wepin/wagmi-connector'
  import { IWepinUser } from '@wepin/types'

  export function Connect() {
    const [wepinUser, setWepinUser] = useState<IWepinUser | null>(null)
    const { connector, isConnected } = useAccount()
    const {
      connect,
      connectAsync,
      connectors,
      error,
      isLoading,
      pendingConnector,
    } = useConnect()
    const { disconnect } = useDisconnect()

    const handleConnect = async (connector: any) => {
      // if you want to get login data
      if (connector instanceof WepinConnector) {
        await connectAsync({ connector })
        const wepinUser = connector.getLoginData()
        if (wepinUser) {
          setWepinUser(wepinUser)
        }
        return
      }
      // for other connectors
      connect({ connector })
    }

    return (
      <div>
        <div>
          {isConnected && (
            <button onClick={() => disconnect()}>
              Disconnect from {connector?.name}
            </button>
          )}

          {connectors
            .filter((x) => x.ready && x.id !== connector?.id)
            .map((x) => (
              <button key={x.id} onClick={() => handleConnect(x)}>
                {x.name}
                {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
              </button>
            ))}
        </div>

        {isConnected && wepinUser?.status === 'success' && (
          <div>
            <div>userId: {wepinUser.userInfo.userId}</div>
            <div>email: {wepinUser.userInfo.email}</div>
            <div>provider: {wepinUser.userInfo.provider}</div>
          </div>
        )}
        {error && <div>{(error as BaseError).shortMessage}</div>}
      </div>
    )
  }

  // Connector.tsx
  ```

  </details>

### Support Version:

![wagmi version](https://img.shields.io/badge/wagmi-1.x.x-green)

## [Version 0.1.2](https://github.com/WepinWallet/wepin-wagmi-connector/releases/tag/v0.1.2) (2024-01-09)

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
