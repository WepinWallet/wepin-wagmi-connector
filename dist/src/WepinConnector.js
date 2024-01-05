var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WepinConnector_provider, _WepinConnector_wepinInstance;
import { Connector } from '@wagmi/core';
import { SwitchChainError, UserRejectedRequestError, getAddress, numberToHex, } from 'viem';
import '@wepin/widget-sdk';
import { formatChainId } from './utils';
import { SupportedChainId } from './const';
import { providers } from 'ethers';
export class WepinConnector extends Connector {
    constructor({ chains, options, }) {
        super({ chains, options });
        this.ready = typeof window !== 'undefined';
        this.id = 'wepin';
        this.name = 'Wepin';
        _WepinConnector_provider.set(this, null);
        _WepinConnector_wepinInstance.set(this, void 0);
        __classPrivateFieldSet(this, _WepinConnector_wepinInstance, window.Wepin, "f");
    }
    connect() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").isInitialized()) {
                const { appId, appKey, attributes } = this.options;
                yield __classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").init(appId, appKey, attributes);
            }
            try {
                yield __classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").login();
                if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.defaultChainId) {
                    const chainId = this.options.defaultChainId;
                    __classPrivateFieldSet(this, _WepinConnector_provider, yield this.getProvider({ chainId }), "f");
                }
                else {
                    const accounts = yield __classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").getAccounts();
                    const network = ((_c = (_b = accounts === null || accounts === void 0 ? void 0 : accounts[0]) === null || _b === void 0 ? void 0 : _b.network) !== null && _c !== void 0 ? _c : 'ethereum');
                    __classPrivateFieldSet(this, _WepinConnector_provider, __classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").getProvider({ network }), "f");
                }
                const account = yield this.getAccount();
                const id = yield this.getChainId();
                const unsupported = this.isChainUnsupported(id);
                return {
                    account,
                    chain: { id, unsupported },
                    provider: __classPrivateFieldGet(this, _WepinConnector_provider, "f"),
                };
            }
            catch (error) {
                if (/user rejected/i.test(error === null || error === void 0 ? void 0 : error.message)) {
                    throw new UserRejectedRequestError(error);
                }
                throw error;
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").finalize();
        });
    }
    getAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _WepinConnector_provider, "f")) {
                throw new Error('Provider is not ready.');
            }
            if (__classPrivateFieldGet(this, _WepinConnector_provider, "f").selectedAddress) {
                return __classPrivateFieldGet(this, _WepinConnector_provider, "f").selectedAddress;
            }
            try {
                const account = (yield __classPrivateFieldGet(this, _WepinConnector_provider, "f").request({
                    method: 'eth_accounts',
                }));
                return getAddress(account[0]);
            }
            catch (error) {
                throw new Error('Failed to get Wepin account.');
            }
        });
    }
    getChainId() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const chainId = yield ((_a = __classPrivateFieldGet(this, _WepinConnector_provider, "f")) === null || _a === void 0 ? void 0 : _a.request({
                method: 'eth_chainId',
            }));
            return formatChainId(String(chainId));
        });
    }
    getProvider({ chainId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = numberToHex(chainId);
            const network = __classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").getNetworkByChainId(id);
            return __classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").getProvider({ network });
        });
    }
    getSigner({ chainId, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.getAccount();
            const chain = this.chains.find((x) => x.id === chainId);
            if (!__classPrivateFieldGet(this, _WepinConnector_provider, "f"))
                throw new Error('provider is required.');
            return new providers.Web3Provider(__classPrivateFieldGet(this, _WepinConnector_provider, "f"), chain === null || chain === void 0 ? void 0 : chain.id).getSigner(account);
        });
    }
    isAuthorized() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = (_a = __classPrivateFieldGet(this, _WepinConnector_provider, "f")) === null || _a === void 0 ? void 0 : _a.selectedAddress;
                return !!account;
            }
            catch (_b) {
                return false;
            }
        });
    }
    switchChain(chainId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const id = numberToHex(chainId);
            try {
                yield ((_a = __classPrivateFieldGet(this, _WepinConnector_provider, "f")) === null || _a === void 0 ? void 0 : _a.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: id }],
                }));
                __classPrivateFieldSet(this, _WepinConnector_provider, yield this.getProvider({ chainId }), "f");
                this.onChainChanged(chainId);
                return (this.chains.find((x) => x.id === chainId) || {
                    id: chainId,
                    name: `Chain ${(_b = __classPrivateFieldGet(this, _WepinConnector_provider, "f")) === null || _b === void 0 ? void 0 : _b.chainId}`,
                    network: `${(_c = __classPrivateFieldGet(this, _WepinConnector_provider, "f")) === null || _c === void 0 ? void 0 : _c.chainId}`,
                    nativeCurrency: { name: 'Ether', decimals: 18, symbol: 'ETH' },
                    rpcUrls: { default: { http: [''] }, public: { http: [''] } },
                });
            }
            catch (error) {
                if (/user rejected/i.test(error === null || error === void 0 ? void 0 : error.message)) {
                    throw new UserRejectedRequestError(error);
                }
                throw new SwitchChainError(error);
            }
        });
    }
    isChainUnsupported(chainId) {
        return !SupportedChainId.includes(chainId);
    }
    onAccountsChanged(accounts) {
        if (accounts.length === 0) {
            this.emit('disconnect');
            return;
        }
        this.emit('change', { account: getAddress(accounts[0]) });
    }
    onChainChanged(chainId) {
        const id = formatChainId(chainId);
        const unsupported = this.isChainUnsupported(id);
        this.emit('change', { chain: { id, unsupported } });
    }
    onConnect() {
        this.emit('connect', {});
    }
    onDisconnect() {
        this.emit('disconnect');
    }
}
_WepinConnector_provider = new WeakMap(), _WepinConnector_wepinInstance = new WeakMap();
//# sourceMappingURL=WepinConnector.js.map