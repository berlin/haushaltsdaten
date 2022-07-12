import { Paragraph } from '@components/Paragraph'
import { Story, Meta } from '@storybook/react'
import { LeadParagraph, LeadParagraphPropType } from '.'

export default {
  title: 'UI Elements/LeadParagraph',
  component: LeadParagraph,
} as Meta

const Template: Story<LeadParagraphPropType> = ({
  children = '',
  ...props
}) => (
  <>
    <LeadParagraph {...props}>{children}</LeadParagraph>
    <Paragraph>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
      recusandae quis fugiat voluptatem placeat voluptatibus, ipsam rem velit,
      ut nihil quibusdam perspiciatis, inventore accusamus quidem sint et
      voluptate rerum aut!
    </Paragraph>
  </>
)

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Default.args = {
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsam aut fuga nemo delectus ea soluta, nihil incidunt vero totam dolores, eligendi iusto veniam hic ducimus distinctio, dolor corrupti inventore!',
}

export const WithFormatting = Template.bind({})
WithFormatting.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
WithFormatting.args = {
  children: (
    <>
      <em>Lorem ipsum dolor sit amet consectetur</em>, adipisicing elit. Dolor
      excepturi eaque vel ipsam quae <strong>recusandae fugiat</strong>, alias
      id laboriosam assumenda nihil, ut a suscipit officiis{' '}
      <u>consectetur optio mollitia</u>, earum soluta?
      <br />
      Quasi possimus amet natus dolore quisquam. Recusandae, numquam! Omnis
      sapiente placeat ❤️ veniam dolore dolores suscipit ratione quae distinctio
      est 🔥 quod ipsam totam molestiae provident, 😜 possimus soluta. Et.
    </>
  ),
}
