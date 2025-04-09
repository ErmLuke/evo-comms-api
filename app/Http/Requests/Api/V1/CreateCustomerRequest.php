<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class CreateCustomerRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'customer_name' => ['nullable', 'string'],
            'evotime_id' => ['required', 'string'],
            'evotime_domain' => ['nullable', 'string'],
        ];
    }
}