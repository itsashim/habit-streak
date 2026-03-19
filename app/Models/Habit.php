<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    public $fillable = [
        'user_id',
        'name',
    ];

    public function trackers()
    {
        return $this->hasMany(HabitTracker::class); // Adjust if your foreign key is different
    }
}
