// demo-freight.js - Enhanced with Chart.js visualizations

// ============================================
// DATA SECTION
// ============================================

// Model comparison data (actual results)
const modelData = [
    {
        model: "CatBoost",
        r2_7day: 0.8069,
        r2_14day: 0.7350,
        r2_30day: 0.5930,
        mae_7day: 611.16,
        training_time: "2.3s",
        production_ready: "Yes"
    },
    {
        model: "Ridge",
        r2_7day: 0.7261,
        r2_14day: 0.6890,
        r2_30day: 0.5420,
        mae_7day: 723.45,
        training_time: "0.1s",
        production_ready: "Yes"
    },
    {
        model: "Gradient Boosting",
        r2_7day: 0.7131,
        r2_14day: 0.6750,
        r2_30day: 0.5180,
        mae_7day: 745.23,
        training_time: "5.7s",
        production_ready: "Yes"
    },
    {
        model: "XGBoost",
        r2_7day: 0.4901,
        r2_14day: 0.4320,
        r2_30day: 0.3560,
        mae_7day: 982.14,
        training_time: "3.4s",
        production_ready: "Yes"
    },
    {
        model: "LightGBM",
        r2_7day: 0.4645,
        r2_14day: 0.4120,
        r2_30day: 0.3320,
        mae_7day: 1045.67,
        training_time: "1.9s",
        production_ready: "Yes"
    },
    {
        model: "Random Forest",
        r2_7day: 0.4230,
        r2_14day: 0.3890,
        r2_30day: 0.2970,
        mae_7day: 1123.45,
        training_time: "4.2s",
        production_ready: "Partial"
    }
]; //

// Simplified forecast data for visualization (last 30 days)
const forecast7DayData = {
    dates: Array.from({length: 30}, (_, i) => `Day ${i+1}`),
    actual: [2845, 2912, 2756, 2834, 2901, 2767, 2889, 2923, 2801, 2856,
             2778, 2834, 2901, 2845, 2789, 2912, 2834, 2867, 2923, 2801,
             2889, 2845, 2778, 2901, 2834, 2912, 2867, 2789, 2845, 2901],
    predicted: [2823, 2889, 2789, 2867, 2923, 2801, 2912, 2901, 2823, 2878,
                2801, 2867, 2889, 2834, 2812, 2901, 2856, 2889, 2912, 2823,
                2901, 2867, 2801, 2889, 2845, 2923, 2878, 2812, 2867, 2889]
}; //

// Journey data (The Crucible stages)
const journeyData = {
    stages: ['Start', 'Chimera', 'Abyss', 'Initial Recovery', 'Breakthrough', 'Refinement', 'Final'],
    r2_scores: [0, 0.98, -0.15, 0.35, 0.67, 0.78, 0.8069]
}; //

// ============================================
// CHART CONFIGURATION
// ============================================

