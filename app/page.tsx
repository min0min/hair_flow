"use client";

import { useMemo, useState } from "react";

type SectionKey = "dashboard" | "projects" | "tasks" | "meetings" | "team" | "docs" | "settings";

const navItems: { key: SectionKey; label: string; icon: string }[] = [
  { key: "dashboard", label: "대시보드", icon: "🏠" },
  { key: "projects", label: "프로젝트", icon: "📁" },
  { key: "tasks", label: "Task", icon: "📋" },
  { key: "meetings", label: "회의록", icon: "📝" },
  { key: "team", label: "팀원", icon: "👥" },
  { key: "docs", label: "문서", icon: "📚" },
  { key: "settings", label: "설정", icon: "⚙️" },
];

const tasks = [
  { title: "MVP 핵심 기능 확정", owner: "유민", status: "진행중", priority: "P0", column: "Backlog" },
  { title: "회의록 템플릿 정리", owner: "건우", status: "검토", priority: "P1", column: "Todo" },
  { title: "GitHub / Railway 배포 확인", owner: "재승", status: "완료", priority: "P0", column: "Doing" },
  { title: "모바일 화면 점검", owner: "현승", status: "대기", priority: "P1", column: "Review" },
  { title: "팀원 초대 플로우 정리", owner: "유민", status: "대기", priority: "P2", column: "Done" },
];

const meetings = [
  { title: "1차 기획 회의", date: "오늘 20:00", summary: "회의 사이트 범위 확정, 역할 분담", tag: "기획" },
  { title: "개발 스프린트 리뷰", date: "수요일", summary: "대시보드/Task/회의록 진행상황 점검", tag: "개발" },
  { title: "팀 운영 방식 회의", date: "금요일", summary: "회의록 작성 규칙과 배포 방식 정리", tag: "운영" },
];

const team = [
  { name: "유민", progress: 75, memo: "기획 / PM" },
  { name: "건우", progress: 48, memo: "역할 미정" },
  { name: "재승", progress: 62, memo: "역할 미정" },
  { name: "현승", progress: 35, memo: "역할 미정" },
];

const columns = ["Backlog", "Todo", "Doing", "Review", "Done"];

const sectionTitle: Record<SectionKey, string> = {
  dashboard: "오늘 회의와 작업을 한눈에.",
  projects: "프로젝트 진행상황을 모아보기.",
  tasks: "해야 할 일을 칸반으로 관리하기.",
  meetings: "회의록과 결정사항을 빠르게 정리하기.",
  team: "팀원별 진행상황 확인하기.",
  docs: "기획/개발 문서를 한곳에 모아보기.",
  settings: "워크스페이스 설정 관리하기.",
};

export default function Page() {
  const [active, setActive] = useState<SectionKey>("dashboard");

  const activeLabel = useMemo(() => navItems.find((item) => item.key === active)?.label ?? "대시보드", [active]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dff7ff,transparent_28%),linear-gradient(135deg,#f8fafc,#eef2ff)] text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-3 py-3 sm:px-4 lg:flex-row lg:gap-6 lg:px-5 lg:py-6">
        <aside className="hidden w-64 shrink-0 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-soft backdrop-blur lg:block">
          <div className="mb-8 flex items-center gap-3">
            <button onClick={() => setActive("dashboard")} className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white transition hover:scale-105">HF</button>
            <div>
              <p className="text-sm text-slate-500">회의용 워크스페이스</p>
              <h1 className="text-xl font-black tracking-tight">HairFlow HQ</h1>
            </div>
          </div>
          <nav className="space-y-2 text-sm font-semibold text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left transition ${active === item.key ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15" : "hover:bg-slate-100"}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-4 text-white">
            <p className="text-xs opacity-80">현재 스프린트</p>
            <p className="mt-1 text-lg font-black">Sprint 01</p>
            <div className="mt-4 h-2 rounded-full bg-white/25"><div className="h-2 w-[52%] rounded-full bg-white" /></div>
            <p className="mt-2 text-xs opacity-85">진행률 52%</p>
          </div>
        </aside>

        <div className="sticky top-0 z-20 -mx-3 border-b border-white/60 bg-white/80 px-3 py-3 backdrop-blur lg:hidden">
          <div className="mb-3 flex items-center justify-between">
            <button onClick={() => setActive("dashboard")} className="flex items-center gap-2 rounded-2xl bg-slate-950 px-3 py-2 text-sm font-black text-white">
              <span className="grid h-7 w-7 place-items-center rounded-xl bg-white/10">HF</span>
              HairFlow HQ
            </button>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">{activeLabel}</span>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-bold transition ${active === item.key ? "bg-slate-950 text-white" : "bg-white text-slate-600 shadow-sm"}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>

        <section className="flex-1 space-y-4 sm:space-y-6">
          <header className="flex flex-col justify-between gap-4 rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-soft backdrop-blur sm:p-6 md:flex-row md:items-center">
            <div>
              <p className="font-semibold text-blue-600">HairFlow 팀 전용 회의 사이트 · {activeLabel}</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{sectionTitle[active]}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">회의록, Task, 프로젝트 진행률, 팀원 현황을 한 공간에서 관리하는 팀 전용 HQ입니다.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setActive("meetings")} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5">+ 새 회의록</button>
              <button onClick={() => setActive("tasks")} className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5">Task 보기</button>
            </div>
          </header>

          {active === "dashboard" && <Dashboard setActive={setActive} />}
          {active === "projects" && <Projects />}
          {active === "tasks" && <TaskBoard />}
          {active === "meetings" && <Meetings />}
          {active === "team" && <Team />}
          {active === "docs" && <Docs />}
          {active === "settings" && <Settings />}
        </section>
      </div>
    </main>
  );
}

