'use client';

import { useMemo, useState } from 'react';

type Tab = 'dashboard' | 'weeks' | 'tasks' | 'meetings' | 'assistant' | 'team' | 'docs' | 'settings';
type Priority = 'P0' | 'P1' | 'P2';
type Status = '대기' | '진행중' | '검토' | '완료';
type SettingKey = 'autoWeek' | 'autoProgress' | 'meetingTemplate' | 'mobileMode' | 'railwayCheck';

type ChecklistItem = {
  id: string;
  title: string;
  owner: string;
  priority: Priority;
  done: boolean;
};

type WeekPlan = {
  id: string;
  week: string;
  title: string;
  goal: string;
  output: string;
  meetingAgenda: string[];
  checklist: ChecklistItem[];
};

type Task = {
  id: string;
  title: string;
  owner: string;
  priority: Priority;
  status: Status;
  weekId: string;
};

type Meeting = {
  id: string;
  weekId: string;
  title: string;
  summary: string;
  date: string;
  decisions: string[];
};

const team = [
  { name: '유민', role: 'PM / 기획', focus: '방향성, 우선순위, 회의 진행, 최종 의사결정' },
  { name: '건우', role: '팀원', focus: 'UI 화면, 모바일 반응형, 사용자 흐름' },
  { name: '재승', role: '팀원', focus: '데이터 구조, 진행률 로직, 저장 구조' },
  { name: '현승', role: '팀원', focus: '회의록, QA, 문서 정리, 체크리스트 관리' }
];

