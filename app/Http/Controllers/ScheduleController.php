<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;

class ScheduleController extends Controller
{
    public function index(int $id, string $date)
    {
        $schedule = Schedule::where(['member_id' => $id])->whereDate('date', $date)->first();
        return response()->json($schedule);
    }
}
