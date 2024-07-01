document.addEventListener('DOMContentLoaded', function() {
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            const carContainer = document.getElementById('car-container');
            
            // Load only the first two reports initially
            const initialReports = data.reports.slice(0, 2);
            initialReports.forEach(report => {
                addCarToDOM(report);
            });

            // Add event listener to the add car button
            const addCarButton = document.querySelector('.add-car-button');
            addCarButton.addEventListener('click', () => {
                const nextReport = data.reports[initialReports.length];
                if (nextReport) {
                    addCarToDOM(nextReport);
                    initialReports.push(nextReport);
                } else {
                    alert('No more cars to add.');
                }
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));

    function addCarToDOM(report) {
        const carContainer = document.getElementById('car-container');

        const carDiv = document.createElement('div');
        carDiv.classList.add('car');

        const carDetailsDiv = document.createElement('div');
        carDetailsDiv.classList.add('car-details');

        const carImageDiv = document.createElement('div');
        carImageDiv.classList.add('car-image');

        carDetailsDiv.innerHTML = `
            <p><strong>Name:</strong> ${report.model}</p>
            <p><strong>Car plate:</strong> ${report.plate}</p>
            <p><strong>Color:</strong> ${report.color}</p>
            <p><strong>Number of reports:</strong> ${report.numberOfReports}</p>
            <span class="options-button"><i class="fa fa-trash"></i></span>
        `;

        carImageDiv.innerHTML = `<img src="${report.image}" alt="Car Image">`;

        carDiv.appendChild(carDetailsDiv);
        carDiv.appendChild(carImageDiv);

        carContainer.appendChild(carDiv);

        // Add event listener for delete option
        const optionsButton = carDetailsDiv.querySelector('.options-button');
        optionsButton.addEventListener('click', () => {
            const confirmDelete = confirm('Are you sure you want to delete this car?');
            if (confirmDelete) {
                carDiv.remove();
            }
        });
    }
});
