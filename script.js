document.addEventListener('DOMContentLoaded', () => {
    const tempInput = document.getElementById('tempInput');
    const convertBtn = document.getElementById('convertBtn');
    const errorMsg = document.getElementById('errorMessage');

    const resC = document.querySelector('#resCelsius .card-value');
    const resF = document.querySelector('#resFahrenheit .card-value');
    const resK = document.querySelector('#resKelvin .card-value');
    const resultCards = document.querySelectorAll('.result-card');

    const ABSOLUTE_ZERO = {
        C: -273.15,
        F: -459.67,
        K: 0
    };

    convertBtn.addEventListener('click', performConversion);
    tempInput.addEventListener('input', validateInput);

    // Helper to get selected radio unit value
    function getSelectedUnit() {
        return document.querySelector('input[name="unit"]:checked').value;
    }

    function validateInput() {
        const value = tempInput.value;
        const unit = getSelectedUnit();
        errorMsg.textContent = ''; // Clear previous messages

        if (value.trim() === '') {
            showError('Please enter a temperature value.');
            return false;
        }

        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            showError('Invalid input. Please enter a valid number.');
            return false;
        }

        if (numValue < ABSOLUTE_ZERO[unit]) {
            showError(`Temperature cannot fall below Absolute Zero (${ABSOLUTE_ZERO[unit]}°${unit === 'K' ? '' : unit}).`);
            return false;
        }

        return true;
    }

    function showError(message) {
        errorMsg.textContent = message;
        resetDisplay();
    }

    function resetDisplay() {
        resC.innerHTML = `-- <span class="unit">°C</span>`;
        resF.innerHTML = `-- <span class="unit">°F</span>`;
        resK.innerHTML = `-- <span class="unit">K</span>`;
        resultCards.forEach(card => card.classList.remove('active'));
    }

    function performConversion() {
        if (!validateInput()) return;

        const inputVal = parseFloat(tempInput.value);
        const sourceUnit = getSelectedUnit();

        let tempCelsius, tempFahrenheit, tempKelvin;

        switch (sourceUnit) {
            case 'C':
                tempCelsius = inputVal;
                tempFahrenheit = (inputVal * 9/5) + 32;
                tempKelvin = inputVal + 273.15;
                break;
            case 'F':
                tempCelsius = (inputVal - 32) * 5/9;
                tempFahrenheit = inputVal;
                tempKelvin = tempCelsius + 273.15;
                break;
            case 'K':
                tempCelsius = inputVal - 273.15;
                tempFahrenheit = (tempCelsius * 9/5) + 32;
                tempKelvin = inputVal;
                break;
        }
        renderResults(tempCelsius, tempFahrenheit, tempKelvin, sourceUnit);
    }

    function renderResults(c, f, k, activeUnit) {
        resC.innerHTML = `${c.toFixed(2)} <span class="unit">°C</span>`;
        resF.innerHTML = `${f.toFixed(2)} <span class="unit">°F</span>`;
        resK.innerHTML = `${k.toFixed(2)} <span class="unit">K</span>`;

        resultCards.forEach(card => {
            card.classList.remove('active');
            if (card.id === 'resCelsius' && activeUnit === 'C') card.classList.add('active');
            if (card.id === 'resFahrenheit' && activeUnit === 'F') card.classList.add('active');
            if (card.id === 'resKelvin' && activeUnit === 'K') card.classList.add('active');
        });
    }
});