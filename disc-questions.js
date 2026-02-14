// Perguntas do DISC Complementar
const perguntasDISC = [
    // IDENTIFICAÇÃO
    {
        num: 1,
        secao: "Identificação",
        texto: "Seu nome completo",
        tipo: "texto_curto",
        nome_campo: "nome"
    },
    {
        num: 2,
        secao: "Identificação",
        texto: "Sua função/cargo",
        tipo: "texto_curto",
        nome_campo: "cargo"
    },

    // RITMO E ESTILO DE TRABALHO
    {
        num: 3,
        secao: "Ritmo e Estilo de Trabalho",
        texto: "Quando você tem um projeto ou tarefa urgente, você tende a:",
        tipo: "select",
        nome_campo: "estilo_urgencia",
        opcoes: [
            "Agir rapidamente, mesmo sem todos os detalhes (prefiro fazer ajustes no caminho)",
            "Analisar bem antes, mesmo que demore um pouco mais (prefiro acertar de primeira)",
            "Buscar um equilíbrio - ajo com agilidade, mas valido os pontos principais",
            "Depende muito da situação"
        ]
    },
    {
        num: 4,
        secao: "Ritmo e Estilo de Trabalho",
        texto: "Como você reage tipicamente sob pressão ou prazos apertados?",
        tipo: "texto_longo",
        nome_campo: "reacao_pressao",
        descricao: "Seja honesto(a). Ex: fico mais focado, me estresso, delego, busco ajuda, etc."
    },
    {
        num: 5,
        secao: "Ritmo e Estilo de Trabalho",
        texto: "Você prefere trabalhar em:",
        tipo: "select",
        nome_campo: "preferencia_ambiente",
        opcoes: [
            "Rotinas estruturadas e previsíveis (gosto de saber o que esperar)",
            "Ambientes dinâmicos com variedade e novidades constantes",
            "Um equilíbrio entre estrutura e flexibilidade"
        ]
    },
    {
        num: 6,
        secao: "Ritmo e Estilo de Trabalho",
        texto: "Qual destas situações te deixa MAIS confortável no trabalho?",
        tipo: "select",
        nome_campo: "situacao_confortavel",
        opcoes: [
            "Ter metas claras e autonomia para decidir COMO atingi-las",
            "Ter processos bem definidos que garantem que farei certo",
            "Trabalhar em projetos colaborativos onde posso interagir bastante",
            "Ter variedade de atividades e poder lidar com imprevistos"
        ]
    },

    // TOMADA DE DECISÃO
    {
        num: 7,
        secao: "Tomada de Decisão",
        texto: "Ao tomar decisões importantes, você tende a:",
        tipo: "select",
        nome_campo: "estilo_decisao",
        opcoes: [
            "Decidir rápido com base em intuição e experiência",
            "Analisar dados e informações detalhadamente antes de decidir",
            "Consultar outras pessoas e buscar consenso",
            "Avaliar o impacto nas pessoas envolvidas antes de decidir"
        ]
    },
    {
        num: 8,
        secao: "Tomada de Decisão",
        texto: "Você se considera mais:",
        tipo: "escala_extremos",
        nome_campo: "nivel_cautela",
        label_min: "Muito cauteloso(a)",
        label_max: "Muito ousado(a) / aceito riscos"
    },

    // RELACIONAMENTOS E COMUNICAÇÃO
    {
        num: 9,
        secao: "Relacionamentos e Comunicação",
        texto: "Em reuniões ou conversas de equipe, você geralmente:",
        tipo: "select",
        nome_campo: "estilo_reuniao",
        opcoes: [
            "Falo bastante, compartilho ideias e gosto de interagir",
            "Ouço mais, falo quando tenho algo importante a contribuir",
            "Prefiro conversas 1:1 do que grandes grupos",
            "Vou direto ao ponto, focando em decisões e próximos passos"
        ]
    },
    {
        num: 10,
        secao: "Relacionamentos e Comunicação",
        texto: "Como você prefere receber feedback? (pode marcar mais de uma)",
        tipo: "checkbox",
        nome_campo: "preferencia_feedback",
        opcoes: [
            "Direto e objetivo, sem rodeios",
            "Com contexto e exemplos específicos",
            "Em particular, nunca em público",
            "Com sugestões práticas do que fazer diferente",
            "Com reconhecimento do que faço bem antes de falar do que preciso melhorar"
        ]
    },
    {
        num: 11,
        secao: "Relacionamentos e Comunicação",
        texto: "O que mais te FRUSTRA ou DESMOTIVA em um ambiente de trabalho?",
        tipo: "texto_longo",
        nome_campo: "frustracoes",
        descricao: "Seja específico(a). Ex: falta de clareza, microgerenciamento, falta de reconhecimento, conflitos não resolvidos, lentidão, etc."
    },

    // RESOLUÇÃO DE PROBLEMAS E CONFLITOS
    {
        num: 12,
        secao: "Resolução de Problemas",
        texto: "Quando surge um conflito ou desacordo com um colega, você tende a:",
        tipo: "select",
        nome_campo: "estilo_conflito",
        opcoes: [
            "Abordar diretamente e resolver logo",
            "Evitar confronto e esperar que se resolva naturalmente",
            "Buscar mediação de um gestor ou terceiro",
            "Analisar a situação e preparar argumentos antes de abordar",
            "Buscar entender o ponto de vista da outra pessoa primeiro"
        ]
    },
    {
        num: 13,
        secao: "Resolução de Problemas",
        texto: "Diante de um problema inesperado, sua primeira reação é:",
        tipo: "select",
        nome_campo: "reacao_problema",
        opcoes: [
            "\"Vamos resolver isso agora!\" (ação imediata)",
            "\"Deixa eu entender o que aconteceu...\" (análise)",
            "\"Quem pode me ajudar com isso?\" (colaboração)",
            "\"Já passei por isso antes, sei o que fazer\" (experiência)"
        ]
    },

    // MOTIVADORES E VALORES
    {
        num: 14,
        secao: "Motivadores e Valores",
        texto: "O que mais te MOTIVA no trabalho? (escolha até 3)",
        tipo: "checkbox_limitado",
        nome_campo: "motivadores",
        max_selecoes: 3,
        opcoes: [
            "Atingir metas e resultados desafiadores",
            "Reconhecimento e elogios pelo trabalho bem feito",
            "Aprender coisas novas constantemente",
            "Trabalhar com pessoas que eu gosto",
            "Ter autonomia e liberdade para trabalhar do meu jeito",
            "Contribuir para algo maior (propósito)",
            "Estabilidade e previsibilidade",
            "Possibilidade de crescimento e promoção"
        ]
    },
    {
        num: 15,
        secao: "Motivadores e Valores",
        texto: "Complete a frase: 'Eu trabalho melhor quando...'",
        tipo: "texto_longo",
        nome_campo: "trabalho_melhor",
        descricao: "Ex: '...tenho metas claras', '...posso colaborar com o time', '...tenho tempo para fazer com qualidade'"
    },
    {
        num: 16,
        secao: "Motivadores e Valores",
        texto: "Complete a frase: 'Eu me sinto MENOS produtivo(a) quando...'",
        tipo: "texto_longo",
        nome_campo: "menos_produtivo"
    },

    // AUTOAVALIAÇÃO DE ESTILO
    {
        num: 17,
        secao: "Autoavaliação de Estilo",
        texto: "Das características abaixo, quais você mais se identifica? (escolha até 5)",
        tipo: "checkbox_limitado",
        nome_campo: "caracteristicas",
        max_selecoes: 5,
        opcoes: [
            "Competitivo(a)",
            "Detalhista",
            "Comunicativo(a)",
            "Paciente",
            "Decisivo(a)",
            "Cuidadoso(a)",
            "Entusiasta",
            "Consistente",
            "Direto(a)",
            "Analítico(a)",
            "Persuasivo(a)",
            "Leal",
            "Orientado(a) a resultados",
            "Preciso(a)",
            "Sociável",
            "Estável"
        ]
    },
    {
        num: 18,
        secao: "Autoavaliação de Estilo",
        texto: "Se você pudesse mudar UMA COISA na forma como a empresa trabalha para te ajudar a ser mais produtivo(a) e feliz, o que seria?",
        tipo: "texto_longo",
        nome_campo: "mudanca_desejada"
    },

    // PERGUNTAS FINAIS
    {
        num: 19,
        secao: "Perguntas Finais",
        texto: "Você se considera mais orientado(a) para TAREFAS ou para PESSOAS?",
        tipo: "escala_extremos",
        nome_campo: "orientacao_tarefa_pessoa",
        label_min: "Totalmente orientado(a) a tarefas",
        label_max: "Totalmente orientado(a) a pessoas"
    },
    {
        num: 20,
        secao: "Perguntas Finais",
        texto: "Você prefere trabalhar de forma:",
        tipo: "escala_extremos",
        nome_campo: "estilo_trabalho_individual",
        label_min: "Totalmente independente",
        label_max: "Totalmente colaborativa/em equipe"
    },
    {
        num: 21,
        secao: "Perguntas Finais",
        texto: "Comentários adicionais sobre seu estilo de trabalho",
        tipo: "texto_longo",
        nome_campo: "comentarios",
        opcional: true
    }
];

