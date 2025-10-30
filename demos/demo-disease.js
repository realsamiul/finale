// demo-disease.js - Disease Intelligence with Dynamic Visualizations

// ============================================
// DATA SECTION
// ============================================

// Simulated dengue forecast data (last 90 days + 7-day forecast)
const dengueData = {
    historical: {
        dates: Array.from({length: 90}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (90 - i));
            return date.toISOString().split('T')[0];
        }),
        actual: [
            45, 52, 48, 61, 58, 67, 72, 81, 89, 95, // Days 1-10
            102, 98, 105, 112, 118, 125, 132, 128, 135, 141, // 11-20
            148, 156, 163, 158, 165, 172, 168, 175, 181, 178, // 21-30
            172, 165, 158, 151, 145, 138, 132, 125, 119, 112, // 31-40
            106, 98, 92, 85, 79, 73, 67, 61, 56, 51, // 41-50
            47, 43, 39, 36, 33, 31, 28, 26, 24, 22, // 51-60
            21, 19, 18, 17, 16, 15, 14, 13, 12, 12, // 61-70
            11, 11, 10, 10, 9, 9, 8, 8, 8, 7, // 71-80
            7, 7, 6, 6, 6, 5, 5, 5, 5, 4 // 81-90
        ]
    },
    forecast: {
        dates: Array.from({length: 7}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i + 1);
            return date.toISOString().split('T')[0];
        }),
        predicted: [4, 4, 4, 3, 3, 3, 3],
        lower_ci: [3, 3, 2, 2, 2, 2, 2],
        upper_ci: [5, 6, 6, 5, 5, 4, 4]
    }
};

// Multi-horizon performance data
const horizonData = {
    horizons: ['7-Day', '14-Day', '30-Day'],
    mape: [9.8, 12.5, 17.2],
    mae: [1.2, 1.8, 2.9]
};

// Causal relationships discovered
const causalData = {
    nodes: [
        {id: 'temp', label: 'Max Temperature', x: 50, y: 20},
        {id: 'humidity', label: 'Humidity', x: 20, y: 50},
        {id: 'rainfall', label: 'Rainfall', x: 80, y: 50},
        {id: 'economic', label: 'Economic Activity', x: 20, y: 80},
        {id: 'dengue', label: 'Dengue Cases', x: 50, y: 80},
        {id: 'water', label: 'Surface Water', x: 80, y: 80}
    ],
    edges: [
        {from: 'temp', to: 'dengue', strength: 0.324, lag: 7, color: '#14B8A6'},
        {from: 'humidity', to: 'dengue', strength: 0.187, lag: 3, color: '#8B5CF6'},
        {from: 'economic', to: 'dengue', strength: -0.574, lag: 0, color: '#EF4444'},
        {from: 'rainfall', to: 'water', strength: 0.512, lag: 1, color: '#FB923C'},
        {from: 'water', to: 'dengue', strength: 0.231, lag: 5, color: '#10B981'}
    ]
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
                }
            }
        }
    }
};

// ============================================
// CHART INITIALIZATION
// ============================================

