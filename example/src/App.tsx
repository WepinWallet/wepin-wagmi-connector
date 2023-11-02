import { useAccount, useNetwork } from 'wagmi'
import {
  Account,
  ContractRead,
  ContractWrite,
  EnsAddress,
  EnsName,
  FeeData,
  PrepareContractWrite,
  SignMessage,
  WaitForTransaction,
} from './components'
import { WatchProvider } from './WatchProvider'

function App() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  return (
    <>
      <h1>WepinConnector for wagmi</h1>
      <WatchProvider />
      {isConnected && (
        <>
          <Account />
          <ContractRead chainId={chain?.id ?? 1} />
          <ContractWrite chainId={chain?.id ?? 1} />
          <EnsAddress chainId={chain?.id ?? 1} />
          <EnsName chainId={chain?.id ?? 1} />
          <FeeData />
          <PrepareContractWrite chainId={chain?.id ?? 1} />
          <SignMessage />
          <WaitForTransaction chainId={chain?.id ?? 1} />
        </>
      )}
    </>
  )
}

export default App
