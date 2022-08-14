import { useEffect, useMemo, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Modal, Input, notification } from "antd";
import { ethers } from "ethers";
import { formatEther } from "src/util";
import depositModuleIcon from "src/asset/depositModuleIcon.png";
import { useStores } from "src/hooks";
import cx from "classnames";
import s from "./index.module.scss";
export default observer(function RepayModal({ onCancel, visible, id }) {
    const [loading, setLoading] = useState(false);
    const [inputEth, setEth] = useState("");
    const [isDisabled, setDis] = useState(true);
    const {
        store: { queryBalance, walletAddress, ethBalance, depositEth },
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
        if (+target > +ethBalance || +target === 0) {
            setDis(true);
        } else if (+target <= +ethBalance && +target > 0) {
            setDis(false);
        }
    };
    const clickSure: any = async (dis) => {
        if (!dis) {
            setLoading(true);
            let result = await depositEth(id, inputEth);
            if (result) {
                notification.success({
                    message: "Hasai",
                    description: "Transaction done.",
                });
                setLoading(false);
                setEth("");
                setDis(true);
                onCancel();
            } else {
                notification.error({
                    message: "Hasai",
                    description: "Transaction failed.",
                });
            }
        }
        return;
    };
    return (
        <Modal
            centered
            footer={null}
            visible={visible}
            className={s.modal}
            onCancel={onCancel}
            title={
                <>
                    <p className={s.title}>
                        <img src={depositModuleIcon} />
                        Deposit
                    </p>
                    {/* <p className={s.des}>Deposit ETH and earn the Interest</p> */}
                </>
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
                        Available {formatEther(+ethBalance, 3)}
                        ETH
                        <span
                            onClick={() =>
                                changeInput({
                                    target: {
                                        value: formatEther(+ethBalance, 3),
                                    },
                                })
                            }
                        >
                            MAX
                        </span>
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
});
