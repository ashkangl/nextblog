"use client"
import dynamic from 'next/dynamic'
 
const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/posts/Posts'),
  { ssr: false }
)
const Page = () => {
    return(
        <div>
            <DynamicComponentWithNoSSR />
        </div>
    )
}

export default Page