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
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
  ],
  provider,
  webSocketProvider,
})

export const App = () => {
  return (
    <>
      <WagmiConfig client={client}>
        <Connect />
        <Account />
        <NetworkSwitcher />
      </WagmiConfig>
    </>
  )
}
