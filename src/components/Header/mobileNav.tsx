import { observer } from "mobx-react";
import { useNavigate, useMatch, useLocation } from "react-router-dom";

import cx from "classnames";
import s from "./index.module.scss";
import { appTabs, MoreList } from "./config";
import closeBtn from "../../asset/header/close-circle.png";

export default observer(function Header({ close }) {
    const nav = useNavigate();

    const handleClick = ({ TabName, path }) => {
        close();

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
    return (
        <div className={cx(s.mobileWarp)}>
            <div className={cx(s.mobileInner)}>
                <img src={closeBtn} className={s.closeBtn} onClick={close} />
                <p className={s.itemTitle}>Menu</p>
                {appTabs.map((app, index) => {
                    return (
                        <p
                            key={index}
                            className={s.menuItem}
                            onClick={() => handleClick(app)}
                        >
                            <span
                                className={s.img}
                                style={{ backgroundImage: `url(${app.icon})` }}
                            ></span>
                            {app.TabName}
                        </p>
                    );
                })}
                <p className={s.line}></p>
                <p className={s.itemTitle}>Links</p>
                {MoreList.map((app, index) => {
                    return (
                        <p
                            key={index}
                            className={s.menuItem}
                            onClick={() => {
                                handleClick({
                                    TabName: app.title,
                                    path: app.link,
                                });
                            }}
                        >
                            <span
                                className={s.img}
                                style={{ backgroundImage: `url(${app.img2})` }}
                            ></span>
                            {app.title}
                        </p>
                    );
                })}
            </div>
        </div>
    );
});
