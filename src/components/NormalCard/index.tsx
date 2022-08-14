import { observer } from 'mobx-react';

import BrokenImg from 'src/asset/broken-img.svg';

import s from './index.module.scss';

export default observer(function NormalCard({
    data: {
        id,
        name,
        image
    },
    index,
    onClick
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
            <img className={s.img} src={image || BrokenImg} alt={`${name}`} />
            <div className={s.info}>
                <p className={s.id}>#{id}</p>
            </div>
        </div>
    );
});
