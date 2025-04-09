<?php

declare(strict_types=1);

namespace App\Http\JsonResources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Override;

class CustomerResource extends JsonResource
{
    #[Override]
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->customer_name,
            'id' => $this->evotime_id,
            'domain' => $this->evotime_domain,
        ];

    }
}
