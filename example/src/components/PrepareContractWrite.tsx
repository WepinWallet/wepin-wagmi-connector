import { usePrepareContractWrite } from 'wagmi'
import { stringify } from 'viem'
import { contractConfig, walletAddress } from '../const'

export const PrepareContractWrite = ({ chainId }: { chainId: number }) => {
  const { config, isLoading, error } = usePrepareContractWrite({
    ...contractConfig(chainId),
    functionName: 'approve',
    args: [walletAddress(chainId), BigInt(1)],
  })

  return (
    <div>
      <h2>usePrepareContractWrite</h2>
      <div>contract address: {contractConfig(chainId).address}</div>
      {isLoading && <div>isLoading...</div>}
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
      {config && <div>config: {stringify(config)}</div>}
    </div>
  )
}
