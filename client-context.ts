import { cache } from 'react';
import { assignClientContext } from './util/assignClientContext';
import { ClientSharedServerContext } from './types';

export const getClientContext = cache(() => {
    const serverSharedContext = assignClientContext({});

    return serverSharedContext;
})

export const setClientContext = (data: Partial<ClientSharedServerContext>) => {
    const _data = assignClientContext(data);
  
    getClientContext().pathname = _data.pathname;
    getClientContext().frontmatter = _data.frontmatter;
  };