const strategicWeeks: WeekPlan[] = [
  {
    id: 'week1',
    week: 'Week 01',
    title: '기획 / 역할 분담 / HQ 뼈대 확정',
    goal: '회의용 사이트의 범위와 팀 운영 방식을 확정합니다.',
    output: '프로젝트 방향성, 팀원 역할, GitHub/Railway 배포 흐름',
    meetingAgenda: ['회의용 사이트 범위 확정', '팀원별 역할 분담', '주차별 운영 방식 합의', 'GitHub / Railway 배포 플로우 확인'],
    checklist: [
      { id: 'w1-1', title: '회의 사이트 MVP 범위 확정', owner: '유민', priority: 'P0', done: true },
      { id: 'w1-2', title: '팀원 4명 이름과 기본 역할 정리', owner: '유민', priority: 'P0', done: true },
      { id: 'w1-3', title: 'GitHub / Railway 배포 확인', owner: '현승', priority: 'P0', done: true },
      { id: 'w1-4', title: '모바일 확인 및 개선 포인트 정리', owner: '건우', priority: 'P1', done: true }
    ]
  },
  {
    id: 'week2',
    week: 'Week 02',
    title: '회의록 / 체크리스트 / 진행률 자동화',
    goal: '회의에서 나온 작업이 체크리스트와 진행률로 바로 이어지게 만듭니다.',
    output: '주차별 회의록, 체크리스트, 자동 진행률 대시보드',
    meetingAgenda: ['주차별 회의 안건 확인', '체크리스트 완료 기준 합의', '진행률 계산 방식 확인', '팀원별 이번 주 작업 배정'],
    checklist: [
      { id: 'w2-1', title: '주차별 회의록 화면 개선', owner: '현승', priority: 'P0', done: true },
      { id: 'w2-2', title: '체크리스트 기반 진행률 계산', owner: '재승', priority: 'P0', done: true },
      { id: 'w2-3', title: '대시보드 진행률 자동 반영', owner: '유민', priority: 'P0', done: true },
      { id: 'w2-4', title: 'Task Board와 주차 연결', owner: '건우', priority: 'P1', done: false }
    ]
  },
  {
    id: 'week3',
    week: 'Week 03',
    title: 'AI 프로젝트 비서 / 회의 정리 템플릿',
    goal: '회의 내용을 요약, 담당자, 우선순위, 일정으로 자동 정리하는 흐름을 만듭니다.',
    output: 'AI 비서 화면, 회의록 템플릿, Action Item 생성 흐름',
    meetingAgenda: ['AI 비서 입력 폼 구성', '회의록 자동 정리 양식 확정', '담당자/우선순위 추출 방식 정리', '생성된 Action Item 관리 방식 논의'],
    checklist: [
      { id: 'w3-1', title: 'AI 프로젝트 비서 화면 제작', owner: '유민', priority: 'P0', done: true },
      { id: 'w3-2', title: '회의 요약 템플릿 정리', owner: '현승', priority: 'P0', done: false },
      { id: 'w3-3', title: '담당자/일정/우선순위 표 자동 생성 UI', owner: '재승', priority: 'P1', done: false },
      { id: 'w3-4', title: '모바일 입력 화면 개선', owner: '건우', priority: 'P1', done: false }
    ]
  },
  {
    id: 'week4',
    week: 'Week 04',
    title: 'Supabase 연결 / 실제 저장 구조 준비',
    goal: 'Mock 데이터를 실제 DB 저장 구조로 전환할 준비를 합니다.',
    output: 'DB 테이블 초안, 로그인/권한 설계, 저장 플로우',
    meetingAgenda: ['DB 테이블 구조 확정', '회의록 저장 방식 논의', 'Task 저장 방식 논의', '로그인/팀원 권한 방식 논의'],
    checklist: [
      { id: 'w4-1', title: 'Supabase 테이블 초안 작성', owner: '재승', priority: 'P0', done: false },
      { id: 'w4-2', title: '로그인/권한 흐름 정리', owner: '유민', priority: 'P1', done: false },
      { id: 'w4-3', title: '실제 저장 전환 체크리스트 작성', owner: '현승', priority: 'P1', done: false },
      { id: 'w4-4', title: '저장 후 화면 반영 UX 설계', owner: '건우', priority: 'P2', done: false }
    ]
  },
  {
    id: 'week5',
    week: 'Week 05',
    title: '실사용 QA / 버그 관리 / 팀 설정',
    goal: '팀원들이 실제로 써보며 불편한 부분을 수정합니다.',
    output: '설정 페이지, 버그 목록, QA 체크리스트',
    meetingAgenda: ['실사용 불편사항 수집', '모바일 QA 결과 확인', '설정 페이지 항목 확정', '버그 우선순위 결정'],
    checklist: [
      { id: 'w5-1', title: '팀 설정 UI 제작', owner: '유민', priority: 'P1', done: false },
      { id: 'w5-2', title: '모바일 QA 체크', owner: '건우', priority: 'P1', done: false },
      { id: 'w5-3', title: '버그 분류 기준 작성', owner: '현승', priority: 'P2', done: false },
      { id: 'w5-4', title: '저장 연결 전 테스트 케이스 작성', owner: '재승', priority: 'P1', done: false }
    ]
  },
  {
    id: 'week6',
    week: 'Week 06',
    title: '베타 운영 / 배포 안정화 / v1.0 준비',
    goal: '팀원 4명이 매일 사용할 수 있는 상태로 안정화합니다.',
    output: 'v1.0 릴리즈 체크리스트, 운영 규칙, 최종 배포 URL',
    meetingAgenda: ['v1.0 출시 기준 합의', 'Railway 배포 안정화', 'Supabase 연결 상태 확인', '다음 HairFlow 본서비스 개발 계획 정리'],
    checklist: [
      { id: 'w6-1', title: 'v1.0 릴리즈 기준 확정', owner: '유민', priority: 'P0', done: false },
      { id: 'w6-2', title: 'Railway 배포 체크리스트 완료', owner: '현승', priority: 'P0', done: false },
      { id: 'w6-3', title: '실제 저장/로그인 연결 확인', owner: '재승', priority: 'P0', done: false },
      { id: 'w6-4', title: '최종 모바일 UI 점검', owner: '건우', priority: 'P1', done: false }
    ]
  }
];

