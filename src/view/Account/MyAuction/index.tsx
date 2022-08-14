import { useEffect, useMemo, useState } from "react";

import { UnorderedListOutlined } from '@ant-design/icons';
import { observer } from "mobx-react";
import { Table } from "antd";
import dayjs from "dayjs";

import BidHistory from "src/components/BidHistory";
import { useStores } from "src/hooks";
import ETHImg from 'src/asset/eth.svg';


import s from "./index.module.scss";

function AuctionIcon() {
    return (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.0945 1.18732C9.82284 0.91571 9.82284 0.475345 10.0945 0.203737C10.3661 -0.0678717 10.8064 -0.0678716 11.078 0.203737L15.9959 5.12164C16.2675 5.39325 16.2675 5.83362 15.9959 6.10523C15.7243 6.37683 15.284 6.37683 15.0124 6.10523L10.0945 1.18732ZM0.991785 9.99179C0.720177 9.72019 0.720177 9.27982 0.991785 9.00821C1.26339 8.7366 1.70376 8.7366 1.97537 9.00821L6.89327 13.9261C7.16488 14.1977 7.16488 14.6381 6.89327 14.9097C6.62167 15.1813 6.1813 15.1813 5.90969 14.9097L0.991785 9.99179ZM11.3118 9.48278L10.3282 10.4664L15.9118 16.0499C16.1834 16.3216 16.6237 16.3216 16.8954 16.0499C17.167 15.7783 17.167 15.338 16.8954 15.0664L11.3118 9.48278ZM0.620151 19C0.277651 19 0 18.7224 0 18.3799C0 18.0374 0.277651 17.7597 0.620151 17.7597H8.06197C8.40447 17.7597 8.68212 18.0374 8.68212 18.3799C8.68212 18.7224 8.40447 19 8.06197 19H0.620151ZM4.01444 8.49947L9.34387 3.17003L12.7061 6.5323L7.37671 11.8617L4.01444 8.49947ZM2.4588 8.49947L3.23662 7.72165L8.56606 2.39221L9.34387 1.6144L10.1217 2.39221L13.484 5.75449L14.2618 6.5323L13.484 7.31012L8.15453 12.6396L7.37671 13.4174L6.59889 12.6396L3.23662 9.27728L2.4588 8.49947Z" fill="black"/>
        </svg>
    );
}

function ViewIcon() {
    return (
        <svg width="14" height="5" viewBox="0 0 14 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7929 3.99975L-8.74228e-08 3.99976L0 4.99976L12.9276 4.99975C13.3998 4.99975 13.6362 4.42884 13.3023 4.09497L9.35354 0.146373L8.64645 0.853496L11.7929 3.99975Z" fill="#1A68FF"/>
        </svg>
    );
}

const RowKey = x => x.transactionHash;
const Format = 'MMM DD hh:mma';

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
            viewTransactionDetail
        },
    } = useStores();

    useEffect(() => {
        if (!inited || !walletAddress || userAuctionList.length > 0) return;
        queryUserAuctions();
    }, [inited, userAuctionList, walletAddress, queryUserAuctions]);

    useEffect(() => {
        if (!inited || !walletAddress) return;
        (async () => {
            const data = await queryBidHistory('', walletAddress);
            setHisData(data);
        })();
    }, [inited, walletAddress, queryBidHistory]);

    const tabConfig = useMemo(() => {
        return [
            {
                title: 'NFT',
                render: (_, record) => {
                    return (
                        <div className={s.tabItemHead}>
                            <img src={record.image} alt='' />
                            <p>#{record.id}</p>
                        </div>
                    );
                }
            },
            {
                title: 'Auction Ends',
                dataIndex: 'endTime',
                render: (text) => {
                    return <p>{dayjs(+text * 1000).format(Format)}</p>
                }
            },
            {
                title: 'My Bid',
                dataIndex: 'selfBidAmount',
                render: (text) => {
                    return (
                        <div className={s.selfBid}>
                            <img src={ETHImg} alt='' />
                            <p>{text}</p>
                        </div>
                    );
                }
            },
            {
                title: 'Top Bid',
                dataIndex: 'bidAmount',
                render: (text) => {
                    return (
                        <div className={s.topBid}>
                            <img src={ETHImg} alt='' />
                            <p>{(+text).toFixed(2)}</p>
                        </div>
                    )
                }
            },
            {
                title: 'Actions',
                render: (_, record) => {
                    return <div
                        className={s.view}
                        onClick={() => viewTransactionDetail(record.transactionHash)}
                    >
                        View
                        <ViewIcon />
                    </div>
                }
            }
        ];
    }, [viewTransactionDetail]);

    return (
        <div className={s.wrap}>
            <div className={s.head}>
                <p>
                    <AuctionIcon />
                    <span>My Auction</span>
                </p>
                <div className={s.selfBidHis} onClick={() => setShowHis(true)}>
                    <UnorderedListOutlined />
                    <span>My Bids</span>
                </div>
            </div>
            <div className={s.list}>
                <Table
                    rowKey={RowKey}
                    columns={tabConfig}
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
