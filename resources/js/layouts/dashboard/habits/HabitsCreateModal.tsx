import { Field } from "@headlessui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import habits from "@/routes/habits";

const habitSchema = z.object({
    name: z
        .string()
        .min(2, "Habit name must be at least 2 characters")
        .max(50, "Habit name is too long"),
})

type HabitFormValues = z.infer<typeof habitSchema>

function HabitsCreateModal() {
    const [open, setOpen] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<HabitFormValues>({
        resolver: zodResolver(habitSchema),
    })

    const onSubmit = (data: HabitFormValues) => {
        router.post(habits.store(), data, {
            onSuccess: () => {
                toast.success("Event has been created");
                setOpen(false)
                reset()
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" className="ms-auto max-w-35"><Plus /> Create Habit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Create Habit</DialogTitle>
                        <DialogDescription>
                            Create a habit and track your sreak.
                        </DialogDescription>
                    </DialogHeader>
                    <Field>
                        <Label htmlFor="name-1">Name</Label>
                        <Input {...register("name")} placeholder="Drink water" />
                    </Field>
                    {errors.name &&
                        <p className="text-red-400 py-2">{errors.name.message}</p>
                    }
                    <DialogFooter className="mt-3">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {/* <DialogClose asChild> */}
                        <Button type="submit">Create</Button>
                        {/* </DialogClose> */}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default HabitsCreateModal
