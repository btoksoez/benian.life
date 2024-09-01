#!/usr/bin/env python3
from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/api/github/repos')
def github_repos():
    username = 'btoksoez'
    url = f'https://api.github.com/users/{username}/repos'
    
    response = requests.get(url)
    repos = response.json()
    
    # Extract relevant info from each repo
    repo_list = [{
        'name': repo['name'],
        'url': repo['html_url'],
        'description': repo['description'],
        'stars': repo['stargazers_count'],
        'language': repo['language']
    } for repo in repos]
    
    return jsonify(repo_list)

if __name__ == '__main__':
    app.run(debug=True)