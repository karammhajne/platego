document.addEventListener("DOMContentLoaded", () => {
    fetchReportsFromJson();
});

let reports = [];

function fetchReportsFromJson() {
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
    reportList.forEach((report) => {
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
                    ${report.status === 'call done' ? '<span>✔️</span>' : ''}
                </div>
            </div>
            <i class="fa fa-trash" onclick="deleteReportFromHistory(${report.id}, event)"></i>
        `;
        li.onclick = (event) => {
            if (!event.target.classList.contains('fa-trash')) {
                openReportDetails(report.id);
            }
        };
        reportListElement.appendChild(li);
    });
}

function openReportDetails(id) {
    const report = reports.find(r => r.id === id);
    const reportDetails = JSON.stringify(report);
    window.location.href = `report_detail.html?report=${encodeURIComponent(reportDetails)}`;
}

function deleteReportFromHistory(id, event) {
    event.stopPropagation();
    reports = reports.filter(r => r.id !== id);
    displayReports(reports);

    console.log(`DELETE {domain}/reports/${id}`);
}

function openCreateReportModal() {
    const modal = document.getElementById("createReportModal");
    modal.style.display = "block";
}

function closeCreateReportModal() {
    const modal = document.getElementById("createReportModal");
    modal.style.display = "none";
}

function submitNewReport() {
    const form = document.getElementById("createReportForm");
    const newReport = {
        id: Date.now(), // Unique ID based on timestamp
        image: form.image.value,
        plate: form.plate.value,
        reason: form.reason.value,
        location: form.location.value,
        date: form.date.value,
        status: form.status.value,
        urgent: form.urgent.checked,
        map: form.map.value
    };

    reports.push(newReport);
    displayReports(reports);
    closeCreateReportModal();

    console.log('POST {domain}/reports');
    console.log('Body:', JSON.stringify(newReport));
}
