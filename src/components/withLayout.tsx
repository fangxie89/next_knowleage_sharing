import type { FC, PropsWithChildren } from "react";
import HomeLayout from '@/src/layouts/Home';
import PageLayout from '@/src/layouts/Page';
import type { Layouts } from "@/types/layouts";
import { PageLayoutKey } from "@/types/navigation";

const layouts: Record<string, FC> = {
    home: HomeLayout
};

const pageLayoutKey = ['react', 'vue', 'next', 'nuxt'] as Array<PageLayoutKey>;

type WithLayoutProps<L = Layouts> = PropsWithChildren<{ layout: L }>

const WithLayout: FC<WithLayoutProps> = ({ children, layout }) => {
    if (pageLayoutKey.includes(layout as PageLayoutKey)) {
        return (<PageLayout navKey={layout as PageLayoutKey}>{children}</PageLayout>);
    }

    const LayoutComponents = layouts[layout];
    return (
        <LayoutComponents>{children}</LayoutComponents>
    )
}

export default WithLayout;