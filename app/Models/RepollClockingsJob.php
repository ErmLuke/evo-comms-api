<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RepollClockingsJob extends Model
{
    protected $fillable = [
        'serial_number',
        'start_time',
        'end_time',
    ];
    public function queuedJob()
    {
        return $this->morphOne(QueuedJob::class, 'jobable');
    }
}
