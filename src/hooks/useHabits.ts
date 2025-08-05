import { useState, useEffect, useRef, useMemo } from "react";
import { Habit } from "@/lib/types";
import { getTodayString } from "@/lib/utils";
import { toast } from "sonner";

interface UseHabitsProps {
    onHabitComplete: () => void;
}

type FilterStatus = "all" | "active" | "completed";

export function useHabits({ onHabitComplete }: UseHabitsProps) {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
    const [visibleMonths, setVisibleMonths] = useState<{
        [key: number]: number;
    }>({});
    const isInitialLoad = useRef(true);

    useEffect(() => {
        try {
            const savedHabits = localStorage.getItem("habits");
            if (savedHabits) setHabits(JSON.parse(savedHabits));
            else {
                setHabits([
                    {
                        id: 1,
                        name: "Утренняя зарядка (демо)",
                        startDate: "2024-05-10",
                        durationInDays: 30,
                        completed: [],
                    },
                    {
                        id: 2,
                        name: "Читать 20 страниц (демо)",
                        startDate: getTodayString(),
                        durationInDays: 60,
                        completed: [],
                    },
                ]);
            }
        } catch (error) {
            console.error("Failed to load habits from localStorage", error);
        }
    }, []);

    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            return;
        }
        try {
            localStorage.setItem("habits", JSON.stringify(habits));
        } catch (error) {
            console.error("Failed to save habits to localStorage", error);
        }
    }, [habits]);

    // ВЫЧИСЛЕНИЕ ОТФИЛЬТРОВАННОГО СПИСКА С ПОМОЩЬЮ useMemo
    const filteredHabits = useMemo(() => {
        return habits
            .filter((habit) => {
                // Фильтрация по статусу
                if (filterStatus === "all") return true;

                const startDate = new Date(habit.startDate);
                const today = new Date();
                startDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
                const timeDiff = today.getTime() - startDate.getTime();
                const daysPassed = Math.max(
                    0,
                    Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
                );
                const isCompleted = daysPassed >= habit.durationInDays;

                if (filterStatus === "completed") return isCompleted;
                if (filterStatus === "active") return !isCompleted;
                return true;
            })
            .filter((habit) => {
                // Фильтрация по поисковому запросу
                return habit.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            });
    }, [habits, searchQuery, filterStatus]);

    const addHabit = (name: string, durationInDays: number) => {
        if (!name.trim() || durationInDays <= 0) return;
        const newHabit: Habit = {
            id: Date.now(),
            name,
            startDate: getTodayString(),
            durationInDays: Math.min(durationInDays, 365),
            completed: [],
        };
        setHabits((prevHabits) => [...prevHabits, newHabit]);

        toast.success("Привычка создана!", {
            description: `Вы начали отслеживать "${name}". Удачи!`,
        });
    };

    const deleteHabit = (habitId: number) => {
        // 1. Находим привычку, чтобы получить ее имя ПЕРЕД удалением
        const habitToDelete = habits.find((habit) => habit.id === habitId);

        // 2. Обновляем состояние, удаляя привычку
        setHabits((prevHabits) =>
            prevHabits.filter((habit) => habit.id !== habitId)
        );
        setVisibleMonths((prev) => {
            const newVisible = { ...prev };
            delete newVisible[habitId];
            return newVisible;
        });

        // 3. Показываем уведомление, если привычка была найдена
        if (habitToDelete) {
            toast.info("Привычка удалена", {
                description: `"${habitToDelete.name}" была убрана из вашего списка.`,
            });
        }
    };

    const toggleDayCompletion = (habitId: number, date: string) => {
        setHabits((prevHabits) => {
            const newHabits = prevHabits.map((habit) => {
                if (habit.id === habitId) {
                    const isAlreadyCompleted = habit.completed.includes(date);
                    const newCompletedArray = isAlreadyCompleted
                        ? habit.completed.filter((d) => d !== date)
                        : [...habit.completed, date];

                    if (!isAlreadyCompleted) {
                        // КОД ДЛЯ ТЕСТИРОВАНИЯ УВЕДОМЛЕНИЯ О ЗАВЕРШЕНИИ
                        // `if (true)`, чтобы любая привычка считалась
                        // if (true) {
                        if (newCompletedArray.length >= habit.durationInDays) {
                            // Используем >= для надежности
                            onHabitComplete();
                            // <-- 3. Новый вызов toast для завершения -->
                            toast.success(
                                "Поздравляем! Привычка выполнена! 🎉",
                                {
                                    description: `Вы успешно завершили "${habit.name}"!`,
                                    duration: 5000,
                                }
                            );
                        }
                    }

                    return { ...habit, completed: newCompletedArray };
                }
                return habit;
            });
            return newHabits;
        });
    };

    const showMore = (habitId: number) => {
        setVisibleMonths((prev) => ({
            ...prev,
            [habitId]: (prev[habitId] || 1) + 1,
        }));
    };

    const collapseHabit = (habitId: number) => {
        setVisibleMonths((prev) => ({ ...prev, [habitId]: 1 }));
    };

    return {
        habits,
        filteredHabits,
        visibleMonths,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        addHabit,
        deleteHabit,
        toggleDayCompletion,
        showMore,
        collapseHabit,
    };
}
