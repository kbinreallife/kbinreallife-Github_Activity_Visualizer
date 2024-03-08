// main.js

const fs = require('fs');
const express = require('express');
const path = require('path');
const { filterIssueByState, filterPullRequestByState, groupPullRequestsByRepo } = require('./query_library.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Read issue data from the file
const issueRawData = JSON.parse(fs.readFileSync('data/issue_data.json', 'utf-8'));
const pullRequestRawData = JSON.parse(fs.readFileSync('data/pull_request_data.json', 'utf-8'));

const openIssues = filterIssueByState(issueRawData, 'open');
const openPullRequests = filterPullRequestByState(pullRequestRawData, 'open');

// Filter pull requests created within the last 14 days
const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 30);
const recentPullRequests = openPullRequests.filter(pr => new Date(pr.created_at) > twoWeeksAgo);

// Filter merged pull requests
const mergedPullRequests = pullRequestRawData.filter(pr => pr.state === 'closed' && pr.merged_at !== null);


// Group pull requests by repository
const groupedRecentPullRequests = groupPullRequestsByRepo(recentPullRequests);
const groupedMergedPullRequests = groupPullRequestsByRepo(mergedPullRequests);

// Combine recent and merged pull requests data
const groupedPullRequests = {};
for (const repo in groupedRecentPullRequests) {
    const openCount = groupedRecentPullRequests[repo].length;
    const mergedCount = groupedMergedPullRequests[repo] ? groupedMergedPullRequests[repo].length : 0;
    groupedPullRequests[repo] = { open: openCount, merged: mergedCount };
}

// Check if pull requests are grouped by repository
if ('undefined' in groupedPullRequests) {
    delete groupedPullRequests['undefined']; // Remove undefined key
}

app.get('/', (req, res) => {
    // Extract repo names from the groupedPullRequests object
    const repoNames = Object.keys(groupedPullRequests);

    // Map each repo name to its corresponding open count
    const openCounts = repoNames.map(repo => groupedPullRequests[repo].open);

    // Map each repo name to its corresponding merged count
    const mergedCounts = repoNames.map(repo => groupedPullRequests[repo].merged);

    // Convert the arrays to JSON strings
    const repoNamesJSON = JSON.stringify(repoNames);
    const openCountsJSON = JSON.stringify(openCounts);
    const mergedCountsJSON = JSON.stringify(mergedCounts);

    // Read the HTML file and send it directly
    fs.readFile(path.join(__dirname, '../', 'index.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Replace placeholders in HTML file with data
        html = html.replace('{{ repoNames }}', repoNamesJSON);
        html = html.replace('{{ openCounts }}', openCountsJSON);
        html = html.replace('{{ mergedCounts }}', mergedCountsJSON);

        // Send the modified HTML file
        res.send(html);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
