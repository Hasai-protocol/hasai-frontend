import { useEffect, useMemo } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Modal } from "antd";
import dayjs from "dayjs";
import closeIcon from "src/asset/colseIcon.png";
import heart from "src/asset/HealthFactor-g.png";

import { SEC_PER_DAY, SEC_PER_YEAR } from "src/constants";
import { formatEther } from "src/util";
import { useStores } from "src/hooks";
import { dateFormat } from "../../config";
import payment from "../../asset/payment.png";
import s from "./index.module.scss";
import cx from "classnames";
export default observer(function RepayModal({
    index,
    loading,
    onCancel,
    onConfirm,
    visible,
}) {
    const {
        store: { userBorrowList, queryBorrowInfo, borrowInfo },
    } = useStores();

    const nft = useMemo(() => {
        const { address, id, borrowId } = userBorrowList[index] || {};
        if (!userBorrowList.length) return {};
        queryBorrowInfo(address, id, borrowId);
        return userBorrowList[index] || {};
    }, [userBorrowList, index]);

    return (
        <Modal
            centered
            footer={null}
            visible={visible}
            className={s.modal}
            onCancel={onCancel}
            closeIcon={<img src={closeIcon} />}
            title={
                <p className={s.title}>
                    <img src={payment} alt="" />
                    <span className="gradualText">Repayment</span>
                </p>
            }
            width={320}
        >
            <div className={s.content}>
                <div className={s.input}>#{nft.id}</div>
                <div className={s.indexWrap}>
                    <p className={s.index}>
                        <span>Borrow Time</span>
                        <span>
                            {dayjs(nft.startTime * 1000).format(dateFormat)}
                        </span>
                    </p>
                    {/* rateMode  => 1 :stable  2:variable */}
                    {nft.rateMode === 1 && (
                        <p className={s.index}>
                            <span>Borrow Ends</span>
                            <span>
                                {dayjs(nft.liquidateTime * 1000).format(
                                    dateFormat
                                )}
                            </span>
                        </p>
                    )}
                    {nft.rateMode === 2 && (
                        <p className={s.index}>
                            <span>Health Factor</span>
                            <span>
                                <img src={heart} alt="" />
                                <span className={s.variableNumber}>
                                    {borrowInfo?.variableNumber}
                                </span>
                            </span>
                        </p>
                    )}

                    <p className={s.index}>
                        <span>Estimated interest</span>
                        <span>{nft.interestForEth}ETH</span>
                    </p>
                    <p className={s.index}>
                        <span>Total Repayment</span>
                        <span>{nft.repayAmount}ETH</span>
                    </p>
                </div>
                <div
                    onClick={onConfirm}
                    className={cx(s.btn, loading && s.disabled)}
                >
                    {loading && <LoadingOutlined />}
                    Confirm
                </div>
            </div>
        </Modal>
    );
});
