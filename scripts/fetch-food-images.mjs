// Run: node scripts/fetch-food-images.mjs
// Queries TheMealDB for each dish and prints a TS mapping to stdout.

const menu = {
  'Comfort Food': ['Khichadi','Curd Rice','Dal','Mix Dal','Dal with Lauki','Dal with Palak','Rajma + Rice','Chole + Rice','Pav Bhaji','Maggie','Sandwich','Egg Curry + Rice','Paneer Bhurji','Aloo Paratha','Poha','Idli'],
  'Light Food': ['Oats','Boiled Eggs','Idli','Plain Dosa','Poha','Besan Chilla','Rawa Chilla','Sauteed Broccoli','Sauteed Beans','Sauteed Zucchini','Bhindi Sabzi','Beans Sabzi','Dal with Lauki','Curd Rice','Mushroom Curry','Sauteed Mushroom'],
  'Energy-Rich / Heavy': ['Paneer Paratha','Muli Paratha','Onion Paratha','Aloo Paratha','Mix Paratha','Methi Paratha','Paneer Butter Masala','Dal Makhni','Chole Bhature','Biryani','Egg Fried Rice','Paneer Fried Rice','Chicken Fried Rice','Pav Bhaji','French Toast','Pancake','Bread + Butter','Mutton','Butter Chicken'],
  'Special Occasion': ['Paneer Butter Masala','Kofta','Malai Kofta','Biryani','Chole Bhature','Veg Manchurian','Chicken Manchurian','Butter Chicken','Mutton Curry','Mutton Rogan Josh','Fried Rice','Pav Bhaji'],
  'Quick & Lazy': ['Maggie','Sandwich','Bread','Omelette','Boiled Eggs','Paneer Bhurji','Egg Curry','Fried Rice','Besan Chilla','Rawa Chilla'],
  'Protein-Rich': ['Boiled Eggs','Omelette','Egg Curry','Paneer Curry','Paneer Tikka','Paneer Bhurji','Soya Chunks','Chicken Curry','Grilled Chicken','Mutton','Besan Chilla','Rawa Chilla','Dal','Mix Dal'],
  'Balanced Everyday': ['Dal + Bhindi Sabzi + Roti','Dal + Beans Sabzi + Roti','Dal + Aloo Capsicum Sabzi + Roti','Paneer + Roti','Soya Chunks + Roti','Pulao + Raita','Curd Rice + Bhindi Sabzi','Curd Rice + Beans Sabzi','Curd Rice + Aloo Capsicum Sabzi','Mushroom + Roti','Mixed Veg Saute + Dal'],
  'Craving / Street-Style': ['Pav Bhaji','Veg Manchurian','Chicken Manchurian','Chole Bhature','Fried Rice','Masala Sandwich','Masala Maggie'],
}

// Search terms to try per dish (first hit wins)
function searchTerms(dish) {
  const base = dish.replace(/\s*\+.*$/, '').trim() // drop "+ Rice" etc
  const terms = [base]
  // Add fallback simplifications
  const simple = base.split(' ')[0]
  if (simple !== base) terms.push(simple)
  return terms
}

async function fetchImage(dish) {
  for (const term of searchTerms(dish)) {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(term)}`)
      const data = await res.json()
      if (data.meals && data.meals.length > 0) {
        return data.meals[0].strMealThumb
      }
    } catch { /* ignore */ }
  }
  return null
}

const allDishes = [...new Set(Object.values(menu).flat())]
const result = {}

for (const dish of allDishes) {
  const url = await fetchImage(dish)
  result[dish] = url
  process.stdout.write(url ? '.' : 'x')
}

console.log('\n\n// Found:', Object.values(result).filter(Boolean).length, '/', allDishes.length)
console.log('\nexport const foodImages: Record<string, string | null> = ' + JSON.stringify(result, null, 2))
