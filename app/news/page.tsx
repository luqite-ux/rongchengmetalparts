import type { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { getArticles, getPageMeta } from '@/lib/data'
import { PageHero } from '@/components/site/page-hero'
import { CtaLink, Section } from '@/components/site/primitives'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta()
  return {
    title: meta.news.title,
    description: meta.news.description,
    alternates: { canonical: '/news' },
  }
}

export default async function NewsPage() {
  const articles = await getArticles()

  return (
    <>
      <PageHero
        eyebrow="News"
        title="News and updates"
        description="Announcements and articles from RunCing Tech."
        crumbs={[{ label: 'News' }]}
      />
      <Section labelledBy="news-list-title">
        <h2 id="news-list-title" className="sr-only">
          Articles
        </h2>
        {articles.length === 0 ? (
          <Empty className="border-2 border-dashed">
            <EmptyHeader>
              <EmptyMedia>
                <Newspaper aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>No articles published yet</EmptyTitle>
              <EmptyDescription>
                RunCing has not published any news. Articles will appear here once real content is
                available.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/products">Browse products</CtaLink>
                <CtaLink href="/contact#rfq" variant="outline" arrow={false}>
                  Request a quote
                </CtaLink>
              </div>
            </EmptyContent>
          </Empty>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/news/${article.slug}`}
                  className="flex h-full min-h-11 flex-col border-2 border-border bg-card p-6 transition-colors duration-200 hover:border-primary motion-reduce:transition-none"
                >
                  <time
                    dateTime={article.publishedAt}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{article.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  )
}
