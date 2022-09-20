import { useEffect, useMemo, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Modal, Select } from "antd";
import closeIcon from "src/asset/colseIcon.png";
import { SEC_PER_DAY, SEC_PER_YEAR } from "src/constants";
import { useStores } from "src/hooks";
import { InfoCircleFilled } from "@ant-design/icons";
import colorFulCoin from "../../asset/colorfulCoin.png";
import s from "./index.module.scss";
import cx from "classnames";

export default observer(function BorrowModal({
    index,
    loading,
    onCancel,
    visible,
    onConfirm,
}) {
    const {
        store: { userNFTs, nftHexMap },
    } = useStores();
    const [lending, setLending] = useState();

    const nft = useMemo(() => {
        return userNFTs[index] || {};
    }, [userNFTs, index]);

    const pool = useMemo(() => {
        return nftHexMap[nft.address];
    }, [nft, nftHexMap]);
    useEffect(() => {
        setLending(undefined);
    }, [visible]);
    const changeLending = (e) => {
        setLending(e);
    };
    const goConfirm = () => {
        if (!lending) return;
        onConfirm(lending);
    };
    const cancel = () => {
        setLending(undefined);
        onCancel();
    };
    return (
        <Modal
            centered
            footer={null}
            visible={visible}
            className={s.modal}
            onCancel={cancel}
            closeIcon={<img src={closeIcon} />}
            title={
                <p className={s.title}>
                    <img src={colorFulCoin} alt="" />
                    <span className="gradualText">Borrow</span>
                </p>
            }
            width={320}
        >
            <div className={s.content}>
                <div className={cx(s.input)}>#{nft.id}</div>
                <Select
                    style={{ width: "100%" }}
                    className={cx(s.lendingModel, s.inputIcon)}
                    onChange={changeLending}
                    disabled={!pool}
                    placeholder="Choose a lending model"
                >
                    <Select.Option value={1} disabled={!pool?.canStable}>
                        Stable
                    </Select.Option>
                    <Select.Option value={2}>Variable</Select.Option>
                </Select>
                <div></div>
                {lending === 1 && (
                    <div className={s.tips}>
                        <InfoCircleFilled /> The stable rate will be fixed in a
                        specific lending period.
                    </div>
                )}
                <div className={s.indexWrap}>
                    <p className={s.index}>
                        <span>NFT Valuation</span>
                        <span>
                            {pool
                                ? +(
                                      pool?.stats.average_price * pool?.ratio
                                  ).toFixed(6) + "ETH"
                                : "-"}
                        </span>
                    </p>
                    <p className={s.index}>
                        <span>Period</span>
                        <span>{pool ? `${pool.period}Days` : "-"}</span>
                    </p>
                    <p className={s.index}>
                        <span>Interest Apr</span>
                        <span>
                            {pool
                                ? (lending === 1
                                      ? pool?.stableApr
                                      : pool?.vairableApr) + "%"
                                : "-"}
                        </span>
                    </p>
                </div>
                <div
                    onClick={goConfirm}
                    className={cx(s.btn, loading || !lending ? s.disable : "")}
                >
                    {loading && <LoadingOutlined />}
                    Confirm
                </div>
            </div>
        </Modal>
    );
});
