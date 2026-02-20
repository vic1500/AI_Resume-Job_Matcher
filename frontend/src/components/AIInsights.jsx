import Markdown from 'markdown-to-jsx';

const markdownOptions = {
    overrides: {
        h1: {
            component: ({ children }) => <h1 className="text-4xl font-bold text-blue-400 mb-4">{children}</h1>,
        },
        h2: {
            component: ({ children }) => <h2 className="text-2xl font-semibold text-white mt-6 mb-2">{children}</h2>,
        },
        h3: {
            component: ({ children }) => <h3 className="text-xl font-semibold text-white mt-6 mb-2">{children}</h3>
        },
        li: {
            component: ({ children }) => <li className="ml-4 list-disc text-gray-300">{children}</li>,
        },
        strong: {
            component: ({ children }) => <span className="font-bold text-yellow-400">{children}</span>,
        },
    },
};

export default function AIInsights({ markdownContent }) {
  return (
      <div className="text-gray-200">
          <Markdown options={markdownOptions}>
              {markdownContent}
          </Markdown>
      </div>
  );
}