document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ageForm');
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const dayError = document.getElementById('dayError');
    const monthError = document.getElementById('monthError');
    const yearError = document.getElementById('yearError');
    const yearsResult = document.getElementById('years');
    const monthsResult = document.getElementById('months');
    const daysResult = document.getElementById('days');
  
    // Only allow numbers in inputs
    [dayInput, monthInput, yearInput].forEach(input => {
      input.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        // Clear error when user starts typing
        if (e.target.value.trim()) {
          e.target.classList.remove('error');
          e.target.parentElement.classList.remove('error');
          const errorElement = document.getElementById(e.target.id + 'Error');
          if (errorElement) {
            errorElement.textContent = '';
          }
        }
      });
    });
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous errors
      clearErrors();
      
      // Get input values
      const day = parseInt(dayInput.value);
      const month = parseInt(monthInput.value);
      const year = parseInt(yearInput.value);
      
      // Validate inputs
      let isValid = true;
      
      // Check if fields are empty
      if (!dayInput.value.trim()) {
        showError(dayInput, dayError, 'This field is required');
        isValid = false;
      } else if (day < 1 || day > 31) {
        showError(dayInput, dayError, 'Must be a valid day');
        isValid = false;
      }
      
      if (!monthInput.value.trim()) {
        showError(monthInput, monthError, 'This field is required');
        isValid = false;
      } else if (month < 1 || month > 12) {
        showError(monthInput, monthError, 'Must be a valid month');
        isValid = false;
      }
      
      if (!yearInput.value.trim()) {
        showError(yearInput, yearError, 'This field is required');
        isValid = false;
      } else if (year > new Date().getFullYear()) {
        showError(yearInput, yearError, 'Must be in the past');
        isValid = false;
      }
      
      // If basic validation passed, check if date is valid
      if (isValid) {
        const inputDate = new Date(year, month - 1, day);
        
        // Check if date is valid (handles cases like 31/04/1991)
        if (inputDate.getDate() !== day || 
            inputDate.getMonth() !== month - 1 || 
            inputDate.getFullYear() !== year) {
          showError(dayInput, dayError, 'Must be a valid date');
          isValid = false;
        }
        
        // Check if date is in the future
        if (isValid && inputDate > new Date()) {
          showError(dayInput, dayError, 'Must be in the past');
          isValid = false;
        }
      }
      
      // If validation passed, calculate age
      if (isValid) {
        calculateAge(day, month, year);
      } else {
        // Reset results on error
        yearsResult.textContent = '--';
        monthsResult.textContent = '--';
        daysResult.textContent = '--';
      }
    });
  
    function showError(input, errorElement, message) {
      input.classList.add('error');
      input.parentElement.classList.add('error');
      errorElement.textContent = message;
    }
  
    function clearErrors() {
      [dayInput, monthInput, yearInput].forEach(input => {
        input.classList.remove('error');
        input.parentElement.classList.remove('error');
      });
      [dayError, monthError, yearError].forEach(error => {
        error.textContent = '';
      });
    }
  
    function calculateAge(day, month, year) {
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();
      
      // Adjust if current day is before birth day
      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
      }
      
      // Adjust if current month is before birth month
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // Animate the results
      animateValue(yearsResult, 0, years, 1000);
      animateValue(monthsResult, 0, months, 1000);
      animateValue(daysResult, 0, days, 1000);
    }
  
    function animateValue(element, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          element.textContent = end;
        }
      };
      window.requestAnimationFrame(step);
    }
  });