import { useContractRead } from 'wagmi'
import { contractConfig } from '../const'

export const ContractRead = ({ chainId }: { chainId: number }) => {
  const { data, isLoading, isRefetching, refetch } = useContractRead({
    ...contractConfig(chainId),
    functionName: 'totalSupply',
  })
  return (
    <div>
      <h2>useContractRead</h2>
      <div>contract address: {contractConfig(chainId).address}</div>
      <div>
        Total Supply: {data?.toString()}
        <button
          disabled={isLoading || isRefetching}
          onClick={() => refetch()}
          style={{ marginLeft: 4 }}
        >
          {isLoading || isRefetching ? 'loading...' : 'fetch'}
        </button>
        <br />
      </div>
    </div>
  )
}
