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
const EmptyAry = [];

export default observer(function SupportItem() {
    const { reservesId } = useParams<{ reservesId: string }>();
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
    const nowNftInfos = useMemo(() => {
        let keys = Object.keys(nftHexMap);
        if (!keys.length || !pool || pool.nfts.length === 0) {
            return {};
        }
        const isMiddle = pool.nfts.length > 1;
        let totalNft = 0;
        let nftInfos = pool.nfts.map((nft) => {
            totalNft += nftHexMap[nft].stats.count;
            return nftHexMap[nft];
        });
        return { nftInfos, isMiddle, totalNft };
    }, [pool, nftHexMap]);
    const nftDataList = useMemo(() => {
        if (!poolDataConfig[reservesId!]) return EmptyAry;
        return poolDataConfig[reservesId!].data;
    }, [poolDataConfig, reservesId]);

    useEffect(() => {
        if (!pool || nftDataList.length > 0) return;
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
        console.log(pool.stableApr, pool.vairableApr);
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
        queryNFTDepositInfo("", pool!.address);
    }, [queryNFTDepositInfo, pool]);
    return (
        <div className={s.wrap}>
            {!pool && (
                <div className={s.emptyWrap}>
                    <Spin spinning={loadingPoolList} />
                </div>
            )}
            {pool && (
                <div>
                    <div className={s.banner}>
                        <img
                            src={
                                nowNftInfos.isMiddle
                                    ? middleHeader
                                    : nowNftInfos.nftInfos[0].banner_image_url
                            }
                            alt="banner"
                        />
                    </div>
                    <div className={s.seriesInfo}>
                        <div className={s.left}>
                            {nowNftInfos.isMiddle ? (
                                <div className={s.avatars}>
                                    {nowNftInfos.nftInfos.map((de, ind) => {
                                        if (ind <= 8) {
                                            return (
                                                <img
                                                    src={de.image_url}
                                                    alt=""
                                                    className={s.middlePics}
                                                />
                                            );
                                        }
                                    })}
                                </div>
                            ) : (
                                <img
                                    className={s.avatar}
                                    src={nowNftInfos.nftInfos[0].image_url}
                                    alt=""
                                />
                            )}

                            <p className={s.name}>
                                {nowNftInfos.isMiddle
                                    ? "Shared Pools                                    "
                                    : nowNftInfos.nftInfos[0].name}
                            </p>
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
                                                nowNftInfos.nftInfos[0].stats
                                                    .floor_price
                                            ).toFixed(2)}
                                            <span>ETH</span>
                                        </p>
                                    </div>
                                    <div className={s.infoIndex}>
                                        <p>Average Price</p>
                                        <p>
                                            {Number(
                                                nowNftInfos.nftInfos[0].stats
                                                    .average_price
                                            ).toFixed(2)}
                                            <span>ETH</span>
                                        </p>
                                    </div>
                                </>
                            )}
                            <div className={s.infoIndex}>
                                <p>Period</p>
                                <p>{pool ? `${pool.period}Days` : "/"}</p>
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
                    <div className={s.bottom}>
                        <div className={s.bottomLeft}>
                            <div className={s.depositHead}>
                                <div className={s.depositTitle}>
                                    <img src={DepositIcon} alt="" />
                                    <p>Borrow</p>
                                </div>
                            </div>
                            <Input
                                value={nftName}
                                className={s.input}
                                placeholder="Select Your NFT"
                                onClick={() =>
                                    setVisible(isLoading ? false : true)
                                }
                            />
                            <Select
                                style={{ width: "100%" }}
                                className={s.lendingModel}
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
                                <div className={s.filterOption}>
                                    <div
                                        className={cx(s.filterBtn, {
                                            [s.selected]:
                                                filter === Filter.OnAuction,
                                        })}
                                        onClick={() =>
                                            handleSwitchFilter(Filter.OnAuction)
                                        }
                                    >
                                        On Auction
                                    </div>
                                    <div
                                        className={cx(s.filterBtn, {
                                            [s.selected]:
                                                filter === Filter.Normal,
                                        })}
                                        onClick={() =>
                                            handleSwitchFilter(Filter.Normal)
                                        }
                                    >
                                        Current
                                    </div>
                                </div>
                                <div className={s.filterOption}>
                                    <Input
                                        className={s.filterInput}
                                        placeholder="Search"
                                        suffix={<SearchOutlined />}
                                    />
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
                </div>
            )}
            <DrawerList
                index={index}
                visible={visible}
                onCancel={handleCancel}
                onConfirm={handleSelectNFT}
                supportNft={pool?.nfts}
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
