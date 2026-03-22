<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    public $fillable = [
        'user_id',
        'name',
        'description',
    ];

    public function trackers()
    {
        return $this->hasMany(HabitTracker::class);
    }
}
