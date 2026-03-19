<?php

namespace App\Http\Controllers;

use App\Models\HabitTracker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HabitTrackerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    // Store habit tracking
    public function store(Request $request)
    {
        $request->validate(['habit_id' => 'required|exists:habits,id']);

        HabitTracker::firstOrCreate([
            'user_id' => Auth::id(),
            'habit_id' => $request->habit_id,
            'tracked_on' => now()->toDateString(),
        ]);

        // Return JSON with your message or extra info
        return response()->json([
            'success' => true,
            'message' => 'Habit tracked successfully',
            'tracked_at' => now()->toDateTimeString(),
        ]);
    }

    // Remove habit tracking
    public function destroy($habitId)
    {
        HabitTracker::where('user_id', Auth::id())
            ->where('habit_id', $habitId)
            ->where('tracked_on', now()->toDateString())
            ->delete();

        return response()->json(['success' => true]);
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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }
}
