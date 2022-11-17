import { useEffect, useState, useCallback, useMemo } from "react";

import { Row, Col, Spin, Empty, notification, Table } from "antd";
import { observer } from "mobx-react";
import cx from "classnames";

// import SelfNFTImg from "src/asset/account/self-nft.svg";
// import DepositModal from "src/components/DepositModal";
// import Card from "src/components/Card";
import { useStores } from "src/hooks";
import depositModuleIcon from "src/asset/account/mydeposit.png";
import s from "./index.module.scss";
import WithdrawEth from "src/components/withdrawEth";
import SharePoolAvator from "src/components/sharedPoolAvator";

import eIcon from "src/asset/ethereum-eth-logo1.png";
export default observer(function MyNFT({ className, onMobile }) {
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
            nftHexMap,
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
                return (
                    <div className={s.depositTop}>
                        {record.poolType > 1 ? (
                            <SharePoolAvator
                                size="mini"
                                className={s.middleAvator}
                            />
                        ) : (
                            <img
                                className={s.avator}
                                src={nftHexMap[record?.nfts[0]]?.image_url}
                                alt=""
                            />
                        )}
                        {_}
                    </div>
                );
            },
        },
        {
            title: "APR",
            dataIndex: "apy",
            render: (text) => {
                return <span className={s.cellWidth}> {text}%</span>;
            },
        },
        {
            title: "Balance",
            dataIndex: "totalRewardForEth",
            render: (text) => {
                return (
                    <span className={cx(s.acountWarp, s.cellWidth)}>
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
                    <div
                        className={cx("hasai-btn")}
                        onClick={() => Withdraw(data)}
                    >
                        <span className={"gradualText"}>Withdraw</span>
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <div className={cx("accountItemWarp", s.mydepositWarp, className)}>
                <div className={s.head}>
                    <p className="gradualText">
                        <img
                            src={depositModuleIcon}
                            className={s.depositModuleIcon}
                            alt=""
                        />
                        <span>My Deposit</span>
                    </p>
                </div>
                <div className={s.list}>
                    {!(queryDepositListLoading || init) &&
                        (depositList.length === 0 ? (
                            <p className={s.accountEmpty}>
                                Nothing Deposit yet
                            </p>
                        ) : !onMobile ? (
                            <Table
                                className={s.table}
                                rowKey={RowKey}
                                columns={tabConfig}
                                pagination={false}
                                dataSource={depositList}
                                loading={queryDepositListLoading || init}
                            />
                        ) : (
                            <div className={s.mobileList}>
                                {depositList.map((item) => (
                                    <div className={s.mobileItem}>
                                        <div className={s.depositTop}>
                                            {item.poolType > 1 ? (
                                                <SharePoolAvator
                                                    size="mini"
                                                    className={s.middleAvator}
                                                />
                                            ) : (
                                                <img
                                                    className={s.avator}
                                                    src={
                                                        nftHexMap[item?.nfts[0]]
                                                            ?.image_url
                                                    }
                                                    alt=""
                                                />
                                            )}
                                            {item.nftName}
                                        </div>
                                        <div className={s.infos}>
                                            <p>
                                                <span>APR</span>
                                                <span className={s.cellWidth}>
                                                    {item.apy}%
                                                </span>
                                            </p>
                                            <p>
                                                <span>Balance</span>

                                                <span
                                                    className={cx(
                                                        s.acountWarp,
                                                        s.cellWidth
                                                    )}
                                                >
                                                    <img src={eIcon} />
                                                    {item.totalRewardForEth}
                                                </span>
                                            </p>
                                        </div>
                                        <div
                                            className={cx("hasai-btn")}
                                            onClick={() => Withdraw(item)}
                                        >
                                            <span className={"gradualText"}>
                                                Withdraw
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    {(queryDepositListLoading || init) && (
                        <p className={s.accountEmpty}>
                            <Spin />
                        </p>
                    )}
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
