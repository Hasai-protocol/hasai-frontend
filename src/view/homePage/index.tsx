import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import { Tabs } from "antd";
import { useMemo } from "react";
import cx from "classnames";
import s from "./index.module.scss";
// imgs
import bannerIcon from "src/asset/homePage/bannerIcon.png";
import flow1 from "src/asset/homePage/flow1.png";
import pp from "src/asset/homePage/pp.png";
import sp from "src/asset/homePage/sp.png";
import bp from "src/asset/homePage/bp.png";
import topbg from "src/asset/homePage/topbg.png";
import governanceImg from "src/asset/homePage/governanceImg.png";
import jump from "src/asset/homePage/jump.png";

export default observer(function Home() {
    const nav = useNavigate();
    let [nowIndex, setIndex] = useState(0);
    const typeList = [
        {
            title: "As Depositor",
            content: (
                <div className={s.cont}>
                    <p className={s.subsubTitle}>How do I deposit？</p>
                    <p>
                        Browse to the "Deposit" section and click on "Deposit"
                        for the Pools you want to deposit. Select the amount
                        you'd like to deposit and submit your transaction. Once
                        the transaction is confirmed, your deposit is
                        successfully registered and you begin earning interest.
                    </p>
                    <p className={s.flowTips}>
                        * The first deposit of ETH asset will require an
                        additional approval transaction
                    </p>
                </div>
            ),
            img: flow1,
        },
        {
            img: flow1,
            content: <div>11233</div>,
            title: "As Creator",
        },
        {
            img: flow1,
            content: <div>11233</div>,
            title: "As Borrower",
        },
    ];
    return (
        <div className={s.homePageWarp}>
            <img src={topbg} className={s.topbg} alt="" />
            <div className={s.banner}>
                <div className={cx(s.left, "gradualText")}>
                    The first decentralized, dual-rate NFT lending protocol that
                    applies to all NFT collections
                </div>
                <div className={s.right}>
                    <img src={bannerIcon} />
                </div>
            </div>
            <div className={s.workFlowWarp}>
                <p className={cx(s.flowTitle, "gradualText")}>Work Flow</p>
                <div className={cx(s.titleList)}>
                    {typeList.map((item, index) => {
                        return (
                            <div
                                onClick={() => {
                                    setIndex(index);
                                }}
                                className={cx(
                                    s.titleItem,
                                    nowIndex === index ? s.active : ""
                                )}
                            >
                                <p>{item.title}</p>
                            </div>
                        );
                    })}
                </div>
                <div className={s.workFlowContent}>
                    <img src={typeList[nowIndex].img} alt="" />
                    <div className={s.flowText}>
                        <p className={s.flowContentTitle}>
                            {typeList[nowIndex].title}
                        </p>
                        <div className={s.flowTextContent}>
                            {typeList[nowIndex].content}
                        </div>
                        <span className={s.goDetail}></span>
                    </div>
                </div>
            </div>
            <div className={s.marketsWarp}>
                <p className={cx(s.MarketsTitle, "gradualText")}>Markets</p>
                <div className={s.marketsList}>
                    <div className={s.marketsItem}>
                        <img src={bp} alt="" className={s.icon} />
                        <img src={jump} alt="" className={s.jump} />
                        <p className={s.marketTitle}>Blue-Chip Pools</p>
                        <p className={s.marketContent}>
                            Hasai's original Blue-Chip Pools will support NFTs
                            from the following collections as collateral: BAYC
                            MAYC CryptoPunks Doodles Azuki CLONE-X. <br />
                            Promotion Blue-Chip Pools: NFT collections supported
                            in the Shared Pool can be promoted to Blue-Chip
                            Pools by DAO voting.
                        </p>
                        <span className={s.goDetail}></span>
                    </div>
                    <div className={s.marketsItem}>
                        <img src={sp} alt="" className={s.icon} />
                        <img src={jump} alt="" className={s.jump} />

                        <p className={s.marketTitle}>Shared Pools</p>
                        <p className={s.marketContent}>
                            The emerging NFT collections will share the Shared
                            Pool as the lending pool. All supported NFT
                            collections in this pool share the same risk factor,
                            lending ratio, liquidation factors, and other
                            parameters.
                        </p>
                        <span className={s.goDetail}></span>
                    </div>
                    <div className={s.marketsItem}>
                        <img src={pp} className={s.icon} alt="" />
                        <img src={jump} alt="" className={s.jump} />

                        <p className={s.marketTitle}>Permissionless Pools</p>
                        <p className={s.marketContent}>
                            Anyone can create Permissionless Pool. One
                            Permissionless Pool cannot be created by the same
                            NFT collections repeatedly and cannot be destroyed
                            after the creation. The original parameters of
                            Permissionless Pools are determined by creators
                            themselves.
                        </p>
                        <span className={s.goDetail}></span>
                    </div>
                </div>
            </div>
            <div className={s.governanceWarp}>
                <p className={cx(s.governanceTitle, "gradualText")}>
                    Governance
                </p>
                <p className={cx(s.description)}>
                    HASAI holders can vote lock their HASAI into the Hasai DAO
                    to receive Vote-escrowed HASAI (VeHASAI). The longer they
                    lock for, the more veHASAI they receive. Vote locking allows
                    you to vote in governance, boost your HASAI rewards and
                    receive trading fees.
                </p>
                <img src={governanceImg} alt="" />
            </div>
        </div>
    );
});
