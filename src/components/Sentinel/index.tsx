import { useRef, useEffect } from 'react';

import { observer } from 'mobx-react';

export default observer(function Sentinel({ onload }) {
    const container = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting) {
                onload();
                observer.disconnect();
            }
        }, {
            rootMargin: '0px 0px 100px 0px'
        });

        observer.observe(container.current!);

        return () => observer.disconnect();
    }, [onload]);

    return (
        <div ref={container} style={{ width: 1, height: 1 }} />
    );
});
