import { observer } from "mobx-react";

import { Modal } from "antd";
import Empty from "src/components/empty";

import { ETHERSCAN_URL } from "src/constants";
import closeIcon from "src/asset/colseIcon.png";

import AvatarImg from "src/asset/avatar.png";
import historyIcon from "src/asset/bulletpoint.png";
import ETHImg from "src/asset/eth.svg";
import jump from "src/asset/jump.svg";

import s from "./index.module.scss";

const clipId = (id: string) => {
    if (id.length < 1) return id;
    return id.slice(0, 4) + "..." + id.slice(id.length - 4);
};

export default observer(function BidHistory({
    data,
    visible,
    onClose,
}: {
    data: Array<any>;
    visible: boolean;
    onClose: () => void;
}) {
    return (
        <Modal
            width={389}
            footer={null}
            visible={visible}
            onCancel={onClose}
            className={s.modalWap}
            closeIcon={<img src={closeIcon} />}
            title={
                <p className={s.title}>
                    <img src={historyIcon} alt="" />
                    <span className="gradualText">Bid History</span>
                </p>
            }
        >
            <div className={s.bidList}>
                {data.length < 1 && <Empty />}
                {data.map((item, i) => {
                    return (
                        <div key={i} className={s.item}>
                            <div className={s.left}>
                                <div className={s.user}>
                                    <img src={AvatarImg} alt="" />
                                    <p>{clipId(item.user)}</p>
                                </div>
                                <p className={s.time}>{item.time}</p>
                            </div>
                            <div className={s.right}>
                                <p>
                                    <img src={ETHImg} alt="" />
                                    {item.amount}
                                </p>
                                <a
                                    href={`${ETHERSCAN_URL}/tx/${item.hash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img src={jump} alt="" />
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
});
