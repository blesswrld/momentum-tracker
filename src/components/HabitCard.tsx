import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronUp } from "lucide-react";
import { Habit } from "@/lib/types";
import { getDaysForHabit, getDaysRemainingText } from "@/lib/utils";

interface HabitCardProps {
    habit: Habit;
    visibleMonths: number;
    onToggleDay: (habitId: number, date: string) => void;
    onDelete: (habitId: number) => void;
    onShowMore: (habitId: number) => void;
    onCollapse: (habitId: number) => void;
}

export function HabitCard({
    habit,
    visibleMonths,
    onToggleDay,
    onDelete,
    onShowMore,
    onCollapse,
}: HabitCardProps) {
    const days = getDaysForHabit(habit, visibleMonths);
    const canShowMore = days.length < habit.durationInDays;
    const isExpanded = visibleMonths > 1;

    const startDate = new Date(habit.startDate);
    const today = new Date();
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const timeDiff = today.getTime() - startDate.getTime();
    const daysPassed = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
    const remainingDays = Math.max(0, habit.durationInDays - daysPassed);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-baseline gap-2">
                    <CardTitle>{habit.name}</CardTitle>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        {getDaysRemainingText(remainingDays)}
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(habit.id)}
                >
                    <Trash2 className="h-5 w-5 text-gray-500 hover:text-red-500 transition-colors" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap justify-start gap-3">
                    {days.map((day) => {
                        const isCompleted = habit.completed.includes(day);
                        return (
                            <Tooltip key={day} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() =>
                                            onToggleDay(habit.id, day)
                                        }
                                        className={`w-8 h-8 rounded-md transition-colors flex-shrink-0 ${
                                            isCompleted
                                                ? "bg-green-500 hover:bg-green-600"
                                                : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{new Date(day).toLocaleDateString()}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2 mt-4">
                    {canShowMore && (
                        <Button
                            variant="outline"
                            onClick={() => onShowMore(habit.id)}
                        >
                            Показать еще месяц
                        </Button>
                    )}
                    {isExpanded && (
                        <Button
                            variant="outline"
                            onClick={() => onCollapse(habit.id)}
                        >
                            Свернуть
                            <ChevronUp className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
