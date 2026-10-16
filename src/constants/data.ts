/**
 * All the content shown on the Home screen lives here.
 * Edit this file to change banners, courses, tests, testimonials, etc.
 *
 * NOTE: Prices, lesson counts and student testimonials below are SAMPLE
 * content so the screen looks complete. Replace them with real data
 * (or load them from your backend/API) before publishing the app.
 */
// Local images are bundled with require(), which returns a numeric asset id
type ImageSourcePropType = number;

const img = {
  sankalp: require('../../assets/images/banners/sankalp.jpg'),
  aarambh: require('../../assets/images/banners/aarambh.jpg'),
  prelims: require('../../assets/images/banners/prelims.jpg'),
  foundation: require('../../assets/images/banners/foundation.jpg'),
  mains360: require('../../assets/images/banners/mains360.jpg'),
  dawc: require('../../assets/images/banners/dawc.jpg'),
};

export const logo = require('../../assets/images/logo.png');

// ---------- Goals (the "Current Goal" picker in the header) ----------
export const goals = [
  { id: 'upsc-cse', label: 'UPSC CSE', group: 'UPSC' },
  { id: 'bpsc', label: 'BPSC', group: 'State PSC' },
  { id: 'uppsc', label: 'UPPSC', group: 'State PSC' },
  { id: 'capf', label: 'UPSC CAPF', group: 'UPSC' },
  { id: 'epfo', label: 'UPSC EPFO', group: 'UPSC' },
  { id: 'nda', label: 'NDA', group: 'Defence' },
  { id: 'ssc', label: 'SSC CGL', group: 'SSC' },
];

// ---------- Hero banner carousel (same banners as the website) ----------
export type Banner = { id: string; image: ImageSourcePropType; title: string };
export const heroBanners: Banner[] = [
  { id: 'sankalp', image: img.sankalp, title: 'Sankalp – UPSC CSE GS Foundation' },
  { id: 'aarambh', image: img.aarambh, title: 'Aarambh – 71st BPSC Integrated' },
  { id: 'prelims', image: img.prelims, title: 'All India Prelims Test Series 2026' },
];

// ---------- Quick-access tiles ----------
export type QuickTile = {
  id: string;
  label: string;
  icon: string; // MaterialCommunityIcons name
  tint: string;
  bg: string;
  free?: boolean;
};
export const quickTiles: QuickTile[] = [
  { id: 'all-batch', label: 'All\nBatches', icon: 'school-outline', tint: '#FE0034', bg: '#FFF0F3' },
  { id: 'current-affairs', label: 'Current\nAffairs', icon: 'newspaper-variant-outline', tint: '#2563EB', bg: '#EFF6FF' },
  { id: 'test-series', label: 'Test\nSeries', icon: 'clipboard-check-outline', tint: '#16A34A', bg: '#ECFDF3' },
  { id: 'daily-practice', label: 'Daily\nPractice', icon: 'pencil-box-outline', tint: '#D97706', bg: '#FFF7ED', free: true },
  { id: 'pyqs', label: 'PYQs', icon: 'file-document-multiple-outline', tint: '#7C3AED', bg: '#F3EEFF' },
  { id: 'notes', label: 'Notes', icon: 'notebook-outline', tint: '#EA580C', bg: '#FFF4EC' },
  { id: 'topper-copy', label: 'Topper\nCopy', icon: 'trophy-outline', tint: '#CA8A04', bg: '#FEFAE6' },
  { id: 'ncert', label: 'NCERT\nBooks', icon: 'book-open-page-variant-outline', tint: '#0891B2', bg: '#ECFEFF' },
];

// ---------- Free batch section (Courses / Test tabs) ----------
export type FreeCourse = { id: string; title: string; image: ImageSourcePropType; lessons: number; language: string };
export const freeCourses: FreeCourse[] = [
  { id: 'fc1', title: 'Free Mentorship Program', image: img.foundation, lessons: 12, language: 'Hindi + English' },
  { id: 'fc2', title: 'Beginner’s Kit for UPSC', image: img.sankalp, lessons: 18, language: 'Hinglish' },
  { id: 'fc3', title: 'Free Mains Mentorship', image: img.mains360, lessons: 8, language: 'English' },
  { id: 'fc4', title: 'NCERT Foundation – Free Classes', image: img.aarambh, lessons: 15, language: 'Hindi' },
];

export type FreeTest = { id: string; title: string; questions: number; minutes: number; tag: string };
export const freeTests: FreeTest[] = [
  { id: 'ft1', title: 'Prelims Mock Test 01 – GS Paper I', questions: 100, minutes: 120, tag: 'Full Length' },
  { id: 'ft2', title: 'CSAT Practice Set – Reasoning', questions: 40, minutes: 60, tag: 'Sectional' },
  { id: 'ft3', title: 'Current Affairs Weekly Quiz', questions: 25, minutes: 20, tag: 'Quiz' },
  { id: 'ft4', title: 'Polity – PYQ Practice', questions: 50, minutes: 60, tag: 'PYQ' },
];

// ---------- Marketing banners ----------
export const marketingBanner = { image: img.foundation, aspectRatio: 1080 / 371 };
export const marketingStrip = { image: img.dawc, aspectRatio: 1024 / 242 };

