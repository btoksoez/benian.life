<?php
require_once('../config.php');

// Function to fetch GitHub repos
function getGitHubRepos() {
    $username = GITHUB_USERNAME;
    $url = "https://api.github.com/users/$username/repos";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

// Fetch and return repos as JSON
header('Content-Type: application/json');
echo json_encode(getGitHubRepos());
?>
