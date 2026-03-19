<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HabitTracker extends Model
{
    public $fillable = [
        'user_id',
        'habit_id',
        'tracked_on'
    ];
}
