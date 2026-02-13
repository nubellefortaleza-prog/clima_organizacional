/* ============================================
   STORAGE.JS - Gerenciamento de Dados Locais
   ============================================ */

const Storage = {
    // Salvar resposta de clima
    salvarClima(dados) {
        const timestamp = new Date().toISOString();
        const resposta = {
            timestamp,
            ...dados
        };
        
        const respostas = this.getClima();
        respostas.push(resposta);
        localStorage.setItem('respostas_clima', JSON.stringify(respostas));
        localStorage.setItem('clima_completed', 'true');
        return true;
    },

    // Obter respostas de clima
    getClima() {
        return JSON.parse(localStorage.getItem('respostas_clima') || '[]');
    },

    // Salvar autoavaliação
    salvarAutoavaliacao(dados) {
        const timestamp = new Date().toISOString();
        const resposta = {
            timestamp,
            ...dados
        };
        
        const respostas = this.getAutoavaliacoes();
        respostas.push(resposta);
        localStorage.setItem('autoavaliacoes', JSON.stringify(respostas));
        localStorage.setItem('autoavaliacao_completed', 'true');
        return true;
    },

    // Obter autoavaliações
    getAutoavaliacoes() {
        return JSON.parse(localStorage.getItem('autoavaliacoes') || '[]');
    },

    // Salvar avaliação 360
    salvarAvaliacao360(dados) {
        const timestamp = new Date().toISOString();
        const resposta = {
            timestamp,
            ...dados
        };
        
        const respostas = this.getAvaliacoes360();
        respostas.push(resposta);
        localStorage.setItem('avaliacoes_360', JSON.stringify(respostas));
        return true;
    },

    // Obter avaliações 360
    getAvaliacoes360() {
        return JSON.parse(localStorage.getItem('avaliacoes_360') || '[]');
    },

    // Salvar respostas DISC
    salvarDISC(dados) {
        const timestamp = new Date().toISOString();
        const resposta = {
            timestamp,
            ...dados
        };
        
        const respostas = this.getDISC();
        respostas.push(resposta);
        localStorage.setItem('respostas_disc', JSON.stringify(respostas));
        localStorage.setItem('disc_completed', 'true');
        return true;
    },

    // Obter respostas DISC
    getDISC() {
        return JSON.parse(localStorage.getItem('respostas_disc') || '[]');
    },

    // Exportar todos os dados
    exportarTodos() {
        return {
            exportado_em: new Date().toISOString(),
            clima: this.getClima(),
            autoavaliacoes: this.getAutoavaliacoes(),
            avaliacoes_360: this.getAvaliacoes360(),
            disc: this.getDISC()
        };
    },

    // Limpar todos os dados
    limparTodos() {
        if (confirm('⚠️ Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita!')) {
            localStorage.clear();
            alert('✓ Todos os dados foram limpos!');
            window.location.href = 'index.html';
        }
    },

    // Importar dados de arquivo JSON
    importarDados(jsonData) {
        try {
            const dados = JSON.parse(jsonData);
            
            if (dados.clima) {
                localStorage.setItem('respostas_clima', JSON.stringify(dados.clima));
            }
            if (dados.autoavaliacoes) {
                localStorage.setItem('autoavaliacoes', JSON.stringify(dados.autoavaliacoes));
            }
            if (dados.avaliacoes_360) {
                localStorage.setItem('avaliacoes_360', JSON.stringify(dados.avaliacoes_360));
            }
            if (dados.disc) {
                localStorage.setItem('respostas_disc', JSON.stringify(dados.disc));
            }
            
            return true;
        } catch (e) {
            console.error('Erro ao importar dados:', e);
            return false;
        }
    }
};

// Exportar para uso global
window.Storage = Storage;
