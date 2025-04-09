<?php

declare(strict_types=1);

namespace App\Http\JsonResources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Override;

class TerminalResource extends JsonResource
{
    #[Override]
    public function toArray(Request $request): array
    {
        return [
            'terminal_name' => $this->name,
            'model' => $this->model,
            'serial_number' => $this->serial_number,
            'customer' => [
                'name' => $this->customer->customer_name,
                'id' => $this->customer->evotime_id,
                'domain' => $this->customer->evotime_domain,
            ],
        ];

    }
}
