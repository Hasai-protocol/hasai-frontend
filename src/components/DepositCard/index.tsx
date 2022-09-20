import { observer } from "mobx-react";
import cx from "classnames";

import BrokenImg from "src/asset/broken-img.svg";
import ActiveIcon from "src/asset/Subtract.svg";

import s from "./index.module.scss";

export default observer(function Card({
    data: { id, name, image },
    index,
    onClick,
    activeIdx,
}: {
    index: number;
    data: {
        id: string;
        name: string;
        image: string;
        address: string;
    };
    activeIdx: number;
    onClick: (index: number) => void;
}) {
    return (
        <div
            className={cx(s.card, { [s.active]: index === activeIdx })}
            onClick={() => onClick(index)}
        >
            <img className={s.img} src={image || BrokenImg} alt={`${name}`} />
            <div className={s.info}>
                <p className={s.id}>#{id}</p>
            </div>
            {index === activeIdx && (
                <img className={s.activeIcon} src={ActiveIcon} alt="" />
            )}
        </div>
    );
});
