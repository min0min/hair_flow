export function Card({ title, children, className = '' }: { title?: string; children: React.ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{title && <h2>{title}</h2>}{children}</section>;
}
