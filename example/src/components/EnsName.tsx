import { useEnsName } from 'wagmi'
import { walletAddress } from '../const'
import { BaseError } from 'viem'

export const EnsName = ({ chainId }: { chainId: number }) => {
  const { data, isLoading, error } = useEnsName({
    address: walletAddress(chainId),
  })

  return (
    <div>
      <h2>useEnsName</h2>
      <div>address: {walletAddress(chainId)}</div>
      {isLoading && <div>isLoading...</div>}
      {error && <div>{(error as BaseError).shortMessage}</div>}
      {data && <div>name: {data}</div>}
    </div>
  )
}
