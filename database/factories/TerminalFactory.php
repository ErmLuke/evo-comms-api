<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Terminal;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class TerminalFactory extends Factory
{
    
    
    protected $model = Terminal::class;
    
    public function definition(): array
    {
        return [
            'model' => $this->faker->word(),
            'serial_number' => 'ASIY' . Str::random(16),
            'created_at' => now(),
            'updated_at' => now(),
            'customer_id' => $this->faker->optional(0.9)->randomElement(Customer::pluck('id')->toArray()), // 90% chance of getting an ID, 10% chance of null
            'name' => $this->faker->city(), // for location-like values
        ];
    }
    
}
