<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MemberController;
use App\Http\Controllers\MemberListController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\ScheduleListController;
use App\Http\Controllers\UpdateController;


Route::get('/{name}', function () {
    return view('index');
})->where('name', '(?!api).*');

Route::prefix('/api')->group(function () {
    Route::get('/member/{id}', [MemberController::class, 'index']);
    Route::get('/member-list', [MemberListController::class, 'index']);
    Route::get('/schedule/{id}/{date}', [ScheduleController::class, 'index']);
    Route::get('/schedule-list/{day?}', [ScheduleListController::class, 'index']);
    Route::post('/update', [UpdateController::class, 'index']);
});
