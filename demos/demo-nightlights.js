// demo-nightlights.js - Economic Intelligence with Dynamic Visualizations

// ============================================
// DATA SECTION
// ============================================

// Nightlight radiance data (2022-2025)
const nightlightsData = {
    years: ['2022', '2023', '2024', '2025'],
    radiance: [18.32, 21.53, 23.75, 24.12], // nW/cm²/sr
    gdp_growth: [3.8, 4.2, 4.2, 4.5] // Official % growth
}; //

// Monthly temporal evolution (last 36 months)
const temporalData = {
    months: [
        'Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022',
        'Jul 2022', 'Aug 2022', 'Sep 2022', 'Oct 2022', 'Nov 2022', 'Dec 2022',
        'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023',
        'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023',
        'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024',
        'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024'
    ],
    radiance: [
        17.2, 17.8, 18.5, 18.9, 19.2, 18.3, // 2022
        17.9, 18.1, 18.7, 19.3, 19.8, 20.1, 
        20.3, 20.9, 21.5, 21.8, 22.1, 21.2, // 2023
        20.8, 21.0, 21.6, 22.2, 22.7, 23.0,
        23.2, 23.8, 24.3, 24.6, 24.9, 23.9, // 2024
        23.5, 23.7, 24.1, 24.5, 24.8, 25.1
    ]
}; //

// Correlation scatter data (Nightlight vs GDP)
const correlationData = {
    points: [
        {x: 18.32, y: 3.8, label: '2022'},
        {x: 21.53, y: 4.2, label: '2023'},
        {x: 23.75, y: 4.2, label: '2024'},
        {x: 24.12, y: 4.5, label: '2025 (proj)'}
    ],
    correlation: 0.88,
    pValue: 0.0001
}; //

// ============================================
// CHART CONFIGURATION
// ============================================

const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            labels: {
                color: '#94A3B8',
                font: {
                    family: "'IBM Plex Mono', monospace",
                    size: 11
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(10, 25, 47, 0.95)',
            titleColor: '#E2E8F0',
            bodyColor: '#94A3B8',
            borderColor: '#14B8A6',
            borderWidth: 1,
            titleFont: {
                family: "'Space Grotesk', sans-serif",
                size: 13
            },
            bodyFont: {
                family: "'IBM Plex Mono', monospace",
                size: 11
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
                color: '#64748B',
                font: {
                    family: "'IBM Plex Mono', monospace",
                    size: 10
                }
            }
        },
        y: {
            grid: {
                color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
                color: '#64748B',
                font: {
                    family: "'IBM Plex Mono', monospace",
                    size: 10
                }
            }
        }
    }
}; //

// ============================================
// CHART INITIALIZATION
// ============================================

function initializeCharts() {
    // Chart 1: GDP Correlation (Scatter with Trendline)
    const ctxCorrelation = document.getElementById('chart-correlation');
    if (ctxCorrelation) {
        // Calculate trendline
        const n = correlationData.points.length;
        const sumX = correlationData.points.reduce((sum, p) => sum + p.x, 0);
        const sumY = correlationData.points.reduce((sum, p) => sum + p.y, 0);
        const sumXY = correlationData.points.reduce((sum, p) => sum + p.x * p.y, 0);
        const sumX2 = correlationData.points.reduce((sum, p) => sum + p.x * p.x, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        const trendlineData = correlationData.points.map(p => ({
            x: p.x,
            y: slope * p.x + intercept
        }));
        
        new Chart(ctxCorrelation, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Observed Data',
                        data: correlationData.points,
                        backgroundColor: '#14B8A6',
                        borderColor: '#14B8A6',
                        borderWidth: 2,
                        pointRadius: 8,
                        pointHoverRadius: 10
                    },
                    {
                        label: 'Trendline (r=0.88)',
                        data: trendlineData,
                        type: 'line',
                        borderColor: '#FB923C',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'Nightlight Radiance vs GDP Growth',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        }
                    },
                    tooltip: {
                        ...chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                if (context.dataset.label === 'Observed Data') {
                                    const point = correlationData.points[context.dataIndex];
                                    return `${point.label}: Radiance=${point.x}, GDP=${point.y}%`;
                                }
                                return null;
                            }
                        }
                    }
                },
                scales: {
                    ...chartDefaults.scales,
                    x: {
                        ...chartDefaults.scales.x,
                        title: {
                            display: true,
                            text: 'Nightlight Radiance (nW/cm²/sr)',
                            color: '#94A3B8'
                        },
                        min: 17,
                        max: 25
                    },
                    y: {
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'GDP Growth (%)',
                            color: '#94A3B8'
                        },
                        min: 3,
                        max: 5
                    }
                }
            }
        });
    }

    // Chart 2: Temporal Evolution (36-month trend)
    const ctxTemporal = document.getElementById('chart-temporal');
    if (ctxTemporal) {
        new Chart(ctxTemporal, {
            type: 'line',
            data: {
                labels: temporalData.months.map(m => m.slice(0, 8)), // Shorten labels
                datasets: [{
                    label: 'Nightlight Radiance',
                    data: temporalData.radiance,
                    borderColor: '#14B8A6',
                    backgroundColor: 'rgba(20, 184, 166, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#14B8A6',
                    pointBorderColor: '#0A192F',
                    pointBorderWidth: 2
                }]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'Three-Year Economic Pulse (2022-2024)',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        }
                    },
                    legend: {
                        display: false
                    },
                    // Removed Annotation plugin reference
                },
                scales: {
                    ...chartDefaults.scales,
                    x: {
                        ...chartDefaults.scales.x,
                        ticks: {
                            ...chartDefaults.scales.x.ticks,
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'Radiance (nW/cm²/sr)',
                            color: '#94A3B8'
                        },
                        min: 16,
                        max: 26
                    }
                }
            }
        });
    }
} //

// ============================================
// ANIMATIONS (Only Growth Card needs specific JS)
// ============================================

function animateGrowthComparison() {
    const metrics = document.querySelectorAll('.growth-card .metric-value');
    if (metrics.length === 2) {
        const targetValue1 = parseFloat(nightlightsData.radiance[1].toFixed(2)); // 2023
        const targetValue2 = parseFloat(nightlightsData.radiance[2].toFixed(2)); // 2024
        
        // Check if elements are visible before animating
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(metrics[0], 0, targetValue1, 1500);
                    animateValue(metrics[1], 0, targetValue2, 1500);
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the parent card
        const card = document.querySelector('.growth-card');
        if(card) observer.observe(card);
        
    }
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = start + (end - start) * progress;
        element.textContent = current.toFixed(2);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
} //

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Nightlights Economic Intelligence chart initialization...');

    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js not loaded! Make sure CDN link is correct.');
        return;
    }

    initializeCharts();
    animateGrowthComparison(); // Trigger the specific animation for this page
    
    console.log('✅ Nightlights Economic Intelligence demo initialized');
}); //
