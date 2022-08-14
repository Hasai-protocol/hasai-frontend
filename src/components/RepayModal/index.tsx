import { useMemo } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Modal } from "antd";
import dayjs from "dayjs";

import { SEC_PER_DAY, SEC_PER_YEAR } from "src/constants";
import { formatEther } from "src/util";
import { useStores } from "src/hooks";
import { dateFormat } from "../../config";

import s from "./index.module.scss";

function RepayIcon() {
    return (
        <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.94318 1.01143C3.63575 1.01143 0.954545 3.69263 0.954545 7.00007C0.954545 10.3075 3.63575 12.9887 6.94318 12.9887V13.6932C3.24664 13.6932 0.25 10.6966 0.25 7.00007C0.25 3.30352 3.24664 0.306885 6.94318 0.306885C10.6397 0.306885 13.6364 3.30352 13.6364 7.00007H12.9318C12.9318 3.69263 10.2506 1.01143 6.94318 1.01143ZM9.05682 8.46823C9.05682 6.96755 7.97554 6.79651 7.1068 6.65928C6.15997 6.5097 5.6242 6.37963 5.6242 5.45288C5.6242 4.67507 6.34133 4.39867 6.95548 4.39867C7.26154 4.38743 7.56557 4.45905 7.84249 4.60763C8.11942 4.75621 8.36131 4.97749 8.54822 5.25323L8.99331 4.84481C8.79315 4.55221 8.54409 4.30746 8.26044 4.12464C7.9768 3.94183 7.66416 3.82454 7.34051 3.77954V2.77279H6.7684V3.75547C5.73433 3.82701 5.05209 4.49037 5.05209 5.45288C5.05209 6.99096 6.14767 7.16428 7.02785 7.30313C7.95838 7.45043 8.48471 7.57693 8.48471 8.46823C8.48471 9.45416 7.58851 9.60147 7.05446 9.60147C6.0733 9.60147 5.6591 9.288 5.27464 8.74691L4.82955 9.15532C5.05632 9.49503 5.34962 9.76997 5.68618 9.95833C6.02273 10.1467 6.39328 10.2433 6.7684 10.2404V11.2273H7.34051V10.2372C8.40634 10.1383 9.05682 9.4805 9.05682 8.46823ZM12.1064 13.4942L9.86454 11.2524C9.72697 11.1148 9.72697 10.8918 9.86454 10.7542L12.1064 8.51233C12.244 8.37476 12.467 8.37476 12.6046 8.51233C12.7422 8.6499 12.7422 8.87295 12.6046 9.01052L10.9641 10.651H15.3977C15.5923 10.651 15.75 10.8087 15.75 11.0033C15.75 11.1978 15.5923 11.3555 15.3977 11.3555H10.9641L12.6046 12.996C12.7422 13.1336 12.7422 13.3566 12.6046 13.4942C12.467 13.6318 12.244 13.6318 12.1064 13.4942Z"
                fill="black"
            />
        </svg>
    );
}

export default observer(function RepayModal({
    index,
    loading,
    onCancel,
    onConfirm,
    visible,
}) {
    const {
        store: { userBorrowList },
    } = useStores();

    const nft = useMemo(() => {
        return userBorrowList[index] || {};
    }, [userBorrowList, index]);

    return (
        <Modal
            centered
            footer={null}
            visible={visible}
            className={s.modal}
            onCancel={onCancel}
            title={
                <p className={s.title}>
                    <RepayIcon />
                    Repayment
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
                    <p className={s.index}>
                        <span>Estimated interest</span>
                        <span>{nft.interestForEth}ETH</span>
                    </p>
                    <p className={s.index}>
                        <span>Total Repayment</span>
                        <span>{nft.repayAmount}ETH</span>
                    </p>
                </div>
                <div onClick={onConfirm} className={s.btn}>
                    {loading && <LoadingOutlined />}
                    Confirm
                </div>
            </div>
        </Modal>
    );
});
