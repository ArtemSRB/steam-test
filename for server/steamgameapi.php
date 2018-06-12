<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-type: application/json');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$api_key = "7A5F85FA779E5B3887295BDD14C3C2BC";
$steamid = trim(json_encode($_POST["data"]), '"');
$api_url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=$api_key&include_played_free_games=1&include_appinfo=1&steamid=$steamid&format=json";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
$json = json_decode($output, true);
echo json_encode($json);