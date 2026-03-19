<?php

use App\Http\Controllers\HabitController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', [WelcomeController::class,'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('habits', HabitController::class);
});

require __DIR__ . '/settings.php';
