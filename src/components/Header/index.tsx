import { useNavigate, useMatch, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import cx from "classnames";
import { useEffect, useMemo } from "react";

import { TopTabs } from "src/config";
import { useStores } from "src/hooks";

import s from "./index.module.scss";

export default observer(function Header() {
    const {
        store: { formatWalletAddress, handleConnectWallet },
    } = useStores();
    const nav = useNavigate();
    let location = useLocation();
    const isHome = useMatch(TopTabs[0]);
    const isAccount = useMatch(TopTabs[1]);
    const isTest = useMatch(TopTabs[2]);

    const handleClick = ({ path }) => {
        nav(path);
    };
    const headerClass = useMemo(() => {
        const { pathname } = location;
        if (pathname === "/") {
            return s.index;
        }
        return s.other;
    }, [location]);

    return (
        <div className={cx(s.wrap, headerClass)}>
            <div style={{ cursor: "pointer" }} onClick={() => nav("/")}>
                <svg
                    width="118"
                    height="60"
                    viewBox="0 0 118 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.1245 17H17L8.8755 36H0L8.1245 17ZM9.41671 19.0715L3.0638 33.9285H7.58329L13.9362 19.0715H9.41671ZM15.6089 25H24L19.3911 36H11L15.6089 25ZM16.8292 27.0036L13.8993 33.9964H18.1708L21.1007 27.0036H16.8292ZM35 25H26.1245L18 43H26.8755L35 25ZM21.0638 41.0375L27.4167 26.9625H31.9362L25.5833 41.0375H21.0638Z"
                        fill="#088F57"
                    />
                    <mask
                        id="path-2-outside-1_380_410"
                        maskUnits="userSpaceOnUse"
                        x="43.6363"
                        y="21.6159"
                        width="74.8172"
                        height="14.905"
                        fill="black"
                    >
                        <rect
                            fill="white"
                            x="43.6363"
                            y="21.6159"
                            width="74.8172"
                            height="14.905"
                        />
                        <path d="M59.1825 24.4266L57.6079 28.4611H49.9046L51.4855 24.4106H49.3628L45.0061 35.5734H47.1288L49.1266 30.4545H56.8299L54.8321 35.5734H56.9719L61.3223 24.4266H59.1825Z" />
                        <path d="M73.6267 33.5801L72.1897 24.4106L63.5953 33.5801L61.7326 35.5894H64.1292L66.009 33.5801L70.4719 28.812L71.2301 33.5801L71.5415 35.5894H73.938L73.6267 33.5801Z" />
                        <path d="M92.2381 27.4884L92.2568 27.4405C92.9103 25.7661 92.0013 24.4106 90.2039 24.4106H85.3423C83.562 24.4106 81.595 25.7661 80.9415 27.4405L80.9228 27.4884C80.6739 28.1262 80.649 28.7163 80.8156 29.2106C80.8731 29.3701 80.965 29.5296 81.063 29.6731C81.4225 30.1993 82.0855 30.5183 82.9586 30.5183H87.2724C88.1797 30.5183 88.6652 31.204 88.3354 32.0492C88.0055 32.8944 86.9847 33.5801 86.0774 33.5801H82.3285C81.4041 33.5801 80.9356 32.8944 81.2655 32.0492H79.1428C78.3835 33.9947 79.4449 35.5734 81.5505 35.5734H85.2994C87.3879 35.5734 89.6988 33.9947 90.4581 32.0492C90.7879 31.204 90.7785 30.4385 90.4735 29.8166C90.4579 29.7688 90.4252 29.7209 90.3926 29.6731C89.9879 28.9555 89.1693 28.509 88.0566 28.509H83.7428C83.1436 28.509 82.8214 28.0625 83.0455 27.4884L83.0642 27.4405C83.2882 26.8664 83.9589 26.4199 84.5581 26.4199H89.4197C90.036 26.4199 90.3581 26.8664 90.1341 27.4405L90.1154 27.4884H92.2381Z" />
                        <path d="M104.8 33.5801L103.363 24.4106L94.7684 33.5801L92.9057 35.5894H95.3023L97.1821 33.5801L101.645 28.812L102.403 33.5801L102.715 35.5894H105.111L104.8 33.5801Z" />
                        <path d="M111.999 35.5734L116.35 24.4266H114.227L109.877 35.5734H111.999Z" />
                    </mask>
                    <path
                        d="M59.1825 24.4266L59.5461 23.495H58.5461L58.1825 24.4266H59.1825ZM57.6079 28.4611L57.2443 29.3927H58.2443L58.6079 28.4611H57.6079ZM49.9046 28.4611H48.9046L48.541 29.3927H49.541L49.9046 28.4611ZM51.4855 24.4106H52.4855L52.8491 23.479H51.8491L51.4855 24.4106ZM49.3628 24.4106L49.7264 23.479H48.7264L48.3628 24.4106H49.3628ZM45.0061 35.5734H44.0061L43.6425 36.505H44.6425L45.0061 35.5734ZM47.1288 35.5734L46.7652 36.505H47.7652L48.1288 35.5734H47.1288ZM49.1266 30.4545L49.4902 29.5229H48.4902L48.1266 30.4545H49.1266ZM56.8299 30.4545H57.8299L58.1935 29.5229H57.1935L56.8299 30.4545ZM54.8321 35.5734H53.8321L53.4685 36.505H54.4685L54.8321 35.5734ZM56.9719 35.5734L56.6083 36.505H57.6083L57.9719 35.5734H56.9719ZM61.3223 24.4266H62.3223L62.6859 23.495H61.6859L61.3223 24.4266ZM73.6267 33.5801L74.6829 33.1582L74.6827 33.1571L73.6267 33.5801ZM72.1897 24.4106L73.2458 23.9877L72.9905 22.3588L71.4638 23.9877L72.1897 24.4106ZM63.5953 33.5801L62.8693 33.1571L62.8635 33.1635L63.5953 33.5801ZM61.7326 35.5894L61.0008 35.1728L59.751 36.521H61.369L61.7326 35.5894ZM64.1292 35.5894L63.7656 36.521H64.3793L64.8561 36.0113L64.1292 35.5894ZM66.009 33.5801L65.2823 33.1579L65.2821 33.1582L66.009 33.5801ZM70.4719 28.812L71.5277 28.3876L71.2692 26.7616L69.7452 28.3898L70.4719 28.812ZM71.2301 33.5801L72.2863 33.1582L72.2859 33.1557L71.2301 33.5801ZM71.5415 35.5894L70.4852 36.0113L70.5642 36.521H71.1779L71.5415 35.5894ZM73.938 35.5894L73.5745 36.521H75.204L74.9943 35.1675L73.938 35.5894ZM92.2381 27.4884L91.8745 28.4199H92.8745L93.2381 27.4884H92.2381ZM80.8156 29.2106L79.7837 29.7331L79.7857 29.739L79.7878 29.7448L80.8156 29.2106ZM81.063 29.6731L80.0988 30.3318L80.0988 30.3318L81.063 29.6731ZM81.2655 32.0492H82.2655L82.6291 31.1176H81.6291L81.2655 32.0492ZM79.1428 32.0492L79.5064 31.1176H78.5064L78.1428 32.0492H79.1428ZM90.4735 29.8166L89.4398 30.3333L89.4523 30.3718L89.4698 30.4075L90.4735 29.8166ZM90.3926 29.6731L89.4036 30.292L89.4151 30.3124L89.4284 30.3318L90.3926 29.6731ZM90.1154 27.4884H89.1154L88.7518 28.4199H89.7518L90.1154 27.4884ZM104.8 33.5801L105.856 33.1582L105.856 33.1571L104.8 33.5801ZM103.363 24.4106L104.419 23.9877L104.164 22.3588L102.637 23.9877L103.363 24.4106ZM94.7684 33.5801L94.0424 33.1571L94.0366 33.1635L94.7684 33.5801ZM92.9057 35.5894L92.1739 35.1728L90.9241 36.521H92.5421L92.9057 35.5894ZM95.3023 35.5894L94.9387 36.521H95.5524L96.0292 36.0113L95.3023 35.5894ZM97.1821 33.5801L96.4554 33.1579L96.4552 33.1582L97.1821 33.5801ZM101.645 28.812L102.701 28.3876L102.442 26.7616L100.918 28.3898L101.645 28.812ZM102.403 33.5801L103.459 33.1582L103.459 33.1557L102.403 33.5801ZM102.715 35.5894L101.658 36.0113L101.737 36.521H102.351L102.715 35.5894ZM105.111 35.5894L104.748 36.521H106.377L106.167 35.1675L105.111 35.5894ZM111.999 35.5734L111.636 36.505H112.636L112.999 35.5734H111.999ZM116.35 24.4266H117.35L117.713 23.495H116.713L116.35 24.4266ZM114.227 24.4266L114.591 23.495H113.591L113.227 24.4266H114.227ZM109.877 35.5734H108.877L108.513 36.505H109.513L109.877 35.5734ZM58.1825 24.4266L56.6079 28.4611H58.6079L60.1825 24.4266H58.1825ZM57.9715 27.5296H50.2682L49.541 29.3927H57.2443L57.9715 27.5296ZM50.9046 28.4611L52.4855 24.4106H50.4855L48.9046 28.4611H50.9046ZM51.8491 23.479H49.7264L48.9992 25.3422H51.1219L51.8491 23.479ZM48.3628 24.4106L44.0061 35.5734H46.0061L50.3628 24.4106H48.3628ZM44.6425 36.505H46.7652L47.4924 34.6419H45.3697L44.6425 36.505ZM48.1288 35.5734L50.1266 30.4545H48.1266L46.1288 35.5734H48.1288ZM48.7631 31.3861H56.4663L57.1935 29.5229H49.4902L48.7631 31.3861ZM55.8299 30.4545L53.8321 35.5734H55.8321L57.8299 30.4545H55.8299ZM54.4685 36.505H56.6083L57.3354 34.6419H55.1956L54.4685 36.505ZM57.9719 35.5734L62.3223 24.4266H60.3223L55.9719 35.5734H57.9719ZM61.6859 23.495H59.5461L58.819 25.3581H60.9588L61.6859 23.495ZM74.6827 33.1571L73.2458 23.9877L71.1336 24.8336L72.5706 34.003L74.6827 33.1571ZM71.4638 23.9877L62.8694 33.1571L64.3212 34.003L72.9156 24.8336L71.4638 23.9877ZM62.8635 33.1635L61.0008 35.1728L62.4645 36.006L64.3271 33.9967L62.8635 33.1635ZM61.369 36.521H63.7656L64.4928 34.6578H62.0962L61.369 36.521ZM64.8561 36.0113L66.7359 34.002L65.2821 33.1582L63.4023 35.1675L64.8561 36.0113ZM66.7356 34.0022L71.1986 29.2341L69.7452 28.3898L65.2823 33.1579L66.7356 34.0022ZM69.4161 29.2363L70.1743 34.0044L72.2859 33.1557L71.5277 28.3876L69.4161 29.2363ZM70.1739 34.0019L70.4852 36.0113L72.5977 35.1675L72.2863 33.1582L70.1739 34.0019ZM71.1779 36.521H73.5745L74.3016 34.6578H71.905L71.1779 36.521ZM74.9943 35.1675L74.6829 33.1582L72.5704 34.0019L72.8818 36.0113L74.9943 35.1675ZM93.2381 27.4884L93.2568 27.4405H91.2568L91.2381 27.4884H93.2381ZM93.2568 27.4405C94.1086 25.258 92.9241 23.479 90.5675 23.479L89.8403 25.3422C91.0786 25.3422 91.712 26.2742 91.2568 27.4405H93.2568ZM90.5675 23.479H85.7059L84.9787 25.3422H89.8403L90.5675 23.479ZM85.7059 23.479C83.363 23.479 80.792 25.2613 79.9415 27.4405H81.9415C82.398 26.2709 83.761 25.3422 84.9787 25.3422L85.7059 23.479ZM79.9415 27.4405L79.9228 27.4884H81.9228L81.9415 27.4405H79.9415ZM79.9228 27.4884C79.5995 28.3167 79.5664 29.088 79.7837 29.7331L81.8474 28.6882C81.7316 28.3445 81.7482 27.9358 81.9228 27.4884H79.9228ZM79.7878 29.7448C79.8677 29.966 79.9872 30.1684 80.0988 30.3318L82.0272 29.0144C81.9427 28.8907 81.8786 28.7742 81.8433 28.6764L79.7878 29.7448ZM80.0988 30.3318C80.5774 31.0323 81.456 31.4498 82.595 31.4498L83.3221 29.5867C82.715 29.5867 82.2677 29.3664 82.0272 29.0144L80.0988 30.3318ZM82.595 31.4498H86.9088L87.636 29.5867H83.3221L82.595 31.4498ZM86.9088 31.4498C87.2773 31.4498 87.4596 31.731 87.3354 32.0492H89.3354C89.8709 30.677 89.082 29.5867 87.636 29.5867L86.9088 31.4498ZM87.3354 32.0492C87.2112 32.3674 86.8095 32.6485 86.441 32.6485L85.7138 34.5116C87.1599 34.5116 88.7998 33.4214 89.3354 32.0492H87.3354ZM86.441 32.6485H82.6921L81.9649 34.5116H85.7138L86.441 32.6485ZM82.6921 32.6485C82.3132 32.6485 82.1389 32.3736 82.2655 32.0492H80.2655C79.7324 33.4151 80.495 34.5116 81.9649 34.5116L82.6921 32.6485ZM81.6291 31.1176H79.5064L78.7792 32.9807H80.9019L81.6291 31.1176ZM78.1428 32.0492C77.1838 34.5064 78.5261 36.505 81.1869 36.505L81.9141 34.6419C80.3637 34.6419 79.5832 33.483 80.1428 32.0492H78.1428ZM81.1869 36.505H84.9359L85.663 34.6419H81.9141L81.1869 36.505ZM84.9359 36.505C87.5766 36.505 90.498 34.5092 91.4581 32.0492H89.4581C88.8996 33.4802 87.1992 34.6419 85.663 34.6419L84.9359 36.505ZM91.4581 32.0492C91.8738 30.9839 91.8622 30.0106 91.4772 29.2257L89.4698 30.4075C89.6949 30.8664 89.702 31.4241 89.4581 32.0492H91.4581ZM91.5072 29.2999C91.4616 29.1596 91.3765 29.0433 91.3568 29.0144L89.4284 30.3318C89.4325 30.3379 89.436 30.343 89.4394 30.348C89.4427 30.3529 89.4455 30.357 89.4479 30.3607C89.4529 30.3683 89.4555 30.3724 89.4566 30.3743C89.4578 30.3763 89.4563 30.374 89.4535 30.3682C89.4507 30.3625 89.4454 30.3507 89.4398 30.3333L91.5072 29.2999ZM91.3815 29.0542C90.8685 28.1445 89.8281 27.5774 88.4202 27.5774L87.693 29.4405C88.5105 29.4405 89.1073 29.7665 89.4036 30.292L91.3815 29.0542ZM88.4202 27.5774H84.1063L83.3792 29.4405H87.693L88.4202 27.5774ZM84.1063 27.5774C84.0776 27.5774 84.0582 27.5675 84.0472 27.5517C84.0372 27.5373 84.0339 27.5182 84.0455 27.4884H82.0455C81.617 28.5864 82.238 29.4405 83.3792 29.4405L84.1063 27.5774ZM84.0455 27.4884L84.0642 27.4405H82.0642L82.0455 27.4884H84.0455ZM84.0642 27.4405C84.0758 27.4107 84.094 27.3916 84.1153 27.3772C84.1386 27.3614 84.1658 27.3515 84.1945 27.3515L84.9217 25.4884C83.7804 25.4884 82.4927 26.3425 82.0642 27.4405H84.0642ZM84.1945 27.3515H89.0561L89.7833 25.4884H84.9217L84.1945 27.3515ZM89.0561 27.3515C89.1007 27.3515 89.1226 27.3663 89.1327 27.3807C89.142 27.3939 89.1455 27.4112 89.1341 27.4405H91.1341C91.5663 26.3332 90.9314 25.4884 89.7833 25.4884L89.0561 27.3515ZM89.1341 27.4405L89.1154 27.4884H91.1154L91.1341 27.4405H89.1341ZM89.7518 28.4199H91.8745L92.6017 26.5568H90.479L89.7518 28.4199ZM105.856 33.1571L104.419 23.9877L102.307 24.8336L103.744 34.003L105.856 33.1571ZM102.637 23.9877L94.0425 33.1571L95.4943 34.003L104.089 24.8336L102.637 23.9877ZM94.0366 33.1635L92.1739 35.1728L93.6375 36.006L95.5002 33.9967L94.0366 33.1635ZM92.5421 36.521H94.9387L95.6659 34.6578H93.2693L92.5421 36.521ZM96.0292 36.0113L97.909 34.002L96.4552 33.1582L94.5754 35.1675L96.0292 36.0113ZM97.9087 34.0022L102.372 29.2341L100.918 28.3898L96.4554 33.1579L97.9087 34.0022ZM100.589 29.2363L101.347 34.0044L103.459 33.1557L102.701 28.3876L100.589 29.2363ZM101.347 34.002L101.658 36.0113L103.771 35.1675L103.459 33.1582L101.347 34.002ZM102.351 36.521H104.748L105.475 34.6578H103.078L102.351 36.521ZM106.167 35.1675L105.856 33.1582L103.744 34.0019L104.055 36.0113L106.167 35.1675ZM112.999 35.5734L117.35 24.4266H115.35L110.999 35.5734H112.999ZM116.713 23.495H114.591L113.863 25.3581H115.986L116.713 23.495ZM113.227 24.4266L108.877 35.5734H110.877L115.227 24.4266H113.227ZM109.513 36.505H111.636L112.363 34.6419H110.24L109.513 36.505Z"
                        fill="#088F57"
                        mask="url(#path-2-outside-1_380_410)"
                    />
                </svg>
            </div>
            {location.pathname !== "/" && (
                <>
                    <div className={s.tabs}>
                        {TopTabs.map((tab, index) => {
                            let isActive = false;
                            if (index === 0 && isHome) {
                                isActive = true;
                            }
                            if (index === 1 && isAccount) {
                                isActive = true;
                            }
                            if (index === 2 && isTest) {
                                isActive = true;
                            }
                            return (
                                <div
                                    key={tab.TabIndex}
                                    className={cx(s.tab, {
                                        [s.active]: isActive,
                                    })}
                                    onClick={() => handleClick(tab)}
                                >
                                    {tab.TabName}
                                </div>
                            );
                        })}
                    </div>

                    <div
                        onClick={handleConnectWallet}
                        className={cx(
                            s.account,
                            "flex-box",
                            "align-center",
                            "justify-center"
                        )}
                    >
                        <p className={s.address}>
                            {formatWalletAddress || "Launch App"}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
});
