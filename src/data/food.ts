export type Category =
  | 'Comfort Food'
  | 'Light Food'
  | 'Energy-Rich / Heavy'
  | 'Special Occasion'
  | 'Quick & Lazy'
  | 'Protein-Rich'
  | 'Balanced Everyday'
  | 'Craving / Street-Style'

export interface CategoryMeta {
  label: string
  description: string
  color: string        // Tailwind bg class for the pill/badge
  textColor: string   // Tailwind text class
  accent: string      // hex for inline accents
}

export const categoryMeta: Record<Category, CategoryMeta> = {
  'Comfort Food': {
    label: 'Comfort Food',
    description: 'Easy, familiar, satisfying',
    color: 'bg-amber-100',
    textColor: 'text-amber-800',
    accent: '#B45309',
  },
  'Light Food': {
    label: 'Light Food',
    description: 'Easy to digest, low oil',
    color: 'bg-green-100',
    textColor: 'text-green-800',
    accent: '#15803D',
  },
  'Energy-Rich / Heavy': {
    label: 'Energy-Rich / Heavy',
    description: 'Filling, calorie dense',
    color: 'bg-orange-100',
    textColor: 'text-orange-800',
    accent: '#C2410C',
  },
  'Special Occasion': {
    label: 'Special Occasion',
    description: 'More indulgent, not everyday',
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
    accent: '#7E22CE',
  },
  'Quick & Lazy': {
    label: 'Quick & Lazy',
    description: 'Minimal effort',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    accent: '#A16207',
  },
  'Protein-Rich': {
    label: 'Protein-Rich',
    description: 'Good for strength & gym support',
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    accent: '#1D4ED8',
  },
  'Balanced Everyday': {
    label: 'Balanced Everyday',
    description: 'What you should rotate regularly',
    color: 'bg-teal-100',
    textColor: 'text-teal-800',
    accent: '#0F766E',
  },
  'Craving / Street-Style': {
    label: 'Craving / Street-Style',
    description: 'When you want strong flavors',
    color: 'bg-red-100',
    textColor: 'text-red-800',
    accent: '#B91C1C',
  },
}

export const categories = Object.keys(categoryMeta) as Category[]

// Dish-level tags (e.g. meal time)
export const dishTags: Record<string, string[]> = {
  'Oats':           ['Breakfast'],
  'Idli':           ['Breakfast'],
  'Plain Dosa':     ['Breakfast'],
  'Poha':           ['Breakfast'],
  'Besan Chilla':   ['Breakfast'],
  'Rawa Chilla':    ['Breakfast'],
  'Paneer Paratha': ['Breakfast'],
  'Muli Paratha':   ['Breakfast'],
  'Onion Paratha':  ['Breakfast'],
  'Aloo Paratha':   ['Breakfast'],
  'Mix Paratha':    ['Breakfast'],
  'Methi Paratha':  ['Breakfast'],
  'French Toast':   ['Breakfast'],
  'Pancake':        ['Breakfast'],
  'Maggie':         ['Breakfast'],
  'Sandwich':       ['Breakfast'],
  'Bread':          ['Breakfast'],
  'Omelette':       ['Breakfast'],
  'Boiled Eggs':    ['Breakfast'],
  'Paneer Bhurji':  ['Breakfast'],
  'Chole Bhature':  ['Breakfast'],
}

// Each dish appears exactly once across all categories.
export const menu: Record<Category, string[]> = {
  'Comfort Food': [
    'Khichadi',
    'Curd Rice',
    'Dal',
    'Dal with Palak',
    'Rajma',
    'Rice',
    'Chole',
  ],
  'Light Food': [
    'Oats',
    'Idli',
    'Plain Dosa',
    'Poha',
    'Dal with Lauki',
    'Besan Chilla',
    'Rawa Chilla',
    'Bhindi Sabzi',
    'Beans Sabzi',
    'Mushroom Curry',
    'Sauteed Mushroom',
  ],
  'Energy-Rich / Heavy': [
    'Paneer Paratha',
    'Muli Paratha',
    'Onion Paratha',
    'Aloo Paratha',
    'Mix Paratha',
    'Methi Paratha',
    'Dal Makhni',
    'Egg Fried Rice',
    'Paneer Fried Rice',
    'Chicken Fried Rice',
    'French Toast',
    'Pancake',
  ],
  'Special Occasion': [
    'Paneer Butter Masala',
    'Kofta',
    'Malai Kofta',
    'Biryani',
    'Butter Chicken',
    'Mutton Curry',
    'Mutton Rogan Josh',
  ],
  'Quick & Lazy': [
    'Maggie',
    'Sandwich',
    'Bread',
    'Omelette',
    'Egg Curry',
    'Paneer Bhurji',
  ],
  'Protein-Rich': [
    'Boiled Eggs',
    'Mix Dal',
    'Paneer Curry',
    'Paneer Tikka',
    'Soya Chunks',
    'Chicken Curry',
    'Grilled Chicken',
  ],
  'Balanced Everyday': [
    'Bhindi Sabzi',
    'Beans Sabzi',
    'Aloo Capsicum Sabzi',
    'Pulao',
    'Raita',
    'Mixed Veg Saute',
  ],
  'Craving / Street-Style': [
    'Pav Bhaji',
    'Veg Manchurian',
    'Chicken Manchurian',
    'Chole Bhature',
    'Veg Fried Rice',
  ],
}
