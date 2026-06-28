import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HairFlow HQ",
  description: "HairFlow 팀 회의/작업 관리 사이트"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
