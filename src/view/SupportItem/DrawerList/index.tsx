import { useEffect, useMemo, useState } from "react";

import { Drawer, Row, Col, Space, Modal } from "antd";
import Empty from "src/components/empty";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import cx from "classnames";
import closeIcon from "src/asset/colseIcon.png";
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
        store: { userNFTs, isMobile },
    } = useStores();
    const { id } = useParams<{ id: string }>();
    const list = useMemo(() => {
        if (!supportNft || userNFTs.length < 1) return [];
        let lowNfts = supportNft.map((nft) => nft.toLowerCase());
        return userNFTs.filter(
            (nft) => lowNfts.indexOf(nft.address.toLowerCase()) >= 0
        );
    }, [userNFTs, supportNft]);
    useEffect(() => {
        // when window on the Mobile ,Click and select immediately, but usestatue is a promise so need in callback do something
        if (isMobile) {
            handleConfirm();
        }
    }, [index]);
    const handleConfirm = () => {
        const nft = list[index];
        if (index < 0) return;
        onConfirm(nft);
    };
    const Items = () => {
        return (
            <>
                {list.length < 1 && (
                    <div className={s.emptyWarp}>
                        <Empty />
                    </div>
                )}
                <Row gutter={[8, 8]}>
                    {list.map((nft, idx) => {
                        return (
                            <Col
                                key={`${nft.address}-${nft.id}`}
                                span={isMobile ? 12 : 8}
                            >
                                <DepositCard
                                    activeIdx={index}
                                    index={idx}
                                    data={nft}
                                    onClick={(idx) => {
                                        if (isMobile) {
                                            handleSelect(
                                                index === idx ? -1 : idx
                                            );
                                        } else {
                                            handleSelect(
                                                index === idx ? -1 : idx
                                            );
                                        }
                                    }}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </>
        );
    };
    return (
        <>
            {!isMobile && (
                <Drawer
                    visible={visible}
                    placement="right"
                    onClose={onCancel}
                    // className={s.warp}
                    className="drawWarp"
                    width={472}
                    closable={false}
                    title={
                        <p className={s.title}>
                            My NFT<span>Select NFT to deposit</span>
                        </p>
                    }
                    extra={
                        <Space>
                            <div
                                className={cx(s.btn, {
                                    [s.disable]: index < 0,
                                })}
                                onClick={() => {
                                    handleConfirm();
                                }}
                            >
                                Confirm
                            </div>
                        </Space>
                    }
                >
                    <Items />
                </Drawer>
            )}
            {isMobile && (
                <Modal
                    centered
                    footer={null}
                    visible={visible}
                    className={s.borrowWarp}
                    onCancel={onCancel}
                    title={
                        <div className={cx(s.title, s.ModalTitle)}>
                            <div className={s.left}>
                                <span className="gradualText">My NFT</span>
                            </div>
                        </div>
                    }
                    closeIcon={<img src={closeIcon} />}
                >
                    <Items />
                </Modal>
            )}
        </>
    );
});
