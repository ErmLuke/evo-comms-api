<?php

namespace Database\Factories;

use App\Models\Clocking;
use App\Models\Terminal;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClockingFactory extends Factory
{
    protected $model = Clocking::class;

    public function definition(): array
    {
        return [
            'time' => $this->faker->time(),
            'clocking_id' => random_int(1, 100),
            'serial_number' => Terminal::inRandomOrder()->value('serial_number'),
            'direction' => null,
        ];
    }
}