// ---------- Popular courses ----------
export type Course = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  price: number;
  mrp?: number;
  tag?: string;
  language: string;
};
export const popularCourses: Course[] = [
  { id: 'c1', title: 'Foundation Batch 2027/28', subtitle: 'Prelims + Mains + Interview', image: img.foundation, price: 49999, mrp: 69999, tag: 'Bestseller', language: 'Hindi & English' },
  { id: 'c2', title: 'Sankalp GS Foundation', subtitle: 'Live classes • Test series • Notes', image: img.sankalp, price: 39999, mrp: 54999, tag: 'New', language: 'Hindi' },
  { id: 'c3', title: 'Mains 360 – Ethics & Essay', subtitle: 'GS-4 + Essay masterclass', image: img.mains360, price: 9999, mrp: 14999, language: 'English' },
  { id: 'c4', title: 'Aarambh – 71st BPSC', subtitle: 'Prelims + Mains integrated', image: img.aarambh, price: 19999, mrp: 29999, tag: 'Top Rankers', language: 'Hindi' },
  { id: 'c5', title: 'Recorded GS Batch', subtitle: 'Learn at your own pace', image: img.prelims, price: 4999, language: 'Hindi & English' },
];

// ---------- eShorts (short concept videos) ----------
export type EShort = { id: string; title: string; subject: string; views: string; colors: [string, string] };
export const eShorts: EShort[] = [
  { id: 'e1', title: 'Article 356 in 60 sec', subject: 'Polity', views: '12K', colors: ['#FE0034', '#7A0019'] },
  { id: 'e2', title: 'El Niño vs La Niña', subject: 'Geography', views: '9.4K', colors: ['#2563EB', '#1E3A8A'] },
  { id: 'e3', title: 'Repo Rate explained', subject: 'Economy', views: '15K', colors: ['#16A34A', '#14532D'] },
  { id: 'e4', title: 'Harappan town planning', subject: 'History', views: '7.8K', colors: ['#D97706', '#7C2D12'] },
  { id: 'e5', title: 'Ethics: Probity', subject: 'GS-4', views: '5.1K', colors: ['#7C3AED', '#3B0764'] },
];

// App elements shown next to eShorts
export const appElements = [
  { id: 'live', label: 'Live Classes', icon: 'broadcast' },
  { id: 'doubts', label: 'Doubt Solving', icon: 'chat-question-outline' },
  { id: 'answer', label: 'Answer Writing', icon: 'draw-pen' },
  { id: 'downloads', label: 'Downloads', icon: 'download-circle-outline' },
];

// ---------- Special programs (A4 poster cards) ----------
export type SpecialProgram = {
  id: string;
  kicker: string;
  title: string;
  highlight: string;
  points: string[];
  cta: string;
  colors: [string, string];
  accent: string;
};
export const specialPrograms: SpecialProgram[] = [
  {
    id: 'sp1',
    kicker: 'SPECIAL PROGRAM',
    title: '1:1 Mentorship',
    highlight: '2027 / 28',
    points: ['Personal mentor for every aspirant', 'Weekly strategy & study plan', 'Answer copy evaluation', 'Interview guidance'],
    cta: 'Apply Now',
    colors: ['#FE0034', '#8A001C'],
    accent: '#FFE51F',
  },
  {
    id: 'sp2',
    kicker: 'DAILY INITIATIVE',
    title: 'Answer Writing Challenge',
    highlight: 'FREE',
    points: ['2 Mains answers every morning', 'Model answers & peer review', 'Detailed evaluation', 'Editorial digest'],
    cta: 'Join Challenge',
    colors: ['#1E3A8A', '#0F172A'],
    accent: '#FFB020',
  },
  {
    id: 'sp3',
    kicker: 'PRELIMS 2026',
    title: 'All India Test Series',
    highlight: '100+ Tests',
    points: ['Full-length & sectional tests', 'Real exam environment', 'All-India ranking', 'Performance analysis'],
    cta: 'Enrol Now',
    colors: ['#6D28D9', '#2E1065'],
    accent: '#FDE68A',
  },
];

// ---------- Student love (testimonials) – SAMPLE TEXT, replace with real reviews ----------
export type Testimonial = { id: string; name: string; detail: string; quote: string; rating: number; color: string };
export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Aditi S.', detail: 'UPSC CSE Aspirant', quote: 'The daily answer writing and mentor feedback completely changed how I write Mains answers.', rating: 5, color: '#FE0034' },
  { id: 't2', name: 'Rohit K.', detail: 'BPSC Aspirant', quote: 'Bilingual classes and short notes made revision so much easier. Teachers clear every doubt.', rating: 5, color: '#2563EB' },
  { id: 't3', name: 'Neha P.', detail: 'Foundation Batch', quote: 'Test series analysis showed me exactly where I was losing marks. Highly recommended!', rating: 4, color: '#16A34A' },
  { id: 't4', name: 'Aman V.', detail: 'Mains 360 Student', quote: 'Ethics case studies were explained with real examples. My GS-4 confidence went way up.', rating: 5, color: '#D97706' },
];
