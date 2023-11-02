import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { WagmiConfig } from 'wagmi'
import { config } from './wagmi'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
)
