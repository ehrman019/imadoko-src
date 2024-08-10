<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;

class MemberListController extends Controller
{
    public function index()
    {
        $memberList = Member::all();
        return response()->json($memberList);
    }
}
