const tasks = [
  { title: "MVP 핵심 기능 확정", owner: "유민", status: "진행중", priority: "P0" },
  { title: "회의록 템플릿 정리", owner: "민수", status: "검토", priority: "P1" },
  { title: "GitHub / Railway 배포 확인", owner: "지훈", status: "완료", priority: "P0" },
  { title: "Supabase 연결 준비", owner: "서연", status: "대기", priority: "P1" },
];

const meetings = [
  { title: "1차 기획 회의", date: "오늘 20:00", summary: "회의 사이트 범위 확정, 역할 분담" },
  { title: "개발 스프린트 리뷰", date: "수요일", summary: "대시보드/Task/회의록 진행상황 점검" },
];

const columns = ["Backlog", "Todo", "Doing", "Review", "Done"];

export default function Page() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e0f2fe,transparent_30%),linear-gradient(135deg,#f8fafc,#eef2ff)]">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-5 py-6">
        <aside className="hidden w-64 shrink-0 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-soft backdrop-blur lg:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">HF</div>
            <div>
              <p className="text-sm text-slate-500">회의용 워크스페이스</p>
              <h1 className="text-xl font-black tracking-tight">HairFlow HQ</h1>
            </div>
          </div>
          <nav className="space-y-2 text-sm font-semibold text-slate-600">
            {["🏠 대시보드", "📁 프로젝트", "📋 Task", "📝 회의록", "👥 팀원", "📚 문서", "⚙ 설정"].map((item, i) => (
              <div key={item} className={`rounded-2xl px-4 py-3 ${i === 0 ? "bg-slate-950 text-white" : "hover:bg-slate-100"}`}>{item}</div>
            ))}
          </nav>
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-4 text-white">
            <p className="text-xs opacity-80">현재 스프린트</p>
            <p className="mt-1 text-lg font-black">Sprint 01</p>
            <div className="mt-4 h-2 rounded-full bg-white/25"><div className="h-2 w-[52%] rounded-full bg-white" /></div>
            <p className="mt-2 text-xs opacity-85">진행률 52%</p>
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <header className="flex flex-col justify-between gap-4 rounded-3xl border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur md:flex-row md:items-center">
            <div>
              <p className="font-semibold text-blue-600">HairFlow 팀 전용 회의 사이트</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">오늘 회의와 작업을 한눈에.</h2>
              <p className="mt-3 max-w-2xl text-slate-500">회의록, Task, 프로젝트 진행률, 팀원 역할을 한 공간에서 관리하는 HQ입니다.</p>
            </div>
            <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/20">+ 새 회의록</button>
          </header>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["프로젝트 진행률", "52%", "MVP 기준"],
              ["오늘 할 일", "4개", "P0 2개"],
              ["최근 회의", "2건", "이번 주"],
              ["팀원", "4명", "역할 배정"],
            ].map(([label, value, sub]) => (
              <div key={label} className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft">
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-black">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{sub}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
            <section className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-black">📋 Task Board</h3>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">Mock Data</span>
              </div>
              <div className="grid gap-3 md:grid-cols-5">
                {columns.map((column, idx) => (
                  <div key={column} className="min-h-56 rounded-2xl bg-slate-50 p-3">
                    <p className="mb-3 text-sm font-black text-slate-500">{column}</p>
                    {tasks.filter((_, i) => i % 5 === idx || (idx === 2 && i === 0)).map((task) => (
                      <article key={task.title} className="mb-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
                        <div className="flex items-center justify-between"><span className="text-xs font-black text-blue-600">{task.priority}</span><span className="text-xs text-slate-400">{task.owner}</span></div>
                        <p className="mt-2 text-sm font-bold">{task.title}</p>
                        <p className="mt-2 text-xs text-slate-400">{task.status}</p>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft">
                <h3 className="text-xl font-black">📝 최근 회의록</h3>
                <div className="mt-4 space-y-3">
                  {meetings.map((m) => (
                    <div key={m.title} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between"><p className="font-black">{m.title}</p><span className="text-xs font-bold text-blue-600">{m.date}</span></div>
                      <p className="mt-2 text-sm text-slate-500">{m.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/70 bg-slate-950 p-5 text-white shadow-soft">
                <h3 className="text-xl font-black">👥 팀 현황</h3>
                <div className="mt-4 space-y-4">
                  {["유민 PM/기획", "민수 Frontend", "지훈 Backend", "서연 Design/QA"].map((name, i) => (
                    <div key={name}>
                      <div className="mb-1 flex justify-between text-sm"><span>{name}</span><span>{[75,45,60,30][i]}%</span></div>
                      <div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" style={{ width: `${[75,45,60,30][i]}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
