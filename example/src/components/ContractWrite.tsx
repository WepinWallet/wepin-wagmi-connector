import { BaseError } from 'viem'
import { useContractWrite } from 'wagmi'
import { contractConfig, walletAddress } from '../const'

export const ContractWrite = ({ chainId }: { chainId: number }) => {
  const { write, error, isLoading, isError } = useContractWrite({
    ...contractConfig(chainId),
    functionName: 'approve',
    args: [walletAddress(chainId), BigInt(1)],
  })

  return (
    <>
      <h2>useContractWrite</h2>
      <div>contract address: {contractConfig(chainId).address}</div>
      <button disabled={isLoading} onClick={() => write()}>
        write
      </button>

      {isLoading && <div>Check wallet...</div>}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
      {error && <div>Error: {error?.message}</div>}
    </>
  )
}
