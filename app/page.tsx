"use client";

import { useMemo, useState } from "react";

type ViewKey = "dashboard" | "projects" | "tasks" | "meetings" | "team" | "docs" | "settings";

type Task = {
  title: string;
  owner: string;
  priority: "P0" | "P1" | "P2";
  status: string;
};

const menu: { key: ViewKey; icon: string; label: string }[] = [
  { key: "dashboard", icon: "🏠", label: "대시보드" },
  { key: "projects", icon: "📁", label: "프로젝트" },
  { key: "tasks", icon: "📋", label: "Task" },
  { key: "meetings", icon: "📝", label: "회의록" },
  { key: "team", icon: "👥", label: "팀원" },
  { key: "docs", icon: "📚", label: "문서" },
  { key: "settings", icon: "⚙️", label: "설정" }
];

const columns = ["Backlog", "Todo", "Doing", "Review", "Done"];

const tasks: Record<string, Task[]> = {
  Backlog: [{ title: "회의 사이트 MVP 범위 확정", owner: "유민", priority: "P0", status: "진행중" }],
  Todo: [{ title: "회의록 템플릿 정리", owner: "건우", priority: "P1", status: "대기" }],
  Doing: [
    { title: "모바일 반응형 UI 개선", owner: "재승", priority: "P0", status: "진행중" },
    { title: "GitHub / Railway 배포 확인", owner: "현승", priority: "P0", status: "완료" }
  ],
  Review: [{ title: "문서 구조 검토", owner: "유민", priority: "P1", status: "검토" }],
  Done: [{ title: "v0.1 기본 배포", owner: "팀", priority: "P0", status: "완료" }]
};

const members = [
  { name: "유민", role: "PM / 기획", progress: 75 },
  { name: "건우", role: "팀원", progress: 45 },
  { name: "재승", role: "팀원", progress: 60 },
  { name: "현승", role: "팀원", progress: 30 }
];

const meetings = [
  { title: "1차 기획 회의", memo: "회의 사이트 범위 확정, 역할 분담", when: "오늘 20:00" },
  { title: "개발 스프린트 리뷰", memo: "대시보드 / Task / 회의록 진행상황 점검", when: "수요일" },
  { title: "v0.4 기능 회의", memo: "회의록 작성 화면과 팀원별 작업 현황 개선", when: "금요일" }
];

