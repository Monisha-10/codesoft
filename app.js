// Example job listings
const jobs = [
    { title: 'Software Engineer', company: 'Tech Corp', location: 'New York', details: 'job-detail.html' },
    { title: 'Web Developer', company: 'Web Solutions', location: 'San Francisco', details: 'job-detail.html' },
    { title: 'Data Analyst', company: 'Data Insights', location: 'Chicago', details: 'job-detail.html' },
];

// Function to display job listings
function displayJobs() {
    const jobList = document.getElementById('job-list');
    jobs.forEach(job => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${job.details}">${job.title} - ${job.company} (${job.location})</a>`;
        jobList.appendChild(listItem);
    });
}

// Call the function to display jobs when the page loads
window.onload = displayJobs;
