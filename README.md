# @wepin/wagmi-connector

Wepin Wagmi Connector for React.

## ⏩ Get App ID and Key

Contact to wepin.contact@iotrust.kr

## ⏩ Information

### Support Version

![wagmi version](https://img.shields.io/badge/wagmi-0.12.x-green)

### Support Networks

<details>
<summary>Open</summary>

- [WepinProvider Docs](https://www.npmjs.com/package/@wepin/provider)

| Chain ID | Network Name            | Network Variable   |
| -------- | ----------------------- | ------------------ |
| 1        | Ethereum Mainnet        | ethereum           |
| 5        | Ethereum Goerli Testnet | evmeth-goerli      |
| 19       | Songbird Canary Network | evmsongbird        |
| 137      | Polygon Mainnet         | evmpolygon         |
| 1001     | Klaytn Testnet          | klaytn-testnet     |
| 2731     | Time Testnet            | evmtime-elizabeth  |
| 8217     | Klaytn Mainnet          | klaytn             |
| 80001    | Polygon Mumbai          | evmpolygon-testnet |
| 11155111 | Ethereum Sepolia        | evmeth sepolia     |

</details>

### Connector Options

<details>
<summary>Open</summary>

- `appId` \<string>
- `appKey` \<string>
- `defaultChainId` \<number> _optional_
  - **defaultChainId:**
    - Defines the default network that the provider connects to during initialization
    - It defaults to the network of the User's first account.
- `attributes` \<IAttributes> _optional_
  - **type:**
    - The type of display of widget as wepin is initiated (defalut: 'hide)
    - 'hide' | 'show'
  - **defaultLanguage:**
    - Specifies the language displayed on the widget (default: 'ko')
    - Currently, only 'ko' and 'en' are supported.
  - **defaultCurrency:**
    - Sets the currency displayed on the widget (default: 'KRW').
  - **loginProviders:**
    - An array of login providers to configure the widget. (If not provided, all available login providers will be displayed on the widget.)
    - The `loginProviders` parameter accepts values defined in the LoginProviders of `@wepin/types` , starting from version `v0.0.11`.

</details>

## ⏩ Install

### @wepin/wagmi-connector

```bash
npm install wagmi viem @wepin/wagmi-connector
```

or

```bash
yarn add wagmi viem @wepin/wagmi-connector
```

## ⏩ Get Started

### 1. Import Connector

```ts
import { WepinConnector } from '@wepin/wagmi-connector'
import type { WepinConnectorOptions } from '@wepin/wagmi-connector' // ts
```

### 2. Setup Options

```ts
const connectorOptions: WepinConnectorOptions = {
  appId: 'YOUR_APP_ID',
  appKey: 'YOUR_APP_KEY',
}
```

### 3. Add to Connectors

```ts
const client = createClient({
  connectors: [
    // ...Other Connectors,
    new WepinConnector({
      chains,
      options: connectorOptions,
    }),
  ],
  provider,
})
```

### 4. Wrap app with `WagmiConfig`

```tsx
import { WagmiConfig } from 'wagmi'

// ...

function App() {
  return (
    <WagmiConfig client={client}>
      <YourRoutes />
    </WagmiConfig>
  )
}
```

<details>
<summary>View Sources -> <i>App.ts</i></summary>

```tsx
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { avalanche, goerli, mainnet, optimism } from 'wagmi/chains'

import {
  WepinConnector,
  type WepinConnectorOptions,
} from '@wepin/wagmi-connector'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { publicProvider } from 'wagmi/providers/public'
import { Account, Connect, NetworkSwitcher } from './components'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, optimism, avalanche],
  [publicProvider()],
  { targetQuorum: 1 },
)

const connectorOptions: WepinConnectorOptions = {
  appId: 'YOUR_APP_ID',
  appKey: 'YOUR_APP_KEY',
}

const client = createClient({
  autoConnect: true,
  connectors: [
    new WepinConnector({
      chains,
      options: connectorOptions,
    }),
  ],
  provider,
  webSocketProvider,
})

export const App = () => {
  return (
    <>
      <WagmiConfig client={client}>
        <YourRoutes />
      </WagmiConfig>
    </>
  )
}

// App.tsx
```

</details>

## ⏩ You're good to go!

Every component inside the `WagmiConfig` is now set up to use the wagmi hooks with **Wepin**

```tsx
import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export const Connect = () => {
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <h2>useConnect</h2>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  )
}

// Connector.tsx
```

Want to learn more? Check out [other hooks](https://wagmi.sh/react/hooks/useAccount) to learn how to use wagmi in real-world scenarios or continue on reading the documentation.
