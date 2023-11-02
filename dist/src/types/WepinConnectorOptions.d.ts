import type { BaseProvider, SupportedChains } from '@wepin/provider';
import { IAttributes, IWepin } from '@wepin/types';
export interface NetworkInformation {
    rpcUrl: string;
    chainId: string;
}
export interface IWepinWithProvider extends IWepin {
    getProvider: (config: {
        network?: string;
    }) => BaseProvider;
    getNetworkInfoByName: (network: SupportedChains) => NetworkInformation;
    getNetworkByChainId: (chainId: unknown) => string;
    finalize: () => void;
}
export interface WepinConnectorOptions {
    appId: string;
    appKey: string;
    defaultChainId?: number;
    attributes?: IAttributes;
}
