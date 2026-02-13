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

// Perguntas da Autoavaliação de Performance
const perguntasAutoavaliacao = [
    // SEÇÃO 1: IDENTIFICAÇÃO
    {
        num: 1,
        secao: "Identificação",
        texto: "Selecione seu nome",
        tipo: "select_colaborador",
        nome_campo: "nome",
        descricao: "Escolha seu nome na lista abaixo"
    },
    {
        num: 2,
        secao: "Identificação",
        texto: "Sua função/cargo",
        tipo: "select",
        nome_campo: "cargo",
        opcoes: [
            "Recepcionista",
            "Consultora de Vendas",
            "Injetor(a)/Profissional Técnico",
            "Coordenador(a)",
            "Gerente",
            "Outro"
        ]
    },
    {
        num: 3,
        secao: "Identificação",
        texto: "Nome do seu gestor direto",
        tipo: "texto_curto",
        nome_campo: "gestor"
    },

    // SEÇÃO 2: RESULTADOS E METAS
    {
        num: 4,
        secao: "Resultados e Metas",
        texto: "De forma geral, avalio que atingi minhas metas e KPIs estabelecidos",
        tipo: "escala_desempenho",
        nome_campo: "meta_geral"
    },
    {
        num: 5,
        secao: "Resultados e Metas",
        texto: "Liste 2-3 resultados concretos que você alcançou no período avaliado",
        tipo: "texto_longo",
        nome_campo: "resultados_alcancados",
        descricao: "Seja específico. Ex: 'Aumentei minha taxa de conversão de 45% para 62%'"
    },
    {
        num: 6,
        secao: "Resultados e Metas",
        texto: "Quais metas você NÃO conseguiu atingir e por quê?",
        tipo: "texto_longo",
        nome_campo: "metas_nao_atingidas",
        descricao: "Reflita sobre os obstáculos e aprendizados"
    },

    // SEÇÃO 3: COMPETÊNCIAS (versão universal)
    {
        num: 7,
        secao: "Competências",
        texto: "Domínio técnico e qualidade do meu trabalho",
        tipo: "escala",
        nome_campo: "competencia_tecnica",
        descricao: "Quanto você domina as habilidades técnicas da sua função"
    },
    {
        num: 8,
        secao: "Competências",
        texto: "Organização e atenção aos detalhes",
        tipo: "escala",
        nome_campo: "competencia_organizacao",
        descricao: "Sou organizado(a) e evito erros/retrabalho"
    },
    {
        num: 9,
        secao: "Competências",
        texto: "Comunicação clara com colegas e clientes",
        tipo: "escala",
        nome_campo: "competencia_comunicacao",
        descricao: "Me comunico de forma eficaz e empática"
    },
    {
        num: 10,
        secao: "Competências",
        texto: "Capacidade de resolver problemas de forma autônoma",
        tipo: "escala",
        nome_campo: "competencia_autonomia",
        descricao: "Busco soluções sem depender sempre de outros"
    },

    // SEÇÃO 4: COMPORTAMENTOS
    {
        num: 11,
        secao: "Comportamento e Atitude",
        texto: "Responsabilidade (cumpro prazos e combinados)",
        tipo: "escala",
        nome_campo: "comportamento_responsabilidade"
    },
    {
        num: 12,
        secao: "Comportamento e Atitude",
        texto: "Proatividade (busco soluções, não apenas aponto problemas)",
        tipo: "escala",
        nome_campo: "comportamento_proatividade"
    },
    {
        num: 13,
        secao: "Comportamento e Atitude",
        texto: "Colaboração (trabalho bem em equipe, ajudo colegas)",
        tipo: "escala",
        nome_campo: "comportamento_colaboracao"
    },
    {
        num: 14,
        secao: "Comportamento e Atitude",
        texto: "Maturidade sob pressão (mantenho qualidade mesmo em momentos desafiadores)",
        tipo: "escala",
        nome_campo: "comportamento_pressao"
    },
    {
        num: 15,
        secao: "Comportamento e Atitude",
        texto: "Aderência a processos (sigo checklists, scripts, procedimentos)",
        tipo: "escala",
        nome_campo: "comportamento_processos"
    },

    // SEÇÃO 5: AUTOCONHECIMENTO
    {
        num: 16,
        secao: "Autoconhecimento e Desenvolvimento",
        texto: "Quais são seus 3 principais PONTOS FORTES?",
        tipo: "texto_longo",
        nome_campo: "pontos_fortes"
    },
    {
        num: 17,
        secao: "Autoconhecimento e Desenvolvimento",
        texto: "Quais são as 3 principais áreas que você precisa DESENVOLVER?",
        tipo: "texto_longo",
        nome_campo: "areas_desenvolver"
    },
    {
        num: 18,
        secao: "Autoconhecimento e Desenvolvimento",
        texto: "O que você precisa da empresa/liderança para melhorar seu desempenho?",
        tipo: "texto_longo",
        nome_campo: "necessidades",
        descricao: "Ex: mais treinamento, ferramentas, feedback, clareza de expectativas"
    },
    {
        num: 19,
        secao: "Autoconhecimento e Desenvolvimento",
        texto: "Quais são suas metas profissionais para os próximos 6-12 meses?",
        tipo: "texto_longo",
        nome_campo: "metas_futuras"
    },
    {
        num: 20,
        secao: "Autoconhecimento e Desenvolvimento",
        texto: "Comentários adicionais sobre sua performance",
        tipo: "texto_longo",
        nome_campo: "comentarios",
        opcional: true
    }
];

const totalPerguntas = perguntasAutoavaliacao.length;
let currentQuestion = 1;

// Gerar HTML das perguntas
function gerarPerguntasHTML() {
    const form = document.getElementById('autoavaliacaoForm');
    const navegacao = form.querySelector('.form-navigation');
    
    perguntasAutoavaliacao.forEach(p => {
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
        } else if (p.tipo === 'select_colaborador') {
            html += `
                <div class="input-group">
                    <select name="${p.nome_campo}" id="q${p.num}" class="input-select" ${required}>
                        <option value="">Selecione seu nome...</option>
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
        } else if (p.tipo === 'escala_desempenho') {
            html += `
                <div class="scale-container">
                    <div class="scale-item">
                        <input type="radio" name="${p.nome_campo}" id="q${p.num}_1" value="1" ${required}>
                        <label class="scale-label" for="q${p.num}_1">
                            <span class="scale-number">1</span>
                            <span class="scale-text">Muito abaixo</span>
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
                            <span class="scale-text">Superou</span>
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
        } else if (p.tipo === 'texto_longo') {
            html += `
                <textarea name="${p.nome_campo}" id="q${p.num}" class="input-textarea" ${required}></textarea>
            `;
        }
        
        div.innerHTML = html;
        form.insertBefore(div, navegacao);
    });
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
        } else if ((input.type === 'text' || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') && !input.value.trim()) {
            alert('Por favor, preencha esta resposta antes de continuar.');
            input.focus();
            return false;
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
    
    document.getElementById('autoavaliacaoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validarPerguntaAtual()) {
            return;
        }
        
        const formData = new FormData(e.target);
        const respostas = {};
        
        for (let [key, value] of formData.entries()) {
            respostas[key] = value;
        }
        
        if (Storage.salvarAutoavaliacao(respostas)) {
            alert('✓ Autoavaliação concluída com sucesso!\n\nSeu gestor utilizará estas informações para construir um plano de desenvolvimento personalizado com você.');
            window.location.href = 'index.html';
        } else {
            alert('❌ Erro ao salvar respostas. Por favor, tente novamente.');
        }
    });
});
