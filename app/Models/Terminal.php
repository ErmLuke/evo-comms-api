<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ActivityStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Terminal extends Model
{
    protected $fillable = [
        'name',
        'model',
        'serial_number',
        'customer_id',
    ];

    public function status(): ActivityStatus
    {
        return ActivityStatus::unknown();
    }

    public function customer(): HasOne
    {
        return $this->hasOne(Customer::class);
    }

    public function lastConnection(): Carbon
    {
        return Carbon::now();
    }
}
