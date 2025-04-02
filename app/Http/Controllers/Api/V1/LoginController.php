<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function store(LoginRequest $request)
    {
        $request->validated();

        $user = User::where('email', $request->email)->first();
        if (! $user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        if (! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Wrong password'], 401);
        }

        return response()->json([
            'token' => $user->createToken(name: 'auth-Token', expiresAt: now()->endOfDay())->plainTextToken,
            'user' => $user,
        ]);

    }

    public function destroy(LoginRequest $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out.']);
    }
}
