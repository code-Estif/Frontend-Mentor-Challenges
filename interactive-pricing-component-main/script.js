document.addEventListener('DOMContentLoaded', function() {
    const priceSlider = document.getElementById('price-slider');
    const pageviewCount = document.getElementById('pageview-count');
    const priceDisplay = document.getElementById('price');
    const billingToggle = document.getElementById('billing-toggle');
    
    const pricingData = [
        { pageviews: '10K', monthlyPrice: 8.00 },
        { pageviews: '50K', monthlyPrice: 12.00 },
        { pageviews: '100K', monthlyPrice: 16.00 },
        { pageviews: '500K', monthlyPrice: 24.00 },
        { pageviews: '1M', monthlyPrice: 36.00 }
    ];
    
    function updatePricing() {
        const sliderValue = parseInt(priceSlider.value);
        const isYearly = billingToggle.checked;
        const { pageviews, monthlyPrice } = pricingData[sliderValue];
        const finalPrice = isYearly ? monthlyPrice * 0.75 : monthlyPrice;
        
        pageviewCount.textContent = pageviews;
        animateValue(priceDisplay, parseFloat(priceDisplay.textContent) || 0, finalPrice, 500);
    }
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = progress * (end - start) + start;
            element.textContent = currentValue.toFixed(2);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    priceSlider.addEventListener('input', updatePricing);
    billingToggle.addEventListener('change', updatePricing);
    
    priceSlider.addEventListener('input', function() {
        const value = (this.value - this.min) / (this.max - this.min) * 100;
        this.style.background = `linear-gradient(to right, var(--soft-cyan) 0%, var(--soft-cyan) ${value}%, var(--light-grayish-blue) ${value}%, var(--light-grayish-blue) 100%)`;
    });
    
    priceSlider.dispatchEvent(new Event('input'));
    
    priceSlider.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            
            if (e.key === 'ArrowLeft' && this.value > this.min) {
                this.value--;
            } else if (e.key === 'ArrowRight' && this.value < this.max) {
                this.value++;
            }
            
            updatePricing();
        }
    });
    
    let touchStartX = 0;
    let currentSliderValue = 0;
    
    priceSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        currentSliderValue = parseInt(this.value);
    }, { passive: true });
    
    priceSlider.addEventListener('touchmove', function(e) {
        if (!touchStartX) return;
        
        const touchX = e.touches[0].clientX;
        const diff = touchStartX - touchX;
        const step = this.clientWidth / (this.max - this.min);
        const steps = Math.round(diff / step);
        
        let newValue = currentSliderValue - steps;
        newValue = Math.max(this.min, Math.min(this.max, newValue));
        
        if (newValue !== this.value) {
            this.value = newValue;
            updatePricing();
        }
    }, { passive: true });
    
    priceSlider.addEventListener('touchend', function() {
        touchStartX = 0;
    }, { passive: true });
    
    updatePricing();
});