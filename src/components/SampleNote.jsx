export default function SampleNote({ children }) {
  if (!children) return null
  return (
    <p className="sample-note">
      <span>Sample</span>
      {children}
    </p>
  )
}
