import type { MDXComponents } from "mdx/types";
import Image from "next/image";

const components: MDXComponents = {
  h1: (props) => (
    <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-3xl font-semibold text-gray-900 mt-6 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-2xl font-medium text-gray-900 mt-4 mb-2" {...props} />
  ),
  h4: (props) => (
    <h4 className="text-xl font-medium text-gray-800 mt-4 mb-2" {...props} />
  ),
  h5: (props) => (
    <h5 className="text-lg font-medium text-gray-800 mt-3 mb-1" {...props} />
  ),
  h6: (props) => (
    <h6 className="text-base font-medium text-gray-700 mt-2 mb-1" {...props} />
  ),
  p: (props) => <p className="my-4 text-gray-800" {...props} />,
  a: (props) => (
    <a className="text-blue-600 underline hover:text-blue-800" {...props} />
  ),
  ul: (props) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: (props) => <li className="mb-2" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
      {...props}
    />
  ),
  code: (props) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />
  ),
  pre: (props) => (
    <pre
      className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto my-4"
      {...props}
    />
  ),
  table: (props) => (
    <table className="w-full border-collapse my-4" {...props} />
  ),
  th: (props) => (
    <th className="border-b-2 border-gray-300 text-left px-2 py-1" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-gray-200 px-2 py-1" {...props} />
  ),
  hr: (props) => <hr className="border-gray-300 my-8" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  img: (props) => (
    <Image className="my-4 rounded shadow" alt={props.alt ?? ""} {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
