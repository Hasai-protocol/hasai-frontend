import { useEffect, useState } from "react";

import { observer } from "mobx-react";
import { Empty } from "antd";

import { useStores } from "src/hooks";

import MyAuction from "./MyAuction";
import MyLoan from "./MyLoan";
import MyNFT from "./MyNFT";
import MyDeposit from "./MyDeposit";
import { PlusOutlined } from "@ant-design/icons";
import s from "./index.module.scss";
import { useNavigate } from "react-router-dom";

export default observer(function Account() {
    const nav = useNavigate();
    const tabs = ["Deposit", "Loan", "NFT", "Auction"];
    const {
        store: {
            inited,
            userNFTs,
            walletAddress,
            selfLoanTotal,
            userRepayAmount,
            queryUserRepayAmount,
            totalInterest,
            handleConnectWallet,
        },
    } = useStores();
    let [onMobile, setOn] = useState(false);
    let [activedTab, setTab] = useState(0);
    const handleResize = () => {
        const innerWith = window.innerWidth;
        console.log(innerWith);
        if (innerWith <= 700 && !onMobile) {
            setOn(true);
            setTab(0);
        } else if (onMobile && innerWith > 700) {
            setOn(false);
            setTab(0);
        }
    };
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            // 取消监听窗口的宽度变化
            window.removeEventListener("resize", handleResize);
        };
    });
    useEffect(() => {
        if (!inited || !walletAddress) return;
        queryUserRepayAmount();
    }, [inited, walletAddress, queryUserRepayAmount]);
    return (
        <div className={s.wrap}>
            <div className={s.top}>
                <div className={s.topContent}>
                    <div className={s.index}>
                        <p>My NFT</p>
                        <p>{userNFTs.length}</p>
                    </div>
                    <div className={s.index}>
                        <p>My Loan</p>
                        <p>
                            {selfLoanTotal.toFixed(2)}
                            <span>ETH</span>
                        </p>
                    </div>
                    <div className={s.index}>
                        <p>Total Interest</p>
                        <p>
                            {totalInterest}
                            <span>ETH</span>
                        </p>
                    </div>
                    <div className={s.index}>
                        <p>Total Repay</p>
                        <p>
                            {userRepayAmount.toFixed(2)}
                            <span>ETH</span>
                        </p>
                    </div>
                </div>
                <div className={s.topImg}></div>
            </div>
            {onMobile && (
                <div className={s.accountNav}>
                    {tabs.map((tab, index) => (
                        <span
                            className={activedTab === index ? s.actived : ""}
                            onClick={() => setTab(index)}
                        >
                            {tab}
                        </span>
                    ))}
                </div>
            )}
            <div className={s.content}>
                {!walletAddress && (
                    <div className={s.emptyWrap}>
                        <span
                            className={s.connectWallet}
                            onClick={handleConnectWallet}
                        >
                            Connect Wallet
                        </span>
                    </div>
                )}
                {walletAddress && (
                    <>
                        <div className={s.myNFT}>
                            <MyDeposit
                                onMobile={onMobile}
                                className={
                                    !onMobile || (onMobile && activedTab === 0)
                                        ? onMobile && activedTab === 0
                                            ? "actived"
                                            : ""
                                        : "hide"
                                }
                            />
                            <MyLoan
                                onMobile={onMobile}
                                className={
                                    !onMobile || (onMobile && activedTab === 1)
                                        ? onMobile && activedTab === 1
                                            ? "actived"
                                            : ""
                                        : "hide"
                                }
                            />
                        </div>
                        <div className={s.right}>
                            <MyNFT
                                onMobile={onMobile}
                                className={
                                    !onMobile || (onMobile && activedTab === 2)
                                        ? onMobile && activedTab === 2
                                            ? "actived"
                                            : ""
                                        : "hide"
                                }
                            />
                            <MyAuction
                                onMobile={onMobile}
                                className={
                                    !onMobile || (onMobile && activedTab === 3)
                                        ? onMobile && activedTab === 3
                                            ? "actived"
                                            : ""
                                        : "hide"
                                }
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});
