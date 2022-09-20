import { observer } from "mobx-react";

import { UnorderedListOutlined, LinkOutlined } from "@ant-design/icons";
import { Modal, Empty } from "antd";

import { ETHERSCAN_URL } from "src/constants";

import AvatarImg from "src/asset/avatar.png";
import historyIcon from "src/asset/bulletpoint.png";

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
            width={315}
            footer={null}
            visible={visible}
            onCancel={onClose}
            className={s.modalWap}
            title={
                <p className={s.title}>
                    <img src={historyIcon} alt="" />
                    <span className="gradualText">Bid History</span>
                </p>
            }
        >
            <div className={s.bidList}>
                {data.length < 1 && <Empty />}
                {data.map((item) => {
                    return (
                        <div key={item.hash} className={s.item}>
                            <div className={s.user}>
                                <img src={AvatarImg} alt="" />
                                <p>{clipId(item.user)}</p>
                            </div>
                            <div className={s.amount}>
                                <p>Ξ{item.amount}</p>
                                <a
                                    href={`${ETHERSCAN_URL}/${item.hash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <LinkOutlined />
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
});
