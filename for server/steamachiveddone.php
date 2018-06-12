<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-type: application/json');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$api_key = "7A5F85FA779E5B3887295BDD14C3C2BC";
$steamid = trim(json_encode($_POST["data"]), '"');

$gameid = json_encode($_POST["gameid"]);
$url = "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=$gameid&key=$api_key&steamid=$steamid";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
$json = json_decode($output, true);
echo json_encode($json);