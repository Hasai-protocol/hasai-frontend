import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";

import { Row, Col, Spin, Radio, Popover } from "antd";
import { useMemo } from "react";
import { QuestionCircleFilled } from "@ant-design/icons";
import AvailableETH from "src/asset/available-eth.png";
import DepositNFT from "src/asset/deposited-nft.png";
import BorrowedETH from "src/asset/borrowed-eth.png";
import eIcon from "src/asset/eicon.png";
// import rightCoin from "src/asset/swap-right.svg";
import logo from "src/asset/homelogo.png";
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
    const onChange = (v) => {
        setFilter(v.target.value);
    };
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
    return (
        <>
            <div className={s.wrap}>
                <div className={s.top}>
                    <div className={s.topContent}>
                        <p className={s.logo}>
                            <img src={logo} alt="" />
                        </p>
                        <p className={s.desc}>
                            The first decentralized, dual-rate NFT lending
                            <br />
                            protocol that applies to all NFT collections
                        </p>
                    </div>
                </div>
                <div className={s.projectIndex}>
                    <div className={s.card}>
                        <img src={DepositNFT} alt="" />
                        <p>Total NFT</p>
                        <p>{totalDepositNFT}</p>
                    </div>
                    <div className={s.card}>
                        <img src={BorrowedETH} alt="" />
                        <p>Total Borrow</p>
                        <p>
                            {totalBorrowAmount}
                            <span>ETH</span>
                        </p>
                    </div>
                    <div className={s.card}>
                        <img src={AvailableETH} alt="" />
                        <p>Total Available Borrow</p>
                        <p>
                            {poolBalance}
                            <span>ETH</span>
                        </p>
                    </div>
                </div>
            </div>
            {/* <BluePool list={bluePoolList} />
            <MiddlePool list={middlePool} /> */}
            <div className={s.supportList}>
                {loadingPoolList && (
                    <div className={s.loadingWrap}>
                        <Spin />
                    </div>
                )}
                {poolList.length ? (
                    <Row className={s.list}>
                        <p className={s.title}>
                            Pools
                            <Radio.Group
                                defaultValue={-1}
                                buttonStyle="solid"
                                onChange={onChange}
                            >
                                <Radio.Button value={-1}>All</Radio.Button>
                                <Radio.Button value={1}>Blue Chip</Radio.Button>
                                <Radio.Button value={2}>Shard</Radio.Button>
                                <Radio.Button value={0}>
                                    Permissionless
                                </Radio.Button>
                            </Radio.Group>
                        </p>
                        {poolList
                            .filter(
                                (i) =>
                                    +i.poolType === filterType ||
                                    filterType === -1
                            )
                            .map((pool, index) => {
                                return (
                                    <div className={s.item} key={index}>
                                        <div
                                            className={cx(
                                                s.section,
                                                s.firstSection
                                            )}
                                        >
                                            {pool.poolType > 1 ? (
                                                <div className={s.avatars}>
                                                    {pool.nfts.map(
                                                        (de, ind) => {
                                                            if (ind <= 8) {
                                                                return (
                                                                    <img
                                                                        src={
                                                                            nftHexMap[
                                                                                de
                                                                            ]
                                                                                .image_url
                                                                        }
                                                                        key={
                                                                            ind
                                                                        }
                                                                        alt=""
                                                                        className={
                                                                            s.middlePics
                                                                        }
                                                                    />
                                                                );
                                                            }
                                                        }
                                                    )}
                                                </div>
                                            ) : (
                                                <img
                                                    className={s.avatar}
                                                    src={
                                                        nftHexMap[pool.nfts[0]]
                                                            .image_url
                                                    }
                                                    alt=""
                                                />
                                            )}

                                            <div className={s.poolInfo}>
                                                <div className={s.poolName}>
                                                    {+pool.poolType > 1 ? (
                                                        <div>
                                                            Shared Pools
                                                            <Popover
                                                                placement="top"
                                                                content={
                                                                    <MiddleList
                                                                        list={
                                                                            pool.nfts
                                                                        }
                                                                    />
                                                                }
                                                                trigger="click"
                                                            >
                                                                <QuestionCircleFilled
                                                                    className={
                                                                        s.middleTips
                                                                    }
                                                                />
                                                            </Popover>
                                                        </div>
                                                    ) : (
                                                        pool.nftName
                                                    )}
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
                                                <img src={eIcon} />
                                                {pool.totalDepositForEth}
                                            </p>
                                        </div>
                                        <div className={s.normal}>
                                            <p className={s.sectionTitle}>
                                                Liquidity
                                            </p>
                                            <p className={s.content}>
                                                <img src={eIcon} />
                                                {pool.liquidityForEth}
                                            </p>
                                        </div>
                                        <div
                                            className={s.viewButton}
                                            onClick={() =>
                                                window.open(
                                                    `/nft/${pool.id}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            View
                                        </div>
                                    </div>
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