function Dashboard({ setActive }: { setActive: (key: SectionKey) => void }) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["프로젝트 진행률", "52%", "MVP 기준", "projects"],
          ["오늘 할 일", "4개", "P0 2개", "tasks"],
          ["최근 회의", "3건", "이번 주", "meetings"],
          ["팀원", "4명", "역할 배정", "team"],
        ].map(([label, value, sub, key]) => (
          <button key={label} onClick={() => setActive(key as SectionKey)} className="rounded-3xl border border-white/70 bg-white/85 p-5 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
            <p className="mt-1 text-xs text-slate-400">{sub}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <TaskBoard compact />
        <section className="space-y-4">
          <Meetings compact />
          <Team dark />
        </section>
      </div>
    </>
  );
}

function Projects() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_.8fr]">
      <div className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-soft">
        <h3 className="text-xl font-black">📁 HairFlow 프로젝트</h3>
        <p className="mt-2 text-sm text-slate-500">현재는 회의용 HQ 구축을 먼저 진행 중입니다. 실제 탈모 서비스 개발은 별도 프로젝트로 분리합니다.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["기획", "디자인", "개발"].map((item, i) => (
            <div key={item} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-500">{item}</p>
              <p className="mt-2 text-2xl font-black">{[68, 45, 52][i]}%</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-white/70 bg-slate-950 p-5 text-white shadow-soft">
        <p className="text-sm text-white/60">현재 버전</p>
        <h3 className="mt-1 text-3xl font-black">v0.2</h3>
        <p className="mt-3 text-sm leading-6 text-white/60">모바일 대응, 페이지 클릭 전환, 팀원 현황 업데이트가 포함된 버전입니다.</p>
      </div>
    </section>
  );
}

function TaskBoard({ compact = false }: { compact?: boolean }) {
  return (
    <section className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-soft sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-black">📋 Task Board</h3>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">클릭 가능</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
        {columns.map((column) => (
          <div key={column} className={`min-w-[190px] rounded-2xl bg-slate-50 p-3 ${compact ? "min-h-72" : "min-h-[26rem]"}`}>
            <p className="mb-3 text-sm font-black text-slate-500">{column}</p>
            {tasks.filter((task) => task.column === column).map((task) => (
              <button key={task.title} className="mb-3 w-full rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:ring-blue-200">
                <div className="flex items-center justify-between"><span className="text-xs font-black text-blue-600">{task.priority}</span><span className="text-xs text-slate-400">{task.owner}</span></div>
                <p className="mt-2 text-sm font-bold leading-5">{task.title}</p>
                <p className="mt-2 text-xs text-slate-400">{task.status}</p>
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Meetings({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black">📝 최근 회의록</h3>
        <button className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">+ 작성</button>
      </div>
      <div className="mt-4 space-y-3">
        {meetings.slice(0, compact ? 2 : 3).map((m) => (
          <button key={m.title} className="w-full rounded-2xl bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:bg-blue-50">
            <div className="flex items-center justify-between gap-3"><p className="font-black">{m.title}</p><span className="shrink-0 text-xs font-bold text-blue-600">{m.date}</span></div>
            <p className="mt-2 text-sm text-slate-500">{m.summary}</p>
            <span className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500">{m.tag}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Team({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`rounded-3xl border p-5 shadow-soft ${dark ? "border-white/10 bg-slate-950 text-white" : "border-white/70 bg-white/85"}`}>
      <h3 className="text-xl font-black">👥 팀 현황</h3>
      <div className="mt-4 space-y-4">
        {team.map((member) => (
          <button key={member.name} className="w-full text-left">
            <div className="mb-1 flex justify-between text-sm"><span className="font-bold">{member.name}</span><span>{member.progress}%</span></div>
            <div className={`h-2 rounded-full ${dark ? "bg-white/10" : "bg-slate-100"}`}><div className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" style={{ width: `${member.progress}%` }} /></div>
            {!dark && <p className="mt-2 text-xs text-slate-500">{member.memo}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}

function Docs() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {["기획 문서", "회의 규칙", "개발 메모", "배포 기록", "아이디어 보관함", "팀 운영 방식"].map((doc) => (
        <button key={doc} className="rounded-3xl border border-white/70 bg-white/85 p-5 text-left shadow-soft transition hover:-translate-y-1">
          <p className="text-2xl">📚</p>
          <h3 className="mt-3 text-lg font-black">{doc}</h3>
          <p className="mt-2 text-sm text-slate-500">클릭해서 문서 상세로 이동할 예정입니다.</p>
        </button>
      ))}
    </section>
  );
}

function Settings() {
  return (
    <section className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-soft">
      <h3 className="text-xl font-black">⚙️ 설정</h3>
      <p className="mt-2 text-sm text-slate-500">다음 버전에서 팀원 초대, 알림, Supabase 연결 설정을 추가합니다.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {["팀원 초대", "알림 설정", "데이터 연결"].map((item) => (
          <button key={item} className="rounded-2xl bg-slate-50 p-4 text-left font-bold transition hover:bg-blue-50">{item}</button>
        ))}
      </div>
    </section>
  );
}
