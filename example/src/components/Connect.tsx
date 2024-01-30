import { useState } from 'react'
import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { WepinConnector } from '@wepin/wagmi-connector'
import { IWepinUser } from '@wepin/types'

export function Connect() {
  const [wepinUser, setWepinUser] = useState<IWepinUser | null>(null)
  const { connector, isConnected } = useAccount()
  const {
    connect,
    connectAsync,
    connectors,
    error,
    isLoading,
    pendingConnector,
  } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = async (connector: any) => {
    // if you want to get login data
    if (connector instanceof WepinConnector) {
      await connectAsync({ connector })
      const wepinUser = connector.getLoginData()
      if (wepinUser) {
        setWepinUser(wepinUser)
      }
      return
    }
    // for other connectors
    connect({ connector })
  }

  return (
    <div>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => handleConnect(x)}>
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

      {isConnected && wepinUser?.status === 'success' && (
        <div>
          <div>userId: {wepinUser.userInfo.userId}</div>
          <div>email: {wepinUser.userInfo.email}</div>
          <div>provider: {wepinUser.userInfo.provider}</div>
        </div>
      )}
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  )
}
