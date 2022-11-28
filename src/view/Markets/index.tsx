import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useState, useMemo } from "react";

import { Row, Spin, Popover } from "antd";
import colorfulEth from "src/asset/marketIcon.png";
import marketDownButton from "src/asset/downBtn.png";
import { useStores } from "src/hooks";
import cx from "classnames";
import s from "./index.module.scss";
import { PoolType } from "../../config";
import MarketItem from "./marketItem";
const filterList = [
    {
        title: "All",
        index: 0,
        poolType: -1,
        des: `Browse to the "Deposit" section and click on
        "Deposit" for the Pools you want to deposit. Select
        the amount you'd like to deposit and submit your
        transaction. Once the transaction is confirmed, your
        deposit is successfully re gistered and you begin
        earning interest.`,
    },
    {
        title: "The Blue-Chip Pools",
        index: 1,
        poolType: 1,
        des: `Hasai's initial Blue-Chip Pools will support NFTs from the following collections as collateral: BAYC、MAYC、CryptoPunks、Azuki、CLONE-X、Doodles
        NFT collections supported in the Shared Pool can be promoted to Blue-Chip Pools.`,
    },
    {
        title: "The Shared Pools",
        index: 2,
        poolType: 2,
        des: `The emerging NFT collections will share the Shared Pool as the lending pool. All supported NFT collections in this pool share the same risk factor, lending ratio, liquidation factors, and other parameters.`,
    },
    {
        title: "The Permissionless Pools",
        index: 3,
        poolType: 0,
        des: `Anyone can create Permissionless Pool. One Permissionless Pool cannot be created by the same NFT collections repeatedly and cannot be destroyed after the creation. The original parameters of Permissionless Pools are determined by creators themselves. `,
    },
];
export default observer(function Markets() {
    const nav = useNavigate();
    const {
        store: {
            poolList,
            totalDepositNFT,
            poolBalances,
            totalBorrowAmount,
            nftHexMap,
            loadingPoolList,
            borrowedNftList,
        },
    } = useStores();
    const { type } = useParams();
    let nowType = type ? type : 0;
    const [nowIndex, setIndex] = useState(Number(nowType));
    const [filterType, setFilter] = useState(filterList[nowType].poolType);

    const [showFilter, setShowFilter] = useState(false);
    const onChange = (v) => {
        setShowFilter(!showFilter);
        setTimeout(() => {
            console.log(v.poolType, v.index);
            setFilter(v.poolType);
            setIndex(v.index);
        }, 100);
    };
    const depositNfts = useMemo(() => {
        let borrowedNftsKeys = Object.keys(borrowedNftList);
        if (borrowedNftsKeys.length === 0 || poolList.length === 0)
            return "N/N";
        let typeNumbers = {};
        typeNumbers[PoolType["Permissionless"]] = 0;
        typeNumbers[PoolType["Blue Chip"]] = 0;
        typeNumbers[PoolType["shared Pool"]] = 0;
        borrowedNftsKeys.forEach((key) => {
            let nftPoolType = nftHexMap[key].poolType;
            typeNumbers[nftPoolType] += borrowedNftList[key];
        });
        return typeNumbers;
    }, [borrowedNftList, nftHexMap]);
    const content = () => {
        return (
            <div className={s.filterWarp}>
                {filterList.map((f, i) => {
                    return (
                        <div
                            key={`${i}-content`}
                            className={cx(
                                s.filterItem,
                                filterType === f.poolType ? s.active : ""
                            )}
                            onClick={() => {
                                onChange(f);
                            }}
                        >
                            {f.title}
                        </div>
                    );
                })}
            </div>
        );
    };
    return (
        <>
            <div className={s.wrap}>
                <div className={s.top}>
                    <div className={s.topInner}>
                        <p
                            className={s.headerTitle}
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            {nowIndex === 0
                                ? "Market"
                                : filterList[nowIndex]?.title}
                            <Popover
                                content={content}
                                placement="bottom"
                                color="transparent"
                                trigger="click"
                                visible={showFilter}
                                overlayClassName={s.marketPopover}
                            >
                                <img src={marketDownButton} alt="" />
                            </Popover>
                        </p>

                        <div className={s.totalData}>
                            <div className={s.dataWarp}>
                                <div className={s.selection}>
                                    <p className={s.itemTitle}>Total NFTs</p>
                                    <p className={s.itemData}>
                                        {filterType === -1
                                            ? totalDepositNFT
                                            : depositNfts[filterType]}
                                    </p>
                                </div>
                                <div className={s.selection}>
                                    <p className={s.itemTitle}>Total Deposit</p>
                                    <p className={s.itemData}>
                                        {
                                            poolBalances[
                                                filterType === -1
                                                    ? "total"
                                                    : filterType
                                            ]
                                        }
                                        <sub>ETH</sub>
                                    </p>
                                </div>
                            </div>
                            <div className={s.topRightImg}></div>
                        </div>
                        <div className={s.description}>
                            {filterList[nowIndex]?.des}
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.supportList}>
                {loadingPoolList && (
                    <div className={s.loadingWrap}>
                        <Spin />
                    </div>
                )}
                {poolList.length ? (
                    <Row className={s.list}>
                        <p className={cx(s.sectionTitle, "gradualText")}>
                            <img src={colorfulEth} alt="" /> All Collections
                        </p>
                        <div className={cx(s.item, s.tHeader)}>
                            <div className={cx(s.section, s.firstSection)}>
                                Collections
                            </div>
                            <div className={s.normal}>
                                <p className={s.sectionTitle}>NFTs</p>
                            </div>
                            <div className={s.normal}>
                                <p className={s.sectionTitle}>Deposit APY≈</p>
                            </div>
                            <div className={s.normal}>
                                <p className={s.sectionTitle}>Total Deposit</p>
                            </div>
                            <div className={s.normal}>
                                <p className={s.sectionTitle}>Liquidity</p>
                            </div>
                            <div className={s.viewButton}>View</div>
                        </div>
                        {poolList
                            .filter(
                                (i) =>
                                    +i.poolType === filterType ||
                                    filterType === -1
                            )
                            .map((pool, index) => {
                                return pool.poolType <= 1 ? (
                                    <MarketItem
                                        index={index}
                                        pool={pool}
                                        PoolType={PoolType}
                                    />
                                ) : (
                                    pool.nfts.map((singleNft, nftIndex) => (
                                        <MarketItem
                                            index={nftIndex}
                                            pool={nftHexMap[singleNft]}
                                            PoolType={PoolType}
                                        />
                                    ))
                                );
                            })}
                    </Row>
                ) : (
                    ""
                )}
            </div>
        </>
    );
});
