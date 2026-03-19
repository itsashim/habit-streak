<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    public function index()
    {
        $habits = Habit::where('user_id', Auth::id())->paginate(40);

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'habits' => $habits
        ]);
    }
}
