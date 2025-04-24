<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ActivityStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Terminal extends Model
{
    use HasFactory;

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

    public function clockings(): HasMany
    {
        return $this->hasMany(Clocking::class, 'serial_number', 'serial_number');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function lastConnection(): Carbon
    {
        return Carbon::now();
    }
}
