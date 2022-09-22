import { useState, useEffect } from "react";

import { observer } from "mobx-react";
import dayjs from "dayjs";

import BrokenImg from "src/asset/broken-img.svg";
import TimeImg from "src/asset/time.svg";
import ETHImg from "src/asset/eth.svg";
import { useStores } from "src/hooks";
import { formatEther } from "src/util";

import s from "./index.module.scss";

export default observer(function AuctionCard({
    data: { id, name, image, amount, endTime },
    index,
    onClick,
}: {
    index: number;
    data: {
        id: string;
        name: string;
        image: string;
        address: string;
        endTime: number;
        amount: number;
    };
    onClick: (index: number) => void;
}) {
    const [countDown, setCountDown] = useState("0h 0m 0s");
    const {
        store: { utcTimeStamp },
    } = useStores();

    useEffect(() => {
        if (!utcTimeStamp) return;

        if (endTime * 1000 < utcTimeStamp) return;

        const duration = dayjs.duration(endTime * 1000 - utcTimeStamp);
        const days = duration.days();
        const hours = duration.hours() + days * 24;
        const mins = duration.minutes();
        const secs = duration.seconds();

        const txt = `${hours}h ${mins}m ${secs}s`;

        setCountDown(txt);
    }, [endTime, utcTimeStamp]);

    return (
        <div className={s.card} onClick={() => onClick(index)}>
            <div
                className={s.imgWarp}
                style={{ backgroundImage: `url(${image || BrokenImg})` }}
            ></div>
            <div className={s.bottom}>
                <div className={s.info}>
                    <p className={s.id}>#{id}</p>
                    <p className={s.amountInfo}>
                        <img src={ETHImg} alt="" />
                        {formatEther(amount, 5)}
                    </p>
                </div>
                <div className={s.countDown}>
                    <img src={TimeImg} alt="count down" />
                    <span>{countDown}</span>
                </div>
            </div>
        </div>
    );
});
