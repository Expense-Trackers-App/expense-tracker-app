import { 
  Utensils, 
  Car, 
  Receipt, 
  ShoppingBag, 
  Gamepad2, 
  Wallet, 
  MoreHorizontal,
  LucideIcon
} from "lucide-react";
import { Category } from "./types";

export interface CategoryInfo {
  label: string;
  icon: LucideIcon;
  bg: string;
  color: string;
}

export const CATEGORIES: Record<Category, CategoryInfo> = {
  food: {
    label: "Food & Drinks",
    icon: Utensils,
    bg: "bg-orange-500/10",
    color: "text-orange-500",
  },
  transport: {
    label: "Transportation",
    icon: Car,
    bg: "bg-blue-500/10",
    color: "text-blue-500",
  },
  bills: {
    label: "Bills & Utilities",
    icon: Receipt,
    bg: "bg-red-500/10",
    color: "text-red-500",
  },
  shopping: {
    label: "Shopping",
    icon: ShoppingBag,
    bg: "bg-purple-500/10",
    color: "text-purple-500",
  },
  entertainment: {
    label: "Entertainment",
    icon: Gamepad2,
    bg: "bg-pink-500/10",
    color: "text-pink-500",
  },
  salary: {
    label: "Salary & Income",
    icon: Wallet,
    bg: "bg-green-500/10",
    color: "text-green-500",
  },
  others: {
    label: "Others",
    icon: MoreHorizontal,
    bg: "bg-gray-500/10",
    color: "text-gray-500",
  },
};

export const CATEGORY_LIST = Object.keys(CATEGORIES) as Category[];
