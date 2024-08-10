<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Schedule;

class SchedulesTableSeeder extends Seeder
{
    public function run(): void
    {
        function seed($day)
        {
            $depature_null = rand(0, 1);
            $return_null = rand(0, 1);
            for ($id = 1; $id <= 10; $id++) {
                $schedules = new Schedule();
                $depature_time = "09:00";
                $return_time = "18:00";
                $situation = rand(1, 4);
                if ($situation === 2 && $depature_null) {
                    $depature_time = null;
                }
                if ($situation === 2 && $return_null) {
                    $return_time = null;
                }

                $data = [
                    'member_id' => $id,
                    'date' => date("Y-m-d", strtotime($day . " day")),
                    'situation' => $situation,
                    'depature_time' => $depature_time,
                    'return_time' => $return_time,
                    'comment' => 'サンプルテキスト' . $id,
                ];
                $schedules->fill($data)->save();
            }
        }

        for ($day = -1; $day <= 1; $day++) {
            $date = date("Y-m-d", strtotime($day . " day"));
            if (!Schedule::where(['date' => $date])->whereDate('date', $date)->count()) {
                seed($day);
            }
        }
    }
}
