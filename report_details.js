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
            date: "24-3-1 15:00",
            status: "undone",
            urgent: true,
            mapImage: "images/map.jpeg",
            messages: [
                { text: "Message received" },
                { text: "Replied" }
            ],
            estimatedTime: "5 min",
            done: true
        }
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
        <p><strong>Time:</strong> 8:15</p>
    `;

    const carImageElement = document.getElementById("car-image");
    carImageElement.src = report.image;

    const mapImageElement = document.getElementById("map-image");
    mapImageElement.src = report.mapImage;
}

document.getElementById("delete-report").addEventListener("click", () => {
    alert("Report deleted");
});

document.getElementById("contact-report").addEventListener("click", () => {
    alert("Contacting support");
});
