// declaring variables
const employees = [];
let totalMonthlyCost = 0;

// submit button function
function submitButton(event) {
    // prevents the default behavior
    event.preventDefault();

// Store the input elements
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let idNumber = document.getElementById('idNumber').value;
  let jobTitle = document.getElementById('jobTitle').value;
  let annualSalary = document.getElementById('annualSalary').value;

// create an object with the 'values' of the employee input
  let employee = {
    firstName,
    lastName,
    idNumber,
    jobTitle,
    annualSalary: Number(annualSalary)
  }

// making the object into an array
  employees.push(employee);

// grab the employees table element
  let table = document.getElementById('Table');

// create a new row with the employee input
  let addRow = table.insertRow();
  addRow.innerHTML = `
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.idNumber}</td>
      <td>${employee.jobTitle}</td>
      <td>$${employee.annualSalary}</td>
      <td><button class="DeleteButton">Delete</button></td>
  `;

// Attach event listener to the "Delete" button in the added row
  let deleteButton = addRow.querySelector('.DeleteButton');
  deleteButton.addEventListener('click', () => {
    // get the index of each employee in the employees array
    let index = employees.indexOf(employee);
    if (index !== -1) {
      // remove the employee from the array
      employees.splice(index, 1);

      // subtract the employee salary from the total monthly cost
      totalMonthlyCost -= employee.annualSalary / 12;
      updateCost();
    }

    // remove the row from the table
    addRow.remove();
  });

  // add the employee's salary to the total monthly cost
  totalMonthlyCost += employee.annualSalary / 12;
  updateCost();

  // reset the form inputs
  event.target.reset();
}

// 
const usdFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// Update the total monthly cost and the display
function updateCost() {
    let annualSalaryUpdate = document.getElementById('TotalMonthCost');
    annualSalaryUpdate.textContent = usdFormat.format(totalMonthlyCost);
    if (totalMonthlyCost > 20000) {
        annualSalaryUpdate.classList.add('overBudget');
    } else {
        annualSalaryUpdate.classList.remove('overBudget');
    }
}

  // add event listener to the employee input submit event
  document.getElementById('employeeForm').addEventListener('submit', submitButton);
  
  // use updateCost function
  updateCost();