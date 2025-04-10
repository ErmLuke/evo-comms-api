<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QueuedJob extends Model
{
    protected $fillable = [
        'jobable_id',
        'jobable_type',
    ];
    
    public function jobable()
    {
        return $this->morphTo();
    }
}
