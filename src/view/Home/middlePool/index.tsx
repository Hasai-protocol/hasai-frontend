import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Row, Col, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useStores } from "src/hooks";

import rightCoin from "src/asset/swap-right.png";
import s from "./index.module.scss";
import cx from "classnames";
export default observer(function Home({ list }) {
    const nav = useNavigate();
    const {
        store: { nftHexMap },
    } = useStores();
    // const details = [];
    // console.log(list[0], 1);
    const [details, nftNumber] = useMemo(() => {
        if (!Object.keys(nftHexMap).length || !list[0]) return [];
        let nftNumber = 0;
        let ds = list[0].nfts.map((nadd) => {
            const detail = nftHexMap[nadd];
            if (detail.stats) {
                nftNumber += detail.stats.count;
            }
            return detail;
        });

        return [ds, nftNumber];
    }, [list, nftHexMap]);
    return (
        <>
            {list.length && list[0] ? (
                <div className={s.wrap}>
                    <div className={s.inner}>
                        <p className={s.title}>Shared Pools</p>
                        <div className={s.middle}>
                            <div className={s.collections}>
                                {details.map((dInfo, index) => {
                                    return (
                                        <span
                                            className={s.collection}
                                            key={index}
                                        >
                                            <img src={dInfo.image_url} alt="" />
                                            {dInfo.name}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className={s.info}>
                                <div className={s.poolInfo}>
                                    <p className={s.poolInfoTitle}>
                                        Collections
                                    </p>
                                    <p className={s.value}>
                                        {list[0].nfts.length}
                                    </p>
                                </div>
                                <div className={s.poolInfo}>
                                    <p className={s.poolInfoTitle}>NFTs</p>
                                    <p className={s.value}>{nftNumber}</p>
                                </div>
                                <div className={s.poolInfo}>
                                    <p className={s.poolInfoTitle}>
                                        Deposit APY≈
                                    </p>
                                    <p className={s.value}>
                                        {list[0].depositApy}%
                                    </p>
                                </div>
                                <br />
                                <div className={s.poolInfo}>
                                    <p className={s.poolInfoTitle}>
                                        Total Deposit
                                    </p>
                                    <p className={s.value}>
                                        {list[0].totalDepositForEth}
                                        <sub>ETH</sub>
                                    </p>
                                </div>
                                <div className={s.poolInfo}>
                                    <p className={s.poolInfoTitle}>Liquidity</p>
                                    <p className={s.value}>
                                        {list[0].liquidityForEth}
                                        <sub>ETH</sub>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={s.middle}>
                            <div className={s.collections}></div>
                            <div className={cx(s.info, s.buttonWarp)}>
                                <div
                                    className={s.viewButton}
                                    onClick={() => nav(`/nft/${list[0].id}`)}
                                >
                                    View <img src={rightCoin} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
});
