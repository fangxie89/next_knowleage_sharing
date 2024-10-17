import type { PropsWithChildren,FC } from "react";

import styles from './layouts.module.css';

const BaseLayout: FC<PropsWithChildren> = ({children}) => {
    return (
    <div className={styles.baseLayout}>
        {children}
    </div>
    )
}

export default BaseLayout;