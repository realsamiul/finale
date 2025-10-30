// demo-lpg.js - LPG Demand Forecasting with Dynamic Visualizations

// ============================================
// DATA SECTION
// ============================================

// Simulated LPG demand data (last 60 days + 30-day forecast)
const lpgData = {
    historical: {
        dates: Array.from({length: 60}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (60 - i));
            return date.toISOString().split('T')[0];
        }),
        actual: [
            2100000, 2150000, 2080000, 2200000, 2180000, 2120000, 2250000, // Week 1
            2100000, 2050000, 2180000, 2220000, 2160000, 2100000, 2280000, // Week 2
            2150000, 2100000, 2200000, 2240000, 2180000, 2120000, 2300000, // Week 3
            2180000, 2120000, 2220000, 2260000, 2200000, 2140000, 2320000, // Week 4
            2200000, 2140000, 2240000, 2280000, 2220000, 2160000, 2340000, // Week 5
            2220000, 2160000, 2260000, 2300000, 2240000, 2180000, 2360000, // Week 6
            2240000, 2180000, 2280000, 2320000, 2260000, 2200000, 2380000, // Week 7
            2260000, 2200000, 2300000, 2340000, 2280000, 2220000, 2400000, // Week 8
            2280000, 2220000, 2320000, 2360000                              // Week 9 (partial)
        ]
    },
    forecast_7day: [2300000, 2240000, 2340000, 2380000, 2320000, 2260000, 2420000],
    forecast_14day: [2300000, 2240000, 2340000, 2380000, 2320000, 2260000, 2420000, 2320000, 2260000, 2360000, 2400000, 2340000, 2280000, 2440000],
    forecast_30day: Array.from({length: 30}, (_, i) => 2200000 + (i * 8000) + (Math.sin(i / 3) * 100000))
};

// Model comparison data (R² scores across horizons)
const modelPerformance = {
    models: ['LightGBM', 'CatBoost', 'XGBoost', 'GBM', 'Random Forest', 'Ridge'],
    r2_7day: [0.920, 0.912, 0.865, 0.851, 0.798, 0.732],
    r2_14day: [0.875, 0.868, 0.823, 0.810, 0.756, 0.698],
    r2_30day: [0.783, 0.776, 0.734, 0.721, 0.672, 0.615]
};

// Feature importance data
const featureImportance = {
    features: [
        'Lag_7', 'Lag_14', 'Lag_30', 'Day_of_Week', 
        'Temperature', 'Festival_Indicator', 'GDP_Growth', 'Fuel_Price'
    ],
    importance: [18.5, 12.3, 7.2, 22.0, 15.0, 12.0, 8.5, 4.5]
};

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
                    size: 9
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
                    size: 9
                },
                callback: function(value) {
                    return (value / 1000000).toFixed(1) + 'M';
                }
            }
        }
    }
};

// ============================================
// CHART INITIALIZATION
// ============================================

