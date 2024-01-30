import { Address, Chain, Connector, ConnectorData, WalletClient } from '@wagmi/core';
import '@wepin/widget-sdk';
import type { BaseProvider } from '@wepin/widget-sdk';
import { WepinConnectorOptions } from './types';
import { IWepinUser } from '@wepin/types';
export declare class WepinConnector extends Connector<BaseProvider, WepinConnectorOptions> {
    #private;
    readonly ready: boolean;
    readonly id = "wepin";
    readonly name = "Wepin";
    constructor({ chains, options, }: {
        chains?: Chain[];
        options: WepinConnectorOptions;
    });
    connect(): Promise<Required<ConnectorData>>;
    disconnect(): Promise<void>;
    getAccount(): Promise<Address>;
    getChainId(): Promise<number>;
    getProvider({ chainId }: {
        chainId: number;
    }): Promise<BaseProvider>;
    getWalletClient({ chainId, }?: {
        chainId?: number;
    }): Promise<WalletClient>;
    isAuthorized(): Promise<boolean>;
    switchChain(chainId: number): Promise<Chain>;
    protected isChainUnsupported(chainId: number): boolean;
    protected onAccountsChanged(accounts: Address[]): void;
    protected onChainChanged(chainId: string | number): void;
    protected onConnect(): void;
    protected onDisconnect(): void;
    getLoginData(): IWepinUser | null;
}
