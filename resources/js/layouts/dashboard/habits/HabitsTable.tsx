import { router } from "@inertiajs/react";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import habitsRoutes from "@/routes/habits";
import HabitsEditModal from "./HabitsEditModal";
import type { Habit, PaginatedData } from "./types";

interface HabitsTableProps {
    habits: PaginatedData<Habit>;
}

function HabitsTable({ habits }: HabitsTableProps) {
    const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
    const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);

    const executeDelete = () => {
        if (!habitToDelete) return;
        router.delete(habitsRoutes.destroy(habitToDelete.id), {
            onSuccess: () => setHabitToDelete(null)
        });
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {habits.data.map((habit) => (
                        <TableRow key={habit.id}>
                            <TableCell className="font-medium">{habit.id}</TableCell>
                            <TableCell>{habit.name}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setEditingHabit(habit)}>Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem variant="destructive" onClick={() => setHabitToDelete(habit)}>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            <HabitsEditModal 
                habit={editingHabit} 
                open={!!editingHabit} 
                setOpen={(isOpen) => !isOpen && setEditingHabit(null)} 
            />

            <Dialog open={!!habitToDelete} onOpenChange={(isOpen) => !isOpen && setHabitToDelete(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this habit? All tracking history will be lost. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setHabitToDelete(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={executeDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default HabitsTable
