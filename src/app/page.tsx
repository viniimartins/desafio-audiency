import { Flex, Layout } from 'antd'

import { HeaderComponent } from '@/components/header'

import { ContentComponent } from './content'

export default function Home() {
  return (
    <Flex>
      <Layout>
        <HeaderComponent />
        <ContentComponent />
      </Layout>
    </Flex>
  )
}
