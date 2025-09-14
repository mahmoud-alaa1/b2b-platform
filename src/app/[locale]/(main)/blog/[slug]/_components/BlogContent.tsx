"use client";
import { marked } from "marked";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const html = marked(content);

  return (
    <section className="pb-8 animate-slide-up">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg  prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </section>
  );
}
