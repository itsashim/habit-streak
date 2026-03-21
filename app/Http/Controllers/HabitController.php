<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HabitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $habits = Habit::query()
            ->where('user_id', Auth::id())
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString(); // keeps search query when paginating

        return Inertia::render('habits/habits', [
            'habits' => $habits,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('habits/habits-create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:50',
        ]);

        Habit::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
        ]);

        return redirect()->back()->with('success', 'Habit created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:50',
        ]);

        $habit = Habit::where('user_id', Auth::id())->findOrFail($id);
        $habit->update([
            'name' => $validated['name'],
        ]);

        return redirect()->back()->with('success', 'Habit updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($id);
        $habit->delete();

        return redirect()->back()->with('success', 'Habit deleted!');
    }
}
