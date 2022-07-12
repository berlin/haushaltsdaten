import { Story, Meta } from '@storybook/react'
import { Paragraph, ParagraphPropType } from '.'

export default {
  title: 'UI Elements/Paragraph',
  component: Paragraph,
} as Meta

const Template: Story<ParagraphPropType> = ({ children = '', ...props }) => (
  <>
    <Paragraph {...props}>{children}</Paragraph>
    <Paragraph>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione eum
      aliquid velit corrupti, assumenda molestias cum! Laboriosam tenetur
      deleniti quidem, quis totam accusantium ut! Ullam soluta itaque eius atque
      aliquam.
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

export const WithDropCap = Template.bind({})
WithDropCap.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
WithDropCap.args = {
  children:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor excepturi eaque vel ipsam quae recusandae fugiat, alias id laboriosam assumenda nihil, ut a suscipit officiis consectetur optio mollitia, earum soluta?\nQuasi possimus amet natus dolore quisquam. Recusandae, numquam! Omnis sapiente placeat cumque veniam dolore dolores suscipit ratione quae distinctio est dolor quod ipsam totam molestiae provident, vitae possimus soluta. Et.',
  dropCap: true,
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
