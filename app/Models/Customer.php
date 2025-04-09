<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'customer_name',
        'evotime_id',
        'evotime_domain',
    ];
    
    public function terminals(): hasMany
    {
        return $this->hasMany(Terminal::class);
    }
    
}
