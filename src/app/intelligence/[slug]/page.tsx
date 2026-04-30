import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getArticle,
  getRelatedArticles,
} from "@/lib/articles";
import { ArticleView } from "./ArticleView";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) {
    return {
      title: "Article not found \u2014 RARE Intelligence",
    };
  }
  return {
    title: `${article.title} \u2014 RARE Intelligence`,
    description: article.preview,
    openGraph: {
      title: article.title,
      description: article.preview,
      type: "article",
      images: article.image ? [{ url: article.image }] : undefined,
    },
  };
}

export default function ArticlePage({ params }: { params: Params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const related = getRelatedArticles(params.slug, 2);
  return <ArticleView article={article} related={related} />;
}
