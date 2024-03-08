import('node-fetch').then(async (module) => {
    const fetch = module.default;
    const fs = require('fs');
    const dotenv = require('dotenv').config()
    
    // Define your GitHub access token
    const accessToken = process.env.GITHUB_TOKEN; // Replace with your GitHub access token

    // Define your organization name
    const org = process.env.GITHUB_ORG;

    // Fetch granular data for each repository
    async function fetchRepositoryData(repoName) {
        try {
            const headers = {
                Authorization: `token ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

            // Fetch granular data for a repository
            // Example: Fetch pull requests
            const pullRequestsResponse = await fetch(`https://api.github.com/repos/${repoName}/pulls?state=all`, { headers });
            const pullRequestsData = await pullRequestsResponse.json();

            // Example: Fetch issues
            const issuesResponse = await fetch(`https://api.github.com/repos/${repoName}/issues?state=all`, { headers });
            const issuesData = await issuesResponse.json();

            // Fetch repository events
            const eventsResponse = await fetch(`https://api.github.com/repos/${repoName}/events`, { headers });
            const eventsData = await eventsResponse.json();

            // Fetch list of branches
            const branchesResponse = await fetch(`https://api.github.com/repos/${repoName}/branches`, { headers });
            const branchesData = await branchesResponse.json();

            // Fetch commit history for each branch
            const branchCommits = {};
            for (const branch of branchesData) {
                const branchName = branch.name;
                const commitsResponse = await fetch(`https://api.github.com/repos/${repoName}/commits?sha=${branchName}`, { headers });
                const commitsData = await commitsResponse.json();
                branchCommits[branchName] = commitsData;
            }

            // Combine the data you want to collect for each repository
            const repoData = {
                pullRequests: pullRequestsData,
                issues: issuesData,
                events: eventsData,
                branches: branchesData,
                branchCommits: branchCommits
            };

            return repoData;
        } catch (error) {
            console.error(`Error fetching data for repository ${repoName}:`, error);
            throw error;
        }
    }

    // Fetch organization data from GitHub API
    async function fetchOrganizationData() {
        try {
            const headers = {
                Authorization: `token ${accessToken}`
            };

            // Fetch repositories (both public and private)
            const repositoriesResponse = await fetch(`https://api.github.com/orgs/${org}/repos?type=all`, { headers });
            const repositoriesData = await repositoriesResponse.json();

            // Fetch granular data for each repository
            const repositories = [];
            for (const repo of repositoriesData) {
                const repoName = repo.full_name;
                const repoData = await fetchRepositoryData(repoName);
                repositories.push({
                    name: repoName,
                    data: repoData
                });
            }

            return repositories;
        } catch (error) {
            console.error('Error fetching organization data:', error);
            throw error;
        }
    }

    // Write data to a JSON file
    async function writeDataToFile(data) {
        try {
            fs.writeFileSync('data/organization_data.json', JSON.stringify(data, null, 2));
            console.log('Organization data written to organization_data.json');
        } catch (error) {
            console.error('Error writing data to file:', error);
            throw error;
        }
    }

    // Main function to fetch data and write to file
    async function main() {
        try {
            const data = await fetchOrganizationData();
            await writeDataToFile(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    main(); // Call the main function to execute the script
});
