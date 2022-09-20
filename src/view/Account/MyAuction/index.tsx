import { useEffect, useMemo, useState } from "react";

import { UnorderedListOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Table } from "antd";
import dayjs from "dayjs";

import BidHistory from "src/components/BidHistory";
import { useStores } from "src/hooks";
import ETHImg from "src/asset/eth.svg";

import s from "./index.module.scss";
import depositModuleIcon from "src/asset/account/myauction.png";

function ViewIcon() {
    return (
        <svg
            width="14"
            height="5"
            viewBox="0 0 14 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.7929 3.99975L-8.74228e-08 3.99976L0 4.99976L12.9276 4.99975C13.3998 4.99975 13.6362 4.42884 13.3023 4.09497L9.35354 0.146373L8.64645 0.853496L11.7929 3.99975Z"
                fill="#34AAFF"
            />
        </svg>
    );
}

const RowKey = (x) => x.transactionHash;
const Format = "MMM DD hh:mma";

export default observer(function MyAuction() {
    const [showHis, setShowHis] = useState(false);
    const [hisData, setHisData] = useState<any>([]);
    const {
        store: {
            inited,
            userAuctionList,
            walletAddress,
            queryUserAuctions,
            loadingAuction,
            queryBidHistory,
            viewTransactionDetail,
        },
    } = useStores();

    useEffect(() => {
        if (!inited || !walletAddress || userAuctionList.length > 0) return;
        queryUserAuctions();
    }, [inited, userAuctionList, walletAddress, queryUserAuctions]);

    useEffect(() => {
        if (!inited || !walletAddress) return;
        (async () => {
            const data = await queryBidHistory("", walletAddress);
            setHisData(data);
        })();
    }, [inited, walletAddress, queryBidHistory]);

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
                title: "Auction Ends",
                dataIndex: "endTime",
                render: (text) => {
                    return <p>{dayjs(+text * 1000).format(Format)}</p>;
                },
            },
            {
                title: "My Bid",
                dataIndex: "selfBidAmount",
                render: (text) => {
                    return (
                        <div className={s.selfBid}>
                            <img src={ETHImg} alt="" />
                            <p>{text}</p>
                        </div>
                    );
                },
            },
            {
                title: "Top Bid",
                dataIndex: "bidAmount",
                render: (text) => {
                    return (
                        <div className={s.topBid}>
                            <img src={ETHImg} alt="" />
                            <p>{(+text).toFixed(3)}</p>
                        </div>
                    );
                },
            },
            {
                title: "Actions",
                render: (_, record) => {
                    return (
                        <div
                            className={s.view}
                            onClick={() =>
                                viewTransactionDetail(record.transactionHash)
                            }
                        >
                            View
                            <ViewIcon />
                        </div>
                    );
                },
            },
        ];
    }, [viewTransactionDetail]);

    return (
        <div className={s.wrap}>
            <div className={s.head}>
                <p className="gradualText">
                    <img
                        src={depositModuleIcon}
                        className={s.depositModuleIcon}
                        alt=""
                    />
                    <span>My Auction</span>
                </p>
                <div className={s.selfBidHis} onClick={() => setShowHis(true)}>
                    <UnorderedListOutlined />
                    <span>My Bids</span>
                </div>
            </div>
            <div className={s.list}>
                <Table
                    className={s.table}
                    rowKey={RowKey}
                    columns={tabConfig}
                    pagination={false}
                    dataSource={userAuctionList}
                    loading={loadingAuction}
                />
            </div>
            <BidHistory
                data={hisData}
                visible={showHis}
                onClose={() => setShowHis(false)}
            />
        </div>
    );
});
