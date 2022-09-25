import { observer } from "mobx-react";

import empty from "src/asset/noresult.png";
import s from "./index.module.scss";
export default observer(function Footer() {
    return (
        <div className={s.EmptyWarp}>
            <img src={empty} />
        </div>
    );
});
