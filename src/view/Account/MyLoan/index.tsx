import { useEffect, useMemo, useState, useCallback } from "react";

import { Table, notification } from "antd";
import { observer } from "mobx-react";
import dayjs from "dayjs";
import { dateFormat, InterestRateMode } from "src/config";
import RepayModal from "src/components/RepayModal";
import { useStores } from "src/hooks";
import ETHImg from "src/asset/eth.svg";

import s from "./index.module.scss";
import cx from "classnames";
function LoanIcon() {
    return (
        <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.375 10.75H7.125V9.5H3.375V10.75Z"
                fill="black"
                fillOpacity="0.9"
            />
            <path
                d="M17.75 12V2C17.75 1.30964 17.1904 0.75 16.5 0.75H1.5C0.809644 0.75 0.25 1.30964 0.25 2V12C0.25 12.6904 0.809645 13.25 1.5 13.25H16.5C17.1904 13.25 17.75 12.6904 17.75 12ZM16.5 2V3.875H1.5V2H16.5ZM1.5 12V5.125H16.5V12H1.5Z"
                fill="black"
                fillOpacity="0.9"
            />
        </svg>
    );
}

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
                            <p>#{record.id}</p>
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
                        return <p>--</p>
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
                                s.repay,
                                data.canLiquidation ? s.disbaled : ""
                            )}
                            onClick={() => handleClickRepay(index, data)}
                        >
                            Repay
                        </div>
                    );
                },
            },
        ];
    }, [supportNFTs, handleClickRepay]);

    return (
        <div className={s.wrap}>
            <div className={s.head}>
                <p>
                    <LoanIcon />
                    <span>My Loan</span>
                </p>
            </div>
            <div className={s.list}>
                <Table
                    rowKey={RowKey}
                    columns={tabConfig}
                    dataSource={userBorrowList}
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
