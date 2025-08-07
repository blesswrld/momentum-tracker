// Основная структура данных
export interface Habit {
    id: number;
    name: string;
    startDate: string;
    durationInDays: number;
    completed: string[];
}

// Тип для фильтра
export type FilterStatus = "all" | "active" | "completed";

// Интерфейсы для Props компонентов
export interface UseHabitsProps {
    onHabitComplete: () => void;
}

export interface HabitCardProps {
    habit: Habit;
    visibleMonths: number;
    onToggleDay: (habitId: number, date: string) => void;
    onDelete: (habitId: number) => void;
    onShowMore: (habitId: number) => void;
    onCollapse: (habitId: number) => void;
}

export interface HabitFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    filterStatus: FilterStatus;
    onFilterChange: (status: FilterStatus) => void;
}

export interface AddHabitDialogProps {
    onAddHabit: (name: string, duration: number) => void;
    isGuideOpen?: boolean;
}

export interface HowToUseProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}
