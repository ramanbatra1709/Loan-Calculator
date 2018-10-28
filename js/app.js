const form = document.querySelector('#loan-form');
const loading = document.getElementById('loading');
const results = document.getElementById('results');

addEventListeners();

function addEventListeners()    {
    form.addEventListener('submit', function(event)  {

        results.style.display = 'none';
        loading.style.display = 'block';

        setTimeout(calculateResults, 2000);

        event.preventDefault();
    });
}

function calculateResults() {

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/1200;
    const calculatedPayments = parseFloat(years.value)*12;
    
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    loading.style.display = 'none';

    if (isFinite(monthly))  {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments) - principal).toFixed(2);

        results.style.display = 'block';
    }
    else    {
        results.style.display = 'none';
        showError('Please check the entered values.');
    }
}

function showError(error)    {

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    const newDiv = document.createElement('div');
    newDiv.className = 'alert alert-danger';
    newDiv.appendChild(document.createTextNode(error));

    card.insertBefore(newDiv, heading);

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}
