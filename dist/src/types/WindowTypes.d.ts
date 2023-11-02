import type { Wepin as importedWepin } from '@wepin/widget-sdk';
declare global {
    interface Window {
        Wepin: importedWepin | undefined;
    }
}