function initializeCharts() {
    // Chart 1: 7-Day Forecast with Historical Context
    const ctxForecast = document.getElementById('chart-forecast-7day');
    if (ctxForecast) {
        const allDates = [...dengueData.historical.dates, ...dengueData.forecast.dates];
        const allActual = [...dengueData.historical.actual, ...Array(7).fill(null)];
        const allPredicted = [...Array(90).fill(null), ...dengueData.forecast.predicted];
        
        new Chart(ctxForecast, {
            type: 'line',
            data: {
                labels: allDates.map(d => d.slice(5)), // Show MM-DD
                datasets: [
                    {
                        label: 'Historical Cases',
                        data: allActual,
                        borderColor: '#14B8A6',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0,
                        fill: true
                    },
                    {
                        label: '7-Day Forecast',
                        data: allPredicted,
                        borderColor: '#FB923C',
                        backgroundColor: 'rgba(251, 146, 60, 0.1)',
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
                        text: 'Dengue Cases: Historical + 7-Day Forecast',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        },
                        padding: {top: 10, bottom: 20}
                    }
                },
                scales: {
                    ...chartDefaults.scales,
                    y: {
                        ...chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'Daily Cases',
                            color: '#94A3B8'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Chart 2: Causal Network (Scatter with custom rendering)
    const ctxCausal = document.getElementById('chart-causal-network');
    if (ctxCausal) {
        const canvas = ctxCausal;
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = canvas.offsetWidth * 2; // Retina
        canvas.height = 300 * 2;
        ctx.scale(2, 2);
        
        // Draw causal network
        function drawCausalNetwork() {
            const width = canvas.offsetWidth;
            const height = 300;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Draw edges first
            causalData.edges.forEach(edge => {
                const fromNode = causalData.nodes.find(n => n.id === edge.from);
                const toNode = causalData.nodes.find(n => n.id === edge.to);
                
                if (fromNode && toNode) {
                    const x1 = fromNode.x * width / 100;
                    const y1 = fromNode.y * height / 100;
                    const x2 = toNode.x * width / 100;
                    const y2 = toNode.y * height / 100;
                    
                    // Draw arrow
                    ctx.strokeStyle = edge.color;
                    ctx.lineWidth = Math.abs(edge.strength) * 4;
                    ctx.globalAlpha = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                    
                    // Draw arrowhead
                    const angle = Math.atan2(y2 - y1, x2 - x1);
                    const arrowSize = 8;
                    ctx.fillStyle = edge.color;
                    ctx.beginPath();
                    ctx.moveTo(x2, y2);
                    ctx.lineTo(
                        x2 - arrowSize * Math.cos(angle - Math.PI / 6),
                        y2 - arrowSize * Math.sin(angle - Math.PI / 6)
                    );
                    ctx.lineTo(
                        x2 - arrowSize * Math.cos(angle + Math.PI / 6),
                        y2 - arrowSize * Math.sin(angle + Math.PI / 6)
                    );
                    ctx.closePath();
                    ctx.fill();
                    
                    // Draw lag label
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = '#94A3B8';
                    ctx.font = '10px "IBM Plex Mono"';
                    ctx.textAlign = 'center';
                    const midX = (x1 + x2) / 2;
                    const midY = (y1 + y2) / 2;
                    ctx.fillText(`${edge.lag}d lag`, midX, midY - 5);
                }
            });
            
            // Draw nodes
            ctx.globalAlpha = 1;
            causalData.nodes.forEach(node => {
                const x = node.x * width / 100;
                const y = node.y * height / 100;
                
                // Node circle
                ctx.fillStyle = node.id === 'dengue' ? '#14B8A6' : '#1a1f35';
                ctx.strokeStyle = node.id === 'dengue' ? '#14B8A6' : '#64748B';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                
                // Node label
                ctx.fillStyle = '#E2E8F0';
                ctx.font = '11px "IBM Plex Mono"';
                ctx.textAlign = 'center';
                ctx.fillText(node.label.split(' ')[0], x, y + 35);
                if (node.label.split(' ')[1]) {
                    ctx.fillText(node.label.split(' ')[1], x, y + 47);
                }
            });
        }
        
        drawCausalNetwork();
    }

    // Chart 3: Multi-Horizon Performance
    const ctxHorizon = document.getElementById('chart-multi-horizon');
    if (ctxHorizon) {
        new Chart(ctxHorizon, {
            type: 'bar',
            data: {
                labels: horizonData.horizons,
                datasets: [{
                    label: 'MAPE (%)',
                    data: horizonData.mape,
                    backgroundColor: [
                        'rgba(20, 184, 166, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(251, 146, 60, 0.8)'
                    ],
                    borderColor: [
                        '#14B8A6',
                        '#8B5CF6',
                        '#FB923C'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    title: {
                        display: true,
                        text: 'Forecast Accuracy by Horizon',
                        color: '#E2E8F0',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 14,
                            weight: 600
                        }
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
                            text: 'Mean Absolute % Error',
                            color: '#94A3B8'
                        },
                        beginAtZero: true,
                        max: 20
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
    
    console.log('✅ Disease Intelligence demo initialized');
});