const baseTasks: Task[] = [
  { id: 't1', title: '회의 사이트 MVP 범위 확정', owner: '유민', priority: 'P0', status: '완료', weekId: 'week1' },
  { id: 't2', title: '모바일 반응형 UI 개선', owner: '건우', priority: 'P1', status: '진행중', weekId: 'week2' },
  { id: 't3', title: '체크리스트 기반 진행률 계산', owner: '재승', priority: 'P0', status: '완료', weekId: 'week2' },
  { id: 't4', title: '회의록 주차별 세분화', owner: '현승', priority: 'P0', status: '검토', weekId: 'week2' },
  { id: 't5', title: 'AI 프로젝트 비서 화면 제작', owner: '유민', priority: 'P0', status: '진행중', weekId: 'week3' },
  { id: 't6', title: 'Supabase 테이블 초안 작성', owner: '재승', priority: 'P0', status: '대기', weekId: 'week4' }
];

const meetings: Meeting[] = [
  { id: 'm1', weekId: 'week1', title: '1차 기획 회의', summary: '회의용 HQ 범위와 배포 방식 확정', date: 'Week 01 / 월요일', decisions: ['HairFlow 구현 전 회의용 사이트부터 제작', 'GitHub → Railway 배포 플로우 사용'] },
  { id: 'm2', weekId: 'week2', title: '진행률 자동화 회의', summary: '체크리스트 완료가 프로젝트 퍼센트로 반영되는 구조 확정', date: 'Week 02 / 수요일', decisions: ['주차별 체크리스트 기반 진행률 계산', '회의록과 Task Board를 연결'] },
  { id: 'm3', weekId: 'week3', title: 'AI 비서 기능 회의', summary: '회의 내용을 요약/담당자/우선순위로 정리하는 기능 논의', date: 'Week 03 / 진행 예정', decisions: ['AI 템플릿 먼저 고정', '실제 API 연결은 이후 단계'] }
];

function percent(done: number, total: number) {
  if (!total) return 0;
  return Math.round((done / total) * 100);
}

