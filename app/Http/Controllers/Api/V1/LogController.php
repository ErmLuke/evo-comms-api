<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\JsonResources\Api\V1\CustomerResource;
use App\Http\Requests\Api\V1\CreateCustomerRequest;
use App\Models\CommsLog;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;

class LogController extends Controller
{
    public function index()
    {
        return CommsLog::all();
    }
}
