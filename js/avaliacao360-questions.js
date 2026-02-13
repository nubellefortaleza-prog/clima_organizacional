// Lista dos 11 colaboradores
const colaboradores = [
    "Danisio (Gestor Geral)",
    "Luana (Supervisora de Vendas)",
    "Eduarda (Consultora)",
    "Ana Carla (Consultora)",
    "Janes (Recepção)",
    "Regiane (Serviços Gerais)",
    "Dra. Cristiane (Corpo Clínico)",
    "Dr. Rafael (Corpo Clínico)",
    "Dra. Carla (Corpo Clínico)",
    "Dra. Luana (Corpo Clínico)",
    "Dr. Kaio (Corpo Clínico)"
];

// Perguntas da Avaliação 360º
const perguntas360 = [
    // IDENTIFICAÇÃO
    {
        num: 1,
        secao: "Identificação",
        texto: "Seu nome completo (quem está avaliando)",
        tipo: "texto_curto",
        nome_campo: "avaliador"
    },
    {
        num: 2,
        secao: "Identificação",
        texto: "Quem você está avaliando?",
        tipo: "select_colaborador",
        nome_campo: "avaliado",
        descricao: "⭐ IMPORTANTE: Selecione a pessoa que você vai avaliar neste formulário"
    },
    {
        num: 3,
        secao: "Identificação",
        texto: "Qual seu tipo de relação com esta pessoa?",
        tipo: "select",
        nome_campo: "relacao",
        opcoes: [
            "Sou gestor(a) direto(a) desta pessoa",
            "Sou colega de mesma função (par)",
            "Sou subordinado(a) desta pessoa",
            "Trabalho com ela, mas em função diferente"
        ]
    },

    // COMPETÊNCIAS (8 competências)
    {
        num: 4,
        secao: "Competências",
        texto: "Comunicação clara e respeitosa",
        tipo: "escala_competencia",
        nome_campo: "comp_comunicacao",
        descricao: "Se expressa bem, ouve ativamente, é respeitoso(a)"
    },
    {
        num: 5,
        secao: "Competências",
        texto: "Colaboração e espírito de equipe",
        tipo: "escala_competencia",
        nome_campo: "comp_colaboracao",
        descricao: "Ajuda colegas, compartilha conhecimento, trabalha bem em grupo"
    },
    {
        num: 6,
        secao: "Competências",
        texto: "Responsabilidade (cumpre combinados e prazos)",
        tipo: "escala_competencia",
        nome_campo: "comp_responsabilidade",
        descricao: "É confiável, entrega o que promete, assume suas responsabilidades"
    },
    {
        num: 7,
        secao: "Competências",
        texto: "Proatividade (resolve sem empurrar problemas)",
        tipo: "escala_competencia",
        nome_campo: "comp_proatividade",
        descricao: "Toma iniciativa, busca soluções, não só aponta problemas"
    },
    {
        num: 8,
        secao: "Competências",
        texto: "Organização e confiabilidade",
        tipo: "escala_competencia",
        nome_campo: "comp_organizacao",
        descricao: "É organizado(a), você pode confiar que as coisas serão feitas bem"
    },
    {
        num: 9,
        secao: "Competências",
        texto: "Postura profissional com pacientes",
        tipo: "escala_competencia",
        nome_campo: "comp_postura",
        descricao: "Trata pacientes com excelência, representa bem a clínica"
    },
    {
        num: 10,
        secao: "Competências",
        texto: "Maturidade sob pressão (resiliência e flexibilidade)",
        tipo: "escala_competencia",
        nome_campo: "comp_maturidade",
        descricao: "Mantém qualidade e postura mesmo em momentos difíceis"
    },
    {
        num: 11,
        secao: "Competências",
        texto: "Aderência a processos (prontuários, scripts, checklists)",
        tipo: "escala_competencia",
        nome_campo: "comp_processos",
        descricao: "Segue procedimentos estabelecidos, mantém padrão de qualidade"
    },

    // PERGUNTAS QUALITATIVAS
    {
        num: 12,
        secao: "Feedback Qualitativo",
        texto: "Uma coisa que esta pessoa faz EXCEPCIONALMENTE BEM e deveria continuar é...",
        tipo: "texto_longo",
        nome_campo: "ponto_forte",
        descricao: "Seja específico(a). Dê exemplos de comportamentos ou situações concretas."
    },
    {
        num: 13,
        secao: "Feedback Qualitativo",
        texto: "Se esta pessoa melhorar em [comportamento/habilidade específica], o impacto positivo no time seria...",
        tipo: "texto_longo",
        nome_campo: "oportunidade_melhoria",
        descricao: "Seja construtivo(a). Foque em comportamentos observáveis. Ex: 'Se comunicasse decisões com mais antecedência, o time conseguiria se planejar melhor'"
    },
    {
        num: 14,
        secao: "Feedback Qualitativo",
        texto: "Em uma escala de 0 a 10, o quanto você confiaria nesta pessoa para representar a clínica em uma situação crítica?",
        tipo: "escala_0_10",
        nome_campo: "score_confianca",
        descricao: "Ex: cliente insatisfeito, emergência, decisão importante"
    },
    {
        num: 15,
        secao: "Feedback Qualitativo",
        texto: "Por que você deu essa nota? (justifique sua resposta acima)",
        tipo: "texto_longo",
        nome_campo: "justificativa_confianca",
        descricao: "Explique o que fundamenta sua confiança (ou falta dela)"
    },

    // FEEDBACK PARA LÍDERES (condicional)
    {
        num: 16,
        secao: "Avaliação de Liderança",
        texto: "Como gestor(a), esta pessoa dá feedbacks úteis e construtivos com frequência adequada",
        tipo: "escala",
        nome_campo: "lider_feedbacks",
        condicional: true,
        mostrar_se: "Sou subordinado(a) desta pessoa"
    },
    {
        num: 17,
        secao: "Avaliação de Liderança",
        texto: "Como gestor(a), esta pessoa me apoia no meu desenvolvimento profissional",
        tipo: "escala",
        nome_campo: "lider_desenvolvimento",
        condicional: true,
        mostrar_se: "Sou subordinado(a) desta pessoa"
    },
    {
        num: 18,
        secao: "Avaliação de Liderança",
        texto: "Como gestor(a), esta pessoa comunica expectativas e direcionamentos de forma clara",
        tipo: "escala",
        nome_campo: "lider_clareza",
        condicional: true,
        mostrar_se: "Sou subordinado(a) desta pessoa"
    },
    {
        num: 19,
        secao: "Avaliação de Liderança",
        texto: "O que seu(sua) gestor(a) deveria CONTINUAR FAZENDO?",
        tipo: "texto_longo",
        nome_campo: "lider_continuar",
        condicional: true,
        mostrar_se: "Sou subordinado(a) desta pessoa"
    },
    {
        num: 20,
        secao: "Avaliação de Liderança",
        texto: "O que seu(sua) gestor(a) deveria COMEÇAR A FAZER ou FAZER DIFERENTE?",
        tipo: "texto_longo",
        nome_campo: "lider_melhorar",
        condicional: true,
        mostrar_se: "Sou subordinado(a) desta pessoa"
    },

    // COMENTÁRIOS FINAIS
    {
        num: 21,
        secao: "Comentários Finais",
        texto: "Comentários adicionais sobre a pessoa que você avaliou (opcional)",
        tipo: "texto_longo",
        nome_campo: "comentarios",
        opcional: true
    }
];

