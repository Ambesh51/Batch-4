import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Compass,
  Gem,
  GraduationCap,
  Hash,
  HeartHandshake,
  Languages,
  Library,
  Mic,
  Moon,
  Orbit,
  ScrollText,
  Shield,
  Sparkles,
  Star,
  Sun,
  User,
  Users,
} from 'lucide-react'

const ICONS = {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Compass,
  Gem,
  GraduationCap,
  Hash,
  HeartHandshake,
  Languages,
  Library,
  Mic,
  Moon,
  Orbit,
  ScrollText,
  Shield,
  Sparkles,
  Star,
  Sun,
  User,
  Users,
}

export function Icon({ name, size = 22, strokeWidth = 1.5, className }) {
  const Glyph = ICONS[name] || Star
  return <Glyph size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />
}

export function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.2 18.4 5 21l2.7-.8A8.2 8.2 0 1 0 6.2 18.4Z" />
      <path d="M9.2 10.4c.2 1.5 1.6 2.8 3.1 3.1.5.1.8-.1 1.1-.4l.5-.6" />
    </svg>
  )
}

export function Seal({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke="#C9A45C" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="23" fill="none" stroke="#E5CB91" strokeWidth="0.6" opacity="0.8" />
      <path d="M32 10 L41 32 L32 54 L23 32 Z" fill="none" stroke="#E5CB91" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="2.3" fill="#E5CB91" />
    </svg>
  )
}
