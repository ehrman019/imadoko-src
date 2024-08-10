<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;

class ScheduleListController extends Controller
{
    public function index(string $date)
    {
        $scheduleList = Schedule::where(['date' => $date])->get();
        return response()->json($scheduleList);
    }
}
