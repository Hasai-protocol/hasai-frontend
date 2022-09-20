import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";

import { Row, Col, Spin, Radio, Popover } from "antd";
import { useMemo } from "react";
import { QuestionCircleFilled } from "@ant-design/icons";
import colorfulEth from "src/asset/colorfulEth.png";
import eIcon from "src/asset/eicon.png";
// import rightCoin from "src/asset/swap-right.svg";
import logo from "src/asset/homelogo.png";
import marketDownButton from "src/asset/downBtn.png";
import { useStores } from "src/hooks";
import cx from "classnames";
import s from "./index.module.scss";
import { PoolType } from "../../config";
export default observer(function Home() {
    const nav = useNavigate();
    const {
        store: {
            poolList,
            totalDepositNFT,
            poolBalance,
            totalBorrowAmount,
            nftHexMap,
            loadingPoolList,
        },
    } = useStores();
    const [filterType, setFilter] = useState(-1);
    const [showFilter, setShowFilter] = useState(false);
    const onChange = (v) => {
        setFilter(v);
    };
    const filterList = [
        { title: "All", index: -1 },
        { title: "The Blue-Chip Pools", index: 1 },
        { title: "The Shared Pools", index: 2 },
        { title: "The Permissionless Pools", index: 0 },
    ];
    const MiddleList = ({ list }) => {
        return (
            <div className={s.middleNfts}>
                {list.map((n) => {
                    return (
                        <div>
                            <img src={nftHexMap[n].image_url} />
                            {nftHexMap[n].name}
                        </div>
                    );
                })}
            </div>
        );
    };
    const content = () => {
        return (
            <div className={s.filterWarp}>
                {filterList.map((f) => {
                    return (
                        <div
                            className={cx(
                                s.filterItem,
                                filterType === f.index ? s.active : ""
                            )}
                            onClick={() => {
                                onChange(f.index);
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
                            {filterType === -1
                                ? "Market"
                                : filterList[filterType === 0 ? 3 : filterType]
                                      .title}
                            <Popover
                                content={content}
                                placement="bottom"
                                color="transparent"
                                visible={showFilter}
                                overlayClassName={s.marketPopover}
                            >
                                <img src={marketDownButton} alt="" />
                            </Popover>
                        </p>

                        <div className={s.totalData}>
                            <div className={s.selection}>
                                <p className={s.itemTitle}>Total NFTs</p>
                                <p className={s.itemData}>{totalDepositNFT}</p>
                            </div>
                            <div className={s.selection}>
                                <p className={s.itemTitle}>Total Deposit</p>
                                <p className={s.itemData}>
                                    {poolBalance}
                                    <sub>ETH</sub>
                                </p>
                            </div>
                        </div>
                        <div className={s.description}>
                            Browse to the "Deposit" section and click on
                            "Deposit" for the Pools you want to deposit. Select
                            the amount you'd like to deposit and submit your
                            transaction. Once the transaction is confirmed, your
                            deposit is successfully re gistered and you begin
                            earning interest.
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
                        {/* <p className={s.title}>
                            Pools
                            <Radio.Group
                                defaultValue={-1}
                                buttonStyle="solid"
                                onChange={onChange}
                            >
                                <Radio.Button value={-1}>All</Radio.Button>
                                <Radio.Button value={1}>Blue Chip</Radio.Button>
                                <Radio.Button value={2}>Shared</Radio.Button>
                                <Radio.Button value={0}>
                                    Permissionless
                                </Radio.Button>
                            </Radio.Group>
                        </p> */}
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
                                        key={index}
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
                                            key={index}
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
