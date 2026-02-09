<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response;
// use Throwable;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
       $middleware->append(App\Http\Middleware\CorsMiddleware::class);
        $middleware->alias([
            'Role' => App\Http\Middleware\CheckRole::class,
        ]);
    })
    
    ->withExceptions(function (Exceptions $exceptions): void {
        // Validation error (422)       
        $exceptions->renderable(function (ValidationException $e, $request) {           
            return response()->json([
                'status'  => 422,
                'message' =>  $e->getMessage(),
                'data'    => null,
                'errors'  => $e->errors(),
            ], 422);
           
        });
        // Model not found (404)
        $exceptions->renderable(function (ModelNotFoundException $e, $request) {            
            return response()->json([
                'status'  => 404,
                'message' => 'Resource not found',
                'data'    => null,
                'errors'  => null,
            ], 404);
            
        });
        // Generic HTTP errors (401, 403, 404...)
        $exceptions->renderable(function (HttpExceptionInterface $e, $request) {           
            return response()->json([
                'status'  =>  $e->getStatusCode(),
                'message' => $e->getMessage() ?: 'HTTP error',
                'data'    => null,
                'errors'  => null,
            ], $e->getStatusCode());
            
        });
        $exceptions->renderable(function (BadRequestHttpException|BadRequestException $e, $request) {
        return response()->json([
            'status' => 400,
            'message' => $e->getMessage() ?: 'Bad request',
            'data' => null,
            'errors' => null,
        ], 400);
    });
    })->create();
