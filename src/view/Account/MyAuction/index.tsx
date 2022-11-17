import { useEffect, useMemo, useState } from "react";

import { UnorderedListOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Table, Spin } from "antd";
import dayjs from "dayjs";

import BidHistory from "src/components/BidHistory";
import { useStores } from "src/hooks";
import ETHImg from "src/asset/eth.svg";

import s from "./index.module.scss";
import depositModuleIcon from "src/asset/account/myauction.png";
import cx from "classnames";
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

export default observer(function MyAuction({ className, onMobile }) {
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
        if (!inited || !walletAddress) return;
        queryUserAuctions();
    }, [inited, walletAddress, queryUserAuctions]);

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
        <div className={cx("accountItemWarp", className, s.myauction)}>
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
                {!loadingAuction &&
                    (userAuctionList.length === 0 ? (
                        <p className={s.accountEmpty}>Nothing Auction yet</p>
                    ) : !onMobile ? (
                        <Table
                            className={s.table}
                            rowKey={RowKey}
                            columns={tabConfig}
                            pagination={false}
                            dataSource={userAuctionList}
                            loading={loadingAuction}
                        />
                    ) : (
                        <div className={s.mobileList}>
                            {userAuctionList.map((item) => (
                                <div className={s.mobileItem}>
                                    <div className={s.tabItemHead}>
                                        <img src={item.image} alt="" />
                                        <div>
                                            <p>#{item.id}</p>
                                            <p>{item.name.split("#")[0]}</p>
                                        </div>
                                    </div>
                                    <div className={s.mobileContent}>
                                        <div>
                                            <p>Auction Ends</p>
                                            <p>
                                                {dayjs(
                                                    +item.endTime * 1000
                                                ).format(Format)}
                                            </p>
                                        </div>
                                        <div>
                                            <p>My Bid</p>
                                            <p>
                                                <div className={s.selfBid}>
                                                    <img src={ETHImg} alt="" />
                                                    <p>{item.selfBidAmount}</p>
                                                </div>
                                            </p>
                                        </div>
                                        <div>
                                            <p>Top Bid</p>
                                            <p>
                                                <div className={s.topBid}>
                                                    <img src={ETHImg} alt="" />
                                                    <p>
                                                        {(+item.bidAmount).toFixed(
                                                            3
                                                        )}
                                                    </p>
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                {loadingAuction && (
                    <p className={s.accountEmpty}>
                        <Spin />
                    </p>
                )}
            </div>
            <BidHistory
                data={hisData}
                visible={showHis}
                onClose={() => setShowHis(false)}
            />
        </div>
    );
});
