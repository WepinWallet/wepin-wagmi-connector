# @wepin/wagmi-connector

Wepin Wagmi Connector for React.

## ⏩ Get App ID and Key

Contact to wepin.contact@iotrust.kr

## ⏩ Information

### Support Version

![wagmi version](https://img.shields.io/badge/wagmi-1.x.x-green)

<details>

<summary>I already used <i>wagmi 0.12.x</i></summary>

- **Note for Users Still on** ![wagmi 0.12.x](https://img.shields.io/badge/wagmi-0.12.x-red)

If you are currently using _wagmi version 0.12.x_ and want to continue doing so, you can find the corresponding version of the connector library at [@wepin/wagmi-connector@0.0.2-alpha](https://github.com/WepinWallet/wepin-wagmi-connector/tree/v0.0.2-alpha).

Please be aware that this version is specifically designed to work with _wagmi 0.12.x_.

Refer to the [documentation for version 0.0.2-alpha](https://github.com/WepinWallet/wepin-wagmi-connector/tree/v0.0.2-alpha/README.md) for guidance on usage and compatibility.

</details>

</details>

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
  - The `attributes` type extends [`@wepin/types`](https://github.com/WepinWallet/wepin-js-sdk-types) as `IAttributes`
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
export const config = createConfig({
  connectors: [
    // ...Other Connectors,
    new WepinConnector({
      chains,
      options: connectorOptions,
    }),
  ],
  publicClient,
})
```

<details>
<summary>View Sources -> <i>wagmi.ts</i></summary>

```ts
import { configureChains, createConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { WepinConnector, WepinConnectorOptions } from '@wepin/wagmi-connector'

const { chains, publicClient } = configureChains(
  [
    mainnet, // 1, ethereum
    polygon, // 137, evmpolygon
  ],
  [publicProvider()],
)

const connectorOptions: WepinConnectorOptions = {
  appId: 'YOUR_APP_ID',
  appKey: 'YOUR_APP_KEY',
}

export const config = createConfig({
  connectors: [
    new WepinConnector({
      chains,
      options: connectorOptions,
    }),
  ],
  publicClient,
})

// wagmi.ts
```

</details>

### 4. Wrap app with `WagmiConfig`

```tsx
import { WagmiConfig } from 'wagmi'
import { config } from './wagmi'

function App() {
  return (
    <WagmiConfig config={config}>
      <YourRoutes />
    </WagmiConfig>
  )
}
```

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
