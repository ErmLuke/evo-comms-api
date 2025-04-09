<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class CreateTerminalRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string'],
            'model' => ['nullable', 'string'],
            'serial_number' => ['required', 'string'],
            'customer_id' => ['nullable', 'integer', 'exists:App\Models\Customer,id'],
        ];
    }
}