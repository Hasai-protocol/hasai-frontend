import { useEffect } from "react";

import { observer } from "mobx-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useStores } from "src/hooks";
import { ConfigProvider, Empty, Select } from "antd";
import AuctionDetail from "src/view/AuctionDetail";
import ApplyTestNFT from "src/view/ApplyTestNFT";
import SupportItem from "src/view/SupportItem";
import Liquidation from "src/view/Liquidation";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Account from "src/view/Account";
import AddPool from "src/view/AddPool";
import Markets from "src/view/Markets";
import DepositModal from "src/components/DepositEthModal";

import ProjectIndexQuery from "./ProjectIndexQuery";
import WalletWatch from "./WalletWatch";
import WatchRoute from "./WatchRoute";
import BlockTime from "./BlockTime";
import "antd/dist/antd.less";

import "./static/font/moonfont/moonfont.css";
import "./static/font/dinPro/index.css";
import "./App.scss";

export default observer(function App() {
    const { store } = useStores();

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            window.stores = store;
        }
        store.init();
    }, [store]);

    const customizeRenderEmpty = () => (
        <div style={{ textAlign: "center" }}>
            <p>Data Not Found</p>
        </div>
    );

    const {
        store: { windowResize },
    } = useStores();
    let innerResize = () => {
        windowResize(window.innerWidth);
    };
    useEffect(() => {
        innerResize();
        window.addEventListener("resize", innerResize);
        return () => {
            // 取消监听窗口的宽度变化
            window.removeEventListener("resize", innerResize);
        };
    });
    return (
        <div className="App">
            <ConfigProvider renderEmpty={customizeRenderEmpty}>
                <div className="main">
                    <BrowserRouter>
                        <Header />
                        <div className="content">
                            <Routes>
                                <Route
                                    path="/test"
                                    element={<ApplyTestNFT />}
                                />
                                <Route
                                    path="/nft/:reservesId/:nftIndex"
                                    element={<SupportItem />}
                                />
                                <Route
                                    path="/auctions/:nft/:id/:auctionId/:reservesId"
                                    element={<AuctionDetail />}
                                />
                                <Route
                                    path="/liquidate/:nft/:id/:borrowId/:reservesId"
                                    element={<Liquidation />}
                                />
                                <Route path="/account" element={<Account />} />
                                <Route
                                    path="/Markets/:type"
                                    element={<Markets />}
                                />
                                <Route path="/addPool" element={<AddPool />} />
                                <Route path="/" element={<Markets />} />
                                <Route path="*" element={<Markets />} />
                            </Routes>
                        </div>
                        <WatchRoute />
                    </BrowserRouter>
                    <Footer />
                </div>
                <WalletWatch />
                <BlockTime />
                <ProjectIndexQuery />
                <DepositModal />
            </ConfigProvider>
        </div>
    );
});
