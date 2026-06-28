'use client';

import { useMemo, useState } from 'react';

type Tab = 'dashboard' | 'projects' | 'tasks' | 'meetings' | 'team' | 'docs' | 'settings';
type Status = 'backlog' | 'todo' | 'doing' | 'review' | 'done';

type Task = {
  id: number;
  title: string;
  owner: string;
  priority: 'P0' | 'P1' | 'P2';
  status: Status;
  week: number;
  progress: number;
  memo: string;
};

type Meeting = {
  id: number;
  title: string;
  week: number;
  date: string;
  summary: string;
  progress: number;
  decisions: string[];
};

const tasks: Task[] = [
  { id: 1, title: '회의 사이트 MVP 범위 확정', owner: '유민', priority: 'P0', status: 'done', week: 1, progress: 100, memo: '핵심 메뉴와 배포 방식 확정' },
  { id: 2, title: 'GitHub / Railway 배포 확인', owner: '현승', priority: 'P0', status: 'done', week: 1, progress: 100, memo: '루트 구조 및 보안 취약점 해결' },
  { id: 3, title: '모바일 반응형 UI 개선', owner: '재승', priority: 'P0', status: 'doing', week: 2, progress: 72, memo: '카드 간격, 하단 네비, 가독성 개선' },
  { id: 4, title: '회의록 주차별 구조 세분화', owner: '건우', priority: 'P1', status: 'doing', week: 2, progress: 65, memo: '주차별 회의/결정/액션 정리' },
  { id: 5, title: 'Task 진행률 자동 계산 구조', owner: '유민', priority: 'P0', status: 'review', week: 2, progress: 85, memo: '완료/진행/검토 상태 기반 반영' },
  { id: 6, title: '프로젝트 최종 주차 로드맵', owner: '건우', priority: 'P1', status: 'todo', week: 3, progress: 15, memo: 'v1.0까지 남은 주차와 목표 정리' },
  { id: 7, title: '문서 구조 정리', owner: '재승', priority: 'P2', status: 'backlog', week: 3, progress: 5, memo: '기획/개발/회의 문서 분리' },
  { id: 8, title: 'Supabase 연결 준비', owner: '현승', priority: 'P1', status: 'backlog', week: 4, progress: 0, memo: 'DB 저장 전 mock data 구조 안정화' }
];

const meetings: Meeting[] = [
  { id: 1, title: '1주차 킥오프 회의', week: 1, date: '월요일 20:00', summary: '회의 사이트 목적, 메뉴, 배포 흐름 확정', progress: 100, decisions: ['HairFlow HQ는 회의/프로젝트 관리용 사이트로 분리', 'GitHub → Railway 배포 방식 사용'] },
  { id: 2, title: '2주차 개발 스프린트 리뷰', week: 2, date: '수요일 21:00', summary: '모바일 UI, 클릭 전환, 팀원 현황 개선', progress: 74, decisions: ['팀원은 유민/건우/재승/현승으로 고정', '진행률은 Task 기반으로 자동 계산'] },
  { id: 3, title: '3주차 기능 회의', week: 3, date: '금요일 20:00', summary: '회의록 작성 화면과 주차별 진행률 개선 예정', progress: 20, decisions: ['회의록 상세 페이지 추가', '주차별 완료율 표시'] },
  { id: 4, title: '4주차 v1.0 준비 회의', week: 4, date: '예정', summary: 'Supabase 연결 및 실시간 저장 구조 논의', progress: 0, decisions: ['DB 연결 전 UI/UX 안정화 우선'] }
];

const team = ['유민', '건우', '재승', '현승'];
const statusLabels: Record<Status, string> = { backlog: 'Backlog', todo: 'Todo', doing: 'Doing', review: 'Review', done: 'Done' };
const statusScore: Record<Status, number> = { backlog: 0, todo: 15, doing: 60, review: 85, done: 100 };

