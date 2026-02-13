/* ============================================
   DASHBOARD-CHARTS.JS - Gráficos e Análises
   ============================================ */

// Proteger página administrativa
if (typeof protegerPaginaAdministrativa === 'function') {
    protegerPaginaAdministrativa();
}

let charts = {};

// Inicializar dashboard
document.addEventListener('DOMContentLoaded', () => {
    carregarDashboard();
});

function carregarDashboard() {
    // Carregar KPIs
    carregarKPIs();
    
    // Carregar gráficos
    carregarGraficoClima();
    carregarGraficoENPS();
    carregarGrafico360();
    carregarGraficoRanking();
    
    // Carregar feedbacks qualitativos
    carregarFeedbacks();
    
    // Verificar alertas
    verificarAlertas();
}

function atualizarDashboard() {
    // Destruir gráficos antigos
    Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
    });
    charts = {};
    
    // Recarregar tudo
    carregarDashboard();
    
    alert('✓ Dashboard atualizado!');
}

// ============================================
// KPIs
// ============================================

function carregarKPIs() {
    const dadosClima = Storage.getClima();
    const dados360 = Storage.getAvaliacoes360();
    
    // KPI 1: Participação Clima
    const participacaoClima = dadosClima.length;
    document.getElementById('kpi-clima').textContent = participacaoClima;
    document.getElementById('kpi-clima-percent').textContent = `${participacaoClima} de 12`;
    
    // KPI 2: eNPS
    if (dadosClima.length > 0) {
        const notasENPS = dadosClima.map(d => parseInt(d.q15)).filter(n => !isNaN(n));
        const enps = Utils.calcularENPS(notasENPS);
        
        document.getElementById('kpi-enps').textContent = enps.enps;
        
        let statusENPS = '';
        if (enps.enps > 50) statusENPS = '🟢 Excelente';
        else if (enps.enps > 30) statusENPS = '🟡 Bom';
        else if (enps.enps >= 0) statusENPS = '🟠 Regular';
        else statusENPS = '🔴 Crítico';
        
        document.getElementById('kpi-enps-status').textContent = statusENPS;
    } else {
        document.getElementById('kpi-enps').textContent = '-';
        document.getElementById('kpi-enps-status').textContent = 'Sem dados';
    }
    
    // KPI 3: Clima Geral
    if (dadosClima.length > 0) {
        const scoresTotais = [];
        dadosClima.forEach(resposta => {
            const scores = [];
            for (let i = 3; i <= 14; i++) {
                const score = parseInt(resposta[`q${i}`]);
                if (!isNaN(score)) scores.push(score);
            }
            if (scores.length > 0) {
                scoresTotais.push(...scores);
            }
        });
        
        const mediaClima = Utils.calcularMedia(scoresTotais);
        document.getElementById('kpi-clima-score').textContent = mediaClima;
    } else {
        document.getElementById('kpi-clima-score').textContent = '-';
    }
    
    // KPI 4: Avaliações 360º
    const total360 = dados360.length;
    document.getElementById('kpi-360').textContent = total360;
    document.getElementById('kpi-360-status').textContent = `${total360} avaliações feitas`;
}

// ============================================
// GRÁFICO: Clima Organizacional
// ============================================