function initializeCharts() {
    // Chart 1: 7-Day Forecast
    const ctx7day = document.getElementById('chart-forecast-7day');
    if (ctx7day) {
        const last30Days = lpgData.historical.dates.slice(-30);
        const last30Actual = lpgData.historical.actual.slice(-30);
        const forecast7Days = Array.from({length: 7}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i + 1);
            return date.toISOString().split('T')[0];
        });
        
        const allDates = [...last30Days, ...forecast7Days];
        const allActual = [...last30Actual, ...Array(7).fill(null)];
        const allForecast = [...Array(30).fill(null), ...lpgData.forecast_7day];
        
        new Chart(ctx7day, {
            type: 'line',
            data: {
                labels: allDates.map(d => d.slice(5)),
                datasets: [
                    {
                        label: 'Historical Demand',
                        data: allActual,
                        borderColor: '#14B8A6',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0,
                        fill: true
                    },
                    {
                        label: '7-Day Forecast (92% R²)',
                        data: allForecast,
                        borderColor: '#FB923C',
                        backgroundColor: 'rgba(251, 146, 60, 0.1)',
                        borderWidth: 3,
                        borderDash: [5, 5],
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#FB923C',
                        fill: false
                    }
                ]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'LPG Demand: Last 30 Days + 7-Day Forecast',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        }
                    }
                },
                scales: {
                    ...chartDefaults.scales,
                    y: {
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'Daily Cylinders',
                            color: '#94A3B8'
                        }
                    }
                }
            }
        });
    }

    // Chart 2: 14-Day Forecast
    const ctx14day = document.getElementById('chart-forecast-14day');
    if (ctx14day) {
        const last20Days = lpgData.historical.dates.slice(-20);
        const last20Actual = lpgData.historical.actual.slice(-20);
        const forecast14Days = Array.from({length: 14}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i + 1);
            return date.toISOString().split('T')[0];
        });
        
        const allDates = [...last20Days, ...forecast14Days];
        const allActual = [...last20Actual, ...Array(14).fill(null)];
        const allForecast = [...Array(20).fill(null), ...lpgData.forecast_14day];
        
        new Chart(ctx14day, {
            type: 'line',
            data: {
                labels: allDates.map(d => d.slice(5)),
                datasets: [
                    {
                        label: 'Historical',
                        data: allActual,
                        borderColor: '#14B8A6',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0,
                        fill: true
                    },
                    {
                        label: '14-Day Forecast (87.5% R²)',
                        data: allForecast,
                        borderColor: '#8B5CF6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        borderWidth: 3,
                        borderDash: [5, 5],
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: '#8B5CF6',
                        fill: false
                    }
                ]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: '14-Day Forecast Horizon',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 13,
                            weight: 600
                        }
                    }
                }
            }
        });
    }

    // Chart 3: 30-Day Forecast
    const ctx30day = document.getElementById('chart-forecast-30day');
    if (ctx30day) {
        const last15Days = lpgData.historical.dates.slice(-15);
        const last15Actual = lpgData.historical.actual.slice(-15);
        const forecast30Days = Array.from({length: 30}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i + 1);
            return date.toISOString().split('T')[0];
        });
        
        const allDates = [...last15Days, ...forecast30Days];
        const allActual = [...last15Actual, ...Array(30).fill(null)];
        const allForecast = [...Array(15).fill(null), ...lpgData.forecast_30day];
        
        new Chart(ctx30day, {
            type: 'line',
            data: {
                labels: allDates.map(d => d.slice(5)),
                datasets: [
                    {
                        label: 'Historical',
                        data: allActual,
                        borderColor: '#14B8A6',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0,
                        fill: true
                    },
                    {
                        label: '30-Day Forecast (78.3% R²)',
                        data: allForecast,
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        tension: 0.4,
                        pointRadius: 0,
                        fill: false
                    }
                ]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: '30-Day Strategic Planning Horizon',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 13,
                            weight: 600
                        }
                    }
                }
            }
        });
    }

    // Chart 4: Model Comparison
    const ctxModels = document.getElementById('chart-model-comparison');
    if (ctxModels) {
        new Chart(ctxModels, {
            type: 'bar',
            data: {
                labels: modelPerformance.models,
                datasets: [
                    {
                        label: '7-Day R²',
                        data: modelPerformance.r2_7day.map(v => v * 100),
                        backgroundColor: '#14B8A6',
                        borderColor: '#14B8A6',
                        borderWidth: 1
                    },
                    {
                        label: '14-Day R²',
                        data: modelPerformance.r2_14day.map(v => v * 100),
                        backgroundColor: '#8B5CF6',
                        borderColor: '#8B5CF6',
                        borderWidth: 1
                    },
                    {
                        label: '30-Day R²',
                        data: modelPerformance.r2_30day.map(v => v * 100),
                        backgroundColor: '#FB923C',
                        borderColor: '#FB923C',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'Model Horse Race: LightGBM Wins Across All Horizons',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 15,
                            weight: 600
                        }
                    }
                },
                scales: {
                    ...chartDefaults.scales,
                    y: {
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'R² Score (%)',
                            color: '#94A3B8'
                        },
                        ticks: {
                            ...chartDefaults.scales.y.ticks,
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        max: 100
                    }
                }
            }
        });
    }

    // Chart 5: Feature Importance
    const ctxFeatures = document.getElementById('chart-feature-importance');
    if (ctxFeatures) {
        new Chart(ctxFeatures, {
            type: 'bar',
            data: {
                labels: featureImportance.features,
                datasets: [{
                    label: 'Importance (%)',
                    data: featureImportance.importance,
                    backgroundColor: featureImportance.importance.map((_, i) => {
                        const colors = ['#14B8A6', '#10B981', '#8B5CF6', '#FB923C', '#FBBF24', '#EF4444', '#64748B', '#475569'];
                        return colors[i];
                    }),
                    borderWidth: 0
                }]
            },
            options: {
                indexAxis: 'y',
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        ...chartDefaults.scales.x,
                        title: {
                            display: true,
                            text: 'Feature Importance (%)',
                            color: '#94A3B8'
                        },
                        max: 25
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: '#94A3B8',
                            font: {
                                family: "'IBM Plex Mono', monospace",
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    initializeScrollAnimations();
    
    console.log('✅ LPG Demand Forecasting demo initialized');
});
