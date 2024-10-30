import type { ClientSharedServerContext } from '@/types';

export const assignClientContext = <T extends ClientSharedServerContext>(
  props: Partial<T>
) =>
  ({
    pathname: props.pathname ?? '',
    frontmatter: props.frontmatter ?? {},
  }) as T;
