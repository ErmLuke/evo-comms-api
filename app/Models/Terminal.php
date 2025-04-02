<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ActivityStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Terminal extends Model
{
    protected $fillable = [
        'model',
        'serial_number',
    ];
    public function status():ActivityStatus
    {
        return ActivityStatus::unknown();
    }
    public function lastConnection():Carbon
    {
        return Carbon::now();
    }
}
