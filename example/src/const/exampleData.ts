import { erc721ABI } from 'wagmi'

export const walletAddress = (chainId: number) => {
  switch (chainId) {
    case 137:
      return '0xa0eDC5F03449BF8977AB0ECf5924a5126E513d4B'
    default:
      return '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'
  }
}
export const walletEnsName = (chainId: number) => {
  switch (chainId) {
    case 137:
      return 'polygon.pol'
    default:
      return 'awkweb.eth'
  }
}
export const transactionHash = (chainId: number) => {
  switch (chainId) {
    case 137:
      return '0x3c2b547e86488ec47649cca18fb5849475eacf0d26830439ee18c386210b73c2'
    default:
      return '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060'
  }
}
export const contractConfig = (chainId: number) => {
  switch (chainId) {
    case 137:
      return polyContractConfig
    default:
      return ethContractConfig
  }
}
export const ethContractConfig = {
  address: '0x79FCDEF22feeD20eDDacbB2587640e45491b757f', // mfer
  abi: erc721ABI,
} as const
export const polyContractConfig = {
  address: '0x5D666F215a85B87Cb042D59662A7ecd2C8Cc44e6', // Galxe OAT
  abi: erc721ABI,
} as const
