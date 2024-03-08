// query_library.js

// Pull request queries

// Filter pull requests by repository name
function filterPullRequestByRepoName(data, repoName) {
    return data.filter(pr => pr.repository === repoName);
}

// Filter pull requests by state
function filterPullRequestByState(data, state) {
    return data.filter(pr => pr.state === state);
}

// Filter pull requests by author
function filterPullRequestByAuthor(data, author) {
    return data.filter(pr => pr.author === author);
}

// Filter pull requests by number
function filterPullRequestByNumber(data, number) {
    return data.filter(pr => pr.number === number);
}

// Filter pull requests by user
function filterPullRequestByUser(data, user) {
    return data.filter(pr => pr.user === user);
}

// Filter pull requests by created_at date
function filterPullRequestByCreatedAt(data, createdAt) {
    return data.filter(pr => pr.created_at === createdAt);
}

// Filter pull requests by merged_at date
function filterPullRequestByMergedAt(data, mergedAt) {
    return data.filter(pr => pr.merged_at === mergedAt);
}

// Filter pull requests by draft status
function filterPullRequestByDraft(data, draft) {
    return data.filter(pr => pr.draft === draft);
}

// Filter pull requests by updated_at date
function filterPullRequestByUpdatedAt(data, updatedAt) {
    return data.filter(pr => pr.updated_at === updatedAt);
}

// Filter pull requests by title
function filterPullRequestByTitle(data, title) {
    return data.filter(pr => pr.title === title);
}

// Filter pull requests by labels
function filterPullRequestByLabels(data, labels) {
    return data.filter(pr => pr.labels.includes(labels));
}

// Function to filter pull requests by merge status
function filterPullRequestByMergeStatus(data, isMerged) {
    if (isMerged) {
        return data.filter(pr => pr.merged_at !== null);
    } else {
        return data.filter(pr => pr.merged_at === null);
    }
}

// Calculate time open for a pull request
function calculateTimeOpenForPRs(pr) {
    const createdDate = new Date(pr.created_at);
    const mergedDate = pr.merged_at ? new Date(pr.merged_at) : new Date();
    return mergedDate - createdDate;
}

// issue queries

// Function to filter issue data by number
function filterIssueByNumber(data, number) {
    return data.filter(issue => issue.number === number);
}

// Function to filter issue data by title
function filterIssueByTitle(data, title) {
    return data.filter(issue => issue.title === title);
}

// Function to filter issue data by user
function filterIssueByUser(data, user) {
    return data.filter(issue => issue.user === user);
}

// Function to filter issue data by labels
function filterIssueByLabels(data, labels) {
    return data.filter(issue => issue.labels.includes(labels));
}

// Function to filter issue data by state
function filterIssueByState(data, state) {
    return data.filter(issue => issue.state === state);
}

// Function to filter issue data by created_at date
function filterIssueByCreatedAt(data, createdAt) {
    return data.filter(issue => issue.created_at === createdAt);
}

// Function to filter issue data by updated_at date
function filterIssueByUpdatedAt(data, updatedAt) {
    return data.filter(issue => issue.updated_at === updatedAt);
}

// Function to filter issue data by closed_at date
function filterIssueByClosedAt(data, closedAt) {
    return data.filter(issue => issue.closed_at === closedAt);
}

// Function to filter issue data by author_association
function filterIssueByAuthorAssociation(data, authorAssociation) {
    return data.filter(issue => issue.author_association === authorAssociation);
}

// Function to filter issue data by draft status
function filterIssueByDraft(data, draft) {
    return data.filter(issue => issue.draft === draft);
}

// Function to filter issue data by pull_request status
function filterIssueByPullRequest(data, isPullRequest) {
    return data.filter(issue => issue.pull_request === isPullRequest);
}

// Function to filter issue data by body
function filterIssueByBody(data, body) {
    return data.filter(issue => issue.body === body);
}

// Function to filter issue data by timeline_url
function filterIssueByTimelineURL(data, timelineURL) {
    return data.filter(issue => issue.timeline_url === timelineURL);
}

// Function to filter issue data by state reason
function filterIssueByStateReason(data, stateReason) {
    return data.filter(issue => issue.state_reason === stateReason);
}

// Function to calculate time open for an issue
function calculateTimeOpenForIssue(issue) {
    const createdDate = new Date(issue.created_at);
    const closedDate = issue.closed_at ? new Date(issue.closed_at) : new Date();
    return closedDate - createdDate;
}

// Function to count the number of unique IDs in pull requests
function countPullRequestsById(data) {
    const uniqueIds = new Set();
    data.forEach(pullRequest => {
        uniqueIds.add(pullRequest.id);
    });
    return uniqueIds.size;
}

