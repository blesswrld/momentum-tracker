"use client";

import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useHabits } from "@/hooks/useHabits";
import { HabitCard } from "./HabitCard";
import { AddHabitDialog } from "./AddHabitDialog";
import { HowToUse } from "./HowToUse";
import ReactConfetti from "react-confetti";
import { HabitFilters } from "./HabitFilters";

export function HabitTracker() {
    const [isConfettiActive, setIsConfettiActive] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const handleHabitComplete = () => {
        setIsConfettiActive(true);
        setTimeout(() => {
            setIsConfettiActive(false);
        }, 10000);
    };

    const {
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
    } = useHabits({ onHabitComplete: handleHabitComplete });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <TooltipProvider>
            {isConfettiActive && (
                <ReactConfetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={400}
                    gravity={0.15}
                />
            )}

            {/* 2. Рендерим компонент с фильтрами и передаем ему все необходимое */}
            <HabitFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
            />

            <div className="space-y-6">
                {/* Логика отображения списка */}
                {habits.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                        <h3 className="text-lg font-semibold">
                            Привычек пока нет
                        </h3>
                        <p className="text-sm">
                            Нажмите на кнопку "+" чтобы добавить первую.
                        </p>
                    </div>
                ) : filteredHabits.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                        <h3 className="text-lg font-semibold">
                            Ничего не найдено
                        </h3>
                        <p className="text-sm">
                            Попробуйте изменить фильтры или поисковый запрос.
                        </p>
                    </div>
                ) : (
                    filteredHabits.map((habit) => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                            visibleMonths={visibleMonths[habit.id] || 1}
                            onToggleDay={toggleDayCompletion}
                            onDelete={deleteHabit}
                            onShowMore={showMore}
                            onCollapse={collapseHabit}
                        />
                    ))
                )}
            </div>

            <AddHabitDialog onAddHabit={addHabit} isGuideOpen={isGuideOpen} />

            <div className="mt-16 w-full max-w-2xl mx-auto">
                <HowToUse isOpen={isGuideOpen} onOpenChange={setIsGuideOpen} />
            </div>
        </TooltipProvider>
    );
}
