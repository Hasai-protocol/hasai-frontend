import { observer } from "mobx-react";
import cx from "classnames";
import s from "./index.module.scss";
import { AccountFunc } from "./config";
import closeBtn from "../../asset/header/close-circle.png";
import { clearWallet } from "src/util";
import clipboard from "copy-to-clipboard";
import { useStores } from "src/hooks";
import { message } from "antd";
import { ETHERSCAN_URL } from "src/constants";

export default observer(function Header({ close }) {
    const {
        store: { walletAddress, handleAccountChange, handleNetWorkChange },
    } = useStores();
    const accountClick = (f, index) => {
        if (index === 0) {
            if (clipboard(walletAddress)) {
                message.success("copy successful!");
            }
        } else if (index === 1 && walletAddress) {
            window.open(`${ETHERSCAN_URL}/address/${walletAddress}`);
        } else if (index === 2) {
            clearWallet();
            handleAccountChange([]);
            handleNetWorkChange([]);
        }
    };
    return (
        <div className={cx(s.mobileWarp)}>
            <div className={cx(s.mobileInner, s.accountWarp)}>
                <img src={closeBtn} className={s.closeBtn} onClick={close} />
                {AccountFunc.map((app, i) => {
                    return i < 2 ? (
                        <p
                            key={i}
                            className={s.menuItem}
                            onClick={() => {
                                accountClick(app, i);
                            }}
                        >
                            <span
                                className={s.img}
                                style={{ backgroundImage: `url(${app?.img2})` }}
                            ></span>
                            {app.title}
                        </p>
                    ) : (
                        ``
                    );
                })}
                <p
                    className={s.disconnect}
                    onClick={() => {
                        accountClick(null, 2);
                    }}
                >
                    Disconnect
                </p>
            </div>
        </div>
    );
});
