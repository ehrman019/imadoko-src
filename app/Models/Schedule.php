<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;
    protected $fillable = ['member_id', 'date', 'situation', 'depature_time', 'return_time', 'comment'];
    public function member()
    {
        return $this->belongsTo(Schedule::class);
    }
}
