import { useEffect } from 'react';

import { useMatch } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStores } from 'src/hooks';

export default observer(function WatchRoute() {
    const isIndex = useMatch('/');
    const { store: { inited, walletAddress, handleConnectWallet } } = useStores();

    useEffect(() => {
        if (inited && !walletAddress && !isIndex) {
            handleConnectWallet();
        }
    }, [inited, isIndex, walletAddress, handleConnectWallet]);

    return null;
});
