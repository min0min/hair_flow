export function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">HairFlow 개발팀 전용 Workspace</p>
        <h1>오늘 회의와 작업을 한눈에 확인하세요.</h1>
      </div>
      <div className="top-actions">
        <button className="ghost">회의록 추가</button>
        <button className="primary">새 Task</button>
      </div>
    </header>
  );
}
