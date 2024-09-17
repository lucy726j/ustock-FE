import { formatPrice } from "../../util/gameUtil";

export interface Ingredient {
  id: string;
  icon: string;
  label: string;
  level: string;
  price: string;
}

export const allIngredients: Ingredient[] = [
  {
    id: "ONE",
    icon: "🔑",
    label: "추측",
    level: "1단계",
    price: formatPrice(100000),
  },
  {
    id: "TWO",
    icon: "🔑🔑",
    label: "의심",
    level: "2단계",
    price: formatPrice(300000),
  },
  {
    id: "THREE",
    icon: "🔑🔑🔑",
    label: "확신",
    level: "3단계",
    price: formatPrice(500000),
  },
];

export const initialTabs = allIngredients;

export function getNextIngredient(
  ingredients: Ingredient[]
): Ingredient | undefined {
  const existing = new Set(ingredients.map((i) => i.id));
  return allIngredients.find((ingredient) => !existing.has(ingredient.id));
}
