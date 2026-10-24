import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticles } from '@/lib/data'
import { PageHero } from '@/components/site/page-hero'
import { CtaLink, Section } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const published = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <PageHero
        eyebrow="News"
        title={article.title}
        description={article.excerpt}
        crumbs={[{ label: 'News', href: '/news' }, { label: article.title }]}
      >
        <p className="font-mono text-xs text-muted-foreground">
          <time dateTime={article.publishedAt}>{published}</time>
          {article.author ? ` · ${article.author}` : null}
        </p>
      </PageHero>
      <Section labelledBy="article-body-title">
        <Reveal>
          <article className="mx-auto max-w-3xl">
          <h2 id="article-body-title" className="sr-only">
            Article
          </h2>
          {article.coverImage ? (
            <div className="relative mb-10 aspect-[16/9] w-full bg-stage">
              <Image
                src={article.coverImage.src}
                alt={article.coverImage.alt}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="space-y-5 text-base leading-relaxed">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/news" variant="outline" arrow={false}>
              All news
            </CtaLink>
            <CtaLink href="/contact#rfq">Request a quote</CtaLink>
          </div>
          </article>
        </Reveal>
      </Section>
    </>
  )
}
