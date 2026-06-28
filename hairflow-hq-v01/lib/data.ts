export const tasks = [
  { title: '회의용 사이트 v0.1 배포', owner: '유민', status: '진행중', priority: 'P0', due: '오늘' },
  { title: '팀원 역할 확정', owner: '전체', status: '대기', priority: 'P0', due: '오늘' },
  { title: 'HairFlow MVP 기능 5개 선정', owner: '유민', status: '검토', priority: 'P1', due: '이번주' },
  { title: 'Supabase 연결 준비', owner: '백엔드', status: '대기', priority: 'P1', due: '다음' },
  { title: '회의록 템플릿 정리', owner: 'PM', status: '완료', priority: 'P2', due: '완료' }
];

export const meetings = [
  { title: 'HairFlow 킥오프 회의', date: '2026.06.29', summary: '탈모 서비스 구현 전, 팀 협업용 HQ 사이트를 먼저 만들기로 결정.' },
  { title: 'MVP 범위 정리', date: '예정', summary: '로그인, 대시보드, 회의록, 태스크, 팀원 페이지 우선.' }
];

export const team = [
  { name: '유민', role: 'PM / 기획', workload: 78 },
  { name: '프론트', role: 'UI / 화면 개발', workload: 52 },
  { name: '백엔드', role: 'DB / API', workload: 38 },
  { name: 'AI', role: '회의 요약 / 자동화', workload: 24 }
];

export const docs = [
  '프로젝트 개요',
  '회의록 작성 규칙',
  'MVP 기능 정의',
  'DB 설계 초안',
  '배포 체크리스트'
];
