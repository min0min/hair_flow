'use client';

import { useMemo, useState } from 'react';

type View = 'dashboard' | 'projects' | 'tasks' | 'meetings' | 'team' | 'docs' | 'settings';

type NavItem = { id: View; label: string; icon: string };

const navItems: NavItem[] = [
  { id: 'dashboard', label: '대시보드', icon: '🏠' },
  { id: 'projects', label: '프로젝트', icon: '📁' },
  { id: 'tasks', label: 'Task', icon: '📋' },
  { id: 'meetings', label: '회의록', icon: '📝' },
  { id: 'team', label: '팀원', icon: '👥' },
  { id: 'docs', label: '문서', icon: '📚' },
  { id: 'settings', label: '설정', icon: '⚙️' }
];

const columns = [
  { title: 'Backlog', tasks: [{ p: 'P1', owner: '건우', title: '회의록 작성 템플릿 기획', status: '대기' }] },
  { title: 'Todo', tasks: [{ p: 'P0', owner: '유민', title: '팀 회의 사이트 범위 확정', status: '오늘' }] },
  { title: 'Doing', tasks: [{ p: 'P0', owner: '재승', title: '대시보드 모바일 최적화', status: '진행중' }, { p: 'P1', owner: '현승', title: '문서 페이지 구조 정리', status: '진행중' }] },
  { title: 'Review', tasks: [{ p: 'P1', owner: '유민', title: 'Railway 배포 확인', status: '검토' }] },
  { title: 'Done', tasks: [{ p: 'P0', owner: '팀', title: 'v0.2 기본 배포 성공', status: '완료' }] }
];

const members = [
  { name: '유민', role: 'PM / 기획', progress: 76 },
  { name: '건우', role: 'Frontend', progress: 48 },
  { name: '재승', role: 'Backend', progress: 62 },
  { name: '현승', role: 'Design / QA', progress: 34 }
];

const meetings = [
  { title: '1차 기획 회의', desc: '회의 사이트 범위 확정, 역할 분담', time: '오늘 20:00' },
  { title: '개발 스프린트 리뷰', desc: '대시보드 / Task / 회의록 진행상황 점검', time: '수요일' },
  { title: 'v0.3 UI 점검', desc: '모바일 화면, 클릭 전환, 팀원 화면 확인', time: '금요일' }
];

function Sidebar({ view, setView }: { view: View; setView: (view: View) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">HF</div>
        <div>
          <small>회의용 워크스페이스</small>
          <h1>HairFlow HQ</h1>
        </div>
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}>
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
      <div className="sprint-card">
        <small>현재 스프린트</small>
        <h2>Sprint 01</h2>
        <div className="bar"><span style={{ width: '52%' }} /></div>
        <p style={{ margin: '12px 0 0', fontWeight: 800 }}>진행률 52%</p>
      </div>
    </aside>
  );
}

