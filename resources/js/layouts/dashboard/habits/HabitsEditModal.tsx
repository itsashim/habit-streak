import { Field } from "@headlessui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import habits from "@/routes/habits";
import type { Habit } from "./types"

const habitSchema = z.object({
    name: z
        .string()
        .min(2, "Habit name must be at least 2 characters")
        .max(50, "Habit name is too long"),
    description: z
        .string()
        .max(250, "Description is too long")
        .optional()
        .or(z.literal("")),
})

type HabitFormValues = z.infer<typeof habitSchema>

interface HabitsEditModalProps {
    habit: Habit | null;
    open: boolean;
    setOpen: (open: boolean) => void;
}

function HabitsEditModal({ habit, open, setOpen }: HabitsEditModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<HabitFormValues>({
        resolver: zodResolver(habitSchema),
        defaultValues: {
            name: habit?.name || "",
            description: habit?.description ?? "",
        }
    })

    useEffect(() => {
        if (habit) {
            reset({
                name: habit.name,
                description: habit.description ?? "",
            });
        }
    }, [habit, reset]);

    const onSubmit = (data: HabitFormValues) => {
        if (!habit) return;
        
        router.put(habits.update(habit.id), data, {
            onSuccess: () => {
                toast.success("Habit has been updated");
                setOpen(false)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Edit Habit</DialogTitle>
                        <DialogDescription>
                            Update your habit's name.
                        </DialogDescription>
                    </DialogHeader>
                    <Field>
                        <Label htmlFor="edit-name">Name</Label>
                        <Input id="edit-name" {...register("name")} />
                    </Field>
                    {errors.name &&
                        <p className="text-red-400 py-2">{errors.name.message}</p>
                    }
                    <Field className="mt-3">
                        <Label htmlFor="edit-description">Why are you Startig this habit?</Label>
                        <Input
                            id="edit-description"
                            maxLength={250}
                            {...register("description")}
                        />
                    </Field>
                    {errors.description &&
                        <p className="text-red-400 py-2">{errors.description.message}</p>
                    }
                    <DialogFooter className="mt-3">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default HabitsEditModal
