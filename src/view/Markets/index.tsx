import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useState, useMemo } from "react";

import { Row, Spin, Popover } from "antd";
import colorfulEth from "src/asset/colorfulEth.png";
import marketDownButton from "src/asset/downBtn.png";
import { useStores } from "src/hooks";
import cx from "classnames";
import s from "./index.module.scss";
import { PoolType } from "../../config";
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
    console.log(nowType);
    const [nowIndex, setIndex] = useState(Number(nowType));
    const [filterType, setFilter] = useState(filterList[nowType].poolType);

    const [showFilter, setShowFilter] = useState(false);
    const onChange = (v) => {
        setFilter(v.poolType);
        setIndex(v.index);
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
                                filterType === f.index ? s.active : ""
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
                                // visible={showFilter}
                                overlayClassName={s.marketPopover}
                            >
                                <img src={marketDownButton} alt="" />
                            </Popover>
                        </p>

                        <div className={s.totalData}>
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
                                    <div
                                        className={cx(
                                            s.item,
                                            s.mainItem,
                                            index === 0
                                                ? s.firstCollection
                                                : index === poolList.length - 1
                                                ? s.lastCollection
                                                : null
                                        )}
                                        key={`${index}-pool`}
                                    >
                                        <div
                                            className={cx(
                                                s.section,
                                                s.firstSection
                                            )}
                                        >
                                            <img
                                                className={s.avatar}
                                                src={
                                                    nftHexMap[pool.nfts[0]]
                                                        .image_url
                                                }
                                                alt=""
                                            />
                                            <div className={s.poolInfo}>
                                                <div className={s.poolName}>
                                                    {pool.nftName}
                                                </div>
                                                <span
                                                    className={cx(
                                                        s[
                                                            `type${+pool.poolType}`
                                                        ],
                                                        s.poolType
                                                    )}
                                                >
                                                    {PoolType[+pool.poolType]
                                                        ? PoolType[
                                                              +pool.poolType
                                                          ]
                                                        : "Shared"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={s.normal}>
                                            <p className={s.sectionTitle}>
                                                NFTs
                                            </p>
                                            <p className={s.content}>
                                                {
                                                    nftHexMap[pool.nfts[0]]
                                                        .stats.count
                                                }
                                            </p>
                                        </div>
                                        <div className={s.normal}>
                                            <p className={s.sectionTitle}>
                                                Deposit APY≈
                                            </p>
                                            <p className={s.content}>
                                                {pool.depositApy}%
                                            </p>
                                        </div>
                                        <div className={s.normal}>
                                            <p className={s.sectionTitle}>
                                                Total Deposit
                                            </p>
                                            <p className={s.content}>
                                                {/* <img src={eIcon} /> */}
                                                {pool.totalDepositForEth}
                                            </p>
                                        </div>
                                        <div className={s.normal}>
                                            <p className={s.sectionTitle}>
                                                Liquidity
                                            </p>
                                            <p className={s.content}>
                                                {/* <img src={eIcon} /> */}
                                                {pool.liquidityForEth}
                                            </p>
                                        </div>
                                        <div
                                            className={s.viewButton}
                                            onClick={() =>
                                                window.open(
                                                    `/nft/${pool.id}/n`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <div className="hasai-btn">
                                                <span className="gradualText">
                                                    Details
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    pool.nfts.map((singleNft, nftIndex) => (
                                        <div
                                            className={cx(
                                                s.item,
                                                s.mainItem,
                                                index === 0
                                                    ? s.firstCollection
                                                    : index ===
                                                      poolList.length - 1
                                                    ? s.lastCollection
                                                    : null
                                            )}
                                            key={`${nftIndex}-shared`}
                                        >
                                            <div
                                                className={cx(
                                                    s.section,
                                                    s.firstSection
                                                )}
                                            >
                                                <img
                                                    src={
                                                        nftHexMap[singleNft]
                                                            .image_url
                                                    }
                                                    alt=""
                                                    className={s.middlePics}
                                                />

                                                <div className={s.poolInfo}>
                                                    <div className={s.poolName}>
                                                        {
                                                            nftHexMap[singleNft]
                                                                .name
                                                        }
                                                    </div>
                                                    <span
                                                        className={cx(
                                                            s[
                                                                `type${+pool.poolType}`
                                                            ],
                                                            s.poolType
                                                        )}
                                                    >
                                                        {PoolType[
                                                            +pool.poolType
                                                        ]
                                                            ? PoolType[
                                                                  +pool.poolType
                                                              ]
                                                            : "Shared"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={s.normal}>
                                                <p className={s.sectionTitle}>
                                                    NFTs
                                                </p>
                                                <p className={s.content}>
                                                    {
                                                        nftHexMap[singleNft]
                                                            .stats.count
                                                    }
                                                </p>
                                            </div>
                                            <div className={s.normal}>
                                                <p className={s.sectionTitle}>
                                                    Deposit APY≈
                                                </p>
                                                <p className={s.content}>
                                                    {pool.depositApy}%
                                                </p>
                                            </div>
                                            <div className={s.normal}>
                                                <p className={s.sectionTitle}>
                                                    Total Deposit
                                                </p>
                                                <p className={s.content}>
                                                    {/* <img src={eIcon} /> */}
                                                    {pool.totalDepositForEth}
                                                </p>
                                            </div>
                                            <div className={s.normal}>
                                                <p className={s.sectionTitle}>
                                                    Liquidity
                                                </p>
                                                <p className={s.content}>
                                                    {/* <img src={eIcon} /> */}
                                                    {pool.liquidityForEth}
                                                </p>
                                            </div>
                                            <div
                                                className={s.viewButton}
                                                onClick={() =>
                                                    window.open(
                                                        `/nft/${pool.id}/${nftIndex}`,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                <div className="hasai-btn">
                                                    <span className="gradualText">
                                                        Details
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
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
