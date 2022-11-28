import { useEffect, useMemo, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Modal, Input, notification } from "antd";
import { ethers } from "ethers";
import { formatEther } from "src/util";
import depositModuleIcon from "src/asset/account/mydeposit.png";
import closeIcon from "src/asset/colseIcon.png";
import { useStores } from "src/hooks";
import cx from "classnames";
import s from "./index.module.scss";
import { PoolType } from "src/config";
import SharePoolAvator from "src/components/sharedPoolAvator";

export default observer(function RepayModal({ visible, selected }) {
    const {
        store: { poolList, nftHexMap },
    } = useStores();
    console.log(nftHexMap);
    return (
        <Modal
            centered
            footer={null}
            visible={visible}
            className={s.nftMobile}
            // onCancel={onCancel}
            closeIcon={<img src={closeIcon} />}
            width={320}
        >
            <div>
                {poolList.map((pool, index) => {
                    return (
                        <div
                            className={s.despositItem}
                            onClick={() => {
                                selected(pool, index);
                            }}
                        >
                            {+pool.poolType === +PoolType["shared Pool"] && (
                                <SharePoolAvator
                                    size="mini"
                                    className={s.avatar}
                                />
                            )}
                            {+pool.poolType !== +PoolType["shared Pool"] && (
                                <img src={nftHexMap[pool.nfts[0]].image_url} />
                            )}
                            {pool.nftName}
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
});
