document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    fetchReports(index);
});

let reports = [];

function fetchReports(index) {
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            reports = data.reports;
            displayReportDetails(index);
        })
        .catch(error => console.error('Error fetching reports:', error));
}

function displayReportDetails(index) {
    const report = reports[index];
    const reportDetailsElement = document.getElementById("report-details");
    reportDetailsElement.innerHTML = `
        <p><strong>Reason:</strong> ${report.reason}</p>
        <p><strong>Location:</strong> ${report.location}</p>
        <p><strong>Date:</strong> ${report.date}</p>
        <p><strong>Status:</strong> ${report.status}</p>
        <p><strong>Urgency:</strong> ${report.urgent ? "Yes" : "No"}</p>
    `;
    reportDetailsElement.dataset.index = index;
}

function deleteReport() {
    const reportDetailsElement = document.getElementById("report-details");
    const index = reportDetailsElement.dataset.index;
    reports.splice(index, 1);
    saveReports();
    goBack();
}

function saveReports() {
    fetch('data/data.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reports })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to save reports');
        }
    }).catch(error => {
        console.error('Error saving reports:', error);
    });
}

function goBack() {
    window.history.back();
}
