import type { Config } from 'tailwindcss';
const config: Config = {content:['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],theme:{extend:{boxShadow:{soft:'0 20px 80px rgba(15,23,42,.12)'},backgroundImage:{mesh:'radial-gradient(circle at top left, rgba(14,165,233,.18), transparent 28%), radial-gradient(circle at 80% 10%, rgba(16,185,129,.16), transparent 28%), linear-gradient(135deg,#f8fafc 0%,#eef6ff 100%)'}}},plugins:[]};
export default config;
