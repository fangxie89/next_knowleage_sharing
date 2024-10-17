import type { FC, PropsWithChildren, ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { MDXContent, MDXComponents } from 'mdx/types'

const components: MDXComponents = {
    code: (props) => {
      // 从 props 中获取代码块的内容
      const { children, className } = props;
      
      // 解析出语言类型
      const language = className?.replace(/language-/, '') || 'javascript';
  
      return (
        <SyntaxHighlighter language={language} style={darcula}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    },
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
