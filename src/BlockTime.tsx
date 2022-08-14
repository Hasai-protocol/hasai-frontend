import { useEffect } from 'react';

import { observer } from 'mobx-react';
import { ethers } from 'ethers';
import dayjs from 'dayjs';

import { useStores } from 'src/hooks';

export default observer(function BlockTime() {
    const { store: { provider, updateBlockTs, updateUTCTs } } = useStores();

    useEffect(() => {
        const isWeb3Provider = provider instanceof ethers.providers.Web3Provider;
        if (!isWeb3Provider) return;
        const queryBlockTime = async () => {
            let timestamp = 0;
            try {
                const blockInfo = await provider.getBlock('latest');
                timestamp = blockInfo.timestamp;
            } catch {
                // nothing
            }
            return timestamp;
        };
        (async () => {
            const time = await queryBlockTime();
            updateBlockTs(time);
        })();

        const id = setInterval(async () => {
            const time = await queryBlockTime();
            if (time > 0) {
                updateBlockTs(time);
            }
        }, 15 * 1000);

        return () => clearInterval(id);
    }, [provider, updateBlockTs]);

    useEffect(() => {
        const utcTs = dayjs.utc();
        updateUTCTs(+utcTs);
        
        const id = setInterval(() => {
            const utcTs = dayjs.utc();
            updateUTCTs(+utcTs);
        }, 1000);

        return () => clearInterval(id);
    }, [updateUTCTs]);

    return null;
});
