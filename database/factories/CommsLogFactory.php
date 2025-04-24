<?php

namespace Database\Factories;

use App\Models\CommsLog;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommsLogFactory extends Factory
{
    protected $model = CommsLog::class;

    public function definition(): array
    {
        return [
            'log' => $this->faker->sentence(),
        ];
    }
}
