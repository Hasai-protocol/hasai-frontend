import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import DefaultImg from 'src/asset/broken-img.svg';

import { useStores } from 'src/hooks';
import { Auction } from 'src/types';

import s from './index.module.scss';

export default observer(function AuctionItem({ data }: { data: Auction }) {
    const [expired, setExpired] = useState(false);
    const [config, setConfig] = useState({ name: '', image: '' });

    const { store: { contract, blockTimeStamp, queryNFTDetail } } = useStores();

    const { endTime } = data;

    useEffect(() => {
        (async () => {
            try {
                const info = await contract.borrowMap(data.id);
                const config = await queryNFTDetail(info.nft, +info.id);
                setConfig(config);
            } catch {
                //
            }
        })();
    }, [data, contract, queryNFTDetail]);

    useEffect(() => {
        setExpired(blockTimeStamp > endTime);
    }, [blockTimeStamp, endTime]);

    return (
        <div className={s.item}>
            <img className={s.img} src={config.image || DefaultImg} alt='' />
            <p className={s.nftName}>{config.name}</p>
        </div>
    );
});
