import { useEffect } from 'react';

import { observer } from 'mobx-react';

import { saveWallet } from 'src/util';
import { useStores } from 'src/hooks';

export default observer(function WalletWatch() {
    const { store: { onboard, initProviderConfig, handleNetWorkChange, handleAccountChange } } = useStores();

    useEffect(() => {
        if (!onboard) return;
        const state = onboard.state.select('wallets');
        const { unsubscribe } = state.subscribe(([wallet]) => {
            if (wallet) {
                const { label, accounts, provider, chains } = wallet;
                saveWallet(label);
                handleNetWorkChange(chains);
                initProviderConfig(provider);
                handleAccountChange(accounts);
            } else {
                handleAccountChange([]);
                handleNetWorkChange([]);
                // initProviderConfig(null);
            }
        });
        return unsubscribe;
    }, [onboard, initProviderConfig, handleAccountChange, handleNetWorkChange]);

    return null;
});
