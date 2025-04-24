<?php

declare(strict_types=1);

use App\Http\Controllers\Api\V1\CustomerController;
use App\Http\Controllers\Api\V1\LogController;
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
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('logs', LogController::class);
    Route::apiResource('terminals', TerminalController::class);
    Route::get('terminals/{terminal}/clockings', [TerminalController::class, 'clockings']);
    Route::post('logout', [LoginController::class, 'destroy']);
});

Route::post('login', [LoginController::class, 'store']);

