<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('marcas', 'MarcasController@index');
Route::post('marcas', 'MarcasController@store');
Route::put('marcas/{id}', 'MarcasController@update');
Route::delete('marcas/{id}', 'MarcasController@destroy');
Route::get('carros', 'CarrosController@index');
Route::get('carros/{id}', 'CarrosController@show');
Route::post('carros', 'CarrosController@store');
Route::put('carros/{id}', 'CarrosController@update');
Route::delete('carros/{id}', 'CarrosController@destroy');
