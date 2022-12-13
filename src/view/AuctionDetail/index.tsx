import { useEffect, useMemo, useState } from "react";

import { LoadingOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { InputNumber, notification, Tooltip, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import cx from "classnames";
import dayjs from "dayjs";

import BidHistory from "src/components/BidHistory";
import DefaultImg from "src/asset/broken-img.svg";
import TimeImg from "src/asset/time.svg";
import TipsImg from "src/asset/tips.svg";
import ETHImg from "src/asset/eth.svg";
import { useStores } from "src/hooks";
import { sliceNumStr } from "src/util";

import s from "./index.module.scss";

export default observer(function AuctionDetail() {
    const [bidPrice, setBidPrice] = useState("");
    const [showHis, setShowHis] = useState(false);
    const [hisData, setHisData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [countDown, setCountDown] = useState("0h 0m 0s");
    const { id, nft, auctionId, reservesId } = useParams() as {
        auctionId: string;
        nft: string;
        id: string;
        reservesId: string;
    };
    const {
        store: {
            blockTimeStamp,
            utcTimeStamp,
            auction,
            createBid,
            inited,
            walletAddress,
            queryBidHistory,
            handleClaimBidNFT,
            queryAuctionDetail,
            loadingAuctionDetail,
            nftHexMap,
            isMobile,
        },
    } = useStores();
    const nav = useNavigate();

    const isEnd = useMemo(() => {
        if (!auction.endTime) return false;
        return blockTimeStamp * 1000 >= auction.endTime;
    }, [auction, blockTimeStamp]);

    const isWinner = useMemo(() => {
        if (auction.bidder !== walletAddress) return false;
        if (!isEnd) return false;
        return true;
    }, [walletAddress, isEnd, auction]);

    const disable = useMemo(() => {
        if (isLoading) return true;
        if (isWinner) return false;
        if (auction.amount) {
            return +bidPrice <= +auction.amount;
        }
        return false;
    }, [isLoading, bidPrice, auction, isWinner]);

    useEffect(() => {
        if (isEnd && auction.amount) {
            setBidPrice(auction.amount);
        }
    }, [isEnd, auction]);

    useEffect(() => {
        if (!auction.endTime || !utcTimeStamp) return;
        const endTime = auction.endTime;

        if (endTime < utcTimeStamp) return;

        const duration = dayjs.duration(endTime - utcTimeStamp);
        const days = duration.days();
        const hours = duration.hours() + days * 24;
        const mins = duration.minutes();
        const secs = duration.seconds();

        const txt = `${hours}h ${mins}m ${secs}s`;

        setCountDown(txt);
    }, [auction, utcTimeStamp]);

    useEffect(() => {
        if (!inited) return;
        queryAuctionDetail(nft, id, auctionId);
    }, [inited, id, nft, auctionId, queryAuctionDetail]);
    const bannerImg = useMemo(() => {
        return nftHexMap[nft]?.banner_image_url;
    }, [nftHexMap, nft]);
    useEffect(() => {
        if (!inited) return;
        (async () => {
            const data = await queryBidHistory(auctionId);
            setHisData(data);
        })();
    }, [inited, auctionId, queryBidHistory]);

    const handleInput = (value: number | string | null) => {
        const [int, float] = (value ? `${value}` : "").split(".");
        let price = value;
        if (float && float.length > 17) {
            price = [+int < 0 ? 0 : int, float.slice(0, 17)].join(".");
        }
        setBidPrice(`${price}`);
    };

    const handleConfirm = async () => {
        if (disable) return;
        setIsLoading(true);
        let result = false;
        if (isWinner) {
            result = await handleClaimBidNFT(auctionId, reservesId);
        } else {
            result = await createBid(reservesId, auctionId, +bidPrice);
        }
        setIsLoading(false);
        if (result) {
            return notification.success({
                message: "Hasai",
                description: "Transaction done.",
                onClose: () => setBidPrice(""),
                onClick: () => setBidPrice(""),
            });
        }
        notification.error({
            message: "Hasai",
            description: "Transaction failed.",
        });
    };

    const goUpPage = () => {
        nav("/markets");
    };
    if (loadingAuctionDetail) {
        return (
            <div className={s.emptyWrap}>
                <Spin spinning />
            </div>
        );
    }

    return (
        <div className={s.wrap}>
            <div className={s.backBtn} onClick={goUpPage}></div>
            <div
                className={s.bannerImgWarp}
                style={{ backgroundImage: `url(${bannerImg})` }}
            >
                <div className={s.bannerFilter}></div>
            </div>
            <div className={s.content}>
                <div className={s.img}>
                    <img src={auction.nftImg || DefaultImg} alt="" />
                </div>
                <div className={s.bottom}>
                    <div className={s.nftInfo}>
                        <p className={s.id}>#{auction.nftId}</p>
                        <div
                            className={s.bidHis}
                            onClick={() => setShowHis(true)}
                        >
                            <UnorderedListOutlined />
                            Bids History
                        </div>
                    </div>
                    <div className={cx(s.mobileData)}>
                        <div className={s.title}>Top bid</div>
                        <div className={s.data}>
                            <img src={ETHImg} alt="" />
                            <span>{sliceNumStr(auction.amount, 18)}</span>
                        </div>
                    </div>
                    <div className={cx(s.mobileData, s.secondMobileData)}>
                        <div className={s.title}>Auction ends in</div>
                        <div className={s.data}>
                            <img src={TimeImg} alt="count down" />
                            <span>{countDown}</span>
                        </div>
                    </div>
                    <div className={s.bidInput}>
                        <InputNumber
                            min={auction.amount}
                            placeholder={`greater than ${
                                auction?.amount || ""
                            }`}
                            stringMode
                            value={bidPrice}
                            onChange={handleInput}
                            disabled={isEnd}
                            maxLength={20}
                            className={cx(s.input, {
                                [s.inputDisabled]: isEnd,
                            })}
                        />
                    </div>
                    <div
                        className={cx(s.btn, { [s.disable]: disable })}
                        onClick={handleConfirm}
                    >
                        {isLoading && <LoadingOutlined />}
                        {isWinner ? "Claim NFT" : "Place Bid"}
                    </div>
                </div>
            </div>
            <BidHistory
                data={hisData}
                visible={showHis}
                onClose={() => setShowHis(false)}
            />
        </div>
    );
});
