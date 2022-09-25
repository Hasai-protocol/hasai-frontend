import { useNavigate, useMatch, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import cx from "classnames";
import { useEffect, useMemo } from "react";
import { MoreList, appTabs, AccountFunc } from "./config";
import { useStores } from "src/hooks";
import { Popover, message, notification } from "antd";
import clipboard from "copy-to-clipboard";
import { ETHERSCAN_URL } from "src/constants";
import { clearWallet } from "src/util";
import logo from "../../asset/header/logo.png";
import s from "./index.module.scss";

export default observer(function Header() {
    const {
        store: {
            formatWalletAddress,
            handleConnectWallet,
            walletAddress,
            handleAccountChange,
            handleNetWorkChange,
        },
    } = useStores();
    const nav = useNavigate();
    let location = useLocation();

    const handleClick = ({ TabName, path }) => {
        if (
            TabName === "Governance" ||
            TabName === "Discord" ||
            TabName === "Github"
        ) {
            window.open(path);
            return;
        }
        nav(path);
    };

    const pathname = useMemo(() => {
        const { pathname } = location;
        return pathname;
    }, [location]);
    const nowActive = useMemo(() => {
        const { pathname } = location;
        return pathname.split("/")[1];
    }, [location]);
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
    const content = () => {
        return (
            <div className={s.filterWarp}>
                {MoreList.map((f, i) => {
                    return (
                        <div
                            key={i}
                            className={cx(s.filterItem)}
                            onClick={() => {
                                handleClick({ TabName: f.title, path: f.link });
                            }}
                        >
                            <img src={f.img} alt="" /> {f.title}
                        </div>
                    );
                })}
            </div>
        );
    };
    const accountContent = () => {
        return (
            <div className={s.filterWarp}>
                {AccountFunc.map((f, i) => {
                    return (
                        <div
                            key={i}
                            className={cx(s.filterItem)}
                            onClick={() => {
                                accountClick(f, i);
                            }}
                        >
                            <img src={f.img} alt="" /> {f.title}
                        </div>
                    );
                })}
            </div>
        );
    };
    return (
        <div className={cx(s.wrap, pathname === "/" ? "" : s.headerClass)}>
            <div style={{ cursor: "pointer" }} onClick={() => nav("/")}>
                <img src={logo} alt="" className={s.logo} />
            </div>
            <>
                <div className={s.tabs}>
                    {appTabs.map((tab, index) => {
                        return (
                            <div
                                key={index}
                                className={cx(s.tab, {
                                    [s.tabActive]: nowActive === tab.active,
                                })}
                                onClick={() => handleClick(tab)}
                            >
                                {tab.TabName}
                            </div>
                        );
                    })}

                    <Popover
                        content={content}
                        placement="bottom"
                        color="transparent"
                        // visible={showFilter}
                        overlayClassName={s.marketPopover}
                    >
                        <div className={cx(s.tab)}>More...</div>
                    </Popover>
                </div>

                {formatWalletAddress && (
                    <Popover
                        content={accountContent}
                        placement="bottom"
                        color="transparent"
                        // visible={showFilter}
                        overlayClassName={s.marketPopover}
                    >
                        <div
                            className={cx(
                                formatWalletAddress
                                    ? s.hasAddress
                                    : s.noAddress,
                                s.account,
                                "flex-box",
                                "align-center",
                                "justify-center"
                            )}
                        >
                            <p className={s.address}>{formatWalletAddress}</p>
                        </div>
                    </Popover>
                )}
                {!formatWalletAddress && (
                    <div
                        onClick={handleConnectWallet}
                        className={cx(
                            formatWalletAddress ? s.hasAddress : s.noAddress,
                            s.account,
                            "flex-box",
                            "align-center",
                            "justify-center"
                        )}
                    >
                        <p className={s.address}>{"Launch App"}</p>
                    </div>
                )}
            </>
        </div>
    );
});