const totalPerguntas = perguntasDISC.length;
let currentQuestion = 1;

// Gerar HTML das perguntas
function gerarPerguntasHTML() {
    const form = document.getElementById('discForm');
    const navegacao = form.querySelector('.form-navigation');
    
    perguntasDISC.forEach(p => {
        const div = document.createElement('div');
        div.className = 'question-slide';
        div.setAttribute('data-question', p.num);
        if (p.num === 1) div.classList.add('active');
        
        let html = `
            <div class="question-number">${p.secao} - Pergunta ${p.num} de ${totalPerguntas}</div>
            <div class="question-text">${p.texto}</div>
        `;
        
        if (p.descricao) {
            html += `<div class="question-description">${p.descricao}</div>`;
        }
        
        const required = p.opcional ? '' : 'required';
        
        if (p.tipo === 'texto_curto') {
            html += `
                <div class="input-group">
                    <input type="text" name="${p.nome_campo}" id="q${p.num}" class="input-text" ${required}>
                </div>
            `;
        } else if (p.tipo === 'select') {
            html += `
                <div class="input-group">
                    <select name="${p.nome_campo}" id="q${p.num}" class="input-select" ${required}>
                        <option value="">Selecione...</option>
                        ${p.opcoes.map(op => `<option value="${op}">${op}</option>`).join('')}
                    </select>
                </div>
            `;
        } else if (p.tipo === 'escala_extremos') {
            html += `
                <div class="scale-container">
                    ${[1,2,3,4,5].map(i => `
                        <div class="scale-item">
                            <input type="radio" name="${p.nome_campo}" id="q${p.num}_${i}" value="${i}" ${required}>
                            <label class="scale-label" for="q${p.num}_${i}">
                                <span class="scale-number">${i}</span>
                                ${i === 1 ? `<span class="scale-text">${p.label_min}</span>` : ''}
                                ${i === 5 ? `<span class="scale-text">${p.label_max}</span>` : ''}
                            </label>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (p.tipo === 'checkbox') {
            html += '<div class="option-group">';
            p.opcoes.forEach((op, idx) => {
                html += `
                    <div class="option-item">
                        <input type="checkbox" name="${p.nome_campo}" id="q${p.num}_${idx}" value="${op}">
                        <label class="option-label" for="q${p.num}_${idx}">${op}</label>
                    </div>
                `;
            });
            html += '</div>';
        } else if (p.tipo === 'checkbox_limitado') {
            html += `<div class="option-group" data-max="${p.max_selecoes}">`;
            p.opcoes.forEach((op, idx) => {
                html += `
                    <div class="option-item">
                        <input type="checkbox" name="${p.nome_campo}" id="q${p.num}_${idx}" value="${op}" class="checkbox-limitado">
                        <label class="option-label" for="q${p.num}_${idx}">${op}</label>
                    </div>
                `;
            });
            html += `</div>`;
            html += `<div class="question-description" style="margin-top: 1rem; color: var(--gray-500);">Máximo ${p.max_selecoes} opções</div>`;
        } else if (p.tipo === 'texto_longo') {
            html += `
                <textarea name="${p.nome_campo}" id="q${p.num}" class="input-textarea" ${required}></textarea>
            `;
        }
        
        div.innerHTML = html;
        form.insertBefore(div, navegacao);
    });
    
    // Adicionar lógica de limite de checkboxes
    setTimeout(() => {
        document.querySelectorAll('.checkbox-limitado').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const container = this.closest('.option-group');
                const max = parseInt(container.getAttribute('data-max'));
                const checked = container.querySelectorAll('.checkbox-limitado:checked').length;
                
                if (checked > max) {
                    this.checked = false;
                    alert(`Você pode selecionar no máximo ${max} opções.`);
                }
            });
        });
    }, 100);
}