// Function to count unique issues by ID, excluding those with IDs matching pull request IDs
function countUniqueIssuesById(issueData, pullRequestData) {
    const pullRequestIds = new Set();
    pullRequestData.forEach(pr => pullRequestIds.add(pr.id));

    const uniqueIssueIds = new Set();
    issueData.forEach(issue => {
        if (!pullRequestIds.has(issue.id)) {
            uniqueIssueIds.add(issue.id);
        }
    });

    return uniqueIssueIds.size;
}

// Function to group pull requests by repository name
function groupPullRequestsByRepo(pullRequestRawData) {
    const pullRequestsByRepo = {};
    pullRequestRawData.forEach(pr => {
        const repoName = pr.repository;
        if (!pullRequestsByRepo.hasOwnProperty(repoName)) {
            pullRequestsByRepo[repoName] = [];
        }
        pullRequestsByRepo[repoName].push(pr);
    });
    return pullRequestsByRepo;
}

// Function to sort pull requests by creation date
function sortPullRequestsByDate(pullRequests) {
    return pullRequests.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
}

// Function to group pull requests by repository
function groupPullRequestsByRepo(pullRequests) {
    const pullRequestsByRepo = {};
    pullRequests.forEach(pr => {
        const repoName = pr.head.repo.name;
        if (!pullRequestsByRepo.hasOwnProperty(repoName)) {
            pullRequestsByRepo[repoName] = [];
        }
        pullRequestsByRepo[repoName].push(pr);
    });
    return pullRequestsByRepo;
}

// Function to group issues by repository
function groupIssuesByRepo(data) {
    const issuesByRepo = {};
    data.forEach(issue => {
        const repoUrl = issue.repository_url;
        const repoName = repoUrl.split('/').slice(-1)[0]; // Extract the repository name from the URL
        if (!issuesByRepo.hasOwnProperty(repoName)) {
            issuesByRepo[repoName] = [];
        }
        issuesByRepo[repoName].push(issue);
    });
    return issuesByRepo;
}

// Function to filter pull requests created within the last n days
function filterPullRequestsWithinNDays(pullRequests, days) {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - days);
    return pullRequests.filter(pr => new Date(pr.created_at) > thresholdDate);
}

// Function to filter merged pull requests
function filterMergedPullRequests(pullRequests) {
    return pullRequests.filter(pr => pr.state === 'closed' && pr.merged_at !== null);
}

// Function to group pull requests by repository
function groupPullRequestsByRepo(pullRequests) {
    const groupedPullRequests = {};
    pullRequests.forEach(pr => {
        const repoName = pr.repository;
        if (!groupedPullRequests.hasOwnProperty(repoName)) {
            groupedPullRequests[repoName] = [];
        }
        groupedPullRequests[repoName].push(pr);
    });
    return groupedPullRequests;
}

// Function to combine recent and merged pull requests data
function combinePullRequestsData(recentPullRequests, mergedPullRequests) {
    const combinedPullRequests = {};
    for (const repo in recentPullRequests) {
        const openCount = recentPullRequests[repo].length;
        const mergedCount = mergedPullRequests[repo] ? mergedPullRequests[repo].length : 0;
        combinedPullRequests[repo] = { open: openCount, merged: mergedCount };
    }
    return combinedPullRequests;
}


module.exports = {
    // Pull request queries
    filterPullRequestByNumber,
    filterPullRequestByState,
    filterPullRequestByUser,
    filterPullRequestByCreatedAt,
    filterPullRequestByMergedAt,
    filterPullRequestByDraft,
    filterPullRequestByUpdatedAt,
    filterPullRequestByTitle,
    filterPullRequestByLabels,
    filterPullRequestByRepoName,
    filterPullRequestByMergeStatus,
    filterPullRequestsWithinNDays,
    filterMergedPullRequests,
    calculateTimeOpenForPRs,
    countPullRequestsById,
    groupPullRequestsByRepo,
    combinePullRequestsData,

    // Issue queries
    filterIssueByNumber,
    filterIssueByTitle,
    filterIssueByUser,
    filterIssueByLabels,
    filterIssueByState,
    filterIssueByCreatedAt,
    filterIssueByUpdatedAt,
    filterIssueByClosedAt,
    filterIssueByAuthorAssociation,
    filterIssueByDraft,
    filterIssueByPullRequest,
    filterIssueByBody,
    filterIssueByTimelineURL,
    filterIssueByStateReason,
    calculateTimeOpenForIssue,
    countUniqueIssuesById,
    groupIssuesByRepo
};