function calcProjectProgress() {
  return Math.round(tasks.reduce((sum, task) => sum + Math.max(task.progress, statusScore[task.status]), 0) / tasks.length);
}

function calcWeekProgress(week: number) {
  const weekTasks = tasks.filter((task) => task.week === week);
  if (!weekTasks.length) return 0;
  return Math.round(weekTasks.reduce((sum, task) => sum + task.progress, 0) / weekTasks.length);
}

function calcOwnerProgress(owner: string) {
  const owned = tasks.filter((task) => task.owner === owner);
  if (!owned.length) return 0;
  return Math.round(owned.reduce((sum, task) => sum + task.progress, 0) / owned.length);
}

function Progress({ value, dark = false }: { value: number; dark?: boolean }) {
  return <div className={dark ? 'bar dark' : 'bar'}><span style={{ width: `${value}%` }} /></div>;
}

export default function Page() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const projectProgress = useMemo(calcProjectProgress, []);
  const doneCount = tasks.filter((task) => task.status === 'done').length;
  const week = 2;
  const weekProgress = calcWeekProgress(week);
  const remaining = 100 - projectProgress;

  const nav: { key: Tab; label: string; icon: string }[] = [
    { key: 'dashboard', label: '대시보드', icon: '🏠' },
    { key: 'projects', label: '프로젝트', icon: '📁' },
    { key: 'tasks', label: 'Task', icon: '📋' },
    { key: 'meetings', label: '회의록', icon: '📝' },
    { key: 'team', label: '팀원', icon: '👥' },
    { key: 'docs', label: '문서', icon: '📚' },
    { key: 'settings', label: '설정', icon: '⚙️' }
  ];

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="logo">HF</div><div><small>회의용 워크스페이스</small><strong>HairFlow HQ</strong></div></div>
        <nav>{nav.map((item) => <button key={item.key} onClick={() => setTab(item.key)} className={tab === item.key ? 'active' : ''}><span>{item.icon}</span>{item.label}</button>)}</nav>
        <div className="sprint-card"><small>현재 스프린트</small><h3>Sprint 02</h3><Progress value={weekProgress} dark /><p>진행률 {weekProgress}%</p></div>
      </aside>

      <section className="workspace">
        <header className="hero">
          <div><p>HairFlow 팀 전용 회의 사이트</p><h1>{tab === 'dashboard' ? '오늘 회의와 작업을 한눈에.' : nav.find((n) => n.key === tab)?.label}</h1><span>회의록, Task, 프로젝트 진행률, 팀원 역할을 한 공간에서 관리합니다.</span></div>
          <button onClick={() => setTab('meetings')}>+ 새 회의록</button>
        </header>

        {tab === 'dashboard' && <>
          <section className="stats">
            <Card title="프로젝트 진행률" value={`${projectProgress}%`} desc={`최종까지 ${remaining}% 남음`} />
            <Card title="이번 주차 진행률" value={`${weekProgress}%`} desc={`Sprint 0${week} 기준`} />
            <Card title="완료 Task" value={`${doneCount}개`} desc={`${tasks.length}개 중 완료`} />
            <Card title="최근 회의" value={`${meetings.length}건`} desc="주차별 관리" />
          </section>
          <section className="grid-main">
            <TaskBoard />
            <div className="side-stack"><Meetings compact /><TeamPanel /></div>
          </section>
        </>}

        {tab === 'projects' && <Projects progress={projectProgress} remaining={remaining} />}
        {tab === 'tasks' && <TaskBoard full />}
        {tab === 'meetings' && <Meetings />}
        {tab === 'team' && <TeamPage />}
        {tab === 'docs' && <SimplePage icon="📚" title="문서" cards={[['기획 문서', 'MVP 범위, 기능 정의, 회의 결정사항'], ['개발 문서', 'GitHub, Railway, Supabase 연결 기록'], ['운영 문서', '팀 규칙, 회의 방식, 버전 관리']]} />}
        {tab === 'settings' && <SimplePage icon="⚙️" title="설정" cards={[['팀 설정', '팀명, 멤버, 권한 관리'], ['화면 설정', '모바일, 테마, 기본 페이지'], ['배포 설정', 'GitHub / Railway 배포 체크리스트']]} />}
      </section>

      <nav className="mobile-nav">{nav.slice(0, 5).map((item) => <button key={item.key} onClick={() => setTab(item.key)} className={tab === item.key ? 'active' : ''}>{item.icon}<small>{item.label}</small></button>)}</nav>
    </main>
  );
}

