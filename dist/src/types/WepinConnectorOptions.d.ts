import { IAttributes } from '@wepin/types';
export interface WepinConnectorOptions {
    appId: string;
    appKey: string;
    defaultChainId?: number;
    attributes?: IAttributes;
}
