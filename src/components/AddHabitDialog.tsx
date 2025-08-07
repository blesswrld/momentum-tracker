"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddHabitDialogProps } from "@/lib/types";

export function AddHabitDialog({
    onAddHabit,
    isGuideOpen = false,
}: AddHabitDialogProps) {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState(30);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = () => {
        onAddHabit(name, duration);
        // Сброс формы и закрытие окна
        setName("");
        setDuration(30);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className={cn(
                        "fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg transition-transform duration-300 ease-in-out",
                        isGuideOpen && "bottom-[23rem] md:bottom-8"
                    )}
                >
                    <PlusCircle className="h-8 w-8" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Добавить новую привычку</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Название
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            placeholder="Напр., Медитировать 10 минут"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right">
                            Длительность (дней)
                        </Label>
                        <Input
                            id="duration"
                            type="number"
                            value={duration}
                            onChange={(e) =>
                                setDuration(
                                    Math.max(
                                        1,
                                        Math.min(
                                            365,
                                            parseInt(e.target.value) || 1
                                        )
                                    )
                                )
                            }
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>
                        Создать привычку
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
