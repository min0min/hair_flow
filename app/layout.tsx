import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HairFlow HQ',
  description: 'HairFlow 팀 전용 회의/프로젝트 운영 시스템'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
