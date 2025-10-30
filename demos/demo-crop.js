// demo-crop.js - Crop Intelligence with Self-Supervised Learning & Chart.js
// M0NARQ AI - Production Ready

// ============================================
// DATA SECTION
// ============================================

const cropData = {
    cluster_distribution: {
        clusters: ['Healthy Vegetation', 'Water Bodies', 'Bare Soil', 'Stressed Crops'],
        percentages: [58.3, 18.5, 15.0, 8.27],
        colors: ['#10B981', '#3B82F6', '#FB923C', '#EF4444']
    },
    
    cluster_separation: {
        // NDVI vs NDWI for each cluster
        datasets: [
            { cluster: 'Healthy Vegetation', ndvi: 0.72, ndwi: 0.15, color: '#10B981' },
            { cluster: 'Water Bodies', ndvi: 0.31, ndwi: 0.68, color: '#3B82F6' },
            { cluster: 'Bare Soil', ndvi: 0.18, ndwi: 0.08, color: '#FB923C' },
            { cluster: 'Stressed Crops', ndvi: 0.42, ndwi: 0.22, color: '#EF4444' }
        ]
    },
    
    spectral_bands: {
        bands: ['Blue (B2)', 'Green (B3)', 'Red (B4)', 'NIR (B8)', 'SWIR1 (B11)', 'SWIR2 (B12)'],
        importance: [12, 15, 22, 38, 8, 5], // Percentage importance for crop classification
        colors: ['#3B82F6', '#10B981', '#EF4444', '#8B5CF6', '#FB923C', '#F59E0B']
    },
    
    processing_pipeline: {
        stages: ['Data Acquisition', 'Preprocessing', 'SimSiam Learning', 'K-Means Clustering', 'Validation'],
        time_seconds: [85, 42, 180, 35, 60], // Total: 402 seconds = 6.7 minutes
        cumulative: [85, 127, 307, 342, 402]
    },
    
    stress_area: {
        total_area_km2: 1250,
        healthy_km2: 728.75,
        water_km2: 231.25,
        bare_soil_km2: 187.5,
        stressed_km2: 103.35
    }
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
                },
                padding: 15
            }
        },
        tooltip: {
            backgroundColor: 'rgba(10, 25, 47, 0.95)',
            titleColor: '#E2E8F0',
            bodyColor: '#94A3B8',
            borderColor: '#10B981',
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
};

// ============================================
// CHART INITIALIZATION
// ============================================

