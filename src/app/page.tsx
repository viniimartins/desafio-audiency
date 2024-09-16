import { Layout } from 'antd'

import { HeaderComponent } from '@/components/header'

import { ContentComponent } from './content'

export default function Home() {
  return (
    <Layout>
      <HeaderComponent />
      <ContentComponent />
    </Layout>
  )
}