function Badge({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'dark' | 'green' | 'orange' }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Progress({ value }: { value: number }) {
  return <div className="progress"><span style={{ width: `${value}%` }} /></div>;
}

export default function Page() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [weeks, setWeeks] = useState(strategicWeeks);
  const [tasks, setTasks] = useState(baseTasks);
  const [selectedWeek, setSelectedWeek] = useState('week3');
  const [assistantText, setAssistantText] = useState('오늘 회의에서는 Week 03 AI 프로젝트 비서, 회의록 템플릿, 담당자별 액션 아이템을 정리했다. 유민은 전체 기획, 건우는 모바일 UI, 재승은 자동 진행률 로직, 현승은 회의록 템플릿을 맡기로 했다. 다음 회의 전까지 설정 페이지도 실제로 눌러볼 수 있게 만든다.');
  const [teamName, setTeamName] = useState('HairFlow 팀');
  const [settings, setSettings] = useState<Record<SettingKey, boolean>>({
    autoWeek: true,
    autoProgress: true,
    meetingTemplate: true,
    mobileMode: true,
    railwayCheck: true
  });

  const allItems = weeks.flatMap((w) => w.checklist.map((item) => ({ ...item, weekId: w.id, week: w.week })));
  const doneItems = allItems.filter((item) => item.done).length;
  const projectProgress = percent(doneItems, allItems.length);
  const activeWeek = weeks.find((w) => w.id === selectedWeek) || weeks[0];
  const activeWeekProgress = percent(activeWeek.checklist.filter((i) => i.done).length, activeWeek.checklist.length);
  const todoCount = allItems.filter((i) => !i.done).length;
  const completedWeeks = weeks.filter((w) => w.checklist.every((i) => i.done)).length;
  const nextWeek = weeks.find((w) => !w.checklist.every((i) => i.done));
  const teamProgress = team.map((member) => {
    const items = allItems.filter((item) => item.owner === member.name);
    return { ...member, progress: percent(items.filter((i) => i.done).length, items.length), count: items.length, left: items.filter((i) => !i.done).length };
  });

  const toggleItem = (weekId: string, itemId: string) => {
    setWeeks((prev) => prev.map((w) => w.id !== weekId ? w : {
      ...w,
      checklist: w.checklist.map((item) => item.id === itemId ? { ...item, done: !item.done } : item)
    }));
    setTasks((prev) => prev.map((task) => task.title === weeks.find((w) => w.id === weekId)?.checklist.find((item) => item.id === itemId)?.title ? { ...task, status: task.status === '완료' ? '진행중' : '완료' } : task));
  };

  const generatedSummary = useMemo(() => {
    const owners = ['유민', '건우', '재승', '현승'].filter((name) => assistantText.includes(name));
    const actions = [
      '회의 핵심 결정사항 정리',
      '담당자별 작업 체크',
      '주차별 진행률 업데이트',
      '다음 회의 안건 확정'
    ];
    const priorities = [
      { level: 'P0', text: '이번 주 핵심 기능 먼저 완료' },
      { level: 'P1', text: '모바일 사용성 개선' },
      { level: 'P2', text: '문서/설정 정리' }
    ];
    return {
      summary: '회의 내용을 프로젝트 운영 문서 형태로 정리했습니다. 주차별 목표, 담당자, 우선순위, 일정, 개선 아이디어를 기준으로 바로 실행하면 됩니다.',
      owners: owners.length ? owners : ['유민', '건우', '재승', '현승'],
      actions,
      priorities,
      ideas: ['회의 종료 버튼 추가', 'Task 자동 생성 연결', 'Supabase 저장 전환', '팀원별 알림 설정']
    };
  }, [assistantText]);

  const applyAssistantToWeek = () => {
    const created = generatedSummary.actions.map((action, index) => ({
      id: `${selectedWeek}-ai-${Date.now()}-${index}`,
      title: action,
      owner: generatedSummary.owners[index % generatedSummary.owners.length],
      priority: index === 0 ? 'P0' as Priority : 'P1' as Priority,
      done: false
    }));
    setWeeks((prev) => prev.map((w) => w.id === selectedWeek ? { ...w, checklist: [...w.checklist, ...created] } : w));
  };

  const toggleSetting = (key: SettingKey) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const nav = [
    ['dashboard', '🏠', '대시보드'],
    ['weeks', '🗓️', '주차 플랜'],
    ['tasks', '📋', 'Task'],
    ['meetings', '📝', '회의록'],
    ['assistant', '🤖', 'AI 비서'],
    ['team', '👥', '팀원'],
    ['docs', '📚', '문서'],
    ['settings', '⚙️', '설정']
  ] as const;

  return (
    <main className="shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setTab('dashboard')}>
          <span>HF</span>
          <div><small>{teamName} 전용 워크스페이스</small><strong>HairFlow HQ</strong></div>
        </button>
        <nav>
          {nav.map(([key, icon, label]) => (
            <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}><span>{icon}</span>{label}</button>
          ))}
        </nav>
        <div className="sprint-card">
          <small>전체 프로젝트</small>
          <strong>{projectProgress}%</strong>
          <Progress value={projectProgress} />
          <span>{completedWeeks}/{weeks.length}주차 완료 · {100 - projectProgress}% 남음</span>
        </div>
      </aside>

      <section className="content">
        <div className="mobile-nav">
          {nav.slice(0, 6).map(([key, icon]) => <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{icon}</button>)}
        </div>

        {tab === 'dashboard' && (
          <>
            <Hero eyebrow="HairFlow 팀 전용 운영 시스템" title="회의가 곧 실행계획이 되게." desc="주차별 플랜, 회의록, 체크리스트, Task, 설정이 하나의 흐름으로 연결됩니다." button="AI 회의 정리" onClick={() => setTab('assistant')} />
            <div className="stats">
              <Stat title="프로젝트 진행률" value={`${projectProgress}%`} sub={`${100 - projectProgress}% 남음`} />
              <Stat title="남은 작업" value={`${todoCount}개`} sub="체크리스트 기준" />
              <Stat title="현재 운영 주차" value={nextWeek?.week || '완료'} sub={nextWeek ? nextWeek.title : '릴리즈 준비 완료'} />
              <Stat title="자동화 설정" value={`${Object.values(settings).filter(Boolean).length}/5`} sub="활성화" />
            </div>
            <div className="grid two">
              <Card title="🗓️ 자동 주차 로드맵" action="전체 보기" onAction={() => setTab('weeks')}>
                <div className="timeline">
                  {weeks.map((week) => {
                    const value = percent(week.checklist.filter((i) => i.done).length, week.checklist.length);
                    return <button key={week.id} className={selectedWeek === week.id ? 'active' : ''} onClick={() => { setSelectedWeek(week.id); setTab('weeks'); }}><b>{week.week}</b><div><strong>{week.title}</strong><span>{week.output}</span></div><em>{value}%</em></button>;
                  })}
                </div>
              </Card>
              <Card title="👥 팀 현황" action="팀원 보기" onAction={() => setTab('team')} dark>
                {teamProgress.map((m) => <div className="team-row" key={m.name}><div><b>{m.name}</b><span>{m.left}개 남음 · {m.role}</span></div><em>{m.progress}%</em><Progress value={m.progress} /></div>)}
              </Card>
            </div>
            <div className="grid two">
              <TaskBoard tasks={tasks} weeks={weeks} />
              <MeetingList meetings={meetings} setTab={setTab} />
            </div>
          </>
        )}

        {tab === 'weeks' && (
          <>
            <Hero eyebrow="자동 구성된 6주 운영 플랜" title="전략대로 주차가 자동 배치된 상태." desc="각 주차를 누르면 회의 안건, 산출물, 체크리스트, 완료율을 바로 확인할 수 있습니다." />
            <div className="week-tabs">{weeks.map((w) => <button key={w.id} className={selectedWeek === w.id ? 'active' : ''} onClick={() => setSelectedWeek(w.id)}>{w.week}</button>)}</div>
            <div className="grid two uneven">
              <Card title={`${activeWeek.week} · ${activeWeek.title}`}>
                <p className="muted big">{activeWeek.goal}</p>
                <div className="output-box"><b>이번 주 산출물</b><span>{activeWeek.output}</span></div>
                <div className="large-progress"><strong>{activeWeekProgress}%</strong><Progress value={activeWeekProgress} /><span>{100 - activeWeekProgress}% 남음</span></div>
                <h3>회의해야 할 안건</h3>
                <ul className="agenda">{activeWeek.meetingAgenda.map((a) => <li key={a}>{a}</li>)}</ul>
              </Card>
              <Card title="✅ 체크하면 진행률 반영">
                <div className="checklist">
                  {activeWeek.checklist.map((item) => <label key={item.id} className={item.done ? 'done' : ''}><input type="checkbox" checked={item.done} onChange={() => toggleItem(activeWeek.id, item.id)} /><div><strong>{item.title}</strong><span>{item.owner} · {item.priority}</span></div></label>)}
                </div>
              </Card>
            </div>
          </>
        )}

        {tab === 'tasks' && <><Hero eyebrow="Task Board" title="회의에서 나온 작업을 진행률로." desc="Task는 주차와 연결되어 프로젝트 진행률 계산의 기준이 됩니다." /><TaskBoard tasks={tasks} weeks={weeks} full /></>}
        {tab === 'meetings' && <><Hero eyebrow="주차별 회의록" title="이번 주에 무엇을 회의해야 하는지 명확하게." desc="회의 요약, 결정사항, 다음 액션, 담당자를 주차별로 관리합니다." /><MeetingList meetings={meetings} setTab={setTab} full weeks={weeks} /></>}
        {tab === 'assistant' && (
          <>
            <Hero eyebrow="AI 프로젝트 비서 v0.6" title="막 적으면 회의록처럼 정리." desc="현재는 템플릿 기반 Mock 기능이며, 이후 실제 AI API와 Supabase 저장에 연결합니다." />
            <div className="grid two uneven">
              <Card title="회의 내용 입력">
                <select className="select" value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
                  {weeks.map((w) => <option key={w.id} value={w.id}>{w.week} · {w.title}</option>)}
                </select>
                <textarea value={assistantText} onChange={(e) => setAssistantText(e.target.value)} />
                <div className="button-row"><button className="primary">회의록 형태로 정리하기</button><button className="ghost" onClick={applyAssistantToWeek}>이번 주 체크리스트에 반영</button></div>
              </Card>
              <Card title="자동 정리 결과">
                <h3>요약</h3><p className="muted">{generatedSummary.summary}</p>
                <h3>체크리스트</h3><ul className="agenda">{generatedSummary.actions.map((a) => <li key={a}>{a}</li>)}</ul>
                <h3>담당자</h3><div className="chips">{generatedSummary.owners.map((o) => <Badge key={o}>{o}</Badge>)}</div>
                <h3>우선순위</h3><div className="priority-list">{generatedSummary.priorities.map((p) => <div key={p.level}><Badge tone={p.level === 'P0' ? 'blue' : 'orange'}>{p.level}</Badge><span>{p.text}</span></div>)}</div>
                <h3>개선 아이디어</h3><ul className="agenda">{generatedSummary.ideas.map((idea) => <li key={idea}>{idea}</li>)}</ul>
              </Card>
            </div>
          </>
        )}
        {tab === 'team' && <><Hero eyebrow="팀원" title="유민, 건우, 재승, 현승." desc="역할은 설정 연결 전까지 기본 형태로 관리합니다." /><div className="team-grid">{teamProgress.map((m) => <Card key={m.name} title={m.name}><p className="muted">{m.role}</p><p>{m.focus}</p><Progress value={m.progress} /><small>{m.progress}% 진행 · 연결 작업 {m.count}개 · 남은 작업 {m.left}개</small></Card>)}</div></>}
        {tab === 'docs' && <Docs weeks={weeks} settings={settings} />}
        {tab === 'settings' && <Settings teamName={teamName} setTeamName={setTeamName} settings={settings} toggleSetting={toggleSetting} />}
      </section>
    </main>
  );
}