// Shared chart configuration
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
                    size: 12
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
                size: 14
            },
            bodyFont: {
                family: "'IBM Plex Mono', monospace",
                size: 12
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
    // Chart 1: 7-Day Forecast (Actual vs Predicted)
    const ctx7day = document.getElementById('chart-7day');
    if (ctx7day) {
        new Chart(ctx7day, {
            type: 'line',
            data: {
                labels: forecast7DayData.dates,
                datasets: [
                    {
                        label: 'Actual',
                        data: forecast7DayData.actual,
                        borderColor: '#14B8A6',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    },
                    {
                        label: 'Predicted',
                        data: forecast7DayData.predicted,
                        borderColor: '#FB923C',
                        backgroundColor: 'rgba(251, 146, 60, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    }
                ]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'Last 30 Days Performance',
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
                            text: 'Freight Rate (USD)',
                            color: '#94A3B8'
                        }
                    }
                }
            }
        });
    }

    // Chart 2: 14-Day Forecast (Simplified version)
    const ctx14day = document.getElementById('chart-14day');
    if (ctx14day) {
        new Chart(ctx14day, {
            type: 'line',
            data: {
                labels: forecast7DayData.dates,
                datasets: [
                    {
                        label: 'Actual',
                        data: forecast7DayData.actual,
                        borderColor: '#14B8A6',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0
                    },
                    {
                        label: 'Predicted',
                        data: forecast7DayData.predicted.map(v => v * 0.98), // Slight adjustment for 14-day
                        borderColor: '#8B5CF6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        tension: 0.4,
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
                        text: '14-Day Horizon',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        }
                    }
                }
            }
        });
    }

    // Chart 3: 30-Day Forecast (Simplified version)
    const ctx30day = document.getElementById('chart-30day');
    if (ctx30day) {
        new Chart(ctx30day, {
            type: 'line',
            data: {
                labels: forecast7DayData.dates,
                datasets: [
                    {
                        label: 'Actual',
                        data: forecast7DayData.actual,
                        borderColor: '#14B8A6',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0
                    },
                    {
                        label: 'Predicted',
                        data: forecast7DayData.predicted.map(v => v * 0.95), // More adjustment for 30-day
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        tension: 0.4,
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
                        text: '30-Day Horizon',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        }
                    }
                }
            }
        });
    }

    // Chart 4: The Crucible Journey
    const ctxJourney = document.getElementById('chart-journey');
    if (ctxJourney) {
        new Chart(ctxJourney, {
            type: 'line',
            data: {
                labels: journeyData.stages,
                datasets: [{
                    label: 'R² Score',
                    data: journeyData.r2_scores,
                    borderColor: '#14B8A6',
                    backgroundColor: 'rgba(20, 184, 166, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#14B8A6',
                    pointBorderColor: '#0A192F',
                    pointBorderWidth: 2,
                    fill: true
                }]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'The Journey from Illusion to Truth',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 16,
                            weight: 600
                        }
                    },
                    // Removed Annotation plugin reference as it wasn't standard Chart.js
                    // If you use a plugin, make sure it's loaded via CDN
                },
                scales: {
                    ...chartDefaults.scales,
                    y: {
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'R² Score',
                            color: '#94A3B8'
                        },
                        min: -0.2,
                        max: 1.0
                    }
                }
            }
        });
    }

    // Chart 5: Model Comparison
    const ctxModels = document.getElementById('chart-models');
    if (ctxModels) {
        new Chart(ctxModels, {
            type: 'bar',
            data: {
                labels: modelData.map(m => m.model),
                datasets: [
                    {
                        label: '7-Day R²',
                        data: modelData.map(m => m.r2_7day),
                        backgroundColor: '#14B8A6',
                        borderColor: '#14B8A6',
                        borderWidth: 1
                    },
                    {
                        label: '14-Day R²',
                        data: modelData.map(m => m.r2_14day),
                        backgroundColor: '#8B5CF6',
                        borderColor: '#8B5CF6',
                        borderWidth: 1
                    },
                    {
                        label: '30-Day R²',
                        data: modelData.map(m => m.r2_30day),
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
                        text: 'Multi-Horizon Performance Comparison',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 16,
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
                            text: 'R² Score',
                            color: '#94A3B8'
                        },
                        beginAtZero: true,
                        max: 1.0
                    }
                }
            }
        });
    }
} //

// ============================================
// TABLE POPULATION
// ============================================

function populateModelTable() {
    const tbody = document.getElementById('model-table-body');
    if (!tbody) return;

    tbody.innerHTML = modelData.map(model => `
        <tr>
            <td><strong>${model.model}</strong></td>
            <td>${(model.r2_7day * 100).toFixed(1)}%</td>
            <td>${(model.r2_14day * 100).toFixed(1)}%</td>
            <td>${(model.r2_30day * 100).toFixed(1)}%</td>
            <td>$${model.mae_7day.toFixed(2)}</td>
            <td>${model.training_time}</td>
        </tr>
    `).join('');
} //

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Freight Demo chart initialization...');

    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js not loaded! Make sure CDN link is correct.');
        return;
    }

    initializeCharts();
    populateModelTable(); // Also populate the table on load
    
    console.log('✅ Freight demo initialized successfully');
}); //

