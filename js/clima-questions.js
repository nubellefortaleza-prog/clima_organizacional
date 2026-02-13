// Perguntas do formulário de clima (3-18)
const perguntasClima = [
    {
        num: 3,
        texto: "Tenho clareza sobre o que é esperado de mim no trabalho",
        tipo: "escala"
    },
    {
        num: 4,
        texto: "Tenho os recursos e ferramentas necessários para executar bem meu trabalho",
        tipo: "escala"
    },
    {
        num: 5,
        texto: "Minha carga de trabalho é equilibrada e viável",
        tipo: "escala"
    },
    {
        num: 6,
        texto: "A liderança comunica direcionamentos de forma clara",
        tipo: "escala"
    },
    {
        num: 7,
        texto: "Recebo feedbacks construtivos com frequência adequada",
        tipo: "escala"
    },
    {
        num: 8,
        texto: "Sinto que sou tratado(a) com respeito e consideração",
        tipo: "escala"
    },
    {
        num: 9,
        texto: "Existe colaboração genuína entre os membros da equipe",
        tipo: "escala"
    },
    {
        num: 10,
        texto: "Conflitos são resolvidos de forma justa e transparente",
        tipo: "escala"
    },
    {
        num: 11,
        texto: "Sinto segurança para expressar opiniões e preocupações sem medo de retaliação",
        tipo: "escala"
    },
    {
        num: 12,
        texto: "Meu trabalho é reconhecido quando faço bem",
        tipo: "escala"
    },
    {
        num: 13,
        texto: "Vejo oportunidades reais de crescimento profissional aqui",
        tipo: "escala"
    },
    {
        num: 14,
        texto: "As políticas e regras são aplicadas de forma consistente para todos",
        tipo: "escala"
    },
    {
        num: 15,
        texto: "De 0 a 10, o quanto você recomendaria trabalhar aqui para um amigo ou conhecido?",
        tipo: "escala_0_10",
        descricao: "Esta é a pergunta eNPS (Employee Net Promoter Score)"
    },
    {
        num: 16,
        texto: "O que devemos CONTINUAR FAZENDO? (principais forças da empresa)",
        tipo: "texto_longo",
        descricao: "Seja específico(a). Exemplos concretos ajudam muito!"
    },
    {
        num: 17,
        texto: "O que devemos MELHORAR URGENTEMENTE?",
        tipo: "texto_longo",
        descricao: "Seja específico(a) e construtivo(a). Queremos sua opinião sincera!"
    },
    {
        num: 18,
        texto: "Comentários adicionais (opcional)",
        tipo: "texto_longo",
        descricao: "Use este espaço para qualquer outro feedback, sugestão ou preocupação.",
        opcional: true
    }
];

// Gerar HTML das perguntas dinamicamente
function gerarPerguntasHTML() {
    const form = document.getElementById('climaForm');
    const navegacao = form.querySelector('.form-navigation');
    
    perguntasClima.forEach(p => {
        const div = document.createElement('div');
        div.className = 'question-slide';
        div.setAttribute('data-question', p.num);
        
        let html = `
            <div class="question-number">Pergunta ${p.num} de 18</div>
            <div class="question-text">${p.texto}</div>
        `;
        
        if (p.descricao) {
            html += `<div class="question-description">${p.descricao}</div>`;
        }
        
        if (p.tipo === 'escala') {
            html += `
                <div class="scale-container">
                    <div class="scale-item">
                        <input type="radio" name="q${p.num}" id="q${p.num}_1" value="1" ${p.opcional ? '' : 'required'}>
                        <label class="scale-label" for="q${p.num}_1">
                            <span class="scale-number">1</span>
                            <span class="scale-text">Discordo totalmente</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="q${p.num}" id="q${p.num}_2" value="2">
                        <label class="scale-label" for="q${p.num}_2">
                            <span class="scale-number">2</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="q${p.num}" id="q${p.num}_3" value="3">
                        <label class="scale-label" for="q${p.num}_3">
                            <span class="scale-number">3</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="q${p.num}" id="q${p.num}_4" value="4">
                        <label class="scale-label" for="q${p.num}_4">
                            <span class="scale-number">4</span>
                        </label>
                    </div>
                    <div class="scale-item">
                        <input type="radio" name="q${p.num}" id="q${p.num}_5" value="5">
                        <label class="scale-label" for="q${p.num}_5">
                            <span class="scale-number">5</span>
                            <span class="scale-text">Concordo totalmente</span>
                        </label>
                    </div>
                </div>
            `;
        } else if (p.tipo === 'escala_0_10') {
            html += '<div class="scale-container">';
            for (let i = 0; i <= 10; i++) {
                const label = i === 0 ? 'Não recomendaria' : (i === 10 ? 'Recomendaria totalmente' : '');
                html += `
                    <div class="scale-item">
                        <input type="radio" name="q${p.num}" id="q${p.num}_${i}" value="${i}" ${p.opcional ? '' : 'required'}>
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
                <textarea name="q${p.num}" id="q${p.num}" class="input-textarea" ${p.opcional ? '' : 'required'}></textarea>
            `;
        }
        
        div.innerHTML = html;
        form.insertBefore(div, navegacao);
    });
}

// Sistema de navegação
let currentQuestion = 1;
const totalQuestions = 18;

function atualizarProgresso() {
    const progresso = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = `${progresso}%`;
}

function mostrarPergunta(num) {
    document.querySelectorAll('.question-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    const pergunta = document.querySelector(`[data-question="${num}"]`);
    if (pergunta) {
        pergunta.classList.add('active');
        pergunta.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    btnProximo.style.display = currentQuestion < totalQuestions ? 'block' : 'none';
    btnEnviar.style.display = currentQuestion === totalQuestions ? 'block' : 'none';
}

function validarPerguntaAtual() {
    const perguntaAtual = document.querySelector(`[data-question="${currentQuestion}"]`);
    const inputs = perguntaAtual.querySelectorAll('input[required], textarea[required]');
    
    for (let input of inputs) {
        if (input.type === 'radio') {
            const name = input.name;
            const checked = perguntaAtual.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                alert('Por favor, responda esta pergunta antes de continuar.');
                return false;
            }
        } else if (input.type === 'textarea' && !input.value.trim()) {
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
        if (validarPerguntaAtual() && currentQuestion < totalQuestions) {
            mostrarPergunta(currentQuestion + 1);
        }
    });
    
    document.getElementById('climaForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validarPerguntaAtual()) {
            return;
        }
        
        // Coletar todas as respostas
        const formData = new FormData(e.target);
        const respostas = {};
        
        for (let [key, value] of formData.entries()) {
            respostas[key] = value;
        }
        
        // Salvar no localStorage
        if (Storage.salvarClima(respostas)) {
            alert('✓ Pesquisa de Clima concluída com sucesso!\n\nObrigado pela sua participação!');
            window.location.href = 'index.html';
        } else {
            alert('❌ Erro ao salvar respostas. Por favor, tente novamente.');
        }
    });
});
