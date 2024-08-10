<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;

class MemberController extends Controller
{
    public function index(int $id)
    {
        $member = Member::find($id);
        return response()->json($member);
    }
}
