import { useFeeData } from 'wagmi'
import { stringify } from 'viem'

export const FeeData = () => {
  const { data, isError, isLoading, refetch, isRefetching } = useFeeData()

  return (
    <div>
      <h2>useFeeData</h2>
      {isLoading && <div>isLoading...</div>}
      {isError && <div>isError</div>}
      {data && <div>fee data: {stringify(data?.formatted)}</div>}
      <button disabled={isLoading || isRefetching} onClick={() => refetch()}>
        {isLoading || isRefetching ? 'loading...' : 'fetch'}
      </button>
    </div>
  )
}
