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

interface AddHabitDialogProps {
    onAddHabit: (name: string, duration: number) => void;
}

export function AddHabitDialog({ onAddHabit }: AddHabitDialogProps) {
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
                <Button className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg">
                    <PlusCircle className="h-8 w-8" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Добавить новую привычку</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Название
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3 text-sm"
                            placeholder="Напр., Медитировать 10 минут"
                        />
                    </div>
                    <div className="flex flex-wrap tems-center gap-4">
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
