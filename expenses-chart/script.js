function getCurrentDay() {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = new Date().getDay();
  return days[today];
}

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

async function loadChartData() {
  try {
    const response = await fetch('./data.json');
    const data = await response.json();
    
    renderChart(data);
    calculateTotals(data);
  } catch (error) {
    console.error('Error loading chart data:', error);
  }
}

function renderChart(data) {
  const container = document.getElementById('chartContainer');
  const currentDay = getCurrentDay();
  
  const maxAmount = Math.max(...data.map(item => item.amount));
  
  container.innerHTML = '';
  
  data.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.className = 'chart-bar-wrapper';
    
    const height = (item.amount / maxAmount) * 200;
    
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    if (item.day === currentDay) {
      bar.classList.add('today');
    }
    bar.style.height = `${height}px`;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.textContent = formatCurrency(item.amount);
    
    const dayLabel = document.createElement('div');
    dayLabel.className = 'chart-day';
    dayLabel.textContent = item.day;
    
    wrapper.appendChild(tooltip);
    wrapper.appendChild(bar);
    wrapper.appendChild(dayLabel);
    
    container.appendChild(wrapper);
  });
}

function calculateTotals(data) {
  
  const totalThisMonth = 478.33;
  
  const percentage = 2.4;
  
  const amountElement = document.querySelector('.footer-amount');
  const percentageElement = document.querySelector('.footer-percentage');
  
  if (amountElement) {
    amountElement.textContent = formatCurrency(totalThisMonth);
  }
  
  if (percentageElement) {
    percentageElement.textContent = `+${percentage.toFixed(1)}%`;
  }
}

document.addEventListener('DOMContentLoaded', loadChartData);
