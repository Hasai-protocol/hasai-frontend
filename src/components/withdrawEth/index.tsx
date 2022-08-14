import { useEffect, useMemo, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Modal, Input } from "antd";
import { ethers } from "ethers";
import { formatEther } from "src/util";
import withdrawIcon from "src/asset/withdrawIcon.png";
import { useStores } from "src/hooks";
import cx from "classnames";
import s from "./index.module.scss";
import { Table, notification } from "antd";

export default observer(function RepayModal({ onCancel, visible, info }) {
    const {
        scaledBalanceOf,
        interestForEth,
        apy,
        id,
        totalReward,
        canWithdrawRaw,
        canWithdrawRorEth,
        nftName,
    } = info;
    const [loading, setLoading] = useState(false);
    const [inputEth, setEth] = useState("");
    const [isDisabled, setDis] = useState(true);
    const {
        store: { queryBalance, walletAddress, depositWithDraw },
    } = useStores();
    useEffect(() => {
        if (walletAddress) {
            queryBalance();
        }
    }, [queryBalance, walletAddress, visible]);
    const changeInput = (e) => {
        let value = e.target.value || "";
        setEth(value);
        let target = ethers.utils.parseEther(`${value || 0}`);
        if (+target > +canWithdrawRaw || +target === 0) {
            setDis(true);
        } else if (+target <= +canWithdrawRaw && +target > 0) {
            setDis(false);
        }
    };
    const clickSure: any = async (dis) => {
        if (!dis) {
            setLoading(true);
            let result = await depositWithDraw(id, inputEth);
            console.log(result);
            setLoading(false);
            setEth("");
            setDis(true);
            onCancel();
            if (result) {
                return notification.success({
                    message: "Hasai",
                    description: "Transaction done.",
                });
            }
            notification.error({
                message: "Hasai",
                description: "Transaction failed.",
            });
        }
        return;
    };
    if (visible) {
        return (
            <Modal
                centered
                footer={null}
                visible={visible}
                className={s.modal}
                onCancel={onCancel}
                title={
                    <p className={s.title}>
                        <img src={withdrawIcon} />
                        Withdraw
                    </p>
                }
                width={320}
            >
                <div className={s.content}>
                    <div className={s.inputWarp}>
                        <Input
                            className={s.depositInput}
                            placeholder="0.00"
                            value={inputEth}
                            onChange={changeInput}
                            suffix="ETH"
                        />
                        <p className={s.balance}>
                            Available to Withdraw {canWithdrawRorEth}
                            ETH
                            <span
                                onClick={() =>
                                    changeInput({
                                        target: {
                                            value: canWithdrawRorEth,
                                        },
                                    })
                                }
                            >
                                MAX
                            </span>
                        </p>
                    </div>
                    <div className={s.otherInfos}>
                        <p className={s.item}>
                            <span className={s.title}>NFT Collection Pool</span>
                            <span className={s.value}>{nftName}</span>
                        </p>
                        <p className={s.item}>
                            <span className={s.title}>APY</span>
                            <span className={s.value}>{apy}%</span>
                        </p>
                        <p className={s.item}>
                            <span className={s.title}>Interest Valuation</span>
                            <span className={s.value}>{interestForEth}</span>
                        </p>
                        <p className={s.item}>
                            <span className={s.title}>
                                Total principal and interest
                            </span>
                            <span className={s.value}>{canWithdrawRorEth}</span>
                        </p>
                    </div>
                    <div
                        onClick={() => {
                            clickSure(isDisabled);
                        }}
                        className={cx(
                            s.btn,
                            isDisabled || loading ? s.disabled : ""
                        )}
                    >
                        {loading && <LoadingOutlined />}
                        Confirm
                    </div>
                </div>
            </Modal>
        );
    } else {
        return <></>;
    }
});
