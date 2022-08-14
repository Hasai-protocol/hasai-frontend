import { useState, useEffect } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Input, Select, notification } from "antd";
import { observer } from "mobx-react";

import { useStores } from "src/hooks";
import { testNft } from "../../config";
import s from "./index.module.scss";

const { Option } = Select;

export default observer(function ApplyTestNFT() {
    const [nft, setNFT] = useState<string>();
    const [loading, setLoading] = useState(false);
    const {
        store: { supportNFTs, walletAddress, applyNFT },
    } = useStores();

    useEffect(() => {
        if (supportNFTs.length < 1) return;
        setNFT(supportNFTs[0].address);
    }, [supportNFTs]);

    const handleConfirm = async () => {
        if (loading || !nft) return;
        setLoading(true);
        const result = await applyNFT(nft);
        if (result) {
            notification.success({
                message: "Hasai",
                description: "Apply done.",
            });
        } else {
            notification.error({
                message: "Hasai",
                description: "Apply failed.",
            });
        }
        setLoading(false);
    };

    return (
        <div className={s.wrap}>
            <p className={s.title}>Request testnet NFT</p>
            <p className={s.desc}>
                Get test NFT for an account on one of the supported NFTs.
            </p>
            <div className={s.list}>
                <div className={s.form}>
                    <div className={s.item}>
                        <label>NFT</label>
                        <div>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Apply test NFT"
                                value={nft}
                                onSelect={(v) => setNFT(v)}
                            >
                                {testNft.map((nft) => {
                                    return (
                                        <Option
                                            key={nft.address}
                                            value={nft.address}
                                        >
                                            {nft.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                    </div>
                    <div className={s.item}>
                        <label>Wallet address</label>
                        <Input value={walletAddress} disabled />
                    </div>
                </div>
                <div className={s.btn} onClick={handleConfirm}>
                    {loading && <LoadingOutlined />}
                    Send request
                </div>
            </div>
        </div>
    );
});