let currentQuestion = 1;
let totalPerguntas = 15; // Será recalculado dinamicamente
let relacaoSelecionada = "";

// Gerar HTML das perguntas
function gerarPerguntasHTML() {
    const form = document.getElementById('avaliacao360Form');
    const navegacao = form.querySelector('.form-navigation');
    
    perguntas360.forEach(p => {
        // Pular perguntas condicionais por enquanto
        if (p.condicional) return;
        
        const div = document.createElement('div');
        div.className = 'question-slide';
        div.setAttribute('data-question', p.num);
        div.setAttribute('data-condicional', p.condicional || false);
        if (p.num === 1) div.classList.add('active');
        
        let html = `
            <div class="question-number">${p.secao} - Pergunta ${p.num} de 21</div>
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
        } else if (p.tipo === 'select_colaborador') {
            html += `
                <div class="input-group">
                    <select name="${p.nome_campo}" id="q${p.num}" class="input-select" ${required}>
                        <option value="">Selecione a pessoa...</option>
                        ${colaboradores.map(col => `<option value="${col}">${col}</option>`).join('')}
                    </select>
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
        } else if (p.tipo === 'escala_competencia') {
            html += `
                <div class="scale-container">
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_1" value="1" ${required}>
                        <label class="scale-label" for="q${p.num}_1">
                            <span class="scale-number">1</span>
                            <span class="scale-text">Precisa desenvolver</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_2" value="2">
                        <label class="scale-label" for="q${p.num}_2">
                            <span class="scale-number">2</span>
                            <span class="scale-text">Abaixo</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_3" value="3">
                        <label class="scale-label" for="q${p.num}_3">
                            <span class="scale-number">3</span>
                            <span class="scale-text">Atende</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_4" value="4">
                        <label class="scale-label" for="q${p.num}_4">
                            <span class="scale-number">4</span>
                            <span class="scale-text">Acima</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_5" value="5">
                        <label class="scale-label" for="q${p.num}_5">
                            <span class="scale-number">5</span>
                            <span class="scale-text">Referência</span>
                        </label>
                    </div>
                </div>
            `;
        } else if (p.tipo === 'escala') {
            html += `
                <div class="scale-container">
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_1" value="1" ${required}>
                        <label class="scale-label" for="q${p.num}_1">
                            <span class="scale-number">1</span>
                            <span class="scale-text">Discordo</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_2" value="2">
                        <label class="scale-label" for="q${p.num}_2">
                            <span class="scale-number">2</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_3" value="3">
                        <label class="scale-label" for="q${p.num}_3">
                            <span class="scale-number">3</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_4" value="4">
                        <label class="scale-label" for="q${p.num}_4">
                            <span class="scale-number">4</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_5" value="5">
                        <label class="scale-label" for="q${p.num}_5">
                            <span class="scale-number">5</span>
                            <span class="scale-text">Concordo</span>
                        </label>
                    </div>
                </div>
            `;
        } else if (p.tipo === 'escala_0_10') {
            html += '<div class="scale-container">';
            for (let i = 0; i <= 10; i++) {
                const label = i === 0 ? 'Nenhuma confiança' : (i === 10 ? 'Confiança total' : '');
                html += `
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_${i}" value="${i}" ${required}>
                        <label class="scale-label" for="q${p.num}_${i}">
                            <span class="scale-number">${i}</span>
                            ${label ? `<span class="scale-text">${label}</span>` : ''}
                        </label>
                    </div>
                `;
            }
            html += '</div>';
        } else if (p.tipo === 'texto_longo') {
            html += `
                <textarea name="${p.nome_campo}" id="q${p.num}" class="input-textarea" ${required}></textarea>
            `;
        }
        
        div.innerHTML = html;
        form.insertBefore(div, navegacao);
    });
    
    // Adicionar listener para detectar mudança de relação
    setTimeout(() => {
        const selectRelacao = document.getElementById('q3');
        if (selectRelacao) {
            selectRelacao.addEventListener('change', (e) => {
                relacaoSelecionada = e.target.value;
                atualizarPerguntasCondicionais();
            });
        }
    }, 100);
}

