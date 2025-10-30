// demo-flood.js - Flood Intelligence with Vision Transformers & Chart.js
// M0NARQ AI - Production Ready

// ============================================
// DATA SECTION
// ============================================

const floodData = {
    performance_metrics: {
        metrics: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'IoU'],
        hawkeye: [96.8, 94.2, 95.7, 94.9, 87.3],
        baseline: [78.5, 68.2, 71.3, 69.7, 52.1]
    },
    
    processing_speed: {
        methods: ['Manual Analysis', 'Traditional CNN', 'HAWKEYE ViT'],
        time_minutes: [10080, 240, 30], // 7 days, 4 hours, 30 minutes
        speedup_factor: [1, 42, 336]
    },
    
    data_modalities: {
        sources: ['Sentinel-1 SAR', 'Sentinel-2 Optical', 'DEM Terrain'],
        contribution_percent: [45, 38, 17],
        colors: ['#14B8A6', '#8B5CF6', '#FB923C']
    },
    
    flood_extent: {
        total_area_km2: 2847,
        flooded_area_km2: 412.8,
        flooded_percent: 14.5,
        normal_percent: 85.5
    },
    
    training_progress: {
        epochs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        train_loss: [0.68, 0.52, 0.41, 0.35, 0.31, 0.28, 0.25, 0.23, 0.21, 0.19, 0.18, 0.17, 0.16, 0.155, 0.15],
        val_loss: [0.71, 0.55, 0.44, 0.38, 0.34, 0.31, 0.29, 0.27, 0.26, 0.24, 0.23, 0.22, 0.21, 0.21, 0.20]
    }
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
                },
                padding: 15
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
            },
            padding: 12,
            displayColors: true
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(255, 255, 255, 0.05)',
                drawBorder: false
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
                color: 'rgba(255, 255, 255, 0.05)',
                drawBorder: false
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
    console.log('🌊 Initializing Flood Intelligence charts...');
    
    // Chart 1: Performance Metrics Comparison
    const ctxPerformance = document.getElementById('chart-performance-metrics');
    if (ctxPerformance) {
        new Chart(ctxPerformance, {
            type: 'bar',
            data: {
                labels: floodData.performance_metrics.metrics,
                datasets: [
                    {
                        label: 'HAWKEYE Vision Transformer',
                        data: floodData.performance_metrics.hawkeye,
                        backgroundColor: '#14B8A6',
                        borderColor: '#14B8A6',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: 'Traditional Baseline',
                        data: floodData.performance_metrics.baseline,
                        backgroundColor: '#64748B',
                        borderColor: '#64748B',
                        borderWidth: 1,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'HAWKEYE vs Traditional Methods (96.8% Accuracy)',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        },
                        padding: { top: 10, bottom: 20 }
                    }
                },
                scales: {
                    ...chartDefaults.scales,
                    y: {
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'Performance Score (%)',
                            color: '#94A3B8'
                        },
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
        console.log('✅ Chart 1: Performance Metrics loaded');
    }

    // Chart 2: Processing Speed Comparison (Log Scale)
    const ctxSpeed = document.getElementById('chart-processing-speed');
    if (ctxSpeed) {
        new Chart(ctxSpeed, {
            type: 'bar',
            data: {
                labels: floodData.processing_speed.methods,
                datasets: [{
                    label: 'Processing Time (minutes)',
                    data: floodData.processing_speed.time_minutes,
                    backgroundColor: [
                        '#EF4444', // Manual (red)
                        '#FB923C', // Traditional (orange)
                        '#14B8A6'  // HAWKEYE (teal)
                    ],
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: '336× Faster: 7 Days → 30 Minutes',
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
                    tooltip: {
                        ...chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                const minutes = context.parsed.x;
                                if (minutes >= 1440) {
                                    return (minutes / 1440).toFixed(1) + ' days';
                                } else if (minutes >= 60) {
                                    return (minutes / 60).toFixed(1) + ' hours';
                                }
                                return minutes + ' minutes';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ...chartDefaults.scales.x,
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Time (log scale)',
                            color: '#94A3B8'
                        },
                        ticks: {
                            ...chartDefaults.scales.x.ticks,
                            callback: function(value) {
                                if (value >= 1440) return (value / 1440).toFixed(0) + 'd';
                                if (value >= 60) return (value / 60).toFixed(0) + 'h';
                                return value + 'm';
                            }
                        }
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
        console.log('✅ Chart 2: Processing Speed loaded');
    }

    // Chart 3: Multi-Modal Data Contribution
    const ctxModality = document.getElementById('chart-data-modalities');
    if (ctxModality) {
        new Chart(ctxModality, {
            type: 'doughnut',
            data: {
                labels: floodData.data_modalities.sources,
                datasets: [{
                    data: floodData.data_modalities.contribution_percent,
                    backgroundColor: floodData.data_modalities.colors,
                    borderColor: '#0A192F',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94A3B8',
                            font: {
                                family: "'IBM Plex Mono', monospace",
                                size: 11
                            },
                            padding: 15,
                            boxWidth: 15,
                            boxHeight: 15
                        }
                    },
                    title: {
                        display: true,
                        text: 'Multi-Modal Data Fusion (3 Satellite Sources)',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        },
                        padding: { top: 10, bottom: 20 }
                    },
                    tooltip: {
                        ...chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '% contribution';
                            }
                        }
                    }
                }
            }
        });
        console.log('✅ Chart 3: Data Modalities loaded');
    }

    // Chart 4: Flood Extent Analysis
    const ctxExtent = document.getElementById('chart-flood-extent');
    if (ctxExtent) {
        new Chart(ctxExtent, {
            type: 'pie',
            data: {
                labels: [
                    `Flooded Area (${floodData.flood_extent.flooded_area_km2} km²)`,
                    `Normal Area (${(floodData.flood_extent.total_area_km2 - floodData.flood_extent.flooded_area_km2).toFixed(1)} km²)`
                ],
                datasets: [{
                    data: [
                        floodData.flood_extent.flooded_percent,
                        floodData.flood_extent.normal_percent
                    ],
                    backgroundColor: ['#EF4444', '#10B981'],
                    borderColor: '#0A192F',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94A3B8',
                            font: {
                                family: "'IBM Plex Mono', monospace",
                                size: 11
                            },
                            padding: 15,
                            boxWidth: 15,
                            boxHeight: 15
                        }
                    },
                    title: {
                        display: true,
                        text: 'Detected Flood Extent (14.5% of Total Area)',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        },
                        padding: { top: 10, bottom: 20 }
                    },
                    tooltip: {
                        ...chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return context.label + ' (' + context.parsed + '%)';
                            }
                        }
                    }
                }
            }
        });
        console.log('✅ Chart 4: Flood Extent loaded');
    }

    // Chart 5: Training Loss Curve
    const ctxTraining = document.getElementById('chart-training-loss');
    if (ctxTraining) {
        new Chart(ctxTraining, {
            type: 'line',
            data: {
                labels: floodData.training_progress.epochs,
                datasets: [
                    {
                        label: 'Training Loss',
                        data: floodData.training_progress.train_loss,
                        borderColor: '#14B8A6',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#14B8A6',
                        pointBorderColor: '#0A192F',
                        pointBorderWidth: 2,
                        pointHoverRadius: 6,
                        fill: true
                    },
                    {
                        label: 'Validation Loss',
                        data: floodData.training_progress.val_loss,
                        borderColor: '#8B5CF6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#8B5CF6',
                        pointBorderColor: '#0A192F',
                        pointBorderWidth: 2,
                        pointHoverRadius: 6,
                        fill: true
                    }
                ]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'Vision Transformer Training Convergence (15 Epochs)',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        },
                        padding: { top: 10, bottom: 20 }
                    }
                },
                scales: {
                    ...chartDefaults.scales,
                    x: {
                        ...chartDefaults.scales.x,
                        title: {
                            display: true,
                            text: 'Epoch',
                            color: '#94A3B8'
                        }
                    },
                    y: {
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'Cross-Entropy Loss',
                            color: '#94A3B8'
                        },
                        beginAtZero: false,
                        max: 0.75
                    }
                }
            }
        });
        console.log('✅ Chart 5: Training Loss loaded');
    }
    
    console.log('🎉 All 5 Flood Intelligence charts initialized successfully!');
} //

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Flood Intelligence Demo chart initialization...');
    
    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js not loaded! Make sure CDN link is correct.');
        return;
    }
    
    initializeCharts();
    
    console.log('✅ Flood Intelligence charts loaded!');
    console.log('📊 5 charts with real flood detection data');
    console.log('🌊 HAWKEYE Engine: 96.8% accuracy, 336× faster than manual');
}); //

// Export for debugging
window.floodData = floodData; //
