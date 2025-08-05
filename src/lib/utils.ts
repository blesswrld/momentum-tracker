import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Habit } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getTodayString = () => new Date().toISOString().split("T")[0];

// Функция для правильного склонения слов
export const getDaysRemainingText = (days: number): string => {
    if (days <= 0) {
        return "ЗАВЕРШЕНО";
    }
    if (days % 100 >= 11 && days % 100 <= 19) {
        return `ОСТАЛОСЬ ${days} ДНЕЙ`;
    }
    const lastDigit = days % 10;
    if (lastDigit === 1) {
        return `ОСТАЛОСЬ ${days} ДЕНЬ`;
    }
    if ([2, 3, 4].includes(lastDigit)) {
        return `ОСТАЛОСЬ ${days} ДНЯ`;
    }
    return `ОСТАЛОСЬ ${days} ДНЕЙ`;
};

export const getDaysForHabit = (habit: Habit, visibleMonths: number) => {
    const dates = [];
    const startDate = new Date(habit.startDate);
    const daysToShow = Math.min(visibleMonths * 30, habit.durationInDays);
    for (let i = 0; i < daysToShow; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        dates.push(currentDate.toISOString().split("T")[0]);
    }
    return dates;
};
