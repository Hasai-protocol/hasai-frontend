import { useEffect, useMemo, useState, useCallback } from "react";

import { Table, notification, Spin } from "antd";
import { observer } from "mobx-react";
import dayjs from "dayjs";
import { dateFormat, InterestRateMode } from "src/config";
import RepayModal from "src/components/RepayModal";
import { useStores } from "src/hooks";
import ETHImg from "src/asset/eth.svg";
import depositModuleIcon from "src/asset/account/myloan.png";
import eIcon from "src/asset/ethereum-eth-logo1.png";

import s from "./index.module.scss";
import cx from "classnames";
const RowKey = (x) => x.borrowId;

export default observer(function MyLoan({ className, onMobile }) {
    const [index, setIndex] = useState(-1);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [init, setInit] = useState(true);

    const {
        store: {
            inited,
            supportNFTs,
            userBorrowList,
            walletAddress,
            queryUserLoanList,
            queryUserBorrowLoading,
            handleRepay,
            poolInfoInited,
        },
    } = useStores();

    useEffect(() => {
        if (
            !inited ||
            !walletAddress ||
            userBorrowList.length > 0 ||
            !poolInfoInited
        )
            return;

        queryUserLoanList();
        setInit(false);
    }, [inited, userBorrowList, walletAddress, queryUserLoanList, poolInfoInited]);

    const handleCancel = useCallback(() => {
        setIndex(-1);
        setVisible(false);
    }, []);
    const handleClickRepay = useCallback((index, data) => {
        console.log(index, JSON.parse(JSON.stringify(data)));
        if (data.canLiquidation) {
            return;
        }
        setIndex(index);
        setVisible(true);
    }, []);

    const handleConfirm = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        const nft = userBorrowList[index];
        if (!nft) {
            setLoading(false);
            return;
        }
        const result = await handleRepay(
            +nft.reserveId,
            nft.borrowId,
            nft.rawAmount
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
    }, [index, userBorrowList, loading, handleRepay]);

    const tabConfig = useMemo(() => {
        return [
            {
                title: "NFT",
                render: (_, record) => {
                    return (
                        <div className={s.tabItemHead}>
                            <img src={record.image} alt="" />
                            <div className={s.nftInfo}>
                                <p>{record.poolDetail.name}</p>
                                <p>#{record.id}</p>
                            </div>
                        </div>
                    );
                },
            },
            {
                title: "APR",
                dataIndex: "apr",
                render: (text, record) => {
                    return <p>{text}%</p>;
                },
            },
            {
                title: "Borrow Ends",
                dataIndex: "liquidateTime",
                render: (text, otherData) => {
                    if (+otherData.rateMode === InterestRateMode.Variable) {
                        return <p>--</p>;
                    }
                    return <p>{dayjs(+text * 1000).format(dateFormat)}</p>;
                },
            },
            {
                title: "Total Repay≈",
                dataIndex: "repayAmount",
                render: (text) => {
                    return (
                        <div className={s.repayDetail}>
                            <img src={eIcon} alt="" />
                            <p>{(+text).toFixed(2)}</p>
                        </div>
                    );
                },
            },
            {
                title: "Actions",
                render: (data, __, index) => {
                    return (
                        <div
                            className={cx(
                                "hasai-btn",
                                data.canLiquidation ? "disbaled" : ""
                            )}
                            onClick={() => handleClickRepay(index, data)}
                        >
                            <span className="gradualText">Repay</span>
                        </div>
                    );
                },
            },
        ];
    }, [supportNFTs, handleClickRepay]);

    return (
        <div className={cx("accountItemWarp", className)}>
            {!onMobile && (
                <div className={s.head}>
                    <p className="gradualText">
                        <img
                            src={depositModuleIcon}
                            className={s.depositModuleIcon}
                            alt=""
                        />
                        <span>My Loan</span>
                    </p>
                </div>
            )}
            <div className={s.list}>
                {!(queryUserBorrowLoading || init) &&
                    (userBorrowList.length === 0 ? (
                        <>
                            <div className={s.emptyLine}></div>
                            <p className={s.accountEmpty}>Nothing Loan yet</p>
                        </>
                    ) : !onMobile ? (
                        <Table
                            className={s.table}
                            rowKey={RowKey}
                            columns={tabConfig}
                            dataSource={userBorrowList}
                            pagination={false}
                            loading={queryUserBorrowLoading || init}
                        />
                    ) : (
                        <div className={s.mobileList}>
                            {userBorrowList.map((item, i) => (
                                <div className={s.mobileItem} key={i}>
                                    <div className={s.tabItemHead}>
                                        <img src={item.image} alt="" />
                                        <div className={s.nftInfo}>
                                            <p>{item.poolDetail.name}</p>
                                            <p>#{item.id}</p>
                                        </div>
                                    </div>
                                    <div className={s.infos}>
                                        <p>
                                            <span>APR</span>
                                            <span>{item.apr}%</span>
                                        </p>
                                        <p>
                                            <span>Borrow Ends</span>

                                            <span className={cx()}>
                                                {+item.rateMode ===
                                                InterestRateMode.Variable
                                                    ? "--"
                                                    : dayjs(
                                                          +item.liquidateTime *
                                                              1000
                                                      ).format(dateFormat)}
                                            </span>
                                        </p>
                                        <p>
                                            <span>Total Repay</span>
                                            <span className={cx()}>
                                                <img src={eIcon} />
                                                {item.repayAmount}
                                            </span>
                                        </p>
                                    </div>

                                    <div
                                        className={cx(
                                            "hasai-btn",
                                            item.canLiquidation
                                                ? "disbaled"
                                                : ""
                                        )}
                                        onClick={() =>
                                            handleClickRepay(i, item)
                                        }
                                    >
                                        <span className="gradualText">
                                            Repay
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                {(queryUserBorrowLoading || init) && (
                    <div className={s.accountEmpty}>
                        <Spin />
                    </div>
                )}
            </div>
            <RepayModal
                index={index}
                loading={loading}
                visible={visible}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </div>
    );
});
