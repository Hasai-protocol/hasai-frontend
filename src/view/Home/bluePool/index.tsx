import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Row, Col, Spin } from "antd";

import AvailableETH from "src/asset/available-eth.png";
import DepositNFT from "src/asset/deposited-nft.png";
import BorrowedETH from "src/asset/borrowed-eth.png";
import eIcon from "src/asset/eicon.png";

import { useStores } from "src/hooks";

import s from "./index.module.scss";

export default observer(function Home({ list }) {
    const nav = useNavigate();
    const {
        store: { nftHexMap },
    } = useStores();
    return (
        <>
            {list.length ? (
                <div className={s.wrap}>
                    <p className={s.title}>Blue Chip Pools</p>
                    <div className={s.supportList}>
                        {list.length < 1 && (
                            <div className={s.loadingWrap}>
                                <Spin />
                            </div>
                        )}
                        <Row gutter={[24, 24]} className={s.list}>
                            {list.map((pool) => {
                                return (
                                    <Col key={pool.address} span={8}>
                                        <div
                                            className={s.item}
                                            onClick={() =>
                                                nav(`/nft/${pool.id}`)
                                            }
                                        >
                                            <div
                                                className={s.collectionImgWarp}
                                                style={{
                                                    backgroundImage: `url("${
                                                        nftHexMap[pool.nfts[0]]
                                                            .image_url
                                                    }")`,
                                                }}
                                            ></div>
                                            <div className={s.collectionBottom}>
                                                <img
                                                    className={s.avatar}
                                                    src={
                                                        nftHexMap[pool.nfts[0]]
                                                            .image_url
                                                    }
                                                    alt=""
                                                />
                                                <div className={s.info}>
                                                    <p
                                                        className={
                                                            s.collectionTop
                                                        }
                                                    >
                                                        {/* {nft.name} */}
                                                        <span
                                                            className={
                                                                s.collectionName
                                                            }
                                                        >
                                                            {pool.nftName}
                                                        </span>
                                                        <span
                                                            className={
                                                                s.totalNft
                                                            }
                                                        >
                                                            {
                                                                nftHexMap[
                                                                    pool.nfts[0]
                                                                ].stats.count
                                                            }
                                                            NFT
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className={s.priceInfos}>
                                                    <div
                                                        className={s.priceItem}
                                                    >
                                                        <p
                                                            className={
                                                                s.poolTitle
                                                            }
                                                        >
                                                            Liquidity
                                                        </p>
                                                        <p
                                                            className={
                                                                s.poolContent
                                                            }
                                                        >
                                                            <img src={eIcon} />
                                                            {
                                                                pool.liquidityForEth
                                                            }
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={s.priceItem}
                                                    >
                                                        <p
                                                            className={
                                                                s.poolTitle
                                                            }
                                                        >
                                                            Total Deposit
                                                        </p>
                                                        <p
                                                            className={
                                                                s.poolContent
                                                            }
                                                        >
                                                            <img src={eIcon} />
                                                            {
                                                                pool.totalDepositForEth
                                                            }
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={s.priceItem}
                                                    >
                                                        <p
                                                            className={
                                                                s.poolTitle
                                                            }
                                                        >
                                                            APY
                                                        </p>
                                                        <p
                                                            className={
                                                                s.poolContent
                                                            }
                                                        >
                                                            {pool.depositApy}%
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
});
