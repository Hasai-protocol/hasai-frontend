import {
    action,
    makeAutoObservable,
    runInAction,
    computed,
    reaction,
} from "mobx";
import dayjs from "dayjs";

import { ethers } from "ethers";
import { format, i } from "mathjs";
import qs from "qs";
import {
    getPoolType,
    getStableBorrowing,
    getPeriod,
    getBorrowRatio,
} from "../bitCal";
import {
    ABI,
    Address,
    ERC721ABI,
    FactoryAbi,
    factoryContract,
    erc20,
    wethAddress,
    hTokenAbi,
} from "src/contract-config";
import {
    HTTP_PROVIDER,
    Filter,
    Status,
    InterestRateMode,
    dateFormat,
    getRepayCount,
    PoolType as PoolTypeEnum,
    testSlugHex,
    staticPoolInfo,
    nftPostDetail,
    seconds2Year,
} from "src/config";
import { getSaveWallet, createOnBoard } from "src/wallet";
import {
    makeAsyncIterator,
    formatEther,
    calcDepositAPY,
    showWallet,
} from "src/util";
import { ETHERSCAN_URL, CHAIN_ID } from "src/constants";
import { Auction } from "src/types";
import http from "src/http";
export default class Store {
    inited = false;
    poolInfoInited = false;
    chainId = 0;

    walletAddress = "";

    provider = null as unknown as ethers.providers.Web3Provider;

    onboard = null as unknown as any;

    contract = null as unknown as ethers.Contract;
    wethContract = null as unknown as ethers.Contract;
    blockTimeStamp = 0;
    ethBalance: any = 0;
    queryDepositListLoading = false;
    utcTimeStamp = 0;
    poolList: Array<any> = [];
    poolDataConfig: any = {};
    depositList: Array<any> = [];
    nftHexMap: any = {};
    totalInterest = "0";
    supportNFTs: Array<{
        apr: number;
        slug: string;
        name: string;
        period: number;
        address: string;
        banner: string;
        avatar: string;
        avaPrice: number;
        largeImg: string;
        borrowRate: number;
        totalSupply: string;
    }> = [];

    userNFTs: Array<{
        id: string;
        name: string;
        image: string;
        address: string;
    }> = [];

    queryUserNFTLoading = false;

    // : Array<{
    //     startTime: any;
    //     reserveId: string;
    //     rawAmount(arg0: number, borrowId: string, rawAmount: any);
    //     id: string;
    //     name: string;
    //     image: string;
    //     price: string;
    //     address: string;
    //     borrowId: string;
    //     liquidateTime: number;
    //     canLiquidation: boolean;
    // }>
    userBorrowList: any = [];

    userBorrowBase: Array<any> = [];

    userBorrowCursor = 0;

    queryUserBorrowLoading = false;

    depositNFTIdx = -1;

    repayNFTIdx = -1;

    targetList: Array<{
        id: string;
        name: string;
        user: string;
        image: string;
        status: Status;
        address: string;
        borrowId: number;
    }> = [];

    auction: Auction = {} as Auction;

    loadingTargetList = false;
    borrowedNftList = {};
    filter: Filter = Filter.Normal;

    targetHasMore = true;
    reserves = 0; // pool number
    loadingPoolList = false;

    loadingAuctionDetail = false;

    loadingAuction = false;

    userAuctionList: Array<{
        id: string;
        name: string;
        image: string;
        nftId: string;
        bidAmount: number;
        selfBidAmount: number;
        liquidateTime: number;
        transactionHash: string;
    }> = [];

    userAuctionBase: Array<any> = [];

    userRepayAmount = 0;

    borrowInfo: any = {
        id: "",
        name: "",
        image: "",
        amount: 0,
        repayAmount: 0,
        status: Status.BORROW,
        liquidateTime: 0,
        canLiquidation: false,
    };

    loadingBorrowInfo = false;

    supportNFTDataMap: Record<
        string,
        {
            hasMore: boolean;
            cursor: number;
            loading: boolean;
            dataBase: Array<any>;
            data: Array<{
                id: string;
                name: string;
                user: string;
                image: string;
                status: Status;
                address: string;
                borrowId: number;
                endTime?: number;
            }>;
        }
    > = {};

    totalDepositNFT = 0;

    totalBorrowAmount = 0;

