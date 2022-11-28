import { observer } from "mobx-react";
import { useParams, useNavigate } from "react-router-dom";
import { useStores } from "src/hooks";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Input, notification, Spin, Row, Col } from "antd";
import Empty from "src/components/empty";
import { Filter, Status } from "src/config";
import AuctionCard from "src/components/AuctionCard";
import NormalCard from "src/components/NormalCard";
import Sentinel from "src/components/Sentinel";
import s from "./index.module.scss";

enum Type {
    Auction,
    Normal,
}
const EmptyAry = [];

export default observer(function MemoLists({ reservesId, loadMore, filter }) {
    const nav = useNavigate();
    const {
        store: { loadingTargetList, poolDataConfig, isMobile },
    } = useStores();
    const handleClick = (type: Type, item) => {
        nav(
            `/${type === Type.Auction ? "auctions" : "liquidate"}/${
                item.address
            }/${item.id}/${item.borrowId}/${reservesId}`
        );
    };

    const conf = useMemo(() => {
        if (!poolDataConfig[reservesId!]) return EmptyAry;
        return poolDataConfig[reservesId!];
    }, [poolDataConfig, reservesId]);

    const displayTargetList = useMemo(() => {
        if (filter !== Filter.Pending) {
            const targetList = conf?.data;
            if (!targetList) return EmptyAry;
            const filterStatus =
                filter === Filter.Normal ? Status.BORROW : Status.AUCTION;
            return targetList.filter((nft) => {
                return nft.status === filterStatus;
            });
        } else {
            return [];
        }
    }, [conf, filter]);

    return (
        <div className={s.list}>
            {displayTargetList.length > 0 && (
                <Row gutter={[16, 16]}>
                    {displayTargetList.map((nft, index) => {
                        const { status } = nft;
                        if (status === Status.AUCTION) {
                            return (
                                <Col
                                    key={nft.borrowId}
                                    span={!isMobile ? 6 : 12}
                                >
                                    <AuctionCard
                                        index={index}
                                        data={nft as unknown as any}
                                        onClick={() =>
                                            handleClick(Type.Auction, nft)
                                        }
                                    />
                                </Col>
                            );
                        }
                        if (status === Status.BORROW) {
                            return (
                                <Col
                                    key={nft.borrowId}
                                    span={!isMobile ? 6 : 12}
                                >
                                    <NormalCard
                                        index={index}
                                        data={nft}
                                        onClick={() =>
                                            handleClick(Type.Normal, nft)
                                        }
                                    />
                                </Col>
                            );
                        }
                        return null;
                    })}
                </Row>
            )}
            {((displayTargetList.length < 1 && !loadingTargetList) ||
                !conf) && (
                <div className={s.emptyWrap}>
                    <Empty />
                </div>
            )}
            <div className={s.loadingWrap}>
                <Spin spinning={loadingTargetList} />
            </div>
            <Sentinel onload={loadMore} key={displayTargetList.length} />
        </div>
    );
});
