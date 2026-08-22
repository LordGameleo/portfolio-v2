import type { Metadata } from 'next'
import FoodPage from '../../src/views/Food/FoodPage'

export const metadata: Metadata = {
  title: "What's cooking?",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
}

export default function FoodRoute() {
  return <FoodPage />
}