function Hero({ eyebrow, title, desc, button, onClick }: { eyebrow: string; title: string; desc: string; button?: string; onClick?: () => void }) {
  return <section className="hero"><div><p>{eyebrow}</p><h1>{title}</h1><span>{desc}</span></div>{button && <button onClick={onClick}>{button}</button>}</section>;
}

function Stat({ title, value, sub }: { title: string; value: string; sub: string }) {
  return <article className="stat"><p>{title}</p><strong>{value}</strong><span>{sub}</span></article>;
}

function Card({ title, children, action, onAction, dark }: { title: string; children: React.ReactNode; action?: string; onAction?: () => void; dark?: boolean }) {
  return <section className={`card ${dark ? 'dark-card' : ''}`}><div className="card-head"><h2>{title}</h2>{action && <button onClick={onAction}>{action}</button>}</div>{children}</section>;
}

function TaskBoard({ tasks, weeks, full }: { tasks: Task[]; weeks: WeekPlan[]; full?: boolean }) {
  const columns: Status[] = ['대기', '진행중', '검토', '완료'];
  return <Card title="📋 Task Board"><div className={`board ${full ? 'full' : ''}`}>{columns.map((col) => <div className="col" key={col}><h3>{col}</h3>{tasks.filter((t) => t.status === col).map((task) => <article className="task" key={task.id}><div><Badge tone={task.priority === 'P0' ? 'blue' : 'orange'}>{task.priority}</Badge><span>{task.owner}</span></div><strong>{task.title}</strong><small>{weeks.find((w) => w.id === task.weekId)?.week}</small></article>)}</div>)}</div></Card>;
}

