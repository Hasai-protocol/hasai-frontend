import { useEffect, useMemo, useState } from "react";

import { Drawer, Empty, Row, Col, Space, Modal } from "antd";
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

    const handleConfirm = () => {
        const nft = list[index];
        if (index < 0) return;
        onConfirm(nft);
    };
    const Items = () => {
        return (
            <>
                {list.length < 1 && <Empty />}
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
                                        handleSelect(index === idx ? -1 : idx);
                                        handleConfirm();
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
                                onClick={handleConfirm}
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
                                My NFT
                                {/* <span>Select NFT to borrow</span> */}
                            </div>
                            {/* <div
                                className={cx(s.btn, {
                                    [s.disable]: index < 0,
                                })}
                                onClick={handleConfirm}
                            >
                                Confirm
                            </div> */}
                        </div>
                    }
                    closeIcon={<img src={closeIcon} />}
                    // width={345}
                >
                    <Items />
                </Modal>
            )}
        </>
    );
});
