import { useEffect } from "react";

import { observer } from "mobx-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useStores } from "src/hooks";

import AuctionDetail from "src/view/AuctionDetail";
import ApplyTestNFT from "src/view/ApplyTestNFT";
import SupportItem from "src/view/SupportItem";
import Liquidation from "src/view/Liquidation";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Account from "src/view/Account";
import AddPool from "src/view/AddPool";
import Home from "src/view/Home";

import ProjectIndexQuery from "./ProjectIndexQuery";
import WalletWatch from "./WalletWatch";
import WatchRoute from "./WatchRoute";
import BlockTime from "./BlockTime";
import "./App.css";
import "antd/dist/antd.less";

export default observer(function App() {
    const { store } = useStores();

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            window.stores = store;
        }
        store.init();
    }, [store]);

    return (
        <div className="App">
            <div className="main">
                <BrowserRouter>
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route path="/test" element={<ApplyTestNFT />} />
                            <Route
                                path="/nft/:reservesId"
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
                            <Route path="/addPool" element={<AddPool />} />
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </div>
                    <WatchRoute />
                </BrowserRouter>
                <Footer />
            </div>
            <WalletWatch />
            <BlockTime />
            <ProjectIndexQuery />
        </div>
    );
});
