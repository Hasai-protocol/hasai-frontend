import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import {
    Form,
    Input,
    Tooltip,
    Select,
    Button,
    Popover,
    InputNumber,
    Radio,
    notification,
} from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useStores } from "src/hooks";
import cx from "classnames";
import s from "./index.module.scss";
import addicon from "src/asset/addpoolicon.png";
import { ethers } from "ethers";
export default observer(function Home() {
    const [form] = Form.useForm();
    const nav = useNavigate();
    const {
        store: { savePool, walletAddress, handleConnectWallet },
    } = useStores();
    const onFinish = async (value: any) => {
        if (!walletAddress) {
            return handleConnectWallet();
        }
        const units = {
            86400: ["period"], //24 * 60 * 60 // for Test
            100: ["ratio"],
            3600: ["bidDuration", "liqDuration"],
            27: [
                "baseStableBorrowRate",
                "baseVariableBorrowRate",
                "optimalUtilizationRate",
                "stableSlope1",
                "stableSlope2",
                "variableSlope1",
                "variableSlope2",
            ],
        };
        for (let unit in units) {
            let list = units[unit];
            list.forEach((item) => {
                if (unit === "27") {
                    value[item!] = ethers.utils.parseUnits(
                        `${value[item!]}`,
                        27
                    );
                    // .toString();
                } else {
                    value[item!] = value[item!] * +unit;
                }
            });
        }
        let {
            nftAddress,
            baseStableBorrowRate,
            baseVariableBorrowRate,
            optimalUtilizationRate,
            period,
            ratio,
            stableSlope1,
            stableSlope2,
            variableSlope1,
            variableSlope2,
            liqDuration,
            bidDuration,
            enabledStableBorrow = true,
            initialLiquidity,
        } = value;
        let result = await savePool([
            nftAddress,
            period,
            ratio,
            liqDuration,
            bidDuration,
            enabledStableBorrow,
            [
                1,
                optimalUtilizationRate,
                baseVariableBorrowRate,
                variableSlope1,
                variableSlope2,
                baseStableBorrowRate,
                stableSlope1,
                stableSlope2,
            ],
            initialLiquidity,
        ]);
        if (result) {
            notification.success({
                message: "Hasai",
                description: "Transaction done.",
            });
            form.resetFields();
        } else {
            notification.error({
                message: "Hasai",
                description: "Transaction failed.",
            });
        }
    };
    const onFinishFailed = () => {};
    const ratioTips = (
        <div className={s.ratioTips}>
            {`
            The floor price of this series of NFTs is [A], and the\n historical average transaction price is [B]. In order \nto ensure the security of the lending pool and the\n control of liquidity risk, please set the ratio\n reasonably to ensure that the loanable quantity C \nof a single NFT mortgage meets the following \nconditions: C <= A/3 && C <= B`}
        </div>
    );
    const bidTips = (
        <div className={s.ratioTips}>
            Each new bid will extend the auction time by the setting extra hour
            <br />
            until the auction period expires.
        </div>
    );
    const content = (
        <div>
            {/* The interest rate model consisting of the following
            <br />
            configuration is used to manage liquidity risk
            <br />
            through user incentivises to support liquidity,
            <br /> more detail information see this docs:
            <div className={s.tiplink}>
                [<span>external link</span>]
            </div> */}
            It refers the optimal utilization rate of the pool, above which the
            <br />
            interest rate in borrowing process will increase more rapidly based
            <br />
            on the utilization rate of the pool
            <br />
        </div>
    );
    return (
        <div className={s.formWarp}>
            <p className={s.bigTitle}>
                <img src={addicon} />
                Creat Lending Pool
            </p>
            <div className={s.mainContent}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ enabledStableBorrow: true }}
                >
                    <p className={s.label}>NFT Address</p>
                    <Form.Item className={s.item} name="nftAddress">
                        <Input
                            className={s.input}
                            placeholder="Contract Address"
                        />
                    </Form.Item>
                    <p className={s.label}>
                        Initial Liquidity Provided by Creator
                    </p>
                    <Form.Item
                        className={s.item}
                        name="initialLiquidity"
                        rules={[
                            {
                                required: true,
                                message: "Please check again",
                            },
                            { type: "number", min: 0, max: 100 },
                        ]}
                    >
                        {/* <Input
                            className={s.input}
                            placeholder="30"
                            suffix="eth"
                        /> */}
                        <InputNumber
                            min={0}
                            controls={false}
                            max={100}
                            placeholder="Initial liquidity should be provided by creators, e.g. 300"
                        />
                        {/* <Select style={{ width: "100%" }}>
                            {new Array(30).fill(undefined).map((emy, index) => {
                                return (
                                    <Select.Option
                                        value={index + 1}
                                        key={index}
                                    >
                                        {index + 1} Day
                                    </Select.Option>
                                );
                            })}
                        </Select> */}
                    </Form.Item>
                    <p className={s.label}>
                        Loan to value Ratio
                        <Popover
                            placement="top"
                            content={ratioTips}
                            trigger="hover"
                        >
                            <InfoCircleFilled className={s.tips} />
                        </Popover>
                    </p>
                    <Form.Item
                        className={s.item}
                        name="ratio"
                        rules={[
                            {
                                required: true,
                                message: "Please check again",
                            },
                            { type: "number", min: 0, max: 100 },
                        ]}
                    >
                        <InputNumber
                            className={s.suffix}
                            min={0}
                            controls={false}
                            max={100}
                            placeholder="Please input ratio"
                        />
                    </Form.Item>
                    <p className={s.label}>Max Lending Period</p>
                    <Form.Item
                        className={s.item}
                        name="period"
                        rules={[
                            {
                                required: true,
                                message: "Please check again",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Please select period"
                        >
                            {new Array(30).fill(undefined).map((emy, index) => {
                                return (
                                    <Select.Option
                                        value={index + 1}
                                        key={index}
                                    >
                                        {index + 1} Day
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <p className={s.label}>The initial public bidding period</p>
                    <Form.Item
                        className={s.item}
                        name="liqDuration"
                        rules={[
                            {
                                required: true,
                                message: "Please check again",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            placeholder="The initial public bidding period"
                        >
                            {new Array(24).fill(undefined).map((emy, index) => {
                                return (
                                    <Select.Option
                                        value={index + 1}
                                        key={index}
                                    >
                                        {index + 1} Hours
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <p className={s.label}>
                        Bid Duration
                        <Popover
                            placement="top"
                            content={bidTips}
                            trigger="hover"
                        >
                            <InfoCircleFilled className={s.tips} />
                        </Popover>
                    </p>

                    <Form.Item
                        className={s.item}
                        name="bidDuration"
                        rules={[
                            {
                                required: true,
                                message: "Please check again",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Each new bid will extend the auction time by the setting time(Hours)                            "
                        >
                            {new Array(24).fill(undefined).map((emy, index) => {
                                return (
                                    <Select.Option
                                        value={index + 1}
                                        key={index}
                                    >
                                        {index + 1} Hours
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <p className={s.label}>
                        Optimal Utilization Rate
                        <Popover
                            placement="top"
                            content={content}
                            trigger="hover"
                        >
                            <InfoCircleFilled className={s.tips} />
                        </Popover>
                    </p>
                    <Form.Item
                        className={s.item}
                        name="optimalUtilizationRate"
                        rules={[
                            {
                                required: true,
                                message: "Please check again",
                            },
                            { type: "number", min: 0, max: 100 },
                        ]}
                    >
                        <InputNumber
                            className={s.suffix}
                            min={0}
                            controls={false}
                            max={100}
                            placeholder="Optimal Utilization Rate"
                        />
                    </Form.Item>

                    <p className={s.label}>
                        Prime Variable Rate for borrowing
                        <span className={s.otherRate}>(0%-100%)</span>
                    </p>
                    <Form.Item
                        className={s.item}
                        name="baseVariableBorrowRate"
                        rules={[
                            {
                                required: true,
                                message: "Please check again",
                            },
                            { type: "number", min: 0, max: 100 },
                        ]}
                    >
                        <InputNumber
                            className={s.suffix}
                            min={0}
                            controls={false}
                            max={100}
                            placeholder="The basic variable rate setting for the borrowing process"
                        />
                    </Form.Item>
                    <div className={s.twoWarp}>
                        <div className={s.towRow}>
                            <p className={s.label}>Variable Slope1</p>
                            <Form.Item
                                className={s.item}
                                name="variableSlope1"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please check again",
                                    },
                                    { type: "number", min: 0, max: 100 },
                                ]}
                            >
                                <InputNumber
                                    className={s.suffix}
                                    min={0}
                                    controls={false}
                                    max={100}
                                    placeholder="Minimum Range limitation"
                                />
                            </Form.Item>
                        </div>
                        <div className={s.towRow}>
                            <p className={s.label}>Variable Slope2</p>
                            <Form.Item
                                className={s.item}
                                name="variableSlope2"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please check again",
                                    },
                                    { type: "number", min: 0, max: 100 },
                                ]}
                            >
                                <InputNumber
                                    className={s.suffix}
                                    min={0}
                                    controls={false}
                                    max={100}
                                    placeholder="Maximum Range limitation"
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <p className={s.label}>Prime Stable Rate</p>
                    <Form.Item
                        className={s.item}
                        name="baseStableBorrowRate"
                        rules={[
                            {
                                required: true,
                                message: "Please check again",
                            },
                            { type: "number", min: 0, max: 100 },
                        ]}
                    >
                        <InputNumber
                            className={s.suffix}
                            min={0}
                            controls={false}
                            max={100}
                            placeholder="The basic stable rate setting for the borrowing process"
                        />
                    </Form.Item>
                    <div className={s.twoWarp}>
                        <div className={s.towRow}>
                            <p className={s.label}>Stable Slope1</p>
                            <Form.Item
                                className={s.item}
                                name="stableSlope1"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please check again",
                                    },
                                    { type: "number", min: 0, max: 100 },
                                ]}
                            >
                                <InputNumber
                                    className={s.suffix}
                                    min={0}
                                    controls={false}
                                    max={100}
                                    placeholder="Maximum Range limitation"
                                />
                            </Form.Item>
                        </div>
                        <div className={s.towRow}>
                            <p className={s.label}>Stable Slope2</p>
                            <Form.Item
                                className={s.item}
                                name="stableSlope2"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please check again",
                                    },
                                    { type: "number", min: 0, max: 100 },
                                ]}
                            >
                                <InputNumber
                                    className={s.suffix}
                                    min={0}
                                    controls={false}
                                    max={100}
                                    placeholder="Maximum Range limitation"
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className={s.stableWarp}>
                        <p className={cx(s.label, s.inline)}>
                            stable rates available
                        </p>
                        <Form.Item
                            className={cx(s.inline, s.item)}
                            name="enabledStableBorrow"
                        >
                            <Radio.Group>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={cx(
                                s.confirm
                                // !poolInfoInited && s.disabled
                            )}
                        >
                            Confirm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
});
