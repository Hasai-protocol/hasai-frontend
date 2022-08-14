// @ts-nocheck
const { BigNumber } = require("ethers");

const RESERVE_FACTOR_MASK = BigNumber.from('0xFFFF'); // prettier-ignore
const BORROW_RATIO_MASK = BigNumber.from('0xFFFF0000'); // prettier-ignore
const PERIOD_MASK = BigNumber.from('0xFFFFFFFFFF00000000'); // prettier-ignore
const MIN_BORROW_TIME_MASK = BigNumber.from('0xFFFFFFFFFF000000000000000000'); // prettier-ignore
const ACTIVE_MASK = BigNumber.from('0x10000000000000000000000000000'); // prettier-ignore
const LIQUIDATION_THRESHOLD_MASK = BigNumber.from('0x1FFFE0000000000000000000000000000'); // prettier-ignore
const BORROWING_MASK = BigNumber.from('0x200000000000000000000000000000000'); // prettier-ignore
const STABLE_BORROWING_MASK = BigNumber.from('0x400000000000000000000000000000000'); // prettier-ignore
const LIQUIDATION_TIME_MASK = BigNumber.from('0x1FFFF800000000000000000000000000000000'); // prettier-ignore
const BID_TIME_MASK = BigNumber.from('0x1FFFFFE0000000000000000000000000000000000000'); // prettier-ignore
const FROZEN_MASK = BigNumber.from('0x20000000000000000000000000000000000000000000'); // prettier-ignore
const LOCK_MASK = BigNumber.from('0x3FFFFFFFC0000000000000000000000000000000000000000000'); // prettier-ignore
const TYPE_MASK = BigNumber.from('0x3FC000000000000000000000000000000000000000000000000000'); // prettier-ignore

/// @dev For the factor, the start bit is 0 (up to 15), hence no bitshifting is needed
const BASE = BigNumber.from(2);
const BORROW_RATIO_START_BIT_POSITION = BigNumber.from(16);
const PERIOD_START_BIT_POSITION = BigNumber.from(32);
const MIN_BORROW_TIME_START_BIT_POSITION = BigNumber.from(72);
const IS_ACTIVE_START_BIT_POSITION = BigNumber.from(112);
const LIQUIDATION_THRESHOLD_START_BIT_POSITION = BigNumber.from(113);
const BORROWING_ENABLED_START_BIT_POSITION = BigNumber.from(129);
const STABLE_BORROWING_ENABLED_START_BIT_POSITION = BigNumber.from(130);
const LIQUIDATION_TIME_START_BIT_POSITION = BigNumber.from(131);
const BID_TIME_START_BIT_POSITION = BigNumber.from(155);
const IS_FROZEN_START_BIT_POSITION = BigNumber.from(179);
const LOCK_START_BIT_POSITION = BigNumber.from(180);
const TYPE_START_BIT_POSITION = BigNumber.from(212);

function getReserveFactor(data) {
    return BigNumber.from(data).and(RESERVE_FACTOR_MASK).toString();
}

export function getBorrowRatio(data) {
    return BigNumber.from(data)
        .and(BORROW_RATIO_MASK)
        .div(BASE.pow(BORROW_RATIO_START_BIT_POSITION))
        .toString();
}

export function getPeriod(data) {
    return BigNumber.from(data)
        .and(PERIOD_MASK)
        .div(BASE.pow(PERIOD_START_BIT_POSITION))
        .toString();
}

function getMinBorrowTime(data) {
    return BigNumber.from(data)
        .and(MIN_BORROW_TIME_MASK)
        .div(BASE.pow(MIN_BORROW_TIME_START_BIT_POSITION))
        .toString();
}

function getActive(data) {
    return (
        BigNumber.from(data)
            .and(ACTIVE_MASK)
            .div(BASE.pow(IS_ACTIVE_START_BIT_POSITION)) > 0
    );
}

function getLiqThreshold(data) {
    return BigNumber.from(data)
        .and(LIQUIDATION_THRESHOLD_MASK)
        .div(BASE.pow(LIQUIDATION_THRESHOLD_START_BIT_POSITION))
        .toString();
}

function getBorrowing(data) {
    return (
        BigNumber.from(data)
            .and(BORROWING_MASK)
            .div(BASE.pow(BORROWING_ENABLED_START_BIT_POSITION)) > 0
    );
}

export function getStableBorrowing(data) {
    return (
        BigNumber.from(data)
            .and(STABLE_BORROWING_MASK)
            .div(BASE.pow(STABLE_BORROWING_ENABLED_START_BIT_POSITION)) > 0
    );
}

function getLiqDuration(data) {
    return BigNumber.from(data)
        .and(LIQUIDATION_TIME_MASK)
        .div(BASE.pow(LIQUIDATION_TIME_START_BIT_POSITION))
        .toString();
}

function getBidDuration(data) {
    return BigNumber.from(data)
        .and(BID_TIME_MASK)
        .div(BASE.pow(BID_TIME_START_BIT_POSITION))
        .toString();
}

function getFrozen(data) {
    return (
        BigNumber.from(data)
            .and(FROZEN_MASK)
            .div(BASE.pow(IS_FROZEN_START_BIT_POSITION)) > 0
    );
}

function getLockTime(data) {
    return BigNumber.from(data)
        .and(LOCK_MASK)
        .div(BASE.pow(LOCK_START_BIT_POSITION))
        .toString();
}

// 0 for permissionless pool, 1 for blue chip pool, others for middle pool
export function getPoolType(data) {
    return BigNumber.from(data)
        .and(TYPE_MASK)
        .div(BASE.pow(TYPE_START_BIT_POSITION))
        .toString();
}
// function run() {
//     let data = BigNumber.from(
//         "0x0278d000001c20001c267531000000012c0000000384006407d0"
//     );
//     console.log("factor\t", getReserveFactor(data));
//     console.log("borrow ratio\t", getBorrowRatio(data));
//     console.log("period\t", getPeriod(data));
//     console.log("min borrow time\t", getMinBorrowTime(data));
//     console.log("active\t", getActive(data));
//     console.log("liqThreshold\t", getLiqThreshold(data));
//     console.log("borrowing\t", getBorrowing(data));
//     console.log("stable borrowing\t", getStableBorrowing(data));
//     console.log("liqDuration\t", getLiqDuration(data));
//     console.log("bidDuration\t", getBidDuration(data));
//     console.log("frozen\t", getFrozen(data));
//     console.log("lock time\t", getLockTime(data));
//     console.log("type\t", getPoolType(data));
// }

// console.log("start");
// run();
