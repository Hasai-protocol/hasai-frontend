import { ethers } from "ethers";
import { format } from "mathjs";

const WalletSavedKey = "selectedWallet";

export const BASE_INDEX = 1e27;
export const seconds2Year = 60 * 60 * 24 * 365;

export const createContract = (address, abi, provider) => {
    return new ethers.Contract(address, abi, provider);
};
export const getSaveWallet = () => {
    return window.localStorage.getItem(WalletSavedKey) || "";
};

export const saveWallet = (wallet: string) => {
    window.localStorage.setItem(WalletSavedKey, wallet);
};

export const clearWallet = () => {
    window.localStorage.removeItem(WalletSavedKey);
};

export function makeAsyncIterator(len: number) {
    return {
        [Symbol.asyncIterator]: () => ({
            index: 0,
            next() {
                if (this.index < len) {
                    return Promise.resolve({
                        value: this.index++,
                        done: false,
                    });
                }
                return Promise.resolve({ value: undefined, done: true });
            },
        }),
    };
}
export function isAddress(value: any): string | false {
    try {
        return ethers.utils.getAddress(value);
    } catch {
        return false;
    }
}

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
export function calcDepositAPY(supplyRate: number) {
    const apr = supplyRate / BASE_INDEX;
    return +(((1 + apr / seconds2Year) ** seconds2Year - 1) * 100).toFixed(2);
}
export function formatEther(v, precision = 3) {
    let formatV: string;
    if (v instanceof ethers.BigNumber) {
        formatV = ethers.utils.formatEther(format(+v, { notation: "fixed" }));
    } else {
        formatV = ethers.utils.formatEther(format(v, { notation: "fixed" }));
    }
    if (precision < 1) {
        return formatV;
    }
    const [int, float] = (formatV || "").split(".");
    if (!float) {
        return [int, "0".repeat(precision)].join(".");
    }
    return [int, float.padEnd(precision, "0").slice(0, precision)].join(".");
}

export function sliceNumStr(v: string, len = 0) {
    const [int, float] = (v || "").split(".");
    if (!float) {
        return int;
    }
    return [int, float.slice(0, len)].join(".");
}

/**
 *
 * @params wallet
 * @return showWallet
 */
export const showWallet = (walletAddress: string) => {
    if (!walletAddress) return "-";
    return (
        walletAddress.slice(0, 6) +
        "..." +
        walletAddress.slice(walletAddress.length - 4, walletAddress.length)
    );
};
