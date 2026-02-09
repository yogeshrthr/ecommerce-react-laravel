<?php

namespace App;

trait ApiResponseTrait
{
    protected function success($data, $message = 'Success', $code = 200)
    {
        return response()->json([
            'status'  => $code,
            'message' => $message,
            'data'    => $data,
            'errors'  => null,
        ], $code);
    }

    protected function error($data = null, $message = 'Error', $errors = null, $code = 400)
    {
        return response()->json([
            'status'  => $code,
            'message' => $message,
            'data'    => $data,
            'errors'  => $errors,
        ], $code);
    }

    protected function validationError($errors, $message = 'Validation failed')
    {
        return $this->error(null, $message, $errors, 422);
    }

    protected function notFound($message = 'Resource not found')
    {
        return $this->error(null, $message, null, 404);
    }

    protected function unauthorized($message = 'Unauthorized')
    {
        return $this->error(null, $message, null, 401);
    }
    protected function internalError($message = 'Internal server error', $errors = null)
    {
        $message = $message ?: 'Internal server error'; // use default if empty
        return $this->error(null, $message, $errors, 500);
    }

}
