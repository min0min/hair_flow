import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'HairFlow HQ', description: '팀 프로젝트 운영 대시보드' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
