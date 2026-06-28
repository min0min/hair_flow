import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { Card } from '@/components/Card';
import { docs, meetings, tasks, team } from '@/lib/data';

const columns = ['Backlog', 'Todo', 'Doing', 'Review', 'Done'];

export default function Home() {
  return (
    <main className="shell">
      <Sidebar />
      <section className="content">
        <Topbar />

        <div className="stats-grid">
          <Card><p className="muted">프로젝트 진행률</p><strong className="big">42%</strong><span className="up">+12% 이번주</span></Card>
          <Card><p className="muted">오늘 할 일</p><strong className="big">3개</strong><span>마감 임박 2개</span></Card>
          <Card><p className="muted">회의록</p><strong className="big">2개</strong><span>다음 회의 예정</span></Card>
          <Card><p className="muted">팀원</p><strong className="big">4명</strong><span>역할 분담 필요</span></Card>
        </div>

        <div className="hero-card" id="대시보드">
          <div>
            <p className="eyebrow">현재 목표</p>
            <h2>HairFlow 서비스 개발 전에, 팀원들이 함께 쓰는 회의용 HQ를 먼저 구축합니다.</h2>
            <p>회의록, 할 일, 프로젝트 진행률, 문서, 팀원 역할을 한 화면에서 정리하는 내부 운영 사이트입니다.</p>
          </div>
          <div className="radial">42%</div>
        </div>

        <div className="main-grid">
          <Card title="오늘 해야 할 일" className="span-7">
            <div className="task-list">
              {tasks.slice(0, 4).map((task) => (
                <div className="task-row" key={task.title}>
                  <div>
                    <strong>{task.title}</strong>
                    <span>{task.owner} · {task.due}</span>
                  </div>
                  <em className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</em>
                  <small>{task.status}</small>
                </div>
              ))}
            </div>
          </Card>

          <Card title="최근 회의록" className="span-5" >
            {meetings.map((m) => (
              <article className="meeting" key={m.title}>
                <span>{m.date}</span>
                <strong>{m.title}</strong>
                <p>{m.summary}</p>
              </article>
            ))}
          </Card>
        </div>

        <Card title="Task Board" className="board-card" >
          <div className="kanban" id="Task">
            {columns.map((col, i) => (
              <div className="column" key={col}>
                <h3>{col}</h3>
                {tasks.filter((_, idx) => idx % columns.length === i).map((task) => (
                  <div className="mini-task" key={task.title}>
                    <b>{task.title}</b>
                    <span>{task.owner}</span>
                    <em>{task.priority}</em>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>

        <div className="main-grid">
          <Card title="팀원 현황" className="span-6" >
            {team.map((member) => (
              <div className="member" key={member.name}>
                <div className="avatar">{member.name[0]}</div>
                <div className="member-info"><strong>{member.name}</strong><span>{member.role}</span></div>
                <div className="mini-progress"><i style={{ width: `${member.workload}%` }} /></div>
                <small>{member.workload}%</small>
              </div>
            ))}
          </Card>

          <Card title="문서 바로가기" className="span-6" >
            <div className="docs" id="문서">
              {docs.map((doc) => <button key={doc}>▤ {doc}</button>)}
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
