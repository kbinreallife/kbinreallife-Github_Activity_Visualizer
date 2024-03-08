const fs = require('fs');
const express = require('express');
const path = require('path')

// Read the JSON file
const raw_data = fs.readFileSync('data/organization_data.json');
const json_data = JSON.parse(raw_data);

// Function to get the first level of key names
function get_keys(data) {
    return Object.keys(data);
}

function get_repo_names() {
    
    const repo_names = [];
    for (let key of get_keys(json_data)) {
        const repo_name = json_data[key].name;
        // Use regex to remove "comcode-org/" from the repository name
        const cleaned_repo_name = repo_name.replace(/^comcode-org\//, '');
        repo_names.push(cleaned_repo_name);
    }
    return repo_names;
}

function get_all_prs() {
    const pullRequests = [];

    // Iterate over each repository in the JSON data
    for (const repo of json_data) {
        // Check if the repository has pullRequests property
        if (repo.data.hasOwnProperty('pullRequests')) {
            // Add pull request data to the pullRequests array
            pullRequests.push(...repo.data.pullRequests);
        }
    }

    return pullRequests;
}

const pullRequests = get_all_prs()

function get_pr_keys (i) {
    let keys = Object.keys(pullRequests[i])
    let data = {}
    for(let key of keys) {
        data[key] = pullRequests[i][key]
    }
    return data
}

function make_all_pull_requests_searchable () {
    let all_data = []
    for(let i = 0; i < pullRequests.length; i++) {
        all_data.push(get_pr_keys(i))
    }
    return all_data
}

const pull_requests = make_all_pull_requests_searchable()

// Write pull request data to a file
function writePullRequestsToFile(pull_requests) {
    const jsonData = JSON.stringify(pull_requests, null, 2);
    const folderPath = path.join(__dirname, '../data')
    const filename = path.join(folderPath, 'pull_request_data.json');
    fs.writeFileSync(filename, jsonData);
    console.log(`Pull requests data has been written to ${filename}`);
}

// Call the function to write pull request data to file
writePullRequestsToFile(pull_requests);

function get_all_issues() {
    let issues = [];

    // Iterate over each repository in the JSON data
    for (const repo of json_data) {
        // Check if the repository has issues property
        if (repo.data.hasOwnProperty('issues')) {
            // Add pull request data to the issues array
            issues.push(...repo.data.issues);
        }
    }

    return issues;
}

const issue_anon_keys = get_all_issues()

function get_issues_keys (i) {
    let keys = Object.keys(issue_anon_keys[i])
    let data = {}
    for(let key of keys) {
        data[key] = issue_anon_keys[i][key]
    }
    return data
}

function make_all_issues_searchable () {
    let all_data = []
    for(let i = 0; i < issue_anon_keys.length; i++) {
        all_data.push(get_issues_keys(i))
    }
    return all_data
}

const searchable_issues = make_all_issues_searchable()

// Write pull request data to a file
function writeIssuesToFile(searchable_issues) {
    const jsonData = JSON.stringify(searchable_issues, null, 2);
    const folderPath = path.join(__dirname, '../data')
    const filename = path.join(folderPath, 'issue_data.json');
    fs.writeFileSync(filename, jsonData);
    console.log(`Pull requests data has been written to ${filename}`);
}

// Call the function to write pull request data to file
writeIssuesToFile(searchable_issues);