function MeetingList({ meetings, setTab, full, weeks }: { meetings: Meeting[]; setTab: (tab: Tab) => void; full?: boolean; weeks?: WeekPlan[] }) {
  return <Card title="📝 최근 회의록" action="AI 비서" onAction={() => setTab('assistant')}><div className={full ? 'meeting-list full' : 'meeting-list'}>{meetings.map((m) => <article key={m.id}><div><strong>{m.title}</strong><p>{m.summary}</p>{full && <><p className="muted">회의 주차: {weeks?.find((w) => w.id === m.weekId)?.title}</p><ul>{m.decisions.map((d) => <li key={d}>{d}</li>)}</ul></>}</div><b>{m.date}</b></article>)}</div></Card>;
}

function Docs({ weeks, settings }: { weeks: WeekPlan[]; settings: Record<SettingKey, boolean> }) {
  return <><Hero eyebrow="문서" title="운영 규칙과 연결 계획." desc="DB, API, AI 프롬프트, 배포 규칙을 한곳에서 확인합니다." /><div className="grid two"><Card title="📌 운영 규칙"><p className="muted">덮어쓰기 ZIP → GitHub Push → Railway 배포 → URL 확인</p><ul className="agenda"><li>주차별 체크리스트를 기준으로 전체 진행률 계산</li><li>회의록은 Week와 연결해서 작성</li><li>설정값은 Supabase 연결 전까지 화면 상태로 테스트</li></ul></Card><Card title="🧠 AI 비서 규칙"><p className="muted">요약, 체크리스트, 담당자, 우선순위, 일정, 개선 아이디어, 회의록 형태로 정리</p><div className="settings-mini">{Object.entries(settings).map(([key, value]) => <span key={key}>{key}: {value ? 'ON' : 'OFF'}</span>)}</div></Card></div><Card title="🗓️ 자동 주차 전략"><div className="doc-weeks">{weeks.map((w) => <div key={w.id}><b>{w.week}</b><strong>{w.title}</strong><span>{w.output}</span></div>)}</div></Card></>;
}

