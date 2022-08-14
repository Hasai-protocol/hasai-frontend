import { useEffect } from 'react';

import { observer } from 'mobx-react';

import { useStores } from 'src/hooks';

export default observer(function BlockTime() {
    const { store: { inited, queryProjectIndex } } = useStores();

    useEffect(() => {
        if (!inited) return;
        queryProjectIndex();
        const id = setInterval(queryProjectIndex, 15 * 1000);
        return () => clearInterval(id);
    }, [inited, queryProjectIndex]);

    return null;
});
