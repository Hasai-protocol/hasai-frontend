import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { InputNumber, notification, Spin, Tooltip } from "antd";
import TipsImg from "src/asset/tips.svg";
import heart from "src/asset/HealthFactor.png";

import { observer } from "mobx-react";
import cx from "classnames";
import dayjs from "dayjs";

import DefaultImg from "src/asset/broken-img.svg";
import TimeImg from "src/asset/time.svg";
import ethImg from "src/asset/ethereum-eth-logo1.png";
import { useStores } from "src/hooks";
import { Status, InterestRateMode } from "src/config";

import s from "./index.module.scss";

export default observer(function Liquidation() {
    const [bidPrice, setBidPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [countDown, setCountDown] = useState("0h 0m 0s");
    const { id, nft, borrowId, reservesId } = useParams() as {
        borrowId: string;
        nft: string;
        id: string;
        reservesId: string;
    };
    const {
        store: {
            blockTimeStamp,
            utcTimeStamp,
            borrowInfo,
            handleLiquidation,
            inited,
            queryBorrowInfo,
            loadingBorrowInfo,
            nftHexMap,
            poolInfoInited,
        },
    } = useStores();

    const nav = useNavigate();

    useEffect(() => {
        if (!borrowInfo.liquidateTime || !utcTimeStamp) return;
        const endTime = borrowInfo.liquidateTime;

        if (endTime < utcTimeStamp) return;

        const duration = dayjs.duration(endTime - utcTimeStamp);
        const days = duration.days();
        const hours = duration.hours() + days * 24;
        const mins = duration.minutes();
        const secs = duration.seconds();

        const txt = `${hours}h ${mins}m ${secs}s`;

        setCountDown(txt);
    }, [borrowInfo, utcTimeStamp]);

    useEffect(() => {
        if (!inited || !poolInfoInited) return;
        queryBorrowInfo(nft, id, borrowId);
    }, [inited, id, nft, borrowId, queryBorrowInfo, poolInfoInited]);

    const isInAuction = useMemo(() => {
        return borrowInfo.status === Status.AUCTION;
    }, [borrowInfo]);
    const isExpired = useMemo(() => {
        if (!borrowInfo.liquidateTime) return false;
        const { liquidateTime, rateMode, variableNumber } = borrowInfo;
        if (+rateMode === InterestRateMode.stableDebt) {
            return blockTimeStamp * 1000 >= liquidateTime;
        } else {
            return variableNumber < 1;
        }
    }, [blockTimeStamp, borrowInfo]);
    const bannerImg = useMemo(() => {
        return nftHexMap[nft]?.banner_image_url;
    }, [nftHexMap, nft]);
    const stableMode = useMemo(() => {
        if (!borrowInfo.rateMode) return;
        return borrowInfo.rateMode === InterestRateMode.stableDebt;
    }, [borrowInfo]);
    const disable = useMemo(() => {
        if (isInAuction) return true;

        if (isExpired && borrowInfo.rateMode === InterestRateMode.Variable) {
            return +(bidPrice || 0) < borrowInfo.amount;
        }
        if (borrowInfo.liquidateTime) {
            if (blockTimeStamp * 1000 >= borrowInfo.liquidateTime) {
                return +(bidPrice || 0) < borrowInfo.amount;
            }
            return true;
        }
        return true;
    }, [bidPrice, blockTimeStamp, borrowInfo, isInAuction, isExpired]);

    const handleInput = (value: number | string | null) => {
        const [int, float] = (value ? `${value}` : "").split(".");
        let price = value;
        if (float && float.length > 17) {
            price = [+int < 0 ? 0 : int, float.slice(0, 17)].join(".");
        }
        setBidPrice(`${price}`);
    };

    const handleConfirm = async () => {
        if (disable || isLoading) return;
        setIsLoading(true);
        const result = await handleLiquidation(reservesId, borrowId, +bidPrice);
        setIsLoading(false);
        if (result) {
            return notification.success({
                message: "Hasai",
                description: "Transaction done.",
                onClose: () =>
                    nav(`/auctions/${nft}/${id}/${borrowId}/${reservesId}`),
                onClick: () =>
                    nav(`/auctions/${nft}/${id}/${borrowId}/${reservesId}`),
            });
        }
        notification.error({
            message: "Hasai",
            description: "Transaction failed.",
        });
    };

    if (loadingBorrowInfo) {
        return (
            <div className={s.emptyWrap}>
                <Spin spinning />
            </div>
        );
    }

    return (
        <div className={s.wrap}>
            <div
                className={s.bannerImgWarp}
                style={{ backgroundImage: `url(${bannerImg})` }}
            >
                <div className={s.bannerFilter}></div>
                {/* <img src={bannerImg} className={s.bannerImg} /> */}
            </div>
            <div className={s.content}>
                <div className={s.img}>
                    <img src={borrowInfo.image || DefaultImg} alt="" />
                </div>
                <div className={s.bottom}>
                    <div className={s.nftInfo}>
                        <p className={s.name}>#{borrowInfo.id}</p>
                        <div className={cx(s.InfoWarp, s.otherInfo)}>
                            <span className={s.typeTitle}>
                                The starting price
                            </span>
                            <img src={ethImg} alt="" />
                            <span className={s.price}>
                                {borrowInfo.repayAmount.toFixed(6)}
                            </span>
                        </div>
                    </div>
                    <div className={cx(s.nftInfo, s.priceInfo)}>
                        <div className={s.bidHis}>
                            <UnorderedListOutlined />
                            Bids History
                        </div>
                        {stableMode ? (
                            <>
                                <div className={s.InfoWarp}>
                                    <span className={s.typeTitle}>
                                        Stable Rate Loan Expire Before
                                    </span>
                                    <img src={TimeImg} alt="count down" />
                                    <span className={s.timeTxt}>
                                        {countDown}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className={s.InfoWarp}>
                                <span className={s.typeTitle}>
                                    Variable Rate- Health Factor
                                </span>
                                <img src={heart} alt="" />
                                <span className={s.variableNumber}>
                                    {borrowInfo.variableNumber}
                                </span>
                                {/* <Tooltip
                                    title={`A liquidation is a process that occurs when a borrower's health factor goes below 1 due to their collateral value not properly covering their loan/debt value.`}
                                >
                                    <img src={TipsImg} alt="tips" />
                                </Tooltip> */}
                            </div>
                        )}
                    </div>
                    <div className={s.bidInput}>
                        <InputNumber
                            stringMode
                            size="large"
                            maxLength={20}
                            placeholder={`greater than ${borrowInfo.repayAmount}`}
                            value={bidPrice}
                            onChange={handleInput}
                            disabled={!isExpired || isInAuction}
                            className={cx(s.input, {
                                [s.inputDisabled]: !isExpired || isInAuction,
                            })}
                        />
                    </div>
                    <div
                        className={cx(s.btn, { [s.disable]: disable })}
                        onClick={handleConfirm}
                    >
                        {isLoading && <LoadingOutlined />}
                        Liquidate
                    </div>
                </div>
            </div>
        </div>
    );
});
