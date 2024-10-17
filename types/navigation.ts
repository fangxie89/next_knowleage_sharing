export type NavigationKey = 'about' | 'vue' | 'nuxt' | 'react' | 'next' | 'blog';

export type PageLayoutKey = 'vue' | 'nuxt' | 'react' | 'next' ;

export type NavigationEntry = {
    label?: string,
    link?: string,
    items: Record<string, NavigationEntry>
}

export type SiteNavigation = {
    topNavigation: Record<NavigationKey, NavigationEntry>
}