function atualizarPerguntasCondicionais() {
    const form = document.getElementById('avaliacao360Form');
    const navegacao = form.querySelector('.form-navigation');
    
    // Remover perguntas condicionais existentes
    document.querySelectorAll('[data-condicional="true"]').forEach(el => el.remove());
    
    // Se for subordinado, adicionar perguntas de liderança
    if (relacaoSelecionada === "Sou subordinado(a) desta pessoa") {
        perguntas360.filter(p => p.condicional).forEach(p => {
            const div = document.createElement('div');
            div.className = 'question-slide';
            div.setAttribute('data-question', p.num);
            div.setAttribute('data-condicional', 'true');
            
            let html = `
                <div class="question-number">${p.secao} - Pergunta ${p.num} de 21</div>
                <div class="question-text">${p.texto}</div>
            `;
            
            if (p.descricao) {
                html += `<div class="question-description">${p.descricao}</div>`;
            }
            
            if (p.tipo === 'escala') {
                html += `
                    <div class="scale-container">
                        ${[1,2,3,4,5].map(i => `
                            <div class="scale-item">
                                <input type="radio" name="${p.nome_campo}" id="q${p.num}_${i}" value="${i}" required>
                                <label class="scale-label" for="q${p.num}_${i}">
                                    <span class="scale-number">${i}</span>
                                    ${i === 1 ? '<span class="scale-text">Discordo</span>' : ''}
                                    ${i === 5 ? '<span class="scale-text">Concordo</span>' : ''}
                                </label>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else if (p.tipo === 'texto_longo') {
                html += `<textarea name="${p.nome_campo}" id="q${p.num}" class="input-textarea" required></textarea>`;
            }
            
            div.innerHTML = html;
            form.insertBefore(div, navegacao);
        });
        totalPerguntas = 21;
    } else {
        totalPerguntas = 15;
    }
}

function atualizarProgresso() {
    const todasPerguntas = document.querySelectorAll('.question-slide');
    const total = todasPerguntas.length;
    const progresso = (currentQuestion / total) * 100;
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
    // Pegar perguntas que existem no DOM
    const todasPerguntas = Array.from(document.querySelectorAll('.question-slide'));
    
    // Extrair números de pergunta e ordenar
    const numeros = todasPerguntas
        .map(p => parseInt(p.getAttribute('data-question')))
        .filter(n => !isNaN(n))
        .sort((a, b) => a - b);
    
    const ultimaPergunta = numeros[numeros.length - 1];
    const currentIndex = numeros.indexOf(currentQuestion);
    const isUltima = (currentIndex === numeros.length - 1);
    
    const btnVoltar = document.getElementById('btnVoltar');
    const btnProximo = document.getElementById('btnProximo');
    const btnEnviar = document.getElementById('btnEnviar');
    
    btnVoltar.style.display = currentQuestion > 1 ? 'block' : 'none';
    btnProximo.style.display = !isUltima ? 'block' : 'none';
    btnEnviar.style.display = isUltima ? 'block' : 'none';
}

function validarPerguntaAtual() {
    const perguntaAtual = document.querySelector(`[data-question="${currentQuestion}"]`);
    if (!perguntaAtual) return true;
    
    const inputs = perguntaAtual.querySelectorAll('input[required], textarea[required], select[required]');
    
    for (let input of inputs) {
        if (input.type === 'radio') {
            const name = input.name;
            const checked = perguntaAtual.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                alert('Por favor, responda esta pergunta antes de continuar.');
                return false;
            }
        } else if ((input.type === 'text' || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') && !input.value.trim()) {
            alert('Por favor, preencha esta resposta antes de continuar.');
            input.focus();
            return false;
        }
    }
    return true;
}

function proximaPerguntaVisivel() {
    const todasPerguntas = Array.from(document.querySelectorAll('.question-slide'));
    const numeros = todasPerguntas.map(p => parseInt(p.getAttribute('data-question'))).sort((a,b) => a-b);
    const currentIndex = numeros.indexOf(currentQuestion);
    
    if (currentIndex < numeros.length - 1) {
        return numeros[currentIndex + 1];
    }
    return currentQuestion;
}

function perguntaAnteriorVisivel() {
    const todasPerguntas = Array.from(document.querySelectorAll('.question-slide'));
    const numeros = todasPerguntas.map(p => parseInt(p.getAttribute('data-question'))).sort((a,b) => a-b);
    const currentIndex = numeros.indexOf(currentQuestion);
    
    if (currentIndex > 0) {
        return numeros[currentIndex - 1];
    }
    return currentQuestion;
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    gerarPerguntasHTML();
    atualizarProgresso();
    atualizarBotoes();
    
    document.getElementById('btnVoltar').addEventListener('click', () => {
        const anterior = perguntaAnteriorVisivel();
        if (anterior !== currentQuestion) {
            mostrarPergunta(anterior);
        }
    });
    
    document.getElementById('btnProximo').addEventListener('click', () => {
        if (validarPerguntaAtual()) {
            const proximo = proximaPerguntaVisivel();
            if (proximo !== currentQuestion) {
                mostrarPergunta(proximo);
            }
        }
    });
    
    document.getElementById('avaliacao360Form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validarPerguntaAtual()) {
            return;
        }
        
        const formData = new FormData(e.target);
        const respostas = {};
        
        for (let [key, value] of formData.entries()) {
            respostas[key] = value;
        }
        
        if (Storage.salvarAvaliacao360(respostas)) {
            const avaliado = respostas.avaliado;
            alert(`✓ Avaliação de ${avaliado} concluída com sucesso!\n\nVocê ainda precisa avaliar outras pessoas? Clique no link novamente para preencher uma nova avaliação.`);
            window.location.href = 'index.html';
        } else {
            alert('❌ Erro ao salvar respostas. Por favor, tente novamente.');
        }
    });
});
