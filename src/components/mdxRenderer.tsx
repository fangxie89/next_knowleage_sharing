import type { FC, PropsWithChildren, ReactNode } from "react";
import type { MDXContent, MDXComponents } from 'mdx/types'
import MDXCodeBox from "./MDX/CodeBox";

const components: MDXComponents = {
    pre: MDXCodeBox,
    h1: ({ children }) => (
      <h1 className="text-2xl my-4 mx-2 pt-2 relative leading-normal text-gray-800">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl my-4 mx-2 pt-2 relative leading-normal text-green-800">
        {children}
      </h2>
    ),
    li: ({ children }) => (
      <li className="list-disc ml-10">
        {children}
      </li>
    ),
  
    p: ({ children }) => (
      <p className="text-gray-500 leading-normal mb-5">
        {children}
      </p>
    )
  };
  
const MDXRenderer: FC<{ Component: MDXContent }> = ({ Component }) => {
    return (<Component components={components} />)
  };

export default MDXRenderer;
