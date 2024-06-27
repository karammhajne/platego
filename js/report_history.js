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
                    <p>${report.plate} <br> ${report.reason}</p>
                </div>
                <div class="pipe">
                    <span>&#124;</span>
                </div>
                <div class="location">
                    <p>${report.location}</p>
                </div>
                <div class="date">
                    <p>${report.date}</p>
                </div>
                <div class="status">
                    ${report.urgent ? '<span>⚠️</span>' : ''}
                    ${report.status === 'done' ? '<span>✔️</span>' : ''}
                </div>
            </div>
        `;
        li.onclick = () => openReportDetails(index);
        reportListElement.appendChild(li);
    });
}

function openReportDetails(index) {
    window.location.href = `report_detail.html?index=${index}`;
}

function goBack() {
    window.history.back();
}
