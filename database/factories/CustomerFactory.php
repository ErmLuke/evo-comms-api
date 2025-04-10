<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition(): array
    {
        return [
            'customer_name' => $this->faker->company(),
            'created_at' => now(),
            'updated_at' => now(),
            'evotime_id' => 'tenant-'.Str::random(10),
            'evotime_domain' => fn (array $attributes) => Str::slug($attributes['customer_name']).'.evotime.test',
        ];
    }
}
