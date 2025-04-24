<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\JsonResources\Api\V1\TerminalResource;
use App\Http\Requests\Api\V1\CreateTerminalRequest;
use App\Models\Terminal;
use Illuminate\Http\JsonResponse;

class TerminalController extends Controller
{
    public function store(CreateTerminalRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $terminal = Terminal::create($validated);

        return response()->json([
            'message' => 'Terminal created successfully.',
            'data' => $terminal,
        ], 201);
    }

    public function show(Terminal $terminal): TerminalResource
    {
        return new TerminalResource($terminal);
    }
    public function destroy(Terminal $terminal): JsonResponse
    {
        $terminal->delete();
        return response()->json([
            'message' => 'Terminal deleted successfully.',
        ]);
    }
    public function clockings(int $terminalId)
    {
        $terminal = Terminal::findOrFail($terminalId);
        
        return response()->json($terminal->clockings);
    }
    public function index()
    {
        return Terminal::all();
    }
}
