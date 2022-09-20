import { useEffect, useMemo, useState, useCallback } from "react";

import { Table, notification } from "antd";
import { observer } from "mobx-react";
import dayjs from "dayjs";
import { dateFormat, InterestRateMode } from "src/config";
import RepayModal from "src/components/RepayModal";
import { useStores } from "src/hooks";
import ETHImg from "src/asset/eth.svg";
import depositModuleIcon from "src/asset/account/myloan.png";

import s from "./index.module.scss";
import cx from "classnames";
const RowKey = (x) => x.borrowId;

export default observer(function MyLoan() {
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
                    return (
                        <p>
                            {dayjs(+text * 1000).format(dateFormat)}{" "}
                            {otherData.rateMode}
                        </p>
                    );
                },
            },
            {
                title: "Total Repay≈",
                dataIndex: "repayAmount",
                render: (text) => {
                    return (
                        <div className={s.repayDetail}>
                            <img src={ETHImg} alt="" />
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
        <div className={s.wrap}>
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
            <div className={s.list}>
                <Table
                    className={s.table}
                    rowKey={RowKey}
                    columns={tabConfig}
                    dataSource={userBorrowList}
                    pagination={false}
                    loading={queryUserBorrowLoading || init}
                />
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
