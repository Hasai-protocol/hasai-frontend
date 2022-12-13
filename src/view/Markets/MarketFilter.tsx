import { observer } from "mobx-react";
import s from "./index.module.scss";
import cx from "classnames";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { filterList } from "./config";
export default observer(function Markets() {
    const { type } = useParams();
    let nowType = type ? type : 0;
    const [nowIndex, setIndex] = useState(Number(nowType));
    const [filterType, setFilter] = useState(filterList[nowType].poolType);
    const [showFilter, setShowFilter] = useState(false);

    const onChange = (v) => {
        setShowFilter(!showFilter);
        setTimeout(() => {
            setFilter(v.poolType);
            setIndex(v.index);
        }, 100);
    };

    return (
        <div className={s.filterWarp}>
            {filterList.map((f, i) => {
                return (
                    <div
                        key={`${i}-content`}
                        className={cx(
                            s.filterItem,
                            filterType === f.index ? s.active : ""
                        )}
                        onClick={() => {
                            onChange(f);
                        }}
                    >
                        {f.title}
                    </div>
                );
            })}
        </div>
    );
});
