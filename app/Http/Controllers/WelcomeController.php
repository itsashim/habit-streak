<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    public function index(Request $request)
    {
        $habits = Habit::query()
            ->when(Auth::check(), function ($q) {
                $q->where('user_id', Auth::id());
            })
            ->withCount([
                'trackers as tracked_today' => function ($query) {
                    $query->where('user_id', Auth::id())
                        ->whereDate('tracked_on', now());
                }
            ])
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->paginate(40)
            ->withQueryString();

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'habits' => $habits,
            'filters' => $request->only('search')
        ]);
    }

    public function show(Habit $habit)
    {
        $trackedDates = $habit->trackers()
            ->where('user_id', Auth::id())
            ->where('tracked_on', '>=', now()->subDays(365))
            ->pluck('tracked_on')
            ->map(fn($date) => \Carbon\Carbon::parse($date)->format('Y-m-d'))
            ->toArray();

        return Inertia::render('habits/show', [
            'habit' => $habit,
            'trackedDates' => $trackedDates
        ]);
    }
}
