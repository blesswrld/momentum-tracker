"use client";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
    ChevronsUpDown,
    HelpCircle,
    Search,
    PlusCircle,
    Trash2,
} from "lucide-react";
import { HowToUseProps } from "@/lib/types";

export function HowToUse({ isOpen, onOpenChange }: HowToUseProps) {
    return (
        // 2. Связываем состояние с Collapsible
        <Collapsible
            open={isOpen}
            onOpenChange={onOpenChange}
            className="w-full"
        >
            <div className="flex items-center justify-center">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Как пользоваться?
                        <ChevronsUpDown className="h-4 w-4 ml-2" />
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                <div className="mt-4 p-6 border rounded-md bg-card text-card-foreground shadow">
                    <ul className="space-y-4 text-sm text-muted-foreground text-left">
                        <li className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-green-500 rounded-sm flex-shrink-0 mt-0.5" />
                            <span className="flex-1">
                                — Отмеченный / выполненный день.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-800 rounded-sm flex-shrink-0 mt-0.5" />
                            <span className="flex-1">
                                — Пропущенный / не отмеченный день.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span className="flex-1">
                                — Поиск и фильтрация привычек по названию или
                                статусу.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Trash2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span className="flex-1">— Удаление привычки.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <PlusCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span className="flex-1">
                                — Добавление новой привычки.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="pointer-events-none h-auto py-1 flex-shrink-0"
                            >
                                Показать еще...
                            </Button>
                            <span className="flex-1">
                                — Загрузка доп месяцев для длинных привычек.
                            </span>
                        </li>
                    </ul>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
