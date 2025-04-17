import RemarkMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

export const Markdown = ({ content }: { content: string }) => {
  return (
    <div
      className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none
      prose-headings:font-semibold prose-headings:text-foreground
      prose-h1:text-3xl prose-h1:font-bold
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-h4:text-lg
      prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
      prose-blockquote:text-muted-foreground prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:pl-4 prose-blockquote:py-1
      prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-muted prose-pre:text-muted-foreground prose-pre:border prose-pre:border-border prose-pre:rounded-md
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-img:rounded-md prose-img:shadow-md prose-img:mx-auto
      prose-ol:text-foreground prose-ol:mb-4 prose-ol:pl-8
      prose-ul:text-foreground prose-ul:mb-4 prose-ul:pl-8
      prose-li:my-1
      prose-table:border prose-table:border-border
      prose-th:bg-muted prose-th:text-foreground prose-th:p-2 prose-th:font-semibold
      prose-td:p-2 prose-td:border prose-td:border-border
      prose-hr:border-border prose-hr:my-8
      prose-strong:text-foreground prose-strong:font-semibold
      prose-em:text-foreground"
    >
      <RemarkMarkdown
        remarkPlugins={[[remarkMath, { singleDollarTextMath: false }]]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </RemarkMarkdown>
    </div>
  );
};
