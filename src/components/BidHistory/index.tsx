import { observer } from 'mobx-react';

import { UnorderedListOutlined, LinkOutlined } from '@ant-design/icons';
import { Modal, Empty } from 'antd';

import { ETHERSCAN_URL } from 'src/constants';

import AvatarImg from 'src/asset/avatar.png';

import s from './index.module.scss';

const clipId = (id: string) => {
    if (id.length < 1) return id;
    return id.slice(0, 4) + '...' + id.slice(id.length - 4);
}

export default observer(function BidHistory({
    data,
    visible,
    onClose
} : {
    data: Array<any>;
    visible: boolean;
    onClose: () => void;
}) {
    return (
        <Modal
            width={306}
            footer={null}
            visible={visible}
            onCancel={onClose}
            title={<p className={s.title}>
                <UnorderedListOutlined />
                Bid History
            </p>}
        >
            <div className={s.bidList}>
                {data.length < 1 && <Empty />}
                {data.map(item => {
                    return (
                        <div key={item.hash} className={s.item}>
                            <div>
                                <img src={AvatarImg} alt='' />
                                <p>{clipId(item.user)}</p>
                            </div>
                            <div>
                                <p>Ξ{item.amount}</p>
                                <a href={`${ETHERSCAN_URL}/${item.hash}`} target='_blank' rel="noreferrer">
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
