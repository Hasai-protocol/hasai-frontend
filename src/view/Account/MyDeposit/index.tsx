import { useEffect, useState, useCallback, useMemo } from "react";

import { Row, Col, Spin, Empty, notification, Table } from "antd";
import { observer } from "mobx-react";
import cx from "classnames";

import SelfNFTImg from "src/asset/account/self-nft.svg";
import DepositModal from "src/components/DepositModal";
import Card from "src/components/Card";
import { useStores } from "src/hooks";
import depositModuleIcon from "src/asset/depositModuleIcon.png";
import s from "./index.module.scss";
import WithdrawEth from "src/components/withdrawEth";
import eIcon from "src/asset/eicon.png";

export default observer(function MyNFT() {
    const [showWithdraw, setShow] = useState(false);
    const [init, setInit] = useState(true);
    const [withdrawInfo, setWithDraw] = useState({});
    const {
        store: {
            queryDepositList,
            queryDepositListLoading,
            walletAddress,
            inited,
            poolList,
            depositList,
        },
    } = useStores();

    useEffect(() => {
        if (!inited || !walletAddress || !poolList.length) return;
        queryDepositList();
    }, [inited, walletAddress, queryDepositList, poolList]);
    // setInit
    useEffect(() => {
        if (queryDepositListLoading) {
            setInit(false);
        }
    }, [queryDepositListLoading]);
    const RowKey = (x) => x.id;
    const Withdraw = (data) => {
        setWithDraw(data);
        setShow(true);
    };
    const tabConfig = [
        {
            title: "Collection",
            dataIndex: "nftName",
            render: (_, record) => {
                return <div>{_}</div>;
            },
        },
        {
            title: "APR",
            dataIndex: "apy",
            render: (text) => {
                return `${text}%`;
            },
        },
        {
            title: "Total principal and interest",
            dataIndex: "totalRewardForEth",
            render: (text) => {
                return (
                    <span className={s.acountWarp}>
                        <img src={eIcon} />
                        {text}
                    </span>
                );
            },
        },
        {
            title: "",
            render: (data) => {
                return (
                    <span onClick={() => Withdraw(data)} className={s.withdraw}>
                        Withdraw
                    </span>
                );
            },
        },
    ];
    return (
        <>
            <div className={s.wrap}>
                <div className={s.head}>
                    <p>
                        <img
                            src={depositModuleIcon}
                            className={s.depositModuleIcon}
                            alt=""
                        />
                        <span>My Deposit</span>
                    </p>
                </div>
                <div className={s.list}>
                    <Table
                        rowKey={RowKey}
                        columns={tabConfig}
                        dataSource={depositList}
                        loading={queryDepositListLoading || init}
                    />
                </div>
            </div>
            <WithdrawEth
                onCancel={() => {
                    setShow(false);
                }}
                visible={showWithdraw}
                info={withdrawInfo}
            />
        </>
    );
});
