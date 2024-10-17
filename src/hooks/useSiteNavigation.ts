import { siteNavigation } from '@/next.json.mjs';
import type { NavigationKey, NavigationEntry } from '@/types/navigation';

type Navigation = Record<string, NavigationEntry>;

export interface MappedNavigationEntry {
    items: Array<[string, MappedNavigationEntry]>;
    label: string;
    link: string;
  }

const useSiteNavigation = () => {
    const mapNavigationEntries = (entries: Navigation) => {
        return Object.entries(entries).map(
            ([key, {label, link, items}]): [
                string,
                MappedNavigationEntry
            ] => [
                key, 
                {
                label: label || '',
                link: link || '',
                items: items ? mapNavigationEntries(items) : []
            }])
    }
    const getSideNavigation = (key: NavigationKey) => {
        const navigationEntries: Navigation = [key].reduce(
            (acc, key) => ({ ...acc, [key]: siteNavigation.sideNavigation[key] }),
            {}
          );
        
          return mapNavigationEntries(navigationEntries);
    }
    const navigationItems = mapNavigationEntries(siteNavigation.topNavigation);

    return { navigationItems, getSideNavigation };
}

export default useSiteNavigation;