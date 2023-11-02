import { useEnsAddress } from 'wagmi'
import { walletEnsName } from '../const'
import { BaseError } from 'viem'

export const EnsAddress = ({ chainId }: { chainId: number }) => {
  const { data, error, isLoading } = useEnsAddress({
    name: walletEnsName(chainId),
  })

  return (
    <div>
      <h2>useEnsAddress</h2>
      <div>name: {walletEnsName(chainId)}</div>
      {isLoading && <div>isLoading...</div>}
      {error && <div>{(error as BaseError).shortMessage}</div>}
      {data && <div>address: {data}</div>}
    </div>
  )
}