function Card({ title, value, desc }: { title: string; value: string; desc: string }) {
  return <article className="stat-card"><span>{title}</span><strong>{value}</strong><small>{desc}</small></article>;
}

function TaskBoard({ full = false }: { full?: boolean }) {
  return <section className={full ? 'panel full' : 'panel'}><div className="panel-head"><h2>📋 Task Board</h2><em>자동 진행률</em></div><div className="kanban">{(Object.keys(statusLabels) as Status[]).map((status) => <div className="lane" key={status}><h3>{statusLabels[status]}</h3>{tasks.filter((task) => task.status === status).map((task) => <article className="task" key={task.id}><small><b>{task.priority}</b> {task.owner} · {task.progress}%</small><strong>{task.title}</strong><p>{task.memo}</p><Progress value={task.progress} /></article>)}</div>)}</div></section>;
}

function Meetings({ compact = false }: { compact?: boolean }) {
  return <section className="panel"><div className="panel-head"><h2>📝 {compact ? '최근 회의록' : '주차별 회의록'}</h2><em>회의 진행률 추적</em></div><div className="meeting-list">{meetings.map((m) => <article className="meeting" key={m.id}><div><strong>{m.title}</strong><p>{m.summary}</p><Progress value={m.progress} /></div><div className="meeting-meta"><b>{m.date}</b><span>{m.progress}%</span></div>{!compact && <ul>{m.decisions.map((d) => <li key={d}>{d}</li>)}</ul>}</article>)}</div></section>;
}

function TeamPanel() {
  return <section className="team-dark"><h2>👥 팀 현황</h2>{team.map((name) => <div key={name} className="member"><div><strong>{name}</strong><span>{calcOwnerProgress(name)}%</span></div><Progress value={calcOwnerProgress(name)} dark /></div>)}</section>;
}

function TeamPage() {
  return <section className="panel"><div className="panel-head"><h2>👥 팀원</h2><em>역할은 추후 수정</em></div><div className="team-grid">{team.map((name) => <article className="team-card" key={name}><h3>{name}</h3><p>{name === '유민' ? 'PM / 기획' : '팀원'}</p><Progress value={calcOwnerProgress(name)} /><small>{calcOwnerProgress(name)}% 진행</small></article>)}</div></section>;
}

function Projects({ progress, remaining }: { progress: number; remaining: number }) {
  return <section className="panel"><div className="panel-head"><h2>📁 프로젝트</h2><em>최종 주차까지 자동 집계</em></div><article className="project-card"><h3>HairFlow 회의용 HQ</h3><p>회의, Task, 문서, 팀 현황을 관리하는 내부 워크스페이스</p><Progress value={progress} /><div className="project-meta"><span>현재 v0.4.0</span><span>진행률 {progress}%</span><span>남은 작업 {remaining}%</span></div></article><div className="week-grid">{[1,2,3,4].map((w) => <div className="week" key={w}><b>{w}주차</b><Progress value={calcWeekProgress(w)} /><small>{calcWeekProgress(w)}% 완료</small></div>)}</div></section>;
}

function SimplePage({ icon, title, cards }: { icon: string; title: string; cards: string[][] }) {
  return <section className="panel"><div className="page-title"><span>{icon}</span><h2>{title}</h2></div><div className="simple-grid">{cards.map(([a,b]) => <article key={a}><h3>{a}</h3><p>{b}</p></article>)}</div></section>;
}
