'use client'
import dynamic from 'next/dynamic'
const SocialTool = dynamic(() => import('../components/SocialTool'), { ssr: false })
export default function Page() { return <SocialTool /> }