function atualizarProgresso() {
    const progresso = (currentQuestion / totalPerguntas) * 100;
    document.getElementById('progressBar').style.width = `${progresso}%`;
}

function mostrarPergunta(num) {
    document.querySelectorAll('.question-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    const pergunta = document.querySelector(`[data-question="${num}"]`);
    if (pergunta) {
        pergunta.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    currentQuestion = num;
    atualizarProgresso();
    atualizarBotoes();
}

function atualizarBotoes() {
    const btnVoltar = document.getElementById('btnVoltar');
    const btnProximo = document.getElementById('btnProximo');
    const btnEnviar = document.getElementById('btnEnviar');
    
    btnVoltar.style.display = currentQuestion > 1 ? 'block' : 'none';
    btnProximo.style.display = currentQuestion < totalPerguntas ? 'block' : 'none';
    btnEnviar.style.display = currentQuestion === totalPerguntas ? 'block' : 'none';
}

function validarPerguntaAtual() {
    const perguntaAtual = document.querySelector(`[data-question="${currentQuestion}"]`);
    const inputs = perguntaAtual.querySelectorAll('input[required], textarea[required], select[required]');
    
    for (let input of inputs) {
        if (input.type === 'radio') {
            const name = input.name;
            const checked = perguntaAtual.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                alert('Por favor, responda esta pergunta antes de continuar.');
                return false;
            }
        } else if (input.tagName === 'SELECT') {
            // Validação específica para SELECT
            if (!input.value || input.value === '') {
                alert('Por favor, selecione uma opção antes de continuar.');
                input.focus();
                return false;
            }
        } else if ((input.type === 'text' || input.tagName === 'TEXTAREA') && !input.value.trim()) {
            alert('Por favor, preencha esta resposta antes de continuar.');
            input.focus();
            return false;
        }
    }
    
    // Validar checkboxes (pelo menos uma deve estar marcada se houver)
    const checkboxGroups = perguntaAtual.querySelectorAll('.option-group');
    for (let group of checkboxGroups) {
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        if (checkboxes.length > 0) {
            const algumMarcado = Array.from(checkboxes).some(cb => cb.checked);
            if (!algumMarcado && !perguntaAtual.querySelector('textarea[name*="comentarios"]')) {
                alert('Por favor, selecione pelo menos uma opção.');
                return false;
            }
        }
    }
    
    return true;
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    gerarPerguntasHTML();
    atualizarProgresso();
    atualizarBotoes();
    
    document.getElementById('btnVoltar').addEventListener('click', () => {
        if (currentQuestion > 1) {
            mostrarPergunta(currentQuestion - 1);
        }
    });
    
    document.getElementById('btnProximo').addEventListener('click', () => {
        if (validarPerguntaAtual() && currentQuestion < totalPerguntas) {
            mostrarPergunta(currentQuestion + 1);
        }
    });
    
    document.getElementById('discForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validarPerguntaAtual()) {
            return;
        }
        
        const formData = new FormData(e.target);
        const respostas = {};
        
        // Processar checkboxes (múltiplas seleções)
        const checkboxes = e.target.querySelectorAll('input[type="checkbox"]:checked');
        const checkboxData = {};
        checkboxes.forEach(cb => {
            if (!checkboxData[cb.name]) {
                checkboxData[cb.name] = [];
            }
            checkboxData[cb.name].push(cb.value);
        });
        
        // Adicionar campos normais
        for (let [key, value] of formData.entries()) {
            if (!key.includes('checkbox')) {
                respostas[key] = value;
            }
        }
        
        // Adicionar checkboxes
        Object.assign(respostas, checkboxData);
        
        if (Storage.salvarDISC(respostas)) {
            alert('✓ Questionário DISC concluído com sucesso!\n\nEssas informações nos ajudarão a criar o melhor ambiente de trabalho para você e potencializar suas forças naturais.');
            window.location.href = 'index.html';
        } else {
            alert('❌ Erro ao salvar respostas. Por favor, tente novamente.');
        }
    });
});
