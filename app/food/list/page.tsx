import type { Metadata } from 'next'
import FoodListPage from '../../../src/views/Food/FoodListPage'

export const metadata: Metadata = {
  title: 'All dishes',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
}

export default function FoodListRoute() {
  return <FoodListPage />
}
