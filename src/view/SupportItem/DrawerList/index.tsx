import { useEffect, useMemo, useState } from "react";

import { Drawer, Empty, Row, Col, Space } from "antd";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import cx from "classnames";

import DepositCard from "src/components/DepositCard";
import { useStores } from "src/hooks";

import s from "./index.module.scss";

export default observer(function DrawerList({
    index,
    handleSelect,
    visible,
    onConfirm,
    onCancel,
    supportNft,
}) {
    const {
        store: { userNFTs },
    } = useStores();
    const { id } = useParams<{ id: string }>();

    const list = useMemo(() => {
        if (!supportNft || userNFTs.length < 1) return [];
        let lowNfts = supportNft.map((nft) => nft.toLowerCase());
        return userNFTs.filter(
            (nft) => lowNfts.indexOf(nft.address.toLowerCase()) >= 0
        );
    }, [userNFTs, supportNft]);

    const handleConfirm = () => {
        const nft = list[index];
        if (index < 0) return;
        onConfirm(nft);
    };
    return (
        <Drawer
            visible={visible}
            placement="right"
            onClose={onCancel}
            width={472}
            closable={false}
            title={
                <p className={s.title}>
                    <span>Select NFT to deposit</span>
                </p>
            }
            extra={
                <Space>
                    <div
                        className={cx(s.btn, { [s.disable]: index < 0 })}
                        onClick={handleConfirm}
                    >
                        Confirm
                    </div>
                </Space>
            }
        >
            {list.length < 1 && <Empty />}
            <Row gutter={[8, 8]}>
                {list.map((nft, idx) => {
                    return (
                        <Col key={`${nft.address}-${nft.id}`} span={8}>
                            <DepositCard
                                activeIdx={index}
                                index={idx}
                                data={nft}
                                onClick={(idx) =>
                                    handleSelect(index === idx ? -1 : idx)
                                }
                            />
                        </Col>
                    );
                })}
            </Row>
        </Drawer>
    );
});