function MobileHeader({ view, setView }: { view: View; setView: (view: View) => void }) {
  const label = navItems.find((item) => item.id === view)?.label ?? '대시보드';
  return (
    <>
      <div className="mobile-top">
        <div className="brand" style={{ margin: 0 }}>
          <div className="logo">HF</div>
          <div>
            <small>HairFlow HQ</small>
            <h1>{label}</h1>
          </div>
        </div>
        <button className="primary-btn" style={{ padding: '11px 14px' }}>+ 회의</button>
      </div>
      <nav className="mobile-nav">
        {navItems.map((item) => (
          <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}>
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
    </>
  );
}

function Hero({ setView }: { setView: (view: View) => void }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">HairFlow 팀 전용 회의 사이트</p>
        <h2>오늘 회의와 작업을 한눈에.</h2>
        <p>회의록, Task, 프로젝트 진행률, 팀원 역할을 한 공간에서 관리하는 HQ입니다.</p>
      </div>
      <button className="primary-btn" onClick={() => setView('meetings')}>+ 새 회의록</button>
    </section>
  );
}

function StatCards({ setView }: { setView: (view: View) => void }) {
  const stats = [
    { title: '프로젝트 진행률', value: '52%', sub: 'MVP 기준', go: 'projects' as View },
    { title: '오늘 할 일', value: '4개', sub: 'P0 2개', go: 'tasks' as View },
    { title: '최근 회의', value: '3건', sub: '이번 주', go: 'meetings' as View },
    { title: '팀원', value: '4명', sub: '역할 배정', go: 'team' as View }
  ];
  return (
    <section className="grid-stats">
      {stats.map((stat) => (
        <button className="stat" key={stat.title} onClick={() => setView(stat.go)} style={{ textAlign: 'left' }}>
          <p>{stat.title}</p>
          <strong>{stat.value}</strong>
          <small>{stat.sub}</small>
        </button>
      ))}
    </section>
  );
}

function TaskBoard() {
  return (
    <div className="panel">
      <div className="panel-head">
        <h3>📋 Task Board</h3>
        <span className="badge">v0.3 Mock Data</span>
      </div>
      <div className="kanban">
        {columns.map((column) => (
          <div className="col" key={column.title}>
            <div className="col-title">{column.title}</div>
            {column.tasks.map((task) => (
              <div className="task-card" key={task.title}>
                <div className="task-meta"><span className="priority">{task.p}</span><span>{task.owner}</span></div>
                <b>{task.title}</b>
                <span className="chip">{task.status}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MeetingPanel() {
  return (
    <div className="panel">
      <div className="panel-head"><h3>📝 최근 회의록</h3></div>
      {meetings.slice(0, 2).map((meeting) => (
        <div className="meeting" key={meeting.title}>
          <div><b>{meeting.title}</b><p>{meeting.desc}</p></div>
          <time>{meeting.time}</time>
        </div>
      ))}
    </div>
  );
}

function TeamPanel() {
  return (
    <div className="panel team-panel">
      <h3>👥 팀 현황</h3>
      {members.map((member) => (
        <div className="member" key={member.name}>
          <div className="member-row"><span>{member.name} <small style={{ opacity: .75 }}>{member.role}</small></span><span>{member.progress}%</span></div>
          <div className="track"><span style={{ width: `${member.progress}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function Dashboard({ setView }: { setView: (view: View) => void }) {
  return (
    <>
      <Hero setView={setView} />
      <StatCards setView={setView} />
      <section className="layout-grid">
        <TaskBoard />
        <div style={{ display: 'grid', gap: 22 }}>
          <MeetingPanel />
          <TeamPanel />
        </div>
      </section>
    </>
  );
}

function Projects() {
  return (
    <div className="page-card">
      <h3>📁 프로젝트</h3>
      <p style={{ color: '#64748b' }}>HairFlow 개발을 위한 회의/작업 공간입니다. 실제 탈모 서비스 개발 내용은 별도 프로젝트에서 관리합니다.</p>
      <div className="list">
        <div className="list-item"><div><b>HairFlow HQ</b><p>회의, Task, 문서, 팀 운영 관리</p></div><span className="chip">진행률 52%</span></div>
        <div className="list-item"><div><b>HairFlow 서비스 본체</b><p>추후 별도 개발 예정</p></div><span className="chip">준비중</span></div>
      </div>
    </div>
  );
}

function Tasks() {
  return <TaskBoard />;
}

function Meetings() {
  return (
    <div className="page-card">
      <h3>📝 회의록</h3>
      <p style={{ color: '#64748b' }}>회의 내용을 입력하고 결정사항, 담당자, 다음 작업을 정리하는 공간입니다.</p>
      <div className="list">
        {meetings.map((meeting) => <div className="list-item" key={meeting.title}><div><b>{meeting.title}</b><p>{meeting.desc}</p></div><span className="chip">{meeting.time}</span></div>)}
      </div>
    </div>
  );
}

function Team() {
  return (
    <div className="page-card">
      <h3>👥 팀원</h3>
      <p style={{ color: '#64748b' }}>역할은 나중에 자유롭게 수정하면 됩니다. 우선 이름만 정확히 맞춰두었습니다.</p>
      <div className="list">
        {members.map((member) => <div className="list-item" key={member.name}><div><b>{member.name}</b><p>{member.role}</p></div><span className="chip">작업률 {member.progress}%</span></div>)}
      </div>
    </div>
  );
}

function Docs() {
  return (
    <div className="page-card">
      <h3>📚 문서</h3>
      <p style={{ color: '#64748b' }}>기획, 개발, 회의 규칙, 배포 정보를 정리하는 Wiki 공간입니다.</p>
      <div className="doc-grid">
        <div className="doc"><b>기획 문서</b><p>서비스 범위, MVP, 기능 정의</p></div>
        <div className="doc"><b>개발 문서</b><p>GitHub, Railway, Supabase 연결 방법</p></div>
        <div className="doc"><b>회의 규칙</b><p>회의록 작성 방식과 담당자 지정 규칙</p></div>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="page-card">
      <h3>⚙️ 설정</h3>
      <p style={{ color: '#64748b' }}>다음 버전에서 실제 저장 기능과 팀 초대 기능을 연결합니다.</p>
      <div className="settings-grid">
        <div className="setting"><b>팀 이름</b><p>HairFlow HQ</p></div>
        <div className="setting"><b>배포 상태</b><p>Railway 연결 완료</p></div>
        <div className="setting"><b>데이터 상태</b><p>Mock Data 사용중</p></div>
        <div className="setting"><b>다음 목표</b><p>Supabase 저장 기능 연결</p></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<View>('dashboard');
  const page = useMemo(() => {
    switch (view) {
      case 'projects': return <Projects />;
      case 'tasks': return <Tasks />;
      case 'meetings': return <Meetings />;
      case 'team': return <Team />;
      case 'docs': return <Docs />;
      case 'settings': return <Settings />;
      default: return <Dashboard setView={setView} />;
    }
  }, [view]);

  return (
    <main className="app-shell">
      <Sidebar view={view} setView={setView} />
      <section className="content">
        <MobileHeader view={view} setView={setView} />
        {page}
      </section>
    </main>
  );
}
