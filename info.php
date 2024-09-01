<?php
header('Content-Type: application/json');
require_once('../config.php');

function getGitHubRepos() {
    $username = GITHUB_USERNAME;
    $url = "https://api.github.com/users/$username/repos";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'PHP Script');
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode != 200) {
        return ['error' => 'Failed to fetch repositories'];
    }
    
    $repos = json_decode($response, true);
    
    $simplifiedRepos = array_map(function($repo) {
        return [
            'name' => $repo['name'],
            'url' => $repo['html_url'],
            'description' => $repo['description'],
            'stars' => $repo['stargazers_count'],
            'language' => $repo['language']
        ];
    }, $repos);
    
    return $simplifiedRepos;
}

echo json_encode(getGitHubRepos());