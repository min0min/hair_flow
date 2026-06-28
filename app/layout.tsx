import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HairFlow HQ',
  description: 'HairFlow 팀 전용 회의/프로젝트 관리 사이트'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
