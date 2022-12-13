import { useEffect, useMemo, useState, useCallback } from "react";
import { notification, Spin, Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import cx from "classnames";
import closeIcon from "src/asset/colseIcon.png";

import depositButtonIcon from "src/asset/depositModuleIcon.png";
import { Filter } from "src/config";
import { useStores } from "src/hooks";
// import DepositModal from "src/components/DepositEthModal";
import MemoList from "./MemoList";
import s from "./index.module.scss";
import arrowleft from "src/asset/btn-arrow-left.png";
import BorrowItem from "./borrowItem";
const EmptyAry = [];

export default observer(function SupportItem() {
    const { reservesId, nftIndex } = useParams<{
        reservesId: string;
        nftIndex: string;
    }>();
    const [filter, setNowFilter] = useState(Number(Filter.Normal));
    const [openBorrow, setOpenBorrow] = useState(false);
    const {
        store: {
            queryUserNFT,
            queryNFTDepositInfo,
            loadingPoolList,
            poolList,
            poolDataConfig,
            nftHexMap,
            openSupportBorrow,
            showDeposit,
            openSupportBorrowWinow,
        },
    } = useStores();
    useEffect(() => {
        setOpenBorrow(openSupportBorrow);
    }, [openSupportBorrow]);
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
        let nowAddress =
            pool.nfts[nftIndex ? (nftIndex === "n" ? 0 : nftIndex) : 0];
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
        queryUserNFT(false, [pool.address]);
        queryNFTDepositInfo("", `${reservesId}`);
    }, [pool, nftDataList, queryUserNFT, queryNFTDepositInfo, reservesId]);
    const FilterConfig = [
        {
            title: "Auction",
            index: Filter.OnAuction,
        },
        {
            title: "Pending",
            index: Filter.Pending,
        },
        {
            title: "Current",
            index: Filter.Normal,
        },
    ];
    const handleSwitchFilter = (n) => {
        setNowFilter(n);
    };

    const openDeposit = () => {
        showDeposit("detail", reservesId);
    };
    const handleLoadMore = useCallback(() => {
        queryNFTDepositInfo("", `${reservesId}`);
    }, [queryNFTDepositInfo, pool, reservesId]);
    return (
        <>
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
                                <div className={s.seriesInfo}>
                                    <div className={s.left}>
                                        <img
                                            className={s.avatar}
                                            src={
                                                nowNftInfos.nftInfos[0]
                                                    .image_url
                                            }
                                            alt=""
                                        />

                                        <p className={s.name}>
                                            {nowNftInfos.nftInfos[0].name}{" "}
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
                                                <div
                                                    className={cx(s.infoIndex)}
                                                >
                                                    <p>Floor Price</p>
                                                    <p>
                                                        {Number(
                                                            nowNftInfos
                                                                .nftInfos[0]
                                                                .stats
                                                                .floor_price
                                                        ).toFixed(2)}
                                                        <span>ETH</span>
                                                    </p>
                                                </div>
                                                <div
                                                    className={cx(
                                                        s.infoIndex,
                                                        s.mobileHide
                                                    )}
                                                >
                                                    <p>Average Price</p>
                                                    <p>
                                                        {Number(
                                                            nowNftInfos
                                                                .nftInfos[0]
                                                                .stats
                                                                .average_price
                                                        ).toFixed(2)}
                                                        <span>ETH</span>
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        <div
                                            className={cx(
                                                s.infoIndex,
                                                s.mobileHide
                                            )}
                                        >
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
                                <BorrowItem
                                    pool={pool}
                                    onCancel={openSupportBorrowWinow}
                                    nowNftInfos={nowNftInfos}
                                    reservesId={reservesId}
                                />
                            </div>
                            <div className={s.bottomRight}>
                                <div className={s.filter}>
                                    <div
                                        className={cx(
                                            s.filterWarp,
                                            s.filterOption
                                        )}
                                    >
                                        {FilterConfig.map((item, fiIndex) => (
                                            <div
                                                key={fiIndex}
                                                className={cx(
                                                    "gradualText",
                                                    s.filterBtn,
                                                    {
                                                        [s.selected]:
                                                            filter ===
                                                            item.index,
                                                        [s.normal]:
                                                            filter !==
                                                            item.index,
                                                    }
                                                )}
                                                onClick={() =>
                                                    handleSwitchFilter(
                                                        item.index
                                                    )
                                                }
                                            >
                                                {item.title}
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className={cx(
                                            s.filterOption,
                                            s.filterRight
                                        )}
                                    >
                                        <span
                                            className={s.depositButton}
                                            onClick={openDeposit}
                                        >
                                            <img src={depositButtonIcon} />
                                            Deposit
                                        </span>
                                    </div>
                                </div>
                                <MemoList
                                    address={nowNftInfos.nowAddress}
                                    filter={filter}
                                    reservesId={reservesId}
                                    loadMore={handleLoadMore}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
            {pool && (
                <Modal
                    centered
                    footer={null}
                    destroyOnClose
                    visible={openBorrow}
                    className={s.borrowWarp}
                    onCancel={openSupportBorrowWinow}
                    closeIcon={<img src={closeIcon} />}
                    width={345}
                >
                    <BorrowItem
                        onCancel={openSupportBorrowWinow}
                        pool={pool}
                        nowNftInfos={nowNftInfos}
                        reservesId={reservesId}
                    />
                </Modal>
            )}
        </>
    );
});
