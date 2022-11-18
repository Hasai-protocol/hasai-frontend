import discord from "../../asset/header/discord.png";
import copy from "../../asset/header/copy.png";
import add from "../../asset/header/add.png";
import github from "../../asset/header/github.png";
import explorer from "../../asset/header/explorer.png";
import exit from "../../asset/header/exit.png";
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
        path: "/account",
    },
    {
        TabName: "Markets",
        active: "markets",
        path: "/markets/0",
    },
    // {
    //     active: "null",
    //     TabName: "Governance",
    //     path: "https://docs.hasai.xyz/governance/governance-mechanism",
    // },
];

export const MoreList = [
    // {
    // title: "Discord",
    //     link: `https://discord.com/invite/tbnz5jfyYa`,
    //     img: discord,
    // },
    // {
    //     title: "Github",
    //     link: `https://github.com/orgs/Hasai-protocol/repositories`,
    //     img: github,
    // },
    {
        title: "Creat Permissionless Pools",
        link: `/addPool`,
        img: add,
    },
];
export const AccountFunc = [
    {
        title: "Copy Address",
        img: copy,
    },
    // {
    //     title: "Veiw on Explorer",
    //     link: `https://github.com/orgs/Hasai-protocol/repositories`,
    //     img: explorer,
    // },
    {
        title: "Disconnect Wallet",
        link: `/addPool`,
        img: exit,
    },
];
