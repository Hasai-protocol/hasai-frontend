import { observer } from "mobx-react";

import Twitter from "src/asset/social/twitter.svg";
import GitBook from "src/asset/social/gitbook.svg";
import Discord from "src/asset/social/discord.svg";
import GitHub from "src/asset/social/github.svg";
import Audit from "src/asset/social/audit.svg";
import footerIcon from "src/asset/footer/footericon.png";

import s from "./index.module.scss";

const SocialLinks = [
    {
        link: "hasai-twitter",
        url: "https://twitter.com/HasaiLabs",
        icon: Twitter,
    },
    {
        link: "hasai-github",
        url: "https://github.com/orgs/Hasai-protocol/repositories",
        icon: GitHub,
    },
    {
        link: "hasai-gitbook",
        url: "https://docs.hasai.xyz/",
        icon: GitBook,
    },
    {
        link: "hasai-discord",
        url: "https://discord.com/invite/tbnz5jfyYa",
        icon: Discord,
    },
    {
        link: "hasai-audit",
        icon: Audit,
        url: "https://www.certik.com/projects/hasai",
    },
];
const links = [
    [
        {
            text: "Blue-chip Pools",
            url: "https://docs.hasai.xyz/pools/the-blue-chip-pools",
        },
        {
            text: "Shared Pools",
            url: "https://docs.hasai.xyz/pools/the-shared-pool",
        },
        {
            text: "Permissionless Pools",
            url: "https://docs.hasai.xyz/pools/the-permissionless-pools",
        },
    ],
    [
        {
            text: "As Depositer",
            url: "https://docs.hasai.xyz/guides/as-lenders-earning-interest",
        },
        {
            text: "As Borrower",
            url: "https://docs.hasai.xyz/guides/as-borrowers-get-instant-loans",
        },
        {
            text: "As Creator",
            url: "https://docs.hasai.xyz/pools/the-permissionless-pools",
        },
    ],
    [
        {
            text: "Risk Framework",
            url: "https://docs.hasai.xyz/risk/risk-framework",
        },
        { text: "Dual Rates", url: "https://docs.hasai.xyz/risk/dual-rates" },
        {
            text: "Auction liquidation",
            url: "https://docs.hasai.xyz/risk/pending-liquidation/auction-liquidation",
        },
        {
            text: "Bad Debt",
            url: "https://docs.hasai.xyz/risk/pending-liquidation/bad-debt",
        },
    ],
    [
        {
            text: "HASAI Tokenomics",
            url: "https://docs.hasai.xyz/usdhasai-token/usdhasai-tokenomics",
        },
        {
            text: "HASAI Basics",
            url: "https://docs.hasai.xyz/usdhasai-token/usdhasai-basics",
        },
    ],
];

export default observer(function Footer() {
    return (
        <div className={s.warp}>
            <div className={s.footerInner}>
                <div className={s.footerTop}>
                    <div className={s.btns}>
                        <a
                            className={s.btn}
                            href="https://github.com/Hasai-protocol"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Pools
                        </a>
                        <a
                            className={s.btn}
                            href="https://docs.hasai.xyz/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Docs
                        </a>
                        <a
                            className={s.btn}
                            href="https://docs.hasai.xyz/risk/security-and-audits"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Security
                        </a>
                    </div>
                    <img src={footerIcon} alt="" />
                </div>
                <div className={s.footerBottom}>
                    <div className={s.left}>
                        {links.map((link) => (
                            <div className={s.links}>
                                {link.map((l) => (
                                    <a
                                        rel="noopener noreferrer"
                                        href={l.url}
                                        target="_blank"
                                    >
                                        {l.text}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className={s.right}>
                        {SocialLinks.map((icon) => (
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href={icon.url}
                                className={`hasai ${icon.link}`}
                            ></a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});
