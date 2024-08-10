<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;

class UpdateController extends Controller
{
    public function index(Request $req)
    {
        Schedule::find($req['id']) ? $schedule = Schedule::find($req['id']) : $schedule = new Schedule();
        $schedule->fill($req->except('_token'))->save();
        return true;
    }
}
