import { useEffect } from 'react'
import father from '../data/father.json'

export function usePageTitle(page) {
  useEffect(() => {
    document.title = page
      ? `${page} · ${father.brandName}`
      : `${father.name} · ${father.title}`
  }, [page])
}
