"use client";

import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

// Определяем типы для props
type FilterStatus = "all" | "active" | "completed";

interface HabitFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    filterStatus: FilterStatus;
    onFilterChange: (status: FilterStatus) => void;
}

export function HabitFilters({
    searchQuery,
    onSearchChange,
    filterStatus,
    onFilterChange,
}: HabitFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Поле для поиска */}
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Найти привычку..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Группа кнопок для фильтрации по статусу */}
            <RadioGroup
                value={filterStatus} // Используем value вместо defaultValue для управляемого компонента
                onValueChange={(value: FilterStatus) => onFilterChange(value)}
                className="flex items-center space-x-4"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r1" />
                    <Label htmlFor="r1">Все</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="r2" />
                    <Label htmlFor="r2">Активные</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id="r3" />
                    <Label htmlFor="r3">Завершенные</Label>
                </div>
            </RadioGroup>
        </div>
    );
}
