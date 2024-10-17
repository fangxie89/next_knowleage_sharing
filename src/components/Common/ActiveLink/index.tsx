import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type {ComponentProps, FC } from "react";

type AcitveLinkProps = ComponentProps<typeof Link> & {
    activeClassName?: string;
    allowSubPath?: boolean;
};

const ActiveLink: FC<AcitveLinkProps> = ({href, children, className, activeClassName = 'active', allowSubPath}) => {
    const pathname = usePathname() as string;

    return (<Link href={href} className={classNames(className, {[activeClassName]: allowSubPath ? pathname.startsWith(`/${href.toString().split('/')[1]}`) : href === pathname})}>{children}</Link>)
}

export default ActiveLink;