import { useAccount } from 'wagmi'

export const Account = () => {
  const { address } = useAccount()

  return (
    <div>
      <h2>useAccount</h2>
      <div>address: {address}</div>
    </div>
  )
}
