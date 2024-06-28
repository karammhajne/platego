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
                    ${report.status === 'call done' ? '<span>✔️</span>' : ''}
                </div>
            </div>
        `;
        li.onclick = () => openReportDetails(index);
        reportListElement.appendChild(li);
    });
}


function createNewReport() {
    const newReport = {
        image: "images/car7.jpg",
        plate: "12-345-67",
        reason: "example reason",
        location: "example location",
        date: new Date().toISOString().slice(0, 10),
        status: "undone",
        urgent: false,
        map: "images/map7.png"
    };
    reports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(reports));
    displayReports(reports);
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
                    ${report.status === 'call done' ? '<span>✔️</span>' : ''}
                </div>
            </div>
            <i class="fa fa-trash" onclick="deleteReportFromHistory(${index}, event)"></i>
        `;
        li.onclick = (event) => {
            if (!event.target.classList.contains('fa-trash')) {
                openReportDetails(index);
            }
        };
        reportListElement.appendChild(li);
    });
}

function deleteReportFromHistory(index, event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the li element
    reports.splice(index, 1);
    localStorage.setItem('reports', JSON.stringify(reports));
    displayReports(reports);
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
        image: form.image.value,
        plate: form.plate.value,
        reason: form.reason.value,
        location: form.location.value,
        date: form.date.value,
        status: form.status.value,
        /*urgent: form.urgent.checked,*/
        map: form.map.value
    };

    reports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(reports));
    displayReports(reports);
    closeCreateReportModal();
}

document.addEventListener("DOMContentLoaded", () => {
    fetchReportsFromJson();
});


function openReportDetails(index) {
    window.location.href = `report_detail.html?index=${index}`;
}
