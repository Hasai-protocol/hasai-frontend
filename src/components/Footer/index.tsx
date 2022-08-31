import { observer } from 'mobx-react';

import Twitter from 'src/asset/social/twitter.svg';
import GitBook from 'src/asset/social/gitbook.svg';
import Discord from 'src/asset/social/discord.svg';
import GitHub from 'src/asset/social/github.svg';
import Audit from 'src/asset/social/audit.svg';

import s from './index.module.scss';

const SocialLinks = [
    {
        link: 'https://twitter.com/0xCodeman',
        icon: Twitter
    },
    {
        link: 'https://github.com/orgs/Hasai-protocol/repositories',
        icon: GitHub
    },
    {
        link: 'https://hasai.gitbook.io/',
        icon: GitBook
    },
    {
        link: 'https://discord.gg/tbnz5jfyYa',
        icon: Discord
    },
    {
        link: 'https://www.certik.com/projects/hasai',
        icon: Audit
    }
];

export default observer(function Footer() {
    return (
        <div className={s.wrap}>
            <div className={s.content}>
                <div>
                    <svg width="49" height="36" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.2795 0H23.6016L12.3221 25.6879H0L11.2795 0ZM13.0735 2.80068L4.25358 22.8872H10.5281L19.3481 2.80068H13.0735Z" fill="#088F57"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M21.7005 10.3121H34.0239L27.2551 25.6879H14.9316L21.7005 10.3121ZM23.4926 13.1128L19.1897 22.8872H25.4629L29.7659 13.1128H23.4926Z" fill="#73C89A"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M36.6775 10.3121H48.9996L37.7201 36H25.3979L36.6775 10.3121ZM38.4715 13.1128L29.6515 33.1993H35.9261L44.746 13.1128H38.4715Z" fill="#088F57"/>
                    </svg>
                    <p className={s.brand}>©HASAI</p>
                </div>
                <div>
                    {SocialLinks.map(social => {
                        return (
                            <a className={s.item} key={social.link} href={social.link} target='_blank' rel="noreferrer">
                                <img src={social.icon} alt='' />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
