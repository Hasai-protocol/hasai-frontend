import { useEffect, useState, useCallback } from "react";

import { Row, Col, Spin, Empty, notification } from "antd";
import { observer } from "mobx-react";
import cx from "classnames";

import SelfNFTImg from "src/asset/account/self-nft.svg";
import BorrowModal from "src/components/BorrowModal";
import Card from "src/components/Card";
import { useStores } from "src/hooks";

import depositModuleIcon from "src/asset/account/mynft.png";
import s from "./index.module.scss";

function DepositIcon() {
    return (
        <svg
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.31224 2.47706C1.03955 2.75033 0.933333 3.00449 0.933333 3.23077C0.933333 3.45704 1.03955 3.71121 1.31224 3.98448C1.58691 4.25973 2.0075 4.52878 2.56406 4.76469C3.67554 5.2358 5.24356 5.53846 7 5.53846C8.75644 5.53846 10.3245 5.2358 11.4359 4.76469C11.9925 4.52878 12.4131 4.25973 12.6878 3.98448C12.9605 3.71121 13.0667 3.45704 13.0667 3.23077C13.0667 3.00449 12.9605 2.75033 12.6878 2.47706C12.4131 2.20181 11.9925 1.93276 11.4359 1.69685C10.3245 1.22574 8.75644 0.923077 7 0.923077C5.24356 0.923077 3.67554 1.22574 2.56406 1.69685C2.0075 1.93276 1.58691 2.20181 1.31224 2.47706ZM2.19641 0.848407C3.44954 0.317253 5.14818 0 7 0C8.85182 0 10.5505 0.317253 11.8036 0.848407C12.4293 1.11363 12.9655 1.4413 13.3521 1.82866C13.7406 2.218 14 2.69234 14 3.23077C14 3.7692 13.7406 4.24354 13.3521 4.63288C12.9655 5.02024 12.4293 5.34791 11.8036 5.61313C10.5505 6.14429 8.85182 6.46154 7 6.46154C5.14818 6.46154 3.44954 6.14429 2.19641 5.61313C1.57067 5.34791 1.03448 5.02024 0.64794 4.63288C0.25942 4.24354 0 3.7692 0 3.23077C0 2.69234 0.25942 2.218 0.64794 1.82866C1.03448 1.4413 1.57067 1.11363 2.19641 0.848407ZM2.56406 7.53392C3.67554 8.00503 5.24356 8.30769 7 8.30769C8.75644 8.30769 10.3245 8.00503 11.4359 7.53392C11.9925 7.29801 12.4131 7.02896 12.6878 6.75371C12.9605 6.48044 13.0667 6.22628 13.0667 6H14C14 6.53843 13.7406 7.01277 13.3521 7.40211C12.9655 7.78947 12.4293 8.11714 11.8036 8.38236C10.5505 8.91352 8.85182 9.23077 7 9.23077C5.14818 9.23077 3.44954 8.91352 2.19641 8.38236C1.57067 8.11714 1.03448 7.78947 0.64794 7.40211C0.25942 7.01277 0 6.53843 0 6H0.933333C0.933333 6.22628 1.03955 6.48044 1.31224 6.75371C1.58691 7.02896 2.0075 7.29801 2.56406 7.53392ZM7 11.0769C5.24356 11.0769 3.67554 10.7743 2.56406 10.3032C2.0075 10.0672 1.58691 9.79819 1.31224 9.52294C1.03955 9.24967 0.933333 8.99551 0.933333 8.76923H0C0 9.30766 0.25942 9.782 0.64794 10.1713C1.03448 10.5587 1.57067 10.8864 2.19641 11.1516C3.44954 11.6827 5.14818 12 7 12C8.85182 12 10.5505 11.6827 11.8036 11.1516C12.4293 10.8864 12.9655 10.5587 13.3521 10.1713C13.7406 9.782 14 9.30766 14 8.76923H13.0667C13.0667 8.99551 12.9605 9.24967 12.6878 9.52294C12.4131 9.79819 11.9925 10.0672 11.4359 10.3032C10.3245 10.7743 8.75644 11.0769 7 11.0769Z"
                fill="black"
                fillOpacity="0.9"
            />
        </svg>
    );
}

export default observer(function MyNFT({ className, onMobile }) {
    const [index, setIndex] = useState(-1);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        store: {
            inited,
            userNFTs,
            walletAddress,
            queryUserNFT,
            handleBorrow,
            queryUserNFTLoading,
            nftHexMap,
        },
    } = useStores();

    useEffect(() => {
        if (!inited || !walletAddress) return;
        queryUserNFT();
    }, [inited, walletAddress, queryUserNFT]);

    const handleCancel = useCallback(() => {
        setIndex(-1);
        setVisible(false);
    }, []);

    const handleClickDeposit = useCallback(() => {
        if (index < 0) return;
        setVisible(true);
    }, [index]);
    const borrow = (n) => {
        setIndex(n);
        setVisible(true);
    };
    const handleConfirm = async (lending) => {
        if (loading) return;
        setLoading(true);
        const nft = userNFTs[index];
        if (!nft) {
            setLoading(false);
            return;
        }
        const result = await handleBorrow(
            nftHexMap[nft.address].id,
            nft.address,
            nft.id,
            lending
        );
        setLoading(false);
        if (result) {
            notification.success({
                message: "Hasai",
                description: "Transaction done.",
            });
            setIndex(-1);
            setVisible(false);
        } else {
            notification.error({
                message: "Hasai",
                description: "Transaction failed.",
            });
        }
    };

    return (
        <div className={cx("accountItemWarp", className)}>
            {!onMobile && (
                <div className={s.head}>
                    <p className="gradualText">
                        <img
                            src={depositModuleIcon}
                            alt=""
                            className={s.depositModuleIcon}
                        />
                        <span>My NFT</span>
                    </p>
                    {userNFTs.length > 0 && (
                        <div
                            className={cx(s.btn, { [s.disable]: index < 0 })}
                            onClick={handleClickDeposit}
                        >
                            <DepositIcon />
                            Borrow
                        </div>
                    )}
                </div>
            )}
            {queryUserNFTLoading && (
                <div className={s.loadingWrap}>
                    <Spin />
                </div>
            )}
            <div className={s.list}>
                {userNFTs.length < 1 && !queryUserNFTLoading && (
                    <>
                    <div className={s.emptyLine}></div>
                        <p className={s.accountEmpty}>Nothing to Loan yet</p>
                    </>
                )}
                <Row gutter={[16, 16]}>
                    {userNFTs.map((nft, idx) => {
                        return (
                            <Col
                                key={`${nft.address}-${nft.id}`}
                                span={onMobile ? 12 : 6}
                            >
                                <Card
                                    slot={
                                        onMobile ? (
                                            <div
                                                className={cx(
                                                    "hasai-btn",
                                                    s.button
                                                )}
                                                onClick={() => borrow(idx)}
                                            >
                                                <span className={"gradualText"}>
                                                    Borrow
                                                </span>
                                            </div>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    activeIdx={onMobile ? -1 : index}
                                    index={idx}
                                    data={nft}
                                    onClick={setIndex}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <BorrowModal
                index={index}
                loading={loading}
                visible={visible}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </div>
    );
});
