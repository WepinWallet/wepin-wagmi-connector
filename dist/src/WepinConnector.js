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
var _WepinConnector_provider, _WepinConnector_wepinInstance, _WepinConnector_loginData;
import { Connector, } from '@wagmi/core';
import '@wepin/widget-sdk';
import { SwitchChainError, UserRejectedRequestError, createWalletClient, custom, getAddress, numberToHex, } from 'viem';
import { formatChainId } from './utils';
export class WepinConnector extends Connector {
    constructor({ chains, options, }) {
        super({ chains, options });
        this.ready = typeof window !== 'undefined';
        this.id = 'wepin';
        this.name = 'Wepin';
        _WepinConnector_provider.set(this, null);
        _WepinConnector_wepinInstance.set(this, void 0);
        _WepinConnector_loginData.set(this, null);
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
                __classPrivateFieldSet(this, _WepinConnector_loginData, yield __classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").login(), "f");
                if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.defaultChainId) {
                    const chainId = this.options.defaultChainId;
                    if (this.isChainUnsupported(chainId)) {
                        throw new Error(`${chainId} is an unsupported chain in your App.`);
                    }
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
                return { account, chain: { id, unsupported } };
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
            __classPrivateFieldSet(this, _WepinConnector_loginData, null, "f");
            __classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").finalize();
        });
    }
    getAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _WepinConnector_provider, "f")) {
                throw new Error('Provider is not ready.');
            }
            try {
                const account = (yield __classPrivateFieldGet(this, _WepinConnector_provider, "f").request({
                    method: 'eth_requestAccounts',
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
    getWalletClient({ chainId, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.getAccount();
            const chain = this.chains.find((x) => x.id === chainId);
            if (!__classPrivateFieldGet(this, _WepinConnector_provider, "f"))
                throw new Error('Provider is not available.');
            return createWalletClient({
                account,
                chain,
                transport: custom(__classPrivateFieldGet(this, _WepinConnector_provider, "f")),
            });
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
        return (__classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").getNetworkByChainId(numberToHex(chainId)) ===
            undefined);
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
    getLoginData() {
        if (__classPrivateFieldGet(this, _WepinConnector_wepinInstance, "f").getStatus() !== 'login') {
            __classPrivateFieldSet(this, _WepinConnector_loginData, null, "f");
            throw new Error('You have not logged in yet.');
        }
        return __classPrivateFieldGet(this, _WepinConnector_loginData, "f");
    }
}
_WepinConnector_provider = new WeakMap(), _WepinConnector_wepinInstance = new WeakMap(), _WepinConnector_loginData = new WeakMap();
//# sourceMappingURL=WepinConnector.js.map