function initializeCharts() {
    console.log('🌾 Initializing Crop Intelligence charts...');
    
    // Chart 1: Cluster Distribution (Pie Chart)
    const ctxDistribution = document.getElementById('chart-cluster-distribution');
    if (ctxDistribution) {
        new Chart(ctxDistribution, {
            type: 'doughnut',
             {
                labels: cropData.cluster_distribution.clusters,
                datasets: [{
                     cropData.cluster_distribution.percentages,
                    backgroundColor: cropData.cluster_distribution.colors,
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
                        text: '4 Clusters Discovered (K-Means, Zero Labels)',
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
                                return context.label + ': ' + context.parsed.toFixed(2) + '%';
                            }
                        }
                    }
                }
            }
        });
        console.log('✅ Chart 1: Cluster Distribution loaded');
    }

    // Chart 2: Cluster Separation (Scatter Plot: NDVI vs NDWI)
    const ctxSeparation = document.getElementById('chart-cluster-separation');
    if (ctxSeparation) {
        new Chart(ctxSeparation, {
            type: 'scatter',
             {
                datasets: cropData.cluster_separation.datasets.map(cluster => ({
                    label: cluster.cluster,
                     [{ x: cluster.ndwi, y: cluster.ndvi }],
                    backgroundColor: cluster.color,
                    borderColor: cluster.color,
                    borderWidth: 2,
                    pointRadius: 12,
                    pointHoverRadius: 15
                }))
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'Feature Space Separation (Zero Supervision)',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        },
                        padding: { top: 10, bottom: 20 }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94A3B8',
                            font: {
                                family: "'IBM Plex Mono', monospace",
                                size: 10
                            },
                            padding: 12,
                            boxWidth: 12,
                            boxHeight: 12
                        }
                    }
                },
                scales: {
                    x: {
                        ...chartDefaults.scales.x,
                        title: {
                            display: true,
                            text: 'NDWI (Water Index)',
                            color: '#94A3B8'
                        },
                        min: 0,
                        max: 0.8
                    },
                    y: {
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'NDVI (Vegetation Index)',
                            color: '#94A3B8'
                        },
                        min: 0,
                        max: 0.8
                    }
                }
            }
        });
        console.log('✅ Chart 2: Cluster Separation loaded');
    }

    // Chart 3: Spectral Band Importance
    const ctxBands = document.getElementById('chart-spectral-bands');
    if (ctxBands) {
        new Chart(ctxBands, {
            type: 'bar',
             {
                labels: cropData.spectral_bands.bands,
                datasets: [{
                    label: 'Feature Importance (%)',
                     cropData.spectral_bands.importance,
                    backgroundColor: cropData.spectral_bands.colors,
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'Sentinel-2 Band Contribution (SimSiam Learned)',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        },
                        padding: { top: 10, bottom: 20 }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    ...chartDefaults.scales,
                    y: {
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'Importance (%)',
                            color: '#94A3B8'
                        },
                        beginAtZero: true,
                        max: 40
                    }
                }
            }
        });
        console.log('✅ Chart 3: Spectral Bands loaded');
    }

    // Chart 4: Processing Pipeline Timeline
    const ctxPipeline = document.getElementById('chart-processing-pipeline');
    if (ctxPipeline) {
        new Chart(ctxPipeline, {
            type: 'bar',
             {
                labels: cropData.processing_pipeline.stages,
                datasets: [{
                    label: 'Processing Time (seconds)',
                     cropData.processing_pipeline.time_seconds,
                    backgroundColor: [
                        '#3B82F6',
                        '#10B981',
                        '#8B5CF6',
                        '#FB923C',
                        '#14B8A6'
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
                        text: 'End-to-End Pipeline: 6.7 Minutes Total',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        },
                        padding: { top: 10, bottom: 20 }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        ...chartDefaults.scales.x,
                        title: {
                            display: true,
                            text: 'Time (seconds)',
                            color: '#94A3B8'
                        },
                        beginAtZero: true
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
        console.log('✅ Chart 4: Processing Pipeline loaded');
    }

    // Chart 5: Stress Area Breakdown (Stacked Bar)
    const ctxStress = document.getElementById('chart-stress-area');
    if (ctxStress) {
        new Chart(ctxStress, {
            type: 'bar',
             {
                labels: ['Jessore Region (1,250 km²)'],
                datasets: [
                    {
                        label: 'Healthy Vegetation',
                         [cropData.stress_area.healthy_km2],
                        backgroundColor: '#10B981',
                        borderWidth: 0
                    },
                    {
                        label: 'Water Bodies',
                         [cropData.stress_area.water_km2],
                        backgroundColor: '#3B82F6',
                        borderWidth: 0
                    },
                    {
                        label: 'Bare Soil',
                         [cropData.stress_area.bare_soil_km2],
                        backgroundColor: '#FB923C',
                        borderWidth: 0
                    },
                    {
                        label: 'Stressed Crops',
                         [cropData.stress_area.stressed_km2],
                        backgroundColor: '#EF4444',
                        borderWidth: 0
                    }
                ]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: '103.35 km² Stressed Cropland Detected (8.27%)',
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
                                const value = context.parsed.y;
                                const percent = ((value / cropData.stress_area.total_area_km2) * 100).toFixed(2);
                                return context.dataset.label + ': ' + value.toFixed(2) + ' km² (' + percent + '%)';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94A3B8',
                            font: {
                                family: "'IBM Plex Mono', monospace",
                                size: 12
                            }
                        }
                    },
                    y: {
                        stacked: true,
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'Area (km²)',
                            color: '#94A3B8'
                        },
                        beginAtZero: true,
                        max: cropData.stress_area.total_area_km2 + 100
                    }
                }
            }
        });
        console.log('✅ Chart 5: Stress Area loaded');
    }
    
    console.log('🎉 All 5 Crop Intelligence charts initialized successfully!');
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
    
    console.log('✅ Scroll animations initialized');
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Crop Intelligence Demo initializing...');
    
    // Wait for Chart.js to be fully loaded
    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js not loaded! Make sure CDN link is correct.');
        return;
    }
    
    initializeCharts();
    initializeScrollAnimations();
    
    console.log('✅ Crop Intelligence demo fully loaded and ready!');
    console.log('📊 5 charts with self-supervised learning data');
    console.log('🌾 HAWKEYE Engine: Zero labels, 8.27% crop stress detected');
});

// Export for debugging
window.cropData = cropData;
