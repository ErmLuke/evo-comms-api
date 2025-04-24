<?php

declare(strict_types=1);

namespace App\Http\JsonResources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClockingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'timestamp' => $this->timestamp,
            'direction' => $this->direction,
        ];
    }
}