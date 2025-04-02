<?php

declare(strict_types=1);

use App\Http\Controllers\Api\V1\LoginController;
use App\Http\Controllers\Api\V1\TerminalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::middleware([
    EnsureFrontendRequestsAreStateful::class,
    'auth:sanctum',
])->group(function () {
    Route::get('user', fn (Request $request) => $request->user());
    Route::get('terminals', [TerminalController::class, 'index']);
    Route::post('logout', [LoginController::class, 'destroy']);
});

Route::post('login', [LoginController::class, 'store']);