    poolBalances = {};

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });

        reaction(() => this.contract, this.initData);
    }

    @computed get showDepositModal() {
        return this.depositNFTIdx > -1;
    }

    @computed get showRepayModal() {
        return this.repayNFTIdx > -1;
    }

    @computed get displayWallet() {
        const { walletAddress } = this;
        if (!walletAddress) return "";
        return (
            walletAddress.slice(0, 5) +
            "..." +
            walletAddress.slice(walletAddress.length - 4)
        );
    }

    @computed get displayTargetList() {
        const { targetList, filter } = this;
        const filterStatus =
            filter === Filter.Normal ? Status.BORROW : Status.AUCTION;
        return targetList.filter((nft) => nft.status === filterStatus);
    }

    @computed get selfLoanTotal() {
        const { userBorrowList } = this;
        if (userBorrowList.length < 1) return 0;
        return userBorrowList.reduce((total, item) => {
            return (total += +item.price);
        }, 0);
    }

    @action.bound
    init() {
        if (this.inited) return;
        const onboard = createOnBoard();
        runInAction(() => {
            this.inited = true;
            this.onboard = onboard;
        });
        this.initContract();
    }

    @action.bound
    async initContract() {
        const provider = new ethers.providers.JsonRpcProvider(HTTP_PROVIDER);
        const contract = new ethers.Contract(Address, ABI, provider);
        this.wethContract = new ethers.Contract(wethAddress, erc20, provider);
        this.contract = contract;
        this.provider = provider as ethers.providers.Web3Provider;
    }
    @action.bound
    handleNetWorkChange(chains: Array<{ id: string }>) {
        runInAction(() => {
            this.chainId = +(chains[0]?.id || "0");
        });
    }

    @action.bound
    initProviderConfig(provider: ethers.providers.ExternalProvider) {
        runInAction(() => {
            this.provider = new ethers.providers.Web3Provider(provider);
        });
    }

    @action.bound
    updateBlockTs(time: number) {
        this.blockTimeStamp = time;
    }

    @action.bound
    updateUTCTs(time: number) {
        this.utcTimeStamp = time;
    }
    @action.bound
    async getReservesCount() {
        let reserves = await this.contract.getReservesCount();
        this.reserves = reserves;
        return reserves;
    }
    @computed get formatWalletAddress() {
        const { walletAddress } = this;
        if (!walletAddress) return "";
        return showWallet(walletAddress);
    }
    @action.bound
    async initData() {
        try {
            const { contract } = this;
            if (!contract) return;
            runInAction(async () => {
                this.loadingPoolList = true;
            });
            const reserves = await this.getReservesCount();
            const allLength = makeAsyncIterator(+reserves);
            // console.log(allLength);
            let poolList: Array<any> = [];
            let poolDataConfig: any = {};
            let nftHexMap = {};
            let poolBalances = {},
                totalAmount = 0;
            for await (let reserveId of allLength) {
                const hasStatic = staticPoolInfo[reserveId!];
                let nfts = hasStatic?.nfts;
                if (!nfts) {
                    nfts = (await contract.getReserveNFTList(reserveId)).map(
                        (n) => n.toLowerCase()
                    );
                }
                let reserveData: any = {},
                    supplyRate = 0;
                // (async () => {
                // const {
                //     configuration,
                //     currentLiquidityRate,
                //     currentStableBorrowRate,
                //     currentVariableBorrowRate,
                //     hTokenAddress,
                //     id,
                //     interestRateStrategyAddress,
                //     lastUpdateTimestamp,
                //     liquidityIndex,
                //     stableDebtTokenAddress,
                //     variableBorrowIndex,
                //     variableDebtTokenAddress,
                // } = await contract.getReserveData(reserveId);
                // const data = await contract.getReserveData(reserveId);
                // console.log(data);
                // let obj = {};
                // for (let key in data) {
                //     if (isNaN(+key)) {
                //         if (Array.isArray(data[key])) {
                //             obj[key] = data[key].data;
                //         } else if (
                //             typeof data[key] !== "string" &&
                //             typeof data[key] !== "number"
                //         ) {
                //             obj[key] = data[key]._hex;
                //         } else {
                //             obj[key] = data[key];
                //         }
                //     }
                // }
                // console.log(JSON.stringify(obj), reserveId);
                // })();
                if (hasStatic.data) {
                    reserveData = hasStatic.data;
                    supplyRate = hasStatic.supplyRate;
                } else {
                    supplyRate = await contract.getReserveNormalizedIncome(
                        reserveId
                    );
                    reserveData = await contract.getReserveData(reserveId);
                    // console.log(reserveId, supplyRate);
                    // console.log(reserveId, supplyRate, reserveData);
                }
                const {
                    // currentLiquidityRate,
                    configuration,
                    currentStableBorrowRate,
                    currentVariableBorrowRate,
                    id,
                } = reserveData;
                let configurationInfos = ethers.BigNumber.from(
                    `${configuration}`
                );
                const poolType = getPoolType(configurationInfos);
                const canStable = getStableBorrowing(configurationInfos);
                let stableRate = ethers.utils.formatUnits(
                    `${currentStableBorrowRate}`,
                    27
                );
                const stableApr = +(
                    ((1 + +stableRate / seconds2Year) ** seconds2Year - 1) *
                    100
                ).toFixed(2);
                const variableRate = ethers.utils.formatUnits(
                    `${currentVariableBorrowRate}`,
                    27
                );

                const vairableApr = +(
                    ((1 + +variableRate / seconds2Year) ** seconds2Year - 1) *
                    100
                ).toFixed(2);

                const period = (
                    Number(getPeriod(configurationInfos)) /
                    60 /
                    60 /
                    24
                ).toFixed(2);
                const ratio =
                    Number(getBorrowRatio(configurationInfos)) / 10000;
                let depositApy = calcDepositAPY(+supplyRate);
                const poolInfo = {
                    liquidity: 0,
                    depositApy,
                    stableApr,
                    vairableApr,
                    ratio,
                    id: +id,
                    liquidityForEth: 0,
                    totalDepositForEth: 0,
                    totalDeposit: 0,
                    poolType,
                    period,
                    canStable: !!canStable,
                };
                const poolData = Object.assign({ nfts }, reserveData, poolInfo);
                const nowNftPoolDetail = await this.queryNftInfo(
                    nfts,
                    poolData
                );
                if (
                    +poolType === PoolTypeEnum.Permissionless ||
                    +poolType === PoolTypeEnum["Blue Chip"]
                ) {
                    poolData.nftName = nowNftPoolDetail[nfts[0]].name;
                } else {
                    poolData.nftName = "Shared Pool";
                }
                nftHexMap = Object.assign(nftHexMap, nowNftPoolDetail);
                poolList.push(poolData);
                poolDataConfig[`${reserveId}`] = {
                    hasMore: true,
                    cursor: 0,
                    loading: false,
                    dataBase: [],
                    data: [],
                };
            }
            console.timeEnd("aaa");
            this.nftHexMap = nftHexMap;
            this.poolList = poolList;
            this.loadingPoolList = false;
            this.poolInfoInited = true;
            this.poolDataConfig = poolDataConfig;
            let pol: any = [];
            for await (let [index, pool] of poolList.entries()) {
                const { hTokenAddress, poolType } = pool;
                let deposit = await new ethers.Contract(
                    hTokenAddress,
                    erc20,
                    this.provider
                );

                const liquidity = await this.wethContract.balanceOf(
                    hTokenAddress
                );
                let liquidityForEth = formatEther(+liquidity);
                let poolValue = poolBalances[poolType]
                    ? poolBalances[poolType]
                    : 0;
                poolValue += +formatEther(liquidity, 2);
                poolBalances[poolType] = +poolValue.toFixed(2);
                totalAmount += +poolValue.toFixed(2);
                const totalDeposit = await deposit.totalSupply();
                const totalDepositForEth = formatEther(+totalDeposit);
                pol.push(
                    Object.assign(pool, {
                        liquidityForEth,
                        totalDepositForEth,
                        totalDeposit,
                        liquidity,
                    })
                );
            }
            runInAction(() => {
                this.poolList = pol;
            });
            poolBalances["total"] = totalAmount;
            this.poolBalances = poolBalances;
        } catch (err) {
            console.log(err);
        }
    }
    @action.bound
    async queryNftInfo(nfts, reserveData) {
        let canFor = makeAsyncIterator(nfts.length);
        let results = {};
        for await (let key of canFor) {
            const contractAddress = nfts[key!]?.toLowerCase();
            // let erc721Contract = this.getErc721(contractAddress);
            // const symbol = (await erc721Contract.symbol()).toLowerCase();
            let slug = testSlugHex[contractAddress];
            try {
                let collection = nftPostDetail[contractAddress];
                if (!collection) {
                    console.log(contractAddress);
                    collection = (
                        await http.get(
                            `https://api.opensea.io/api/v1/collection/${slug}`
                        )
                    ).data.collection;
                    const { banner_image_url, image_url, name, stats } =
                        collection;
                    // console.log(
                    //     `{${JSON.stringify({
                    //         banner_image_url,
                    //         image_url,
                    //         name,
                    //         stats,
                    //     })}}`
                    // );
                }
                results[contractAddress] = Object.assign(
                    collection,
                    reserveData
                );
            } catch {
                results[contractAddress] = { stats: { count: 0 } };
            }
        }
        return results;
    }
    getErc721(address) {
        return new ethers.Contract(address, ERC721ABI, this.provider);
    }
    @action.bound
    async depositWithDraw(id, amount) {
        try {
            const { walletAddress } = this;

            const signer = this.provider.getUncheckedSigner();
            let conc = await this.contract.connect(signer);
            let tx = await conc.withdraw(
                id,
                ethers.utils.parseEther(`${amount}`),
                walletAddress
            );
            let result = await tx.wait();
            if (result.status === 1) {
                this.queryDepositList();
            }
            return result.status === 1;
        } catch (err) {
            console.log(err);
        }
    }
    @action.bound
    async queryDepositList() {
        const { walletAddress, poolList, provider } = this;
        if (walletAddress && poolList.length) {
            const depositList: any = [];
            this.queryDepositListLoading = true;
            let index = 0;
            let totalInterest = ethers.BigNumber.from(0);
            for (let pool of poolList) {
                const { hTokenAddress, depositApy, nftName, poolType, nfts } =
                    pool;
                const hTokenContract = new ethers.Contract(
                    hTokenAddress,
                    hTokenAbi,
                    provider
                );
                const founder = await hTokenContract.founder(
                    this.walletAddress
                );
                const balance = await hTokenContract.balanceOf(walletAddress);
                const scaledBalanceOf = await hTokenContract.scaledBalanceOf(
                    walletAddress
                );
                const interest = balance.sub(scaledBalanceOf);
                totalInterest = interest.add(totalInterest);
                const canWithdraw = balance.sub(founder, 7);
                if (balance > 0) {
                    depositList.push({
                        id: index,
                        scaledBalanceOf, // principal
                        totalReward: balance, // The principal and interest
                        interest: balance.sub(scaledBalanceOf), // reward
                        interestForEth: formatEther(
                            balance.sub(scaledBalanceOf, 7)
                        ), // reward
                        poolType,
                        nfts,
                        totalRewardForEth: formatEther(balance),
                        canWithdrawRaw: canWithdraw,
                        canWithdrawRorEth: formatEther(canWithdraw, 7),
                        apy: depositApy,
                        nftName,
                    });
                }
                index += 1;
            }
            this.totalInterest = formatEther(totalInterest, 2);
            this.queryDepositListLoading = false;
            this.depositList = depositList;
        }
    }
    @action.bound
    async queryUserNFT(loadMore = false, list: Array<string> = []) {
        try {
            const { walletAddress, supportNFTs } = this;
            if (!walletAddress) return;
            if (loadMore) return;
            runInAction(() => {
                this.queryUserNFTLoading = true;
            });
            const ids =
                list.length > 0 ? list : supportNFTs.map((nft) => nft.address);
            const res = await http.get(
                "https://eth-goerli.alchemyapi.io/v2/demo/getNFTs",
                {
                    params: {
                        owner: walletAddress,
                        contractAddresses: ids,
                    },
                    paramsSerializer: (para) => {
                        return qs.stringify(para, { arrayFormat: "brackets" });
                    },
                }
            );
            if (res.data?.ownedNfts.length) {
                const formatData = res.data.ownedNfts.map((asset) => {
                    return {
                        id: `${+asset.id.tokenId}`,
                        name: asset.metadata?.name || "",
                        image: asset.metadata?.image || "",
                        address: (asset.contract?.address || "").toLowerCase(),
                    };
                });
                runInAction(() => {
                    this.userNFTs = formatData;
                });
            } else {
                this.userNFTs = [];
            }
        } finally {
            runInAction(() => {
                this.queryUserNFTLoading = false;
            });
        }
    }

    @action.bound
    async queryUserLoanList() {
        const { walletAddress, contract } = this;
        if (!walletAddress || !contract) return;

        runInAction(() => {
            this.queryUserBorrowLoading = true;
        });
        try {
            let borrowIds = await contract.getUserBorrowList(walletAddress);
            const details: Array<any> = [];
            for await (let borrowId of borrowIds) {
                const borrowinfos = await contract.borrowMap(borrowId);
                const debtData = getRepayCount(
                    await contract.getDebt(borrowId)
                );
                const canLiquidation = await contract.enabledLiquidation(
                    borrowId
                );
                try {
                    const {
                        nft,
                        nftId,
                        rateMode,
                        user,
                        status,
                        borrowId,
                        startTime,
                        liquidateTime,
                        price,
                        reserveId,
                    } = borrowinfos;
                    let nftAddress = nft.toLowerCase();
                    const { period, ratio } = this.nftHexMap[nftAddress];
                    const data = await this.queryNFTDetail(nftAddress, +nftId);
                    details.push({
                        ...data,
                        id: +nftId,
                        user: user,
                        status: +status,
                        reserveId,
                        canLiquidation,
                        period,
                        rateMode,
                        borrowId: +borrowId,
                        apr: this.nftHexMap[nftAddress].depositApy,
                        startTime: +startTime,
                        address: nftAddress,
                        liquidateTime: +liquidateTime,
                        price: formatEther(price),
                        priceRaw: price,
                        repayAmount: formatEther(debtData, 10),
                        interest: debtData.sub(price),
                        interestForEth: formatEther(debtData.sub(price), 10),
                        rawAmount: debtData,
                        poolDetail: this.nftHexMap[nftAddress],
                    });
                } catch (err) {
                    console.log(err);
                }
            }
            if (borrowIds.length < 1) return;
            runInAction(() => {
                this.userBorrowList = details;
            });
        } finally {
            runInAction(() => {
                this.queryUserBorrowLoading = false;
            });
        }
    }

    @action.bound
    async queryUserAuctions() {
        const { contract, loadingAuction } = this;
        try {
            if (loadingAuction) return;
            runInAction(() => {
                this.loadingAuction = true;
            });
            let requestInfo: Array<any> = [];

            const bidFilter = contract.filters.BidCall(
                null,
                null,
                this.walletAddress
            );
            const myCreateBidFilter = contract.filters.LiquidationCall(
                null,
                null,
                this.walletAddress
            );
            const [auctionIdsInfo, bidList, createInfo] = await Promise.all([
                contract.getAuctions(),
                contract.queryFilter(bidFilter),
                contract.queryFilter(myCreateBidFilter),
            ]);

            const auctionIds = auctionIdsInfo.map((id) => +id);
            const formatStartInfos = bidList
                .map((bid) => {
                    const { amount, borrowId } = bid.args!;
                    return {
                        id: +borrowId,
                        bidAmount: +amount,
                        blockNumber: bid.blockNumber,
                        transactionHash: bid.transactionHash,
                    };
                })
                .filter((bid) => {
                    return auctionIds.includes(bid.id);
                });
            const formatCreateInfos = createInfo
                .map((bid) => {
                    const { amount, borrowId } = bid.args!;
                    return {
                        id: +borrowId,
                        bidAmount: +amount,
                        blockNumber: bid.blockNumber,
                        transactionHash: bid.transactionHash,
                    };
                })
                .filter((bid) => {
                    return auctionIds.includes(bid.id);
                });
            const noRepeatBids = [
                ...formatStartInfos,
                ...formatCreateInfos,
            ].reduce((list: Array<any>, item) => {
                const idx = list.findIndex((i) => i.id === item.id);
                if (idx < 0) {
                    list.push(item);
                } else {
                    list[idx] = {
                        ...list[idx],
                        ...item,
                    };
                }
                return list;
            }, []);
            const validTransactions = noRepeatBids.filter((bid) =>
                auctionIds.includes(bid.id)
            );
            requestInfo = validTransactions;
            // if (requestInfo.length < 1) {
            //     return;
            // }
            const details: Array<any> = [];
            const iterator = makeAsyncIterator(requestInfo.length);
            for await (const idx of iterator) {
                const item = requestInfo[idx!];
                try {
                    const [auctionInfo, borrowInfo] = await Promise.all([
                        contract.auctionMap(item.id),
                        contract.borrowMap(item.id),
                    ]);
                    const nftData = await this.queryNFTDetail(
                        borrowInfo.nft,
                        +borrowInfo.nftId
                    );
                    details.push({
                        ...item,
                        ...nftData,
                        nftId: +borrowInfo.id,
                        bidder: auctionInfo.bidder,
                        endTime: +auctionInfo.endTime,
                        bidAmount: formatEther(auctionInfo.amount),
                        selfBidAmount: formatEther(item.bidAmount),
                    });
                } catch {
                    //
                }
            }
            runInAction(() => {
                this.loadingAuction = false;
                this.userAuctionList = [...details];
            });
        } finally {
            runInAction(() => {
                this.loadingAuction = false;
            });
        }
    }

    @action.bound
    async queryUserRepayAmount() {
        try {
            const { contract, walletAddress } = this;
            if (!contract || !walletAddress) return;
            const repayFilter = contract.filters.LogRepay(null, walletAddress);
            const data = await contract.queryFilter(repayFilter);

            const repayBN = data
                .map((repay) => repay.args!)
                .map((repay) => repay.amount)
                .reduce((total, cur) => {
                    return total.add(cur);
                }, ethers.BigNumber.from(0));

            runInAction(() => {
                this.userRepayAmount = +formatEther(repayBN);
            });
        } catch {
            //
        }
    }

    @action.bound
    async queryAuctionDetail(address: string, id: string, auctionId: string) {
        try {
            const { loadingAuctionDetail, contract } = this;
            if (loadingAuctionDetail) return;
            runInAction(() => {
                this.loadingAuctionDetail = true;
            });
            const [auctionInfo, nftData] = await Promise.all([
                contract.auctionMap(auctionId),
                this.queryNFTDetail(address, +id),
            ]);
            runInAction(() => {
                this.auction = {
                    id,
                    nftId: nftData.id,
                    nftImg: nftData.image,
                    settled: auctionInfo.settled,
                    endTime: +auctionInfo.endTime * 1000,
                    amount: formatEther(auctionInfo.amount, 6),
                    startTime: +auctionInfo.startTime * 1000,
                    bidder: (auctionInfo.bidder || "").toLowerCase(),
                };
            });
        } finally {
            runInAction(() => {
                this.loadingAuctionDetail = false;
            });
        }
    }

    @action.bound
    async queryBidHistory(borrowId: string, user = "") {
        try {
            const { contract } = this;
            const startFilter = contract.filters.BidCall(
                null,
                +borrowId || null,
                user || null
            );
            const createFilter = contract.filters.LiquidationCall(
                null,
                +borrowId || null,
                user || null
            );
            const [start, create] = await Promise.all([
                contract.queryFilter(startFilter),
                contract.queryFilter(createFilter),
            ]);
            return [...start, ...create].map((his) => {
                const { user, amount, time } = his.args!;
                return {
                    user,
                    hash: his.transactionHash,
                    amount: formatEther(amount, 6),
                    time: dayjs(+time * 1000).format(dateFormat),
                    blockNumber: his.blockNumber,
                };
            });
        } catch {
            return [];
        }
    }

    @action.bound
    async queryBorrowInfo(address: string, id: string, borrowId: string) {
        try {
            const { loadingBorrowInfo, contract } = this;
            if (loadingBorrowInfo) return;
            runInAction(() => {
                this.loadingBorrowInfo = true;
            });
            const [borrowInfo, nftData, detail] = await Promise.all([
                contract.borrowMap(borrowId),
                this.queryNFTDetail(address, +id),
                this.queryNftInfo([address], {}),
            ]);
            const canLiquidation = await contract.enabledLiquidation(borrowId);
            const borrowAmounts = getRepayCount(
                await contract.getDebt(borrowId)
            );
            const floor_price = detail[address].stats.floor_price;
            runInAction(() => {
                this.borrowInfo = {
                    id,
                    name: nftData.name,
                    image: nftData.image,
                    variableNumber:
                        +floor_price > 0
                            ? (
                                  ((floor_price / +formatEther(borrowAmounts)) *
                                      10000) /
                                  1500
                              ).toFixed(2)
                            : "-",
                    canLiquidation,
                    rateMode: borrowInfo.rateMode,
                    status: borrowInfo.status,
                    amount: +formatEther(borrowInfo.price, 15),
                    repayAmount: +formatEther(borrowAmounts, 15),
                    liquidateTime: +borrowInfo.liquidateTime * 1000,
                };
            });
        } finally {
            runInAction(() => {
                this.loadingBorrowInfo = false;
            });
        }
    }

    @action.bound
    async handleConnectWallet() {
        if (!this.onboard || this.walletAddress) return;
        try {
            const wallet = getSaveWallet();
            if (wallet) {
                await this.onboard.connectWallet({ autoSelect: wallet });
            } else {
                await this.onboard.connectWallet();
            }
            await this.onboard.setChain({
                chainId: `0x${CHAIN_ID.toString(16)}`,
            });
        } catch {
            // do nothing
        }
    }

    @action.bound
    async queryNFTDepositInfo(user: string, reservesId: string) {
        const { contract, loadingTargetList, poolDataConfig } = this;
        const conf = poolDataConfig[reservesId];
        try {
            if (loadingTargetList || !conf) return;
            runInAction(() => {
                this.loadingTargetList = true;
                this.poolDataConfig[reservesId].loading = true;
            });
            const dataBase = conf.dataBase || [];
            let pageData: Array<any> = [];
            if (dataBase.length < 1) {
                const startBidFilter = contract.filters.BidCall(
                    +reservesId,
                    null,
                    user || null
                );
                const borrowFun = contract.filters.Borrow(
                    +reservesId,
                    null,
                    user || null
                );
                const claimBidNFTFilter = contract.filters.ClaimCall(
                    +reservesId,
                    null,
                    null
                );
                const [borrowFilter, bids, claimInfos] = await Promise.all([
                    contract.queryFilter(borrowFun),
                    contract.queryFilter(startBidFilter),
                    contract.queryFilter(claimBidNFTFilter),
                ]);
                const borrowList = borrowFilter
                    .map((item) => item.args!)
                    .map((item) => {
                        const { borrowId, nftId, asset, user, amount } = item;
                        return {
                            status: Status.BORROW,
                            borrowId: +borrowId,
                            nftId: `${+nftId}`,
                            address: asset,
                            amount: amount,
                            user,
                        };
                    });

                const bidlist = bids.map((item) => item.args!);
                let bidInfos: any = [];
                for await (let key of bidlist) {
                    const { borrowId, amount } = key;
                    const { nft, nftId, user } = await contract.borrowMap(
                        borrowId
                    );
                    bidInfos.push({
                        status: Status.AUCTION,
                        borrowId: +borrowId,
                        nftId: `${+nftId}`,
                        amount: +amount,
                        address: nft,
                        user,
                    });
                }
                const claimIds = claimInfos
                    .map((item) => item.args!)
                    .map((item) => +item.borrowId);

                const infos = [...borrowList, ...bidInfos].filter((item) => {
                    return !claimIds.includes(item.borrowId!);
                });
                const lastData = infos.reduce((list: Array<any>, item) => {
                    const index = list.findIndex(
                        (i) => i.borrowId === item.borrowId!
                    );
                    if (index < 0) {
                        list.push(item);
                    } else {
                        list[index] = {
                            ...list[index],
                            ...item,
                        };
                    }
                    return list;
                }, []);

                runInAction(() => {
                    this.poolDataConfig[reservesId].dataBase = lastData;
                });
                pageData = lastData.slice(0, 5);
            } else {
                pageData = dataBase.slice(conf.cursor, conf.cursor + 5);
            }
            if (pageData.length < 1) {
                runInAction(() => {
                    this.loadingTargetList = false;
                    this.poolDataConfig[reservesId] = {
                        ...conf,
                        hasMore: false,
                        loading: false,
                    };
                });
                return;
            }

            const iterator = makeAsyncIterator(pageData.length);
            const details: Array<any> = [];
            for await (const idx of iterator) {
                try {
                    const info = pageData[idx!];
                    const [data, borrowInfo, auctionInfo] = await Promise.all([
                        this.queryNFTDetail(info.address, +info.nftId),
                        contract.borrowMap(info.borrowId),
                        contract.auctionMap(info.borrowId),
                    ]);
                    if (info.address) {
                        details.push({
                            ...data,
                            id: info.nftId,
                            user: info.user,
                            amount: info.amount,
                            borrowId: +info.borrowId,
                            endTime: +auctionInfo.endTime,
                            address: info?.address.toLowerCase(),
                            status:
                                +auctionInfo.endTime > 0
                                    ? Status.AUCTION
                                    : borrowInfo.status,
                        });
                    }
                } catch (err) {
                    console.log(err);
                    //
                }
            }
            runInAction(() => {
                this.loadingTargetList = false;
                this.poolDataConfig = {
                    ...this.poolDataConfig,
                    [reservesId]: {
                        ...conf,
                        data: [...conf.data, ...details],
                        cursor: conf.cursor + 5,
                        loading: false,
                    },
                };
            });
        } catch (err) {
            runInAction(() => {
                this.loadingTargetList = false;
                this.poolDataConfig[reservesId] = {
                    ...conf,
                    loading: false,
                };
            });
        }
    }

    @action.bound
    switchChain(chainId) {
        this.onboard.setChain({ chainId: "0x" + chainId.toString(16) });
    }

    @action.bound
    handleAccountChange(accounts: Array<{ address: string }>) {
        runInAction(() => {
            this.walletAddress = (accounts[0]?.address || "").toLowerCase();
        });
    }

    @action.bound
    clearDepositInfo() {
        this.depositNFTIdx = -1;
    }

    @action.bound
    clearRepayInfo() {
        this.repayNFTIdx = -1;
    }

    @action.bound
    handleSelectDepositNFT(idx: number) {
        runInAction(() => {
            this.depositNFTIdx = this.depositNFTIdx === idx ? -1 : idx;
        });
    }

    @action.bound
    handleSelectRepayNFT(idx: number) {
        runInAction(() => {
            this.repayNFTIdx = this.repayNFTIdx === idx ? -1 : idx;
        });
    }

    @action.bound
    async queryNFTDetail(address: string, id: number, tokenType = "erc721") {
        try {
            const res = await http.get(
                `https://eth-goerli.alchemyapi.io/v2/demo/getNFTMetadata`,
                {
                    params: {
                        contractAddress: address,
                        tokenId: id,
                        tokenType,
                    },
                }
            );
            return {
                name: res.data.title || "",
                id: res.data.id?.tokenId || "",
                image: res.data.metadata?.image || "",
                description: res.data.description || "",
                address: (res.data.contract?.address || "").toLowerCase(),
            };
        } catch {
            return {
                name: "",
                image: "",
                address: "",
                description: "",
                id: "",
            };
        }
    }

    @action.bound
    async queryBalance() {
        this.ethBalance = await this.provider.getBalance(this.walletAddress);
    }
    @action.bound
    async depositEth(id, value) {
        try {
            const signer = this.provider.getUncheckedSigner();
            let conc = await this.contract.connect(signer);
            let tx = await conc.deposit(id, this.walletAddress, {
                value: ethers.utils.parseEther(`${value}`),
            });
            let result = await tx.wait();
            this.queryBalance();
            return result.status === 1;
        } catch (err) {}
    }
    @action.bound
    async handleBorrow(
        reserveId: string,
        address: string,
        id: string,
        interestRateMode: number
    ) {
        try {
            const { contract, provider } = this;
            const signer = provider.getSigner();
            const signERC721 = new ethers.Contract(
                address,
                ERC721ABI,
                provider
            ).connect(signer);
            const approveAddress = await signERC721.getApproved(id);
            const isApproved =
                (approveAddress || "").toLowerCase() ===
                contract.address.toLowerCase();
            if (!isApproved) {
                const { hash: approveHash } = await signERC721.approve(
                    contract.address,
                    id
                );
                const approveResult = await provider.waitForTransaction(
                    approveHash
                );
                if (approveResult.status !== 1) return false;
            }
            const userNFTs = this.userNFTs;
            const { hash } = await contract
                .connect(signer)
                .borrow(reserveId, address, id, interestRateMode);
            const result = await provider.waitForTransaction(hash);
            runInAction(() => {
                this.userNFTs = userNFTs.filter((nft, idx) => {
                    return nft.id !== id;
                });
            });
            return result.status === 1;
        } catch (err) {
            return false;
        }
    }

    @action.bound
    async handleRepay(reserveid, borrowId: string, amount) {
        try {
            const { contract, provider, userBorrowList } = this;
            const { hash } = await contract
                .connect(provider.getSigner())
                .repay(reserveid, borrowId, {
                    value: amount,
                });
            const result = await provider.waitForTransaction(hash);
            if (result.status === 1) {
                this.clearRepayInfo();
                runInAction(() => {
                    this.userBorrowList = userBorrowList.filter((_, idx) => {
                        return _.borrowId !== borrowId;
                    });
                });
            }
            return result.status === 1;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    @action.bound
    async createBid(reservesId: string, id: string, amount: number) {
        const { contract, provider } = this;
        try {
            const signer = provider.getUncheckedSigner();
            const signContract = contract.connect(signer);
            const auction = await signContract.auctionMap(id);
            if (auction.settled) {
                return false;
            }
            if (+auction.borrowId !== +id) return false;
            const amountBN = ethers.utils.parseEther(`${amount}`);
            const { hash } = await signContract.bidCall(reservesId, id, {
                value: amountBN,
            });
            const result = await provider.waitForTransaction(hash);
            if (this.auction) {
                runInAction(() => {
                    this.auction = {
                        ...this.auction,
                        amount: formatEther(amountBN, 6),
                    };
                });
            }
            return result.status === 1;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    @action.bound
    async handleLiquidation(reserveId, borrowId: string, amount: number) {
        try {
            const { contract, provider } = this;
            this.checkWallet();
            const { hash } = await contract
                .connect(provider.getSigner())
                .liquidationCall(reserveId, borrowId, {
                    value: ethers.utils.parseEther(`${amount}`),
                    gasLimit: 2000000,
                });
            const result = await provider.waitForTransaction(hash);
            return result.status === 1;
        } catch (err) {
            return false;
        }
    }
    async checkWallet() {
        if (!this.walletAddress) {
            await this.handleConnectWallet();
        }
    }
    @action.bound
    async handleClaimBidNFT(borrowId: string, reserveId: string) {
        try {
            const { contract, provider } = this;
            const { hash } = await contract
                .connect(provider.getSigner())
                .claimCall(reserveId, borrowId);
            const result = await provider.waitForTransaction(hash);
            return result.status === 1;
        } catch {
            return false;
        }
    }

    @action.bound
    handleSwitchFilter(filter: Filter) {
        this.filter = filter;
    }

    @action.bound
    viewTransactionDetail(hash: string) {
        window.open(`${ETHERSCAN_URL}/tx/${hash}`, "_blank");
    }

    @action.bound
    async queryProjectIndex() {
        const { contract, provider } = this;
        try {
            const borrowFilter = contract.filters.Borrow();
            const [balance, borrowList] = await Promise.all([
                provider.getBalance(contract.address),
                contract.queryFilter(borrowFilter),
            ]);
            let poolList = {};
            const borrowAmount = borrowList
                .map((i) => i.args!)
                .reduce((total, item) => {
                    return total.add(item.amount);
                }, ethers.BigNumber.from(0));
            let borrowedNftList = {};
            borrowList.forEach(({ args }) => {
                let poolId = args!.asset.toLowerCase();
                let nowPoolNumber = borrowedNftList[poolId]
                    ? borrowedNftList[poolId]
                    : 0;
                nowPoolNumber += 1;
                borrowedNftList[poolId] = nowPoolNumber;
            });
            runInAction(() => {
                this.totalDepositNFT = borrowList.length;
                this.borrowedNftList = borrowedNftList;
                this.totalBorrowAmount = +(+formatEther(borrowAmount)).toFixed(
                    2
                );
            });
        } catch (e) {
            console.log(e);
            //
        }
    }

    @action.bound
    async applyNFT(address: string) {
        const { provider } = this;
        const signer = provider.getUncheckedSigner();
        const contract = new ethers.Contract(address, ERC721ABI, provider);
        try {
            const { hash } = await contract.connect(signer).mint();
            const result = await provider.waitForTransaction(hash);
            return result.status === 1;
        } catch {
            return false;
        }
    }
    @action.bound
    async savePool(data) {
        try {
            const { provider } = this;
            const [
                nftAddress,
                period,
                ratio,
                liqDuration,
                bidDuration,
                enabledStableBorrow,
                RateStrategyInput,
                value,
            ] = data;
            const signer = provider.getUncheckedSigner();
            const contract = new ethers.Contract(
                factoryContract,
                FactoryAbi,
                provider
            );
            let con = contract.connect(signer);
            // let symbol = await this.getErc721(nftAddress).symbol();
            const { hash } = await con.createPool(nftAddress);
            const { blockNumber } = await provider.waitForTransaction(hash);

            const myStartBidFilter = contract.filters.CreatePool(blockNumber);
            let initPoolInfo: any = (
                await contract.queryFilter(myStartBidFilter)
            )[0].args;
            const { hToken, variableDebtAddress, stableDebtAddress } =
                initPoolInfo;
            let hx = await con.initReserve(
                nftAddress,
                period,
                ratio,
                liqDuration,
                bidDuration,
                enabledStableBorrow,
                hToken,
                variableDebtAddress,
                stableDebtAddress,
                RateStrategyInput,
                {
                    value: ethers.utils.parseEther(`${value}`),
                }
            );
            let result = await hx.wait();
            return result.status === 1;
        } catch {
            return false;
        }
    }
}
