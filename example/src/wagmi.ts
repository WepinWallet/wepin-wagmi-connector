import { configureChains, createConfig } from 'wagmi'
import {
  mainnet,
  goerli,
  songbird,
  polygon,
  polygonMumbai,
  klaytn,
} from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import {
  WepinConnector,
  type WepinConnectorOptions,
} from '@wepin/wagmi-connector'
import { publicProvider } from 'wagmi/providers/public'

// Provider Support Networks: https://www.npmjs.com/package/@wepin/provider
const { chains, publicClient } = configureChains(
  [
    mainnet, // 1, ethereum
    goerli, // 5, evmeth-goerlis
    songbird, // 19, evmsongbird
    polygon, // 137, evmpolygon
    klaytn, // 8217, klaytn
    polygonMumbai, // 80001, evmpolygon-testnet
  ],
  [publicProvider()],
)

const connectorOptions: WepinConnectorOptions = {
  appId: '',
  appKey: 'ak_dev_QLL1K1YdEDnd0cN22rnm75Zo303tMHnHFhKeiyAQ68Q',
}

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new WepinConnector({
      chains,
      options: connectorOptions,
    }),
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
})