export default function Home() {
  const [view, setView] = useState<ViewKey>("dashboard");
  const activeLabel = useMemo(() => menu.find((item) => item.key === view)?.label ?? "대시보드", [view]);

  const go = (target: ViewKey) => setView(target);

  return (
    <main className="shell">
      <aside className="sidebar">
        <Brand />
        <nav className="nav">
          {menu.map((item) => (
            <button key={item.key} onClick={() => go(item.key)} className={view === item.key ? "active" : ""}>
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sprintBox">
          <span>현재 스프린트</span>
          <strong>Sprint 01</strong>
          <div className="progress"><i style={{ width: "52%" }} /></div>
          <small>진행률 52%</small>
        </div>
      </aside>

      <section className="workspace">
        <header className="mobileHead">
          <Brand compact />
          <strong>{activeLabel}</strong>
        </header>
        <nav className="mobileNav">
          {menu.map((item) => (
            <button key={item.key} onClick={() => go(item.key)} className={view === item.key ? "active" : ""}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        {view === "dashboard" && <Dashboard go={go} />}
        {view === "projects" && <Projects />}
        {view === "tasks" && <Tasks />}
        {view === "meetings" && <Meetings />}
        {view === "team" && <Team />}
        {view === "docs" && <Docs />}
        {view === "settings" && <Settings />}
      </section>
    </main>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand compact" : "brand"}>
      <div className="logo">HF</div>
      {!compact && (
        <div>
          <span>회의용 워크스페이스</span>
          <h1>HairFlow HQ</h1>
        </div>
      )}
    </div>
  );
}

function Hero({ title, subtitle, action }: { title: string; subtitle: string; action?: string }) {
  return (
    <div className="hero">
      <div>
        <p className="blue">HairFlow 팀 전용 회의 사이트</p>
        <h2>{title}</h2>
        <p className="sub">{subtitle}</p>
      </div>
      {action && <button className="primary">{action}</button>}
    </div>
  );
}

function Dashboard({ go }: { go: (target: ViewKey) => void }) {
  return (
    <>
      <Hero title="오늘 회의와 작업을 한눈에." subtitle="회의록, Task, 프로젝트 진행률, 팀원 역할을 한 공간에서 관리하는 HQ입니다." action="+ 새 회의록" />
      <div className="stats">
        <button onClick={() => go("projects")} className="stat"><span>프로젝트 진행률</span><strong>52%</strong><small>MVP 기준</small></button>
        <button onClick={() => go("tasks")} className="stat"><span>오늘 할 일</span><strong>4개</strong><small>P0 2개</small></button>
        <button onClick={() => go("meetings")} className="stat"><span>최근 회의</span><strong>2건</strong><small>이번 주</small></button>
        <button onClick={() => go("team")} className="stat"><span>팀원</span><strong>4명</strong><small>역할 배정</small></button>
      </div>
      <div className="mainGrid">
        <TaskBoard compact />
        <div className="rightStack">
          <RecentMeetings />
          <TeamPanel />
        </div>
      </div>
    </>
  );
}

function TaskBoard({ compact = false }: { compact?: boolean }) {
  return (
    <section className="panel taskPanel">
      <div className="panelTop"><h3>📋 Task Board</h3><span className="pill">Mock Data</span></div>
      <div className={compact ? "kanban compactKanban" : "kanban"}>
        {columns.map((column) => (
          <div className="column" key={column}>
            <b>{column}</b>
            {(tasks[column] || []).map((task) => (
              <article className="task" key={task.title}>
                <div><em>{task.priority}</em><span>{task.owner}</span></div>
                <strong>{task.title}</strong>
                <small>{task.status}</small>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentMeetings() {
  return (
    <section className="panel">
      <div className="panelTop"><h3>📝 최근 회의록</h3></div>
      {meetings.slice(0, 2).map((meeting) => (
        <article className="meeting" key={meeting.title}>
          <div><strong>{meeting.title}</strong><p>{meeting.memo}</p></div>
          <time>{meeting.when}</time>
        </article>
      ))}
    </section>
  );
}

function TeamPanel() {
  return (
    <section className="panel dark">
      <h3>👥 팀 현황</h3>
      {members.map((member) => (
        <div className="member" key={member.name}>
          <div><strong>{member.name}</strong><span>{member.role}</span><b>{member.progress}%</b></div>
          <p><i style={{ width: `${member.progress}%` }} /></p>
        </div>
      ))}
    </section>
  );
}

function Projects() {
  return <Page title="📁 프로젝트" desc="HairFlow HQ에서 관리하는 프로젝트 범위와 진행률입니다."><div className="projectCard"><h3>HairFlow 회의용 HQ</h3><p>팀 회의, Task, 문서, 진행률 관리 사이트</p><div className="progress"><i style={{ width: "52%" }} /></div><small>v0.3.1 · 진행률 52%</small></div></Page>;
}

function Tasks() { return <Page title="📋 Task" desc="팀원별 작업을 칸반으로 관리합니다."><TaskBoard /></Page>; }

function Meetings() {
  return <Page title="📝 회의록" desc="회의 내용, 결정사항, 담당자, 다음 액션을 정리합니다."><div className="list">{meetings.map((m) => <article className="listItem" key={m.title}><div><strong>{m.title}</strong><p>{m.memo}</p></div><span>{m.when}</span></article>)}</div></Page>;
}

function Team() { return <Page title="👥 팀원" desc="유민, 건우, 재승, 현승의 역할과 진행률을 관리합니다."><div className="cards">{members.map((m) => <article className="person" key={m.name}><h3>{m.name}</h3><p>{m.role}</p><div className="progress"><i style={{ width: `${m.progress}%` }} /></div><small>{m.progress}% 진행</small></article>)}</div></Page>; }

function Docs() {
  const docs = ["기획 문서", "회의 템플릿", "DB 설계", "API 메모", "배포 기록", "아이디어"];
  return <Page title="📚 문서" desc="팀이 자주 확인하는 문서를 모아둡니다."><div className="cards">{docs.map((d) => <article className="doc" key={d}><h3>{d}</h3><p>클릭 가능한 문서 카드입니다.</p></article>)}</div></Page>;
}

function Settings() { return <Page title="⚙️ 설정" desc="향후 로그인, 팀 초대, 알림, 테마 설정이 들어갈 공간입니다."><div className="cards"><article className="doc"><h3>팀 설정</h3><p>팀명, 멤버, 권한 관리</p></article><article className="doc"><h3>화면 설정</h3><p>다크모드, 알림, 기본 페이지</p></article></div></Page>; }

function Page({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return <section><Hero title={title} subtitle={desc} /><div className="pageBody">{children}</div></section>;
}
