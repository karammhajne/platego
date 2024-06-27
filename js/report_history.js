document.addEventListener("DOMContentLoaded", () => {
    fetchReports();
});

let reports = [];

function fetchReports() {
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            reports = data.reports;
            displayReports(reports);
        })
        .catch(error => console.error('Error fetching reports:', error));
}

function displayReports(reportList) {
    const reportListElement = document.getElementById("report-list");
    reportListElement.innerHTML = '';
    reportList.forEach((report, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${report.image}" alt="Car Image">
            <div class="report-details">
                <div class="info">
                    <p>${report.plate} ${report.reason}</p>
                </div>
                <div class="pipe">
                    <span>&#124;</span>
                </div>
                <div class="location-time">
                    <p>${report.location}</p>
                    <p>${report.date}</p>
                </div>
                <div class="status">
                    ${report.urgent ? '<span>⚠️</span>' : ''}
                    ${report.status === 'done' ? '<span>✔️</span>' : ''}
                </div>
            </div>
        `;
        li.onclick = () => displayReportDetails(index);
        reportListElement.appendChild(li);
    });
}


function displayReportDetails(index) {
    navigateToReportDetails(index); 

    const report = reports[index];
    const reportDetailsElement = document.getElementById("report-details");
    reportDetailsElement.innerHTML = `
        <h2>Report Details</h2>
        <p><strong>Reason:</strong> ${report.reason}</p>
        <p><strong>Location:</strong> ${report.location}</p>
        <p><strong>Date:</strong> ${report.date}</p>
        <p><strong>Status:</strong> ${report.status}</p>
        <p><strong>Urgency:</strong> ${report.urgent ? "Yes" : "No"}</p>
    `;
    reportDetailsElement.classList.remove("hidden");
}


function filterReports() {
    const filter = document.getElementById("filter").value;
    let filteredReports = reports;
    if (filter !== 'all') {
        filteredReports = reports.filter(report => report.status === filter);
    }
    displayReports(filteredReports);
}


function goBack() {
    window.history.back();
}
function navigateToReportDetails(index) {
    if (index === 0) {
        window.location.href = 'report_details.html';
    }
}