function carregarGraficoClima() {
    const dadosClima = Storage.getClima();
    
    if (dadosClima.length === 0) {
        document.getElementById('chartClima').parentElement.innerHTML = 
            '<p style="text-align:center; padding: 2rem; color: var(--gray-500);">Nenhum dado de clima disponível ainda.</p>';
        return;
    }
    
    // Calcular médias por dimensão
    const dimensoes = {
        'Clareza expectativas': [],
        'Recursos disponíveis': [],
        'Carga de trabalho': [],
        'Comunicação liderança': [],
        'Frequência feedbacks': [],
        'Respeito': [],
        'Colaboração': [],
        'Resolução conflitos': [],
        'Segurança psicológica': [],
        'Reconhecimento': [],
        'Crescimento': [],
        'Consistência políticas': []
    };
    
    const labels = Object.keys(dimensoes);
    const perguntasMap = ['q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14'];
    
    dadosClima.forEach(resposta => {
        perguntasMap.forEach((perg, idx) => {
            const score = parseInt(resposta[perg]);
            if (!isNaN(score)) {
                dimensoes[labels[idx]].push(score);
            }
        });
    });
    
    const medias = labels.map(label => Utils.calcularMedia(dimensoes[label]));
    
    const ctx = document.getElementById('chartClima');
    charts.clima = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score Médio',
                data: medias,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(99, 102, 241, 1)'
            }, {
                label: 'Meta (4.0)',
                data: Array(labels.length).fill(4.0),
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1,
                borderDash: [5, 5],
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// ============================================
// GRÁFICO: eNPS
// ============================================

function carregarGraficoENPS() {
    const dadosClima = Storage.getClima();
    
    if (dadosClima.length === 0) {
        document.getElementById('chartENPS').parentElement.innerHTML = 
            '<p style="text-align:center; padding: 2rem; color: var(--gray-500);">Nenhum dado disponível.</p>';
        return;
    }
    
    const notasENPS = dadosClima.map(d => parseInt(d.q15)).filter(n => !isNaN(n));
    const enps = Utils.calcularENPS(notasENPS);
    
    const ctx = document.getElementById('chartENPS');
    charts.enps = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Promotores (9-10)', 'Neutros (7-8)', 'Detratores (0-6)'],
            datasets: [{
                data: [enps.promotores, enps.neutros, enps.detratores],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = enps.total;
                            const percent = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percent}%)`;
                        }
                    }
                }
            }
        }
    });
}

// ============================================
// GRÁFICO: 360º Competências
// ============================================

function carregarGrafico360() {
    const dados360 = Storage.getAvaliacoes360();
    
    if (dados360.length === 0) {
        document.getElementById('chart360').parentElement.innerHTML = 
            '<p style="text-align:center; padding: 2rem; color: var(--gray-500);">Nenhuma avaliação 360º disponível.</p>';
        return;
    }
    
    // Calcular médias das 8 competências
    const competencias = {
        'Comunicação': [],
        'Colaboração': [],
        'Responsabilidade': [],
        'Proatividade': [],
        'Organização': [],
        'Postura': [],
        'Maturidade': [],
        'Processos': []
    };
    
    const campos = ['comp_comunicacao', 'comp_colaboracao', 'comp_responsabilidade', 
                    'comp_proatividade', 'comp_organizacao', 'comp_postura', 
                    'comp_maturidade', 'comp_processos'];
    
    dados360.forEach(avaliacao => {
        campos.forEach((campo, idx) => {
            const score = parseInt(avaliacao[campo]);
            if (!isNaN(score)) {
                competencias[Object.keys(competencias)[idx]].push(score);
            }
        });
    });
    
    const labels = Object.keys(competencias);
    const medias = labels.map(label => Utils.calcularMedia(competencias[label]));
    
    const ctx = document.getElementById('chart360');
    charts.comp360 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Média Empresa',
                data: medias,
                backgroundColor: 'rgba(139, 92, 246, 0.8)',
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 1
            }, {
                label: 'Meta (4.0)',
                data: Array(labels.length).fill(4.0),
                type: 'line',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// ============================================
// GRÁFICO: Ranking 360º
// ============================================

function carregarGraficoRanking() {
    const dados360 = Storage.getAvaliacoes360();
    
    if (dados360.length === 0) {
        document.getElementById('chartRanking').parentElement.innerHTML = 
            '<p style="text-align:center; padding: 2rem; color: var(--gray-500);">Nenhuma avaliação 360º disponível.</p>';
        return;
    }
    
    // Agrupar por avaliado
    const avaliadosMap = {};
    
    dados360.forEach(avaliacao => {
        const avaliado = avaliacao.avaliado;
        if (!avaliadosMap[avaliado]) {
            avaliadosMap[avaliado] = [];
        }
        
        // Calcular média das 8 competências desta avaliação
        const campos = ['comp_comunicacao', 'comp_colaboracao', 'comp_responsabilidade', 
                        'comp_proatividade', 'comp_organizacao', 'comp_postura', 
                        'comp_maturidade', 'comp_processos'];
        
        const scores = campos.map(campo => parseInt(avaliacao[campo])).filter(s => !isNaN(s));
        const media = Utils.calcularMedia(scores);
        
        avaliadosMap[avaliado].push(parseFloat(media));
    });
    
    // Calcular média por pessoa
    const ranking = Object.keys(avaliadosMap).map(nome => {
        return {
            nome: nome.split('(')[0].trim(), // Remove o cargo do nome
            media: parseFloat(Utils.calcularMedia(avaliadosMap[nome]))
        };
    });
    
    // Ordenar do maior para menor
    ranking.sort((a, b) => b.media - a.media);
    
    // Pegar top 10
    const top10 = ranking.slice(0, 10);
    
    const ctx = document.getElementById('chartRanking');
    charts.ranking = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top10.map(r => r.nome),
            datasets: [{
                label: 'Média 360º',
                data: top10.map(r => r.media),
                backgroundColor: top10.map((_, idx) => {
                    if (idx < 3) return 'rgba(16, 185, 129, 0.8)'; // Top 3 verde
                    return 'rgba(99, 102, 241, 0.8)'; // Resto azul
                }),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 5
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// ============================================
// FEEDBACKS QUALITATIVOS
// ============================================

function carregarFeedbacks() {
    const dadosClima = Storage.getClima();
    
    if (dadosClima.length === 0) {
        document.getElementById('forcas-lista').innerHTML = 
            '<p style="color: var(--gray-500);">Nenhum feedback disponível ainda.</p>';
        document.getElementById('gaps-lista').innerHTML = 
            '<p style="color: var(--gray-500);">Nenhum feedback disponível ainda.</p>';
        return;
    }
    
    // Forças (q16)
    const forcas = dadosClima.map(d => d.q16).filter(f => f && f.trim());
    let htmlForcas = '<ul style="list-style: none; padding: 0;">';
    forcas.forEach((forca, idx) => {
        htmlForcas += `
            <li style="padding: 0.75rem; margin-bottom: 0.5rem; background: white; border-radius: 0.5rem; border-left: 4px solid var(--success);">
                <strong>Feedback ${idx + 1}:</strong> ${forca}
            </li>
        `;
    });
    htmlForcas += '</ul>';
    document.getElementById('forcas-lista').innerHTML = htmlForcas;
    
    // Gaps (q17)
    const gaps = dadosClima.map(d => d.q17).filter(g => g && g.trim());
    let htmlGaps = '<ul style="list-style: none; padding: 0;">';
    gaps.forEach((gap, idx) => {
        htmlGaps += `
            <li style="padding: 0.75rem; margin-bottom: 0.5rem; background: white; border-radius: 0.5rem; border-left: 4px solid var(--danger);">
                <strong>Feedback ${idx + 1}:</strong> ${gap}
            </li>
        `;
    });
    htmlGaps += '</ul>';
    document.getElementById('gaps-lista').innerHTML = htmlGaps;
}

// ============================================
// ALERTAS
// ============================================

function verificarAlertas() {
    const dadosClima = Storage.getClima();
    const alertasContainer = document.getElementById('alertas-container');
    let alertas = [];
    
    // Alerta: Participação baixa
    if (dadosClima.length < 6) {
        alertas.push({
            tipo: 'warning',
            mensagem: `⚠️ Apenas ${dadosClima.length} de 12 colaboradores responderam a Pesquisa de Clima. Recomenda-se pelo menos 50% de participação para análises confiáveis.`
        });
    }
    
    // Alerta: eNPS baixo
    if (dadosClima.length > 0) {
        const notasENPS = dadosClima.map(d => parseInt(d.q15)).filter(n => !isNaN(n));
        const enps = Utils.calcularENPS(notasENPS);
        
        if (enps.enps < 0) {
            alertas.push({
                tipo: 'danger',
                mensagem: `🔴 eNPS Crítico (${enps.enps}): Maioria dos colaboradores não recomendaria trabalhar aqui. Ação urgente necessária!`
            });
        } else if (enps.enps < 30) {
            alertas.push({
                tipo: 'warning',
                mensagem: `🟠 eNPS Regular (${enps.enps}): Clima organizacional precisa de atenção. Meta: >30`
            });
        }
    }
    
    // Alerta: Clima geral baixo
    if (dadosClima.length > 0) {
        const scoresTotais = [];
        dadosClima.forEach(resposta => {
            for (let i = 3; i <= 14; i++) {
                const score = parseInt(resposta[`q${i}`]);
                if (!isNaN(score)) scoresTotais.push(score);
            }
        });
        
        const mediaClima = parseFloat(Utils.calcularMedia(scoresTotais));
        
        if (mediaClima < 3.0) {
            alertas.push({
                tipo: 'danger',
                mensagem: `🔴 Clima Geral Crítico (${mediaClima}): Múltiplas dimensões abaixo do aceitável. Revisão urgente necessária!`
            });
        } else if (mediaClima < 3.5) {
            alertas.push({
                tipo: 'warning',
                mensagem: `⚠️ Clima Geral Abaixo da Meta (${mediaClima}): Algumas dimensões precisam de atenção. Meta: ≥4.0`
            });
        }
    }
    
    // Renderizar alertas
    if (alertas.length > 0) {
        let html = '';
        alertas.forEach(alerta => {
            const classe = alerta.tipo === 'danger' ? 'alert-danger' : 'alert-warning';
            const estilo = alerta.tipo === 'danger' 
                ? 'background: #fee2e2; border-left: 4px solid var(--danger); color: #991b1b;'
                : 'background: #fef3c7; border-left: 4px solid var(--warning); color: #92400e;';
            
            html += `
                <div style="padding: 1rem 1.25rem; border-radius: 0.5rem; margin-bottom: 1rem; ${estilo}">
                    ${alerta.mensagem}
                </div>
            `;
        });
        alertasContainer.innerHTML = html;
    }
}

// ============================================
// EXPORTAR RELATÓRIO
// ============================================

function exportarRelatorio() {
    const dadosClima = Storage.getClima();
    const dados360 = Storage.getAvaliacoes360();
    const dadosAuto = Storage.getAutoavaliacoes();
    const dadosDISC = Storage.getDISC();
    
    // Calcular eNPS
    let enpsData = { enps: 0, promotores: 0, neutros: 0, detratores: 0 };
    if (dadosClima.length > 0) {
        const notasENPS = dadosClima.map(d => parseInt(d.q15)).filter(n => !isNaN(n));
        enpsData = Utils.calcularENPS(notasENPS);
    }
    
    // Calcular clima geral
    let climaGeral = 0;
    if (dadosClima.length > 0) {
        const scoresTotais = [];
        dadosClima.forEach(resposta => {
            for (let i = 3; i <= 14; i++) {
                const score = parseInt(resposta[`q${i}`]);
                if (!isNaN(score)) scoresTotais.push(score);
            }
        });
        climaGeral = parseFloat(Utils.calcularMedia(scoresTotais));
    }
    
    const relatorio = {
        data_geracao: new Date().toLocaleString('pt-BR'),
        resumo: {
            participacao_clima: dadosClima.length,
            total_avaliacoes_360: dados360.length,
            total_autoavaliacoes: dadosAuto.length,
            total_disc: dadosDISC.length,
            enps: enpsData.enps,
            clima_geral: climaGeral
        },
        dados_completos: {
            clima: dadosClima,
            avaliacoes_360: dados360,
            autoavaliacoes: dadosAuto,
            disc: dadosDISC
        }
    };
    
    const dataStr = JSON.stringify(relatorio, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_dashboard_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    alert('✓ Relatório exportado com sucesso!');
}

// Função de logout
function fazerLogout() {
    if (confirm('Tem certeza que deseja sair da área administrativa?')) {
        logout();
        window.location.href = 'index.html';
    }
}
