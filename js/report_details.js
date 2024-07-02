

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reportDetails = urlParams.get('report');
    if (reportDetails) {
        const report = JSON.parse(decodeURIComponent(reportDetails));
        displayReportDetails(report);
    } else {
        console.error('Report details are missing or invalid in the URL.');
    }
});

function displayReportDetails(report) {
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
}

function deleteReport() {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "block";
}

function confirmDelete() {
    const successModal = document.getElementById("successModal");
    successModal.style.display = "block";
    cancelDelete();
}

function cancelDelete() {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "none";
}

function closeSuccessModal() {
    const successModal = document.getElementById("successModal");
    successModal.style.display = "none";
    window.location.href = "report_history.html";
}

function goBack() {
    window.history.back();
}


