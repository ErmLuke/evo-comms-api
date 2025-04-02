<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Terminal;

class TerminalController extends Controller
{
    public function index()
    {
        return Terminal::all();
    }
}
