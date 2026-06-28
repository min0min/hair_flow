const nav = ['대시보드', '프로젝트', 'Task', '회의록', '팀원', '문서', '설정'];
const icons = ['⌂', '◈', '☑', '✎', '◉', '▤', '⚙'];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">H</div>
        <div>
          <strong>HairFlow HQ</strong>
          <span>팀 회의 공간</span>
        </div>
      </div>
      <nav>
        {nav.map((item, idx) => (
          <a className={idx === 0 ? 'active' : ''} href={`#${item}`} key={item}>
            <span>{icons[idx]}</span>{item}
          </a>
        ))}
      </nav>
      <div className="side-card">
        <p>이번 Sprint</p>
        <strong>회의 시스템 v0.1</strong>
        <div className="progress"><i style={{ width: '42%' }} /></div>
        <small>42% 진행중</small>
      </div>
    </aside>
  );
}
