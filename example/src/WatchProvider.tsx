import { useNetwork, useSwitchNetwork } from 'wagmi'
import { Connect } from './components'

export const WatchProvider = () => {
  const { chain } = useNetwork()
  const { chains, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()
  return (
    <>
      <div>
        <h2>Watch Provider</h2>
        <div>
          current Chain: {chain?.name ?? '#'} {chain?.id}
        </div>

        {chains.map((x) => (
          <button
            disabled={!switchNetwork || x.id === chain?.id}
            key={x.id}
            onClick={() => switchNetwork?.(x.id)}
          >
            {x.name}
            {isLoading && pendingChainId === x.id && ' (switching)'}
          </button>
        ))}
      </div>
      <Connect />
    </>
  )
}
