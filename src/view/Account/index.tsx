import { useEffect } from "react";

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
            </div>
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
                            <MyDeposit />
                            <MyLoan />
                        </div>
                        <div className={s.right}>
                            <MyNFT />
                            <MyAuction />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});
