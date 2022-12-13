import { observer } from "mobx-react";
import cx from "classnames";
import s from "./index.module.scss";
import DepositIcon from "src/asset/deposit-icon.svg";
import { InfoCircleFilled } from "@ant-design/icons";
import { Input, Select, notification, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState, useCallback } from "react";
import DrawerList from "./DrawerList";
import { useStores } from "src/hooks";

export default observer(function BorrowItem({
    pool,
    nowNftInfos,
    reservesId,
    onCancel,
}) {
    const [valuation, setValuation] = useState(0);
    const [nftName, setNFTName] = useState("");
    const [index, setIndex] = useState(-1);
    const [visible, setVisible] = useState(false);

    // const [interest, setInterest] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    // const [showDeposit, setShowDeposit] = useState(false);
    const [lending, setLending] = useState();
    const {
        store: {
            walletAddress,
            handleBorrow,
            handleConnectWallet,
            nftHexMap,
            checkWallet,
        },
    } = useStores();
    const [info, setInfo] = useState<{ address: string; id: string }>({
        address: "",
        id: "",
    });
    const clearState = () => {
        setValuation(0);
        setNFTName("");
        setIndex(-1);
        setInfo({ address: "", id: "" });
    };
    const handleSelectNFT = (nft) => {
        setVisible(false);
        if (!pool) return;
        const { address } = nft;
        let { stats } = nftHexMap[address];
        setValuation(+(stats.average_price * pool.ratio).toFixed(6));
        setNFTName(`#${nft.id}`);
        setInfo({ address: nft.address, id: nft.id });
    };
    const handleCancel = () => {
        clearState();
        setVisible(false);
    };
    const showSelectNft = () => {
        if (!walletAddress) {
            checkWallet();
            return;
        }
        setVisible(isLoading ? false : true);
    };
    const changeLending = (e) => {
        setLending(e);
    };
    const handleConfirm = async () => {
        if (isLoading || !info.address || !lending) return;
        if (!walletAddress) {
            return handleConnectWallet(true);
        }
        setIsLoading(true);
        const result = await handleBorrow(
            reservesId!,
            info.address,
            info.id,
            lending!
        );
        if (result) {
            notification.success({
                message: "Hasai",
                description: "Transaction done.",
            });
            onCancel();
        } else {
            notification.error({
                message: "Hasai",
                description: "Transaction failed.",
            });
        }
        setIsLoading(false);
    };
    return (
        <>
            <div className={s.borrowItem}>
                <div className={s.depositHead}>
                    <div className={s.depositTitle}>
                        <img src={DepositIcon} alt="" />
                        <p className="gradualText">Borrow</p>
                    </div>
                </div>
                <div className={s.inputIcon} onClick={showSelectNft}>
                    <Input
                        value={nftName}
                        className={cx(s.input, "largeInput")}
                        placeholder="Select Your NFT"
                        disabled
                    />
                </div>
                <Select
                    style={{ width: "100%" }}
                    className={cx(s.lendingModel, s.inputIcon)}
                    onChange={changeLending}
                    placeholder="Choose a lending model"
                >
                    <Select.Option value={1} disabled={!pool.canStable}>
                        Stable
                    </Select.Option>
                    <Select.Option value={2}>Variable</Select.Option>
                </Select>
                {lending === 1 && (
                    <div className={s.tips}>
                        <InfoCircleFilled />
                        Stable rates will be fixed in a specific lending period,
                        but can be re-balanced in the long-term in response to
                        changes in the utilization and efficiency of the
                        liquidity pool.
                    </div>
                )}
                <div className={s.depositInfo}>
                    <p>
                        <span>NFT Valuation≈</span>
                        <span>{valuation ? `${valuation}ETH` : "/"}</span>
                    </p>
                </div>
                <div
                    className={cx(s.btn, {
                        [s.disabled]: !info.address || isLoading || !lending,
                    })}
                    onClick={handleConfirm}
                >
                    {isLoading && <LoadingOutlined />}
                    Borrow
                </div>
            </div>
            <DrawerList
                index={index}
                visible={visible}
                onCancel={handleCancel}
                onConfirm={handleSelectNFT}
                supportNft={[nowNftInfos.nowAddress]}
                handleSelect={(idx) => {
                    console.log(setIndex(idx));
                }}
            />
        </>
    );
});
