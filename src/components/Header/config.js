import discord from "../../asset/header/discord.png";
import discord2 from "../../asset/header/discord-w.png";
import copy from "../../asset/header/copy.png";
import copy2 from "../../asset/header/copy-w.png";
import add from "../../asset/header/add.png";
import add2 from "../../asset/header/add-w.png";
import github from "../../asset/header/github.png";
import github2 from "../../asset/header/github-w.png";
import explorer from "../../asset/header/explorer.png";
import explorer2 from "../../asset/header/explorer-w.png";
import exit from "../../asset/header/exit.png";
import account from "../../asset/header/account.png";
import governance from "../../asset/header/governance.png";
import market from "../../asset/header/market.png";
export const homeTabs = [
    // {
    //     TabName: "Hasai Protocol",
    //     path: "https://github.com/Hasai-protocol",
    // },
    // {
    //     TabName: "Docs",
    //     path: "https://docs.hasai.xyz/",
    // },
    // {
    //     TabName: "Security",
    //     path: "https://docs.hasai.xyz/risk/security-and-audits",
    // },
];
export const appTabs = [
    {
        TabName: "Account",
        active: "account",
        icon: account,
        path: "/account",
    },
    {
        TabName: "Markets",
        active: "markets",
        icon: market,
        path: "/markets/0",
    },
    {
        active: "null",
        icon: governance,
        TabName: "Governance",
        path: "https://docs.hasai.xyz/governance/governance-mechanism",
    },
];

export const MoreList = [
    {
        title: "Discord",
        link: `https://discord.com/invite/tbnz5jfyYa`,
        img: discord,
        img2: discord2,
    },
    {
        title: "Github",
        link: `https://github.com/orgs/Hasai-protocol/repositories`,
        img: github,
        img2: github2,
    },
    {
        title: "Creat Permissionless Pools",
        link: `/addPool`,
        img: add,
        img2: add2,
        width: 11,
    },
];
export const AccountFunc = [
    {
        title: "Copy Address",
        img: copy,
        img2: copy2,
    },
    {
        title: "Veiw on Explorer",
        link: `https://github.com/orgs/Hasai-protocol/repositories`,
        img: explorer,
        img2: explorer2,
    },
    {
        title: "Disconnect Wallet",
        link: `/addPool`,
        img: exit,
    },
];
