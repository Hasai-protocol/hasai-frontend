import { observer } from "mobx-react";
import cx from "classnames";
import s from "./index.module.scss";
import { useStores } from "src/hooks";
import { PoolType } from "../../config";
import eIcon from "src/asset/ethereum-eth-logo1.png";
export default observer(function Markets({ pool, index, PoolType }) {
    const {
        store: { poolList, nftHexMap, isMobile },
    } = useStores();
    const goDetail = (pool) => {
        let url =
            +pool.poolType === +PoolType["shared Pool"]
                ? `/nft/${pool.id}/${index}`
                : `/nft/${pool.id}/n`;
        window.open(url, "_blank");
    };
    return (
        <div
            onClick={() => {
                goDetail(pool);
            }}
            className={cx(
                s.item,
                s.mainItem,
                index === 0
                    ? s.firstCollection
                    : index === poolList.length - 1
                    ? s.lastCollection
                    : null
            )}
            key={`${Number(Math.random() * 100)}-key`}
        >
            <div className={cx(s.section, s.firstSection)}>
                {pool.poolType == PoolType["shared Pool"] ? (
                    <img src={pool.image_url} alt="" className={s.middlePics} />
                ) : (
                    <img
                        className={s.avatar}
                        src={nftHexMap[pool.nfts[0]].image_url}
                        alt=""
                    />
                )}

                <div className={s.poolInfo}>
                    <div className={s.poolName}>
                        {pool.nftName || pool.name}
                    </div>
                    <span
                        className={cx(s[`type${+pool.poolType}`], s.poolType)}
                    >
                        {PoolType[+pool.poolType]
                            ? PoolType[+pool.poolType]
                            : "Shared"}
                    </span>
                </div>
            </div>
            {!isMobile && (
                <div className={cx(s.normal, s.tl)}>
                    <p className={s.normalTitle}>NFTs</p>
                    <p className={s.content}>
                        {nftHexMap[pool.nfts[0]].stats.count}
                    </p>
                </div>
            )}
            <div className={cx(s.normal, s.tl)}>
                <p className={s.normalTitle}>Deposit APY≈</p>
                <p className={s.content}>{pool.depositApy}%</p>
            </div>
            <div className={cx(s.normal, s.tr)}>
                <p className={s.normalTitle}>Total Deposit</p>
                <p className={s.content}>
                    <img src={eIcon} />
                    {pool.totalDepositForEth}
                </p>
            </div>
            <div className={cx(s.normal, s.tr)}>
                <p className={s.normalTitle}>Liquidity</p>
                <p className={s.content}>
                    <img src={eIcon} />
                    {pool.liquidityForEth}
                </p>
            </div>
            <div
                className={s.viewButton}
                onClick={() => {
                    goDetail(pool);
                }}
            >
                <div className="hasai-btn">
                    <span className="gradualText">Details</span>
                </div>
            </div>
        </div>
    );
});