function Settings({ teamName, setTeamName, settings, toggleSetting }: { teamName: string; setTeamName: (value: string) => void; settings: Record<SettingKey, boolean>; toggleSetting: (key: SettingKey) => void }) {
  const rows: { key: SettingKey; title: string; desc: string }[] = [
    { key: 'autoWeek', title: '자동 주차 플랜', desc: '프로젝트 생성 시 6주 전략 플랜을 자동 구성합니다.' },
    { key: 'autoProgress', title: '진행률 자동 계산', desc: '체크리스트 완료 수를 기반으로 대시보드 퍼센트를 계산합니다.' },
    { key: 'meetingTemplate', title: '회의록 템플릿', desc: '요약, 체크리스트, 담당자, 우선순위 형식으로 정리합니다.' },
    { key: 'mobileMode', title: '모바일 최적화', desc: '휴대폰에서 하단 네비와 카드형 화면을 우선 적용합니다.' },
    { key: 'railwayCheck', title: '배포 체크', desc: 'GitHub push 이후 Railway 확인 플로우를 문서에 표시합니다.' }
  ];
  return <><Hero eyebrow="설정 v0.6" title="이제 설정도 눌러볼 수 있게." desc="아직 DB 저장 전이지만, 최종 연결 구조를 기준으로 동작 흐름을 잡았습니다." /><div className="grid two uneven"><Card title="팀 기본 설정"><label className="input-label">팀 이름<input value={teamName} onChange={(e) => setTeamName(e.target.value)} /></label><div className="settings-preview"><b>{teamName}</b><span>HairFlow HQ 운영 워크스페이스</span></div></Card><Card title="연결 예정"><ul className="agenda"><li>v0.7: Task ↔ 회의록 ↔ 주차 연결 강화</li><li>v0.8: 팀원별 마감일 / 알림</li><li>v0.9: Supabase 실제 저장</li><li>v1.0: 팀원 실사용 정식 버전</li></ul></Card></div><Card title="자동화 설정"><div className="setting-list">{rows.map((row) => <button key={row.key} onClick={() => toggleSetting(row.key)} className={settings[row.key] ? 'on' : ''}><div><strong>{row.title}</strong><span>{row.desc}</span></div><em>{settings[row.key] ? 'ON' : 'OFF'}</em></button>)}</div></Card></>;
}
