import {
    useNavigate,
    useMatch,
    useLocation,
    useParams,
} from "react-router-dom";
import { observer } from "mobx-react";
import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { MoreList, appTabs, AccountFunc } from "./config";
import { useStores } from "src/hooks";
import { Popover, message, notification } from "antd";
import clipboard from "copy-to-clipboard";
import { ETHERSCAN_URL } from "src/constants";
import { clearWallet } from "src/util";
import logo from "../../asset/header/logo.png";
import s from "./index.module.scss";
import MobileNav from "./mobileNav";
import AccountWindow from "./accountWindow";
export default observer(function Header() {
    const { reservesId, nftIndex } = useParams<{
        reservesId: string;
        nftIndex: string;
    }>();
    const {
        store: {
            formatWalletAddress,
            handleConnectWallet,
            walletAddress,
            handleAccountChange,
            handleNetWorkChange,
            isMobile,
            showDeposit,
            openSupportBorrowWinow,
            poolInfoInited,
            loadingPoolList,
        },
    } = useStores();
    const nav = useNavigate();
    let location = useLocation();
    let [showNav, setShowNav] = useState(false);
    let [showAccountWindow, setAccountWindow] = useState(false);
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
    const openNav = () => {
        setShowNav(!showNav);
    };
    const openWindow = () => {
        setAccountWindow(!showAccountWindow);
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
    const openDeposit = () => {
        showDeposit("detail", reservesId);
    };
    const unShowAddress = useMemo(() => {
        const unShowList = ["addPool", "nft", "liquidate", "auctions"];
        return isMobile && unShowList.indexOf(pathname.split("/")[1]) >= 0;
    }, [pathname, isMobile]);
    return (
        <>
            <div className={cx(s.wrap, pathname === "/" ? "" : s.headerClass)}>
                {!isMobile && (
                    <div style={{ cursor: "pointer" }} onClick={() => nav("/")}>
                        <img src={logo} alt="" className={s.logo} />
                    </div>
                )}

                {isMobile && poolInfoInited && (
                    <div>
                        {pathname === "/account" && isMobile && (
                            <span className={s.headerTitle}>Account</span>
                        )}
                        {pathname === "/addPool" && isMobile && (
                            <p className={s.addPoolTitle}>
                                <span
                                    className={s.leftBtn}
                                    onClick={() => {
                                        nav("/market");
                                    }}
                                ></span>
                                <span className="gradualText">
                                    Creat Lending Pool
                                </span>
                            </p>
                        )}
                        {pathname.split("/")[1] === "markets" && isMobile && (
                            <div></div>
                        )}
                        {pathname.split("/")[1] === "nft" && isMobile && (
                            <div
                                className={s.backBtn}
                                onClick={() => nav("market")}
                            ></div>
                        )}
                    </div>
                )}
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

                    <div className={s.right}>
                        {formatWalletAddress && !isMobile && (
                            <Popover
                                content={accountContent}
                                placement="bottom"
                                color="transparent"
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
                                    <p className={s.address}>
                                        {formatWalletAddress}
                                    </p>
                                </div>
                            </Popover>
                        )}
                        {formatWalletAddress && !unShowAddress && (
                            <div
                                onClick={() => {
                                    openWindow();
                                }}
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
                                <p className={s.address}>
                                    {formatWalletAddress}
                                </p>
                            </div>
                        )}
                        {!formatWalletAddress && !unShowAddress && (
                            <div
                                onClick={() => handleConnectWallet(true)}
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
                                <p className={s.address}>{"Launch App"}</p>
                            </div>
                        )}

                        {pathname.split("/")[1] === "nft" && isMobile && (
                            <>
                                <div
                                    className={cx(s.borrowIcon, s.mobileNav)}
                                    onClick={openSupportBorrowWinow}
                                ></div>
                                <div
                                    className={cx(s.depositIcon, s.mobileNav)}
                                    onClick={openDeposit}
                                ></div>
                            </>
                        )}
                        {!(
                            (pathname.split("/")[1] === "addPool" ||
                                pathname.split("/")[1] === "auctions" ||
                                pathname.split("/")[1] === "liquidate") &&
                            isMobile
                        ) && (
                            <div
                                className={s.mobileNav}
                                onClick={openNav}
                            ></div>
                        )}
                    </div>
                </>
            </div>
            {showNav && <MobileNav close={openNav}></MobileNav>}
            {showAccountWindow && <AccountWindow close={openWindow} />}
        </>
    );
});
