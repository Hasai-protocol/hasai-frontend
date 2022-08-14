import { observer } from 'mobx-react';
import { Empty } from 'antd';

import s from './index.module.scss';

export default observer(function NotSupport() {

    return (
        <div className={s.wrap}>
            <Empty description='Not support yet' />
        </div>
    );
});
