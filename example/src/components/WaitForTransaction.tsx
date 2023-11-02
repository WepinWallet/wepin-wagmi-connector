import { useWaitForTransaction } from 'wagmi'
import { stringify } from 'viem'
import { transactionHash } from '../const'

export const WaitForTransaction = ({ chainId }: { chainId: number }) => {
  const { data, isLoading, isError, isSuccess } = useWaitForTransaction({
    hash: transactionHash(chainId),
  })

  return (
    <div>
      <h2>useWaitForTransaction</h2>
      <div>hash: {transactionHash(chainId)}</div>
      {isLoading && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {transactionHash(chainId)}</div>
          <div>Transaction Receipt: {stringify(data)}</div>
        </>
      )}
      {isError && <div>Transaction Error</div>}
    </div>
  )
}
