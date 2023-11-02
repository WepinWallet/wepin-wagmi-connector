import { configureChains, createConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'
import {
  WepinConnector,
  type WepinConnectorOptions,
} from '@wepin/wagmi-connector'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, ...(import.meta.env?.MODE === 'development' ? [] : [])],
  [publicProvider()],
)

const connectorOptions: WepinConnectorOptions = {
  appId: 'YOUR_APP_ID',
  appKey: 'YOUR_APP_KEY',
}

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new WepinConnector({
      chains,
      options: connectorOptions,
    }),
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})
