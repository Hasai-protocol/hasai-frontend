import { observer } from "mobx-react";

import BrokenImg from "src/asset/broken-img.svg";

import s from "./index.module.scss";

export default observer(function NormalCard({
    data: { id, name, image },
    index,
    onClick,
}: {
    index: number;
    data: {
        id: string;
        name: string;
        image: string;
        address: string;
    };
    onClick: (index: number) => void;
}) {
    return (
        <div className={s.card} onClick={() => onClick(index)}>
            <div
                className={s.imgWarp}
                style={{ backgroundImage: `url(${image || BrokenImg})` }}
            ></div>
            <div className={s.info}>
                <p className={s.id}>#{id}</p>
            </div>
        </div>
    );
});
