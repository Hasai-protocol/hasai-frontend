import { useEffect, useMemo, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Modal, Input, notification } from "antd";
import { ethers } from "ethers";
import { formatEther } from "src/util";
import depositModuleIcon from "src/asset/account/mydeposit.png";
import closeIcon from "src/asset/colseIcon.png";
import { useStores } from "src/hooks";
import cx from "classnames";
import s from "./index.module.scss";
import SelectNfts from "./selectNfts";
export default observer(function RepayModal() {
    const [loading, setLoading] = useState(false);
    const [inputEth, setEth] = useState("");
    const [nftName, setNFTName] = useState("");
    const [apr, setApr] = useState("-");
    const [isDisabled, setDis] = useState(true);
    const [showSelectNft, setSelectNft] = useState(false);
    const [index, setIndex] = useState(null);
    const {
        store: {
            queryBalance,
            walletAddress,
            ethBalance,
            depositEth,
            depositInfo,
            poolList,
        },
    } = useStores();
    let [visible, onCancel, location] = useMemo(() => {
        setEth("");
        setDis(true);
        setLoading(false);
        setIndex(depositInfo!.id);
        setNFTName("");
        return [
            depositInfo.visible,
            depositInfo.onCancel,
            depositInfo.location,
        ];
    }, [depositInfo]);
    useEffect(() => {
        if (depositInfo.id) {
            setApr(poolList[+depositInfo.id].stableApr);
        }
    }, [depositInfo]);
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
        if (!dis && index) {
            setLoading(true);
            let result = await depositEth(index, inputEth);
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
                setLoading(false);
                setDis(true);
                notification.error({
                    message: "Hasai",
                    description: "Transaction failed.",
                });
            }
        }
        return;
    };
    const openSelectNft = () => {
        setSelectNft(!showSelectNft);
    };
    const selected = (pool, index) => {
        setNFTName(pool.nftName);
        setApr(pool.stableApr);
        setIndex(index);
        setSelectNft(false);
    };
    return (
        <>
            <Modal
                centered
                footer={null}
                visible={visible}
                className={s.modal}
                onCancel={onCancel}
                closeIcon={<img src={closeIcon} />}
                title={
                    <p className={cx(s.title)}>
                        <img src={depositModuleIcon} />
                        <span className="gradualText">Deposit</span>
                    </p>
                }
                width={320}
            >
                <div className={s.content}>
                    {location === "account" && (
                        <div className={s.inputIcon} onClick={openSelectNft}>
                            <Input
                                value={nftName}
                                className={cx(s.input, "largeInput")}
                                disabled
                                placeholder="Select Your Pool"
                            />
                        </div>
                    )}
                    <div className={s.inputWarp}>
                        <Input
                            className={s.depositInput}
                            placeholder="0.00"
                            value={inputEth}
                            onChange={changeInput}
                            suffix="ETH"
                        />
                        <div className={s.balance}>
                            <div>
                                Available
                                <span className={s.value}>
                                    {formatEther(+ethBalance, 3)}
                                    ETH
                                </span>
                            </div>
                            <span
                                className={s.maxBtn}
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
                        </div>
                    </div>
                    <div className={s.depositInfo}>
                        <span>Interest APR≈</span>
                        <span>{apr}%</span>
                    </div>
                    <div
                        onClick={() => {
                            clickSure(isDisabled);
                        }}
                        className={cx(
                            s.btn,
                            isDisabled || !index || loading ? s.disabled : ""
                        )}
                    >
                        {loading && <LoadingOutlined />}
                        Confirm
                    </div>
                </div>
            </Modal>
            {showSelectNft && (
                <SelectNfts
                    onCancel={openSelectNft}
                    visible={showSelectNft}
                    selected={selected}
                ></SelectNfts>
            )}
        </>
    );
});
