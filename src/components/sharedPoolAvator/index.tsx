import { observer } from "mobx-react";
import cx from "classnames";
import s from "./index.module.scss";
import { useStores } from "src/hooks";
import { useMemo } from "react";

export default observer(function SharePoolAvator({
    size,
    className,
}: {
    size: any;
    className?: any;
}) {
    const {
        store: { poolList, nftHexMap },
    } = useStores();
    const sharedPool = useMemo(() => {
        return poolList.find((pool) => pool.poolType > 1);
    }, [poolList]);
    return (
        <div className={cx(s.avatars, s[size], className)}>
            {sharedPool.nfts.map((de, ind) => {
                if (ind <= 8) {
                    return (
                        <img
                            key={ind}
                            src={nftHexMap[de].image_url}
                            alt=""
                            className={s.middlePics}
                        />
                    );
                }
            })}
        </div>
    );
});
