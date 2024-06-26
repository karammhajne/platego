document.addEventListener("DOMContentLoaded", () => {
    displayReportDetails();
});

function displayReportDetails() {
    const reportIndex = localStorage.getItem('selectedReportIndex');
    if (reportIndex === null) {
        console.error('No report index found in local storage');
        return;
    }

    const reports = [
        {
            image: "images/car1.jpg",
            plate: "38-439-69",
            reason: "car blocking",
            location: "Herzl 88, Ramat Gan",
            date: "2024-03-01 15:00",
            status: "in progress",
            urgent: true,
            mapImage: "images/location1.jpg",
            messages: [
                { text: "Message received", status: "received" },
                { text: "Replied", status: "replied" }
            ],
            estimatedTime: "5 min",
            done: false
        },
       
    ];

    const report = reports[reportIndex];
    if (!report) {
        console.error('Invalid report index');
        return;
    }

    const reportDetailsElement = document.getElementById("report-details");
    reportDetailsElement.innerHTML = `
        <h2>Report Details</h2>
        <p><strong>Car number:</strong> ${report.plate}</p>
        <p><strong>Report reason:</strong> ${report.reason}</p>
        <p><strong>Status:</strong> ${report.status}</p>
        ${report.messages.map(message => `<p>${message.text}</p>`).join('')}
        <p><strong>Estimated time:</strong> ${report.estimatedTime}</p>
        <p><strong>Done:</strong> ${report.done ? "Yes" : "No"}</p>
        <p><strong>Date:</strong> ${report.date}</p>
    `;

    const reportImageElement = document.getElementById("report-image");
    const carImageElement = document.getElementById("car-image");

    reportImageElement.src = report.mapImage;
    carImageElement.src = report.image;
}

document.getElementById("delete-report").addEventListener("click", () => {
    alert("Report deleted");
});

document.getElementById("contact-report").addEventListener("click", () => {
    alert("Contacting support");
});
