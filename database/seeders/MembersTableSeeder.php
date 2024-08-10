<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Member;

class MembersTableSeeder extends Seeder
{
    public function run(): void
    {
        if (!Member::count()) {
            Member::factory()->count(10)->create();
        }
    }
}
