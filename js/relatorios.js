/* ============================================
   RELATORIOS.JS - Relatórios Individuais
   ============================================ */

// Proteger página administrativa
if (typeof protegerPaginaAdministrativa === 'function') {
    protegerPaginaAdministrativa();
}

let colaboradorAtual = null;
let chartCompetencias = null;

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    carregarListaColaboradores();
});

// Carregar lista de colaboradores avaliados
function carregarListaColaboradores() {
    const dados360 = Storage.getAvaliacoes360();
    
    if (dados360.length === 0) {
        document.getElementById('selectColaborador').innerHTML = 
            '<option value="">Nenhuma avaliação 360º disponível ainda</option>';
        return;
    }
    
    // Extrair lista única de avaliados
    const avaliados = [...new Set(dados360.map(d => d.avaliado))];
    avaliados.sort();
    
    let html = '<option value="">Escolha um colaborador...</option>';
    avaliados.forEach(nome => {
        html += `<option value="${nome}">${nome}</option>`;
    });
    
    document.getElementById('selectColaborador').innerHTML = html;
}

// Carregar relatório de um colaborador
function carregarRelatorio() {
    const select = document.getElementById('selectColaborador');
    const nomeCompleto = select.value;
    
    if (!nomeCompleto) {
        document.getElementById('relatorio-container').style.display = 'none';
        document.getElementById('mensagem-inicial').style.display = 'block';
        return;
    }
    
    colaboradorAtual = nomeCompleto;
    
    // Mostrar container do relatório
    document.getElementById('relatorio-container').style.display = 'block';
    document.getElementById('mensagem-inicial').style.display = 'none';
    
    // Extrair nome e cargo
    const partes = nomeCompleto.match(/^(.+?)\s*\((.+)\)$/);
    const nome = partes ? partes[1].trim() : nomeCompleto;
    const cargo = partes ? partes[2].trim() : '';
    
    document.getElementById('relatorio-nome').textContent = nome;
    document.getElementById('relatorio-cargo').textContent = cargo;
    
    // Carregar dados 360º
    carregarDados360(nomeCompleto);
    
    // Carregar autoavaliação (se houver)
    carregarAutoavaliacao(nome);
    
    // Carregar DISC (se houver)
    carregarDISC(nome);
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// DADOS 360º
// ============================================

function carregarDados360(nomeCompleto) {
    const dados360 = Storage.getAvaliacoes360();
    
    // Filtrar avaliações deste colaborador
    const avaliacoes = dados360.filter(d => d.avaliado === nomeCompleto);
    
    if (avaliacoes.length === 0) {
        alert('Nenhuma avaliação encontrada para este colaborador.');
        return;
    }
    
    // KPI 1: Número de avaliações
    document.getElementById('rel-avaliacoes').textContent = avaliacoes.length;
    
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
    
    let scoresConfianca = [];
    
    avaliacoes.forEach(avaliacao => {
        campos.forEach((campo, idx) => {
            const score = parseInt(avaliacao[campo]);
            if (!isNaN(score)) {
                competencias[Object.keys(competencias)[idx]].push(score);
            }
        });
        
        // Score de confiança
        const conf = parseInt(avaliacao.score_confianca);
        if (!isNaN(conf)) {
            scoresConfianca.push(conf);
        }
    });
    
    const labels = Object.keys(competencias);
    const medias = labels.map(label => parseFloat(Utils.calcularMedia(competencias[label])));
    
    // KPI 2: Média Geral
    const mediaGeral = Utils.calcularMedia(medias);
    document.getElementById('rel-media').textContent = mediaGeral;
    
    // KPI 3: Score Confiança
    const mediaConfianca = Utils.calcularMedia(scoresConfianca);
    document.getElementById('rel-confianca').textContent = mediaConfianca;
    
    // KPI 4: Ranking
    calcularRanking(nomeCompleto, parseFloat(mediaGeral));
    
    // Gráfico de Competências
    gerarGraficoCompetencias(labels, medias);
    
    // Feedbacks Qualitativos
    carregarFeedbacks360(avaliacoes);
    
    // Avaliação de Liderança (se houver)
    carregarAvaliacaoLideranca(avaliacoes);
}

function gerarGraficoCompetencias(labels, medias) {
    // Destruir gráfico anterior se existir
    if (chartCompetencias) {
        chartCompetencias.destroy();
    }
    
    // Calcular média da empresa para comparação
    const todos360 = Storage.getAvaliacoes360();
    const competenciasEmpresa = {
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
    
    todos360.forEach(avaliacao => {
        campos.forEach((campo, idx) => {
            const score = parseInt(avaliacao[campo]);
            if (!isNaN(score)) {
                competenciasEmpresa[labels[idx]].push(score);
            }
        });
    });
    
    const mediasEmpresa = labels.map(label => parseFloat(Utils.calcularMedia(competenciasEmpresa[label])));
    
    const ctx = document.getElementById('chartCompetencias');
    chartCompetencias = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: colaboradorAtual.split('(')[0].trim(),
                data: medias,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(99, 102, 241, 1)'
            }, {
                label: 'Média Empresa',
                data: mediasEmpresa,
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1,
                borderDash: [5, 5],
                pointBackgroundColor: 'rgba(16, 185, 129, 1)',
                pointRadius: 3
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

function calcularRanking(nomeCompleto, mediaColaborador) {
    const dados360 = Storage.getAvaliacoes360();
    
    // Agrupar por avaliado
    const avaliadosMap = {};
    
    dados360.forEach(avaliacao => {
        const avaliado = avaliacao.avaliado;
        if (!avaliadosMap[avaliado]) {
            avaliadosMap[avaliado] = [];
        }
        
        const campos = ['comp_comunicacao', 'comp_colaboracao', 'comp_responsabilidade', 
                        'comp_proatividade', 'comp_organizacao', 'comp_postura', 
                        'comp_maturidade', 'comp_processos'];
        
        const scores = campos.map(campo => parseInt(avaliacao[campo])).filter(s => !isNaN(s));
        const media = parseFloat(Utils.calcularMedia(scores));
        
        avaliadosMap[avaliado].push(media);
    });
    
    // Calcular média por pessoa
    const ranking = Object.keys(avaliadosMap).map(nome => {
        return {
            nome: nome,
            media: parseFloat(Utils.calcularMedia(avaliadosMap[nome]))
        };
    });
    
    // Ordenar do maior para menor
    ranking.sort((a, b) => b.media - a.media);
    
    // Encontrar posição
    const posicao = ranking.findIndex(r => r.nome === nomeCompleto) + 1;
    const total = ranking.length;
    
    document.getElementById('rel-ranking').textContent = `${posicao}º`;
    
    let descricao = '';
    if (posicao <= 3) {
        descricao = '🌟 Top 3';
    } else if (posicao <= Math.ceil(total * 0.25)) {
        descricao = '✅ Top 25%';
    } else if (posicao >= Math.ceil(total * 0.75)) {
        descricao = '⚠️ Bottom 25%';
    } else {
        descricao = 'Médio';
    }
    
    document.getElementById('rel-ranking-desc').textContent = descricao;
}

function carregarFeedbacks360(avaliacoes) {
    // Pontos Fortes
    const forcas = avaliacoes.map(a => a.ponto_forte).filter(f => f && f.trim());
    
    let htmlForcas = '';
    if (forcas.length > 0) {
        htmlForcas = '<ul style="list-style: none; padding: 0;">';
        forcas.forEach((forca, idx) => {
            htmlForcas += `
                <li style="padding: 0.75rem; margin-bottom: 0.5rem; background: white; border-radius: 0.5rem; border-left: 4px solid var(--success);">
                    <strong>Avaliador ${idx + 1}:</strong> ${forca}
                </li>
            `;
        });
        htmlForcas += '</ul>';
    } else {
        htmlForcas = '<p style="color: var(--gray-500);">Nenhum feedback registrado.</p>';
    }
    
    document.getElementById('rel-forcas').innerHTML = htmlForcas;
    
    // Oportunidades de Melhoria
    const melhorias = avaliacoes.map(a => a.oportunidade_melhoria).filter(m => m && m.trim());
    
    let htmlMelhorias = '';
    if (melhorias.length > 0) {
        htmlMelhorias = '<ul style="list-style: none; padding: 0;">';
        melhorias.forEach((melhoria, idx) => {
            htmlMelhorias += `
                <li style="padding: 0.75rem; margin-bottom: 0.5rem; background: white; border-radius: 0.5rem; border-left: 4px solid var(--warning);">
                    <strong>Avaliador ${idx + 1}:</strong> ${melhoria}
                </li>
            `;
        });
        htmlMelhorias += '</ul>';
    } else {
        htmlMelhorias = '<p style="color: var(--gray-500);">Nenhum feedback registrado.</p>';
    }
    
    document.getElementById('rel-melhorias').innerHTML = htmlMelhorias;
}

function carregarAvaliacaoLideranca(avaliacoes) {
    // Verificar se tem avaliações de liderança
    const avaliacoesLideranca = avaliacoes.filter(a => a.lider_feedbacks);
    
    if (avaliacoesLideranca.length === 0) {
        document.getElementById('lideranca-section').style.display = 'none';
        return;
    }
    
    document.getElementById('lideranca-section').style.display = 'block';
    
    // Calcular médias
    const feedbacks = avaliacoesLideranca.map(a => parseInt(a.lider_feedbacks)).filter(s => !isNaN(s));
    const desenvolvimento = avaliacoesLideranca.map(a => parseInt(a.lider_desenvolvimento)).filter(s => !isNaN(s));
    const clareza = avaliacoesLideranca.map(a => parseInt(a.lider_clareza)).filter(s => !isNaN(s));
    
    const mediaFeedbacks = Utils.calcularMedia(feedbacks);
    const mediaDesenvolvimento = Utils.calcularMedia(desenvolvimento);
    const mediaClareza = Utils.calcularMedia(clareza);
    const mediaGeral = Utils.calcularMedia([mediaFeedbacks, mediaDesenvolvimento, mediaClareza].map(m => parseFloat(m)));
    
    let html = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 0.5rem;">
                <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">Frequência de Feedbacks</div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--gray-900);">${mediaFeedbacks}</div>
                <div style="font-size: 0.75rem; color: var(--gray-500);">de 5.0</div>
            </div>
            
            <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 0.5rem;">
                <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">Apoio ao Desenvolvimento</div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--gray-900);">${mediaDesenvolvimento}</div>
                <div style="font-size: 0.75rem; color: var(--gray-500);">de 5.0</div>
            </div>
            
            <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 0.5rem;">
                <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">Clareza de Direcionamento</div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--gray-900);">${mediaClareza}</div>
                <div style="font-size: 0.75rem; color: var(--gray-500);">de 5.0</div>
            </div>
            
            <div style="text-align: center; padding: 1rem; background: var(--primary); border-radius: 0.5rem; color: white;">
                <div style="font-size: 0.875rem; margin-bottom: 0.5rem; opacity: 0.9;">Média Geral Liderança</div>
                <div style="font-size: 2rem; font-weight: 700;">${mediaGeral}</div>
                <div style="font-size: 0.75rem; opacity: 0.8;">de 5.0</div>
            </div>
        </div>
        
        <div style="margin-top: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 1rem;">💬 O que continuar fazendo:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem; border-left: 4px solid var(--success);">
    `;
    
    const continuar = avaliacoesLideranca.map(a => a.lider_continuar).filter(c => c && c.trim());
    if (continuar.length > 0) {
        continuar.forEach((item, idx) => {
            html += `<p style="margin-bottom: 0.5rem;"><strong>Feedback ${idx + 1}:</strong> ${item}</p>`;
        });
    } else {
        html += '<p style="color: var(--gray-500);">Nenhum feedback registrado.</p>';
    }
    
    html += `
            </div>
        </div>
        
        <div style="margin-top: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 1rem;">🎯 O que melhorar:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem; border-left: 4px solid var(--warning);">
    `;
    
    const melhorar = avaliacoesLideranca.map(a => a.lider_melhorar).filter(m => m && m.trim());
    if (melhorar.length > 0) {
        melhorar.forEach((item, idx) => {
            html += `<p style="margin-bottom: 0.5rem;"><strong>Feedback ${idx + 1}:</strong> ${item}</p>`;
        });
    } else {
        html += '<p style="color: var(--gray-500);">Nenhum feedback registrado.</p>';
    }
    
    html += '</div></div>';
    
    document.getElementById('rel-lideranca').innerHTML = html;
}

// ============================================
// AUTOAVALIAÇÃO
// ============================================

function carregarAutoavaliacao(nome) {
    const autoavaliacoes = Storage.getAutoavaliacoes();
    
    // Buscar autoavaliação deste colaborador
    const autoavaliacao = autoavaliacoes.find(a => 
        a.nome && a.nome.toLowerCase().includes(nome.toLowerCase())
    );
    
    if (!autoavaliacao) {
        document.getElementById('autoavaliacao-section').style.display = 'none';
        return;
    }
    
    document.getElementById('autoavaliacao-section').style.display = 'block';
    
    let html = `
        <div style="margin-bottom: 1.5rem;">
            <strong style="color: var(--gray-700);">Cargo:</strong> ${autoavaliacao.cargo || '-'}
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <strong style="color: var(--gray-700);">Gestor:</strong> ${autoavaliacao.gestor || '-'}
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 0.5rem;">
                <div style="font-size: 0.875rem; color: var(--gray-600);">Atingimento de Metas</div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--gray-900);">${autoavaliacao.meta_geral || '-'}</div>
                <div style="font-size: 0.75rem; color: var(--gray-500);">de 5.0</div>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">✅ Resultados Alcançados:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${autoavaliacao.resultados_alcancados || 'Não informado'}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">⚠️ Metas Não Atingidas:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${autoavaliacao.metas_nao_atingidas || 'Não informado'}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">💪 Pontos Fortes (autodeclarados):</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${autoavaliacao.pontos_fortes || 'Não informado'}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">📈 Áreas a Desenvolver:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${autoavaliacao.areas_desenvolver || 'Não informado'}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">🎯 Necessidades (do que precisa da empresa):</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${autoavaliacao.necessidades || 'Não informado'}</p>
            </div>
        </div>
        
        <div>
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">🚀 Metas 6-12 meses:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${autoavaliacao.metas_futuras || 'Não informado'}</p>
            </div>
        </div>
    `;
    
    document.getElementById('rel-autoavaliacao').innerHTML = html;
}

// ============================================
// DISC
// ============================================

function carregarDISC(nome) {
    const dadosDISC = Storage.getDISC();
    
    // Buscar DISC deste colaborador
    const disc = dadosDISC.find(d => 
        d.nome && d.nome.toLowerCase().includes(nome.toLowerCase())
    );
    
    if (!disc) {
        document.getElementById('disc-section').style.display = 'none';
        return;
    }
    
    document.getElementById('disc-section').style.display = 'block';
    
    let html = `
        <div style="margin-bottom: 1.5rem;">
            <strong style="color: var(--gray-700);">Cargo:</strong> ${disc.cargo || '-'}
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">💡 Como trabalha melhor:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${disc.trabalho_melhor || 'Não informado'}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">⚠️ Quando se sente menos produtivo:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${disc.menos_produtivo || 'Não informado'}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">😤 Principais frustrações:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${disc.frustracoes || 'Não informado'}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">✨ Motivadores principais:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${Array.isArray(disc.motivadores) ? disc.motivadores.join(', ') : (disc.motivadores || 'Não informado')}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">🎯 Características que se identifica:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${Array.isArray(disc.caracteristicas) ? disc.caracteristicas.join(', ') : (disc.caracteristicas || 'Não informado')}</p>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 0.5rem;">
                <div style="font-size: 0.875rem; color: var(--gray-600);">Orientação</div>
                <div style="font-size: 1.25rem; font-weight: 600; color: var(--gray-900); margin-top: 0.5rem;">
                    ${disc.orientacao_tarefa_pessoa == 1 ? 'Tarefas' : 
                      disc.orientacao_tarefa_pessoa == 5 ? 'Pessoas' : 
                      disc.orientacao_tarefa_pessoa == 3 ? 'Equilibrado' : 
                      disc.orientacao_tarefa_pessoa < 3 ? 'Mais Tarefas' : 'Mais Pessoas'}
                </div>
            </div>
            
            <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 0.5rem;">
                <div style="font-size: 0.875rem; color: var(--gray-600);">Estilo de Trabalho</div>
                <div style="font-size: 1.25rem; font-weight: 600; color: var(--gray-900); margin-top: 0.5rem;">
                    ${disc.estilo_trabalho_individual == 1 ? 'Independente' : 
                      disc.estilo_trabalho_individual == 5 ? 'Colaborativo' : 
                      disc.estilo_trabalho_individual == 3 ? 'Equilibrado' : 
                      disc.estilo_trabalho_individual < 3 ? 'Mais Independente' : 'Mais Colaborativo'}
                </div>
            </div>
            
            <div style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 0.5rem;">
                <div style="font-size: 0.875rem; color: var(--gray-600);">Nível de Cautela</div>
                <div style="font-size: 1.25rem; font-weight: 600; color: var(--gray-900); margin-top: 0.5rem;">
                    ${disc.nivel_cautela == 1 ? 'Muito Cauteloso' : 
                      disc.nivel_cautela == 5 ? 'Muito Ousado' : 
                      disc.nivel_cautela == 3 ? 'Equilibrado' : 
                      disc.nivel_cautela < 3 ? 'Cauteloso' : 'Ousado'}
                </div>
            </div>
        </div>
        
        <div>
            <h4 style="color: var(--gray-700); margin-bottom: 0.5rem;">💭 Mudança desejada na empresa:</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.5rem;">
                <p>${disc.mudanca_desejada || 'Não informado'}</p>
            </div>
        </div>
    `;
    
    document.getElementById('rel-disc').innerHTML = html;
}

// ============================================
// EXPORTAÇÃO
// ============================================

function exportarRelatorioIndividual() {
    if (!colaboradorAtual) {
        alert('Nenhum colaborador selecionado.');
        return;
    }
    
    // Coletar todos os dados do colaborador
    const nome = colaboradorAtual.split('(')[0].trim();
    
    const dados360 = Storage.getAvaliacoes360().filter(d => d.avaliado === colaboradorAtual);
    const autoavaliacao = Storage.getAutoavaliacoes().find(a => 
        a.nome && a.nome.toLowerCase().includes(nome.toLowerCase())
    );
    const disc = Storage.getDISC().find(d => 
        d.nome && d.nome.toLowerCase().includes(nome.toLowerCase())
    );
    
    const relatorio = {
        colaborador: colaboradorAtual,
        data_geracao: new Date().toLocaleString('pt-BR'),
        avaliacoes_360: dados360,
        autoavaliacao: autoavaliacao || null,
        disc: disc || null
    };
    
    const dataStr = JSON.stringify(relatorio, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_${nome.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    alert(`✓ Relatório de ${nome} exportado com sucesso!`);
}

function exportarTodosRelatorios() {
    const dados360 = Storage.getAvaliacoes360();
    const autoavaliacoes = Storage.getAutoavaliacoes();
    const dadosDISC = Storage.getDISC();
    
    if (dados360.length === 0) {
        alert('Nenhuma avaliação 360º disponível para gerar relatórios.');
        return;
    }
    
    // Extrair lista única de avaliados
    const avaliados = [...new Set(dados360.map(d => d.avaliado))];
    
    const relatorios = avaliados.map(nomeCompleto => {
        const nome = nomeCompleto.split('(')[0].trim();
        
        return {
            colaborador: nomeCompleto,
            avaliacoes_360: dados360.filter(d => d.avaliado === nomeCompleto),
            autoavaliacao: autoavaliacoes.find(a => 
                a.nome && a.nome.toLowerCase().includes(nome.toLowerCase())
            ) || null,
            disc: dadosDISC.find(d => 
                d.nome && d.nome.toLowerCase().includes(nome.toLowerCase())
            ) || null
        };
    });
    
    const exportacao = {
        data_geracao: new Date().toLocaleString('pt-BR'),
        total_colaboradores: avaliados.length,
        relatorios: relatorios
    };
    
    const dataStr = JSON.stringify(exportacao, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos_relatorios_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    alert(`✓ ${avaliados.length} relatórios exportados com sucesso!`);
}

// Função de logout
function fazerLogout() {
    if (confirm('Tem certeza que deseja sair da área administrativa?')) {
        logout();
        window.location.href = 'index.html';
    }
}
