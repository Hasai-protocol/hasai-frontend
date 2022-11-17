import { observer } from "mobx-react";
import cx from "classnames";

import BrokenImg from "src/asset/broken-img.svg";
import ActiveIcon from "src/asset/Subtract.svg";
import s from "./index.module.scss";
import { useStores } from "src/hooks";
import { useMemo } from "react";
import eIcon from "src/asset/ethereum-eth-logo1.png";
import ReactDOM from "react-dom";

export default observer(function Card({
    data: { id, name, image, address },
    index,
    onClick,
    activeIdx,
    slot,
}: {
    index: number;
    data: {
        id: string;
        name: string;
        image: string;
        address: string;
    };
    activeIdx: number;
    slot: any;

    onClick: (index: number) => void;
}) {
    const {
        store: { nftHexMap },
    } = useStores();
    const pool = useMemo(() => {
        return nftHexMap[address];
    }, [address, nftHexMap]);
    return (
        <div
            className={cx(s.card, { [s.active]: index === activeIdx })}
            onClick={() => onClick(index)}
        >
            <span
                className={s.imgWarp}
                style={{ backgroundImage: `url(${image || BrokenImg})` }}
            ></span>
            <div className={s.info}>
                <p className={s.id}>
                    #{id}{" "}
                    <span>
                        <img src={eIcon} />
                        {pool
                            ? +(
                                  pool?.stats.average_price * pool?.ratio
                              ).toFixed(6)
                            : "-"}
                    </span>
                </p>
                <p className={s.poolName}>{pool?.name}</p>
                {slot}
            </div>
            {index === activeIdx && (
                <img className={s.activeIcon} src={ActiveIcon} alt="" />
            )}
        </div>
    );
});
