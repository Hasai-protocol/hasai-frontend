import { useEffect, useMemo, useState, useCallback } from "react";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Empty, Input, notification, Spin, Row, Col, Select } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import cx from "classnames";

import DepositIcon from "src/asset/deposit-icon.svg";
import depositButtonIcon from "src/asset/depositButtonIcon.png";
import { Filter, Status } from "src/config";
import { useStores } from "src/hooks";
import DepositModal from "src/components/DepositEthModal";
import MemoList from "./MemoList";
import DrawerList from "./DrawerList";
import { InfoCircleFilled } from "@ant-design/icons";
import s from "./index.module.scss";
import middleHeader from "src/asset/header.png";
import arrowleft from "src/asset/btn-arrow-left.png";
const EmptyAry = [];

export default observer(function SupportItem() {
    const { reservesId, nftIndex } = useParams<{
        reservesId: string;
        nftIndex: string;
    }>();
    const [index, setIndex] = useState(-1);
    const [visible, setVisible] = useState(false);
    const [valuation, setValuation] = useState(0);
    const [nftName, setNFTName] = useState("");
    const [interest, setInterest] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeposit, setShowDeposit] = useState(false);
    const [lending, setLending] = useState();
    const [info, setInfo] = useState<{ address: string; id: string }>({
        address: "",
        id: "",
    });
    const {
        store: {
            queryUserNFT,
            walletAddress,
            handleBorrow,
            queryNFTDepositInfo,
            handleConnectWallet,
            handleSwitchFilter,
            filter,
            loadingPoolList,
            poolList,
            poolDataConfig,
            nftHexMap,
        },
    } = useStores();

    const pool = useMemo(() => {
        return poolList[reservesId!];
    }, [reservesId, poolList]);
    const nav = useNavigate();
    const nowNftInfos = useMemo(() => {
        let keys = Object.keys(nftHexMap);
        if (!keys.length || !pool || pool.nfts.length === 0) {
            return {};
        }
        const isMiddle = pool.nfts.length > 1;
        let totalNft = 0;
        let nftInfos;
        // if (isMiddle) {
        //     let nowAddress = pool.nfts[nftIndex];
        //     nftInfos = [nftHexMap[nowAddress]];
        //     totalNft = nftInfos[0].stats.count;
        // } else {
        //     nftInfos = pool.nfts.map((nft) => {
        //         totalNft += nftHexMap[nft].stats.count;
        //         return nftHexMap[nft];
        //     });
        // }
        let nowAddress = pool.nfts[nftIndex === "n" ? 0 : nftIndex];
        nftInfos = [nftHexMap[nowAddress]];
        totalNft = nftInfos[0].stats.count;
        return { nftInfos, isMiddle, totalNft, nowAddress };
    }, [pool, nftHexMap]);
    const nftDataList = useMemo(() => {
        if (!poolDataConfig[reservesId!]) return EmptyAry;
        return poolDataConfig[reservesId!].data;
    }, [poolDataConfig, reservesId]);

    useEffect(() => {
        if (!pool || nftDataList.length > 0 || !reservesId) return;
        // if (!pool || nftDataList.length > 0) return;
        queryUserNFT(false, [pool.address]);
        queryNFTDepositInfo("", `${reservesId}`);
    }, [pool, nftDataList, queryUserNFT, queryNFTDepositInfo, reservesId]);

    const clearState = () => {
        setValuation(0);
        setNFTName("");
        setInterest(0);
        setIndex(-1);
        setInfo({ address: "", id: "" });
    };

    const handleCancel = () => {
        clearState();
        setVisible(false);
    };
    const changeLending = (e) => {
        setLending(e);
    };
    const handleSelectNFT = (nft) => {
        setVisible(false);
        if (!pool) return;
        const { address } = nft;
        let { stats } = nftHexMap[address];
        setValuation(+(stats.average_price * pool.ratio).toFixed(6));
        setNFTName(`#${nft.id}`);
        setInfo({ address: nft.address, id: nft.id });
        // console.log(pool.stableApr, pool.vairableApr);
        // setInterest(
        //     (avaPrice * apr * period * borrowRate) /
        //         10000 /
        //         10000 /
        //         SEC_PER_YEAR
        // );
    };

    const handleConfirm = async () => {
        if (isLoading || !info.address || !lending) return;
        if (!walletAddress) {
            return handleConnectWallet();
        }
        setIsLoading(true);
        const result = await handleBorrow(
            reservesId!,
            info.address,
            info.id,
            lending!
        );
        if (result) {
            notification.success({
                message: "Hasai",
                description: "Transaction done.",
            });
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
        } else {
            notification.error({
                message: "Hasai",
                description: "Transaction failed.",
            });
        }
        setIsLoading(false);
    };

    const handleLoadMore = useCallback(() => {
        queryNFTDepositInfo("", `${reservesId}`);
    }, [queryNFTDepositInfo, pool, reservesId]);
    return (
        <div className={s.wrap}>
            {!pool && (
                <div className={s.emptyWrap}>
                    <Spin spinning={loadingPoolList} />
                </div>
            )}
            {pool && (
                <>
                    <div className={s.topWarp}>
                        <div
                            className={s.banner}
                            style={{
                                backgroundImage: `url(${nowNftInfos.nftInfos[0].banner_image_url})`,
                            }}
                        >
                            <div className={s.mask}></div>
                            {/* <img
                                className={s.bannerImg}
                                src={
                                    nowNftInfos.isMiddle
                                        ? middleHeader
                                        : nowNftInfos.nftInfos[0]
                                              .banner_image_url
                                }
                                alt="banner"
                            /> */}

                            <div className={s.seriesInfo}>
                                <div className={s.left}>
                                    <img
                                        className={s.avatar}
                                        src={nowNftInfos.nftInfos[0].image_url}
                                        alt=""
                                    />

                                    <p className={s.name}>
                                        {nowNftInfos.nftInfos[0].name}
                                    </p>
                                    <span
                                        className={s.backBtn}
                                        onClick={() => nav("/markets")}
                                    >
                                        <img src={arrowleft} />
                                        Back
                                    </span>
                                </div>
                                <div className={s.info}>
                                    <div className={s.infoIndex}>
                                        <p>Total NFT</p>
                                        <p>{nowNftInfos.totalNft}</p>
                                    </div>

                                    <div className={s.infoIndex}>
                                        <p>Total Deposit</p>
                                        <p>
                                            {pool.totalDepositForEth}
                                            <span>ETH</span>
                                        </p>
                                    </div>
                                    {!nowNftInfos.isMiddle && (
                                        <>
                                            <div className={s.infoIndex}>
                                                <p>Floor Price</p>
                                                <p>
                                                    {Number(
                                                        nowNftInfos.nftInfos[0]
                                                            .stats.floor_price
                                                    ).toFixed(2)}
                                                    <span>ETH</span>
                                                </p>
                                            </div>
                                            <div className={s.infoIndex}>
                                                <p>Average Price</p>
                                                <p>
                                                    {Number(
                                                        nowNftInfos.nftInfos[0]
                                                            .stats.average_price
                                                    ).toFixed(2)}
                                                    <span>ETH</span>
                                                </p>
                                            </div>
                                        </>
                                    )}
                                    <div className={s.infoIndex}>
                                        <p>Period</p>
                                        <p>
                                            {pool ? `${pool.period}` : "/"}
                                            <span>Days</span>
                                        </p>
                                    </div>

                                    <div className={s.infoIndex}>
                                        <p>Interest APR≈</p>
                                        <p>
                                            {pool.stableApr}
                                            <span>%</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.bottom}>
                        <div className={s.bottomLeft}>
                            <div className={s.depositHead}>
                                <div className={s.depositTitle}>
                                    <img src={DepositIcon} alt="" />
                                    <p className="gradualText">Borrow</p>
                                </div>
                            </div>
                            <div className={s.inputIcon}>
                                <Input
                                    value={nftName}
                                    className={cx(s.input, "largeInput")}
                                    placeholder="Select Your NFT"
                                    onClick={() =>
                                        setVisible(isLoading ? false : true)
                                    }
                                />
                            </div>
                            <Select
                                style={{ width: "100%" }}
                                className={cx(s.lendingModel, s.inputIcon)}
                                onChange={changeLending}
                                placeholder="Choose a lending model"
                            >
                                <Select.Option
                                    value={1}
                                    disabled={!pool.canStable}
                                >
                                    Stable
                                </Select.Option>
                                <Select.Option value={2}>
                                    Variable
                                </Select.Option>
                            </Select>
                            {lending === 1 && (
                                <div className={s.tips}>
                                    <InfoCircleFilled />
                                    Stable rates will be fixed in a specific
                                    lending period, but can be re-balanced in
                                    the long-term in response to changes in the
                                    utilization and efficiency of the liquidity
                                    pool.
                                </div>
                            )}
                            <div className={s.depositInfo}>
                                <p>
                                    <span>NFT Valuation≈</span>
                                    <span>
                                        {valuation ? `${valuation}ETH` : "/"}
                                    </span>
                                </p>
                                {/* <p>
                                    <span>Interest≈</span>
                                    <span>
                                        {interest
                                            ? `${interest.toFixed(2)}ETH`
                                            : "/"}
                                    </span>
                                </p> */}
                            </div>
                            <div
                                className={cx(s.btn, {
                                    [s.disabled]:
                                        !info.address || isLoading || !lending,
                                })}
                                onClick={handleConfirm}
                            >
                                {isLoading && <LoadingOutlined />}
                                Borrow
                            </div>
                        </div>
                        <div className={s.bottomRight}>
                            <div className={s.filter}>
                                <div
                                    className={cx(s.filterWarp, s.filterOption)}
                                >
                                    <div
                                        className={cx(
                                            "gradualText",
                                            s.filterBtn,
                                            {
                                                [s.selected]:
                                                    filter === Filter.OnAuction,
                                            }
                                        )}
                                        onClick={() =>
                                            handleSwitchFilter(Filter.OnAuction)
                                        }
                                    >
                                        Auction
                                    </div>
                                    <div
                                        className={cx(
                                            "gradualText",
                                            s.filterBtn,
                                            {
                                                [s.selected]:
                                                    filter === Filter.Normal,
                                            }
                                        )}
                                        onClick={() =>
                                            handleSwitchFilter(Filter.Normal)
                                        }
                                    >
                                        Current
                                    </div>
                                </div>
                                <div className={s.filterOption}>
                                    {/* <Input
                                        className={s.filterInput}
                                        placeholder="Search"
                                        suffix={<SearchOutlined />}
                                    /> */}
                                    <span
                                        className={s.depositButton}
                                        onClick={() => {
                                            setShowDeposit(true);
                                        }}
                                    >
                                        <img src={depositButtonIcon} />
                                        Deposit
                                    </span>
                                </div>
                            </div>
                            <MemoList
                                reservesId={reservesId}
                                loadMore={handleLoadMore}
                            />
                        </div>
                    </div>
                </>
            )}
            <DrawerList
                index={index}
                visible={visible}
                onCancel={handleCancel}
                onConfirm={handleSelectNFT}
                supportNft={[nowNftInfos.nowAddress]}
                handleSelect={(idx) => setIndex(idx)}
            />
            <DepositModal
                id={reservesId}
                visible={showDeposit}
                onCancel={() => {
                    setShowDeposit(false);
                }}
            />
        </div>
    );
});
