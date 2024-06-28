document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get('index'), 10);
    if (!isNaN(index)) {
        fetchReports(index);
    } else {
        console.error('Index parameter is missing or invalid in the URL.');
    }
});

let reports = [];

function fetchReports(index) {
    const storedReports = localStorage.getItem('reports');
    if (storedReports) {
        reports = JSON.parse(storedReports);
        displayReportDetails(index);
    } else {
        fetch('data/data.json')
            .then(response => response.json())
            .then(data => {
                reports = data.reports;
                localStorage.setItem('reports', JSON.stringify(reports));
                displayReportDetails(index);
            })
            .catch(error => console.error('Error fetching reports:', error));
    }
}

function displayReportDetails(index) {
    if (index >= reports.length || index < 0) {
        console.error('Invalid report index:', index);
        return;
    }

    const report = reports[index];
    const reportDetailsElement = document.getElementById("report-details");
    reportDetailsElement.innerHTML = `
        <p><strong>Plate:</strong><br> ${report.plate} 
        <strong>Reason:</strong> <br>${report.reason}
        <strong>Location:</strong><br> ${report.location}
        <strong>Date:</strong><br> ${report.date}
        <strong>Status:</strong> <br>${report.status}
        <strong>Urgent:</strong><br> ${report.urgent ? "Yes" : "No"}</p>
    `;
    const reportImageElement = document.getElementById("report-image");
    reportImageElement.innerHTML = `<img src="${report.image}" alt="Car Image" style="width: 100%;">`;
    const reportMapElement = document.getElementById("report-map");
    reportMapElement.innerHTML = `<img src="${report.map}" alt="Map Image" style="width: 100%;">`;
    reportDetailsElement.dataset.index = index;
}



function cancelDelete() {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "none";
}

function goBack() {
    window.history.back();
}
