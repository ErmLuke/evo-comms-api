<?php

declare(strict_types=1);

namespace App\Enums;

enum ActivityStatus: string
{
    case Connected = 'connected';
    case Disconnected = 'disconnected';
    case Unassigned = 'unassigned';
    case Unknown = 'unknown';
}