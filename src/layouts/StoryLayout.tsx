import { Headline } from '@components/Headline'
import { useRouter } from 'next/router'
import { stories } from '../../pages/stories'
import colors from '../../src/style/colors'
import { FC } from 'react'
import { Header } from '@components/Header'
import { InternalLink } from '@components/InternalLink'
import { Paragraph } from '@components/Paragraph'
import { LeadParagraph } from '@components/LeadParagraph'

export const StoryLayout: FC = ({ children }) => {
  const { query } = useRouter()
  const story =
    typeof query.id === 'string' && query.id in stories
      ? stories[query.id]
      : Object.values(stories)[0]

  return (
    <>
      <Header className="border-b border-gray-200" />
      <section className="px-4 pt-6 pb-2">
        <InternalLink
          href="/stories"
          className="font-semibold text-gray-500 block mb-4"
        >
          ← Zurück zu der Stories
        </InternalLink>
        <div className="grid grid-cols-[1fr,auto] gap-2">
          <Headline h1>{story.title}</Headline>
          <story.Icon
            size={80}
            strokeWidth={4}
            color1={colors.scale[8]}
            color2={colors.scale[5]}
            color3={colors.scale[2]}
          />
        </div>
        <Paragraph className="italic text-gray-500">
          {story.author} · {story.readingDurationInMinutes} Min
        </Paragraph>
        {story.leadParagraph && (
          <LeadParagraph>{story.leadParagraph}</LeadParagraph>
        )}
      </section>
      <article className="px-4 prose font-serif pb-8">{children}</article>
      <footer className="px-4 pb-12">
        <Paragraph className="italic text-gray-500">{story.author}</Paragraph>
        <br />
        <hr />
        <InternalLink
          href="/stories"
          className="font-semibold text-gray-500 block mt-8"
        >
          ← Zurück zu der Stories
        </InternalLink>
      </footer>
    </>
  )
}
