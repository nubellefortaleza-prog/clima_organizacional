/* ============================================
   AUTH.JS - Sistema de Autenticação Simples
   ============================================ */

// ⚙️ CONFIGURAÇÃO - ALTERE A SENHA AQUI
const SENHA_ADMIN = 'admin123';

// Chave para armazenar sessão
const AUTH_KEY = 'sistema_avaliacao_admin_logado';
const AUTH_TIMESTAMP = 'sistema_avaliacao_admin_timestamp';

// Tempo de expiração da sessão (8 horas em milissegundos)
const TEMPO_EXPIRACAO = 8 * 60 * 60 * 1000;

// ============================================
// FUNÇÕES DE AUTENTICAÇÃO
// ============================================

function verificarLogin() {
    const logado = localStorage.getItem(AUTH_KEY);
    const timestamp = localStorage.getItem(AUTH_TIMESTAMP);
    
    if (!logado || !timestamp) {
        return false;
    }
    
    const tempoDecorrido = Date.now() - parseInt(timestamp);
    
    if (tempoDecorrido > TEMPO_EXPIRACAO) {
        // Sessão expirada
        logout();
        return false;
    }
    
    return true;
}

function fazerLogin(senha) {
    if (senha === SENHA_ADMIN) {
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(AUTH_TIMESTAMP, Date.now().toString());
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_TIMESTAMP);
}

// ============================================
// PROTEÇÃO DE PÁGINAS ADMINISTRATIVAS
// ============================================

function protegerPaginaAdministrativa() {
    if (!verificarLogin()) {
        // Redirecionar para login
        window.location.href = 'login.html';
    }
}

// ============================================
// PÁGINA DE LOGIN
// ============================================

if (document.getElementById('loginForm')) {
    // Verificar se já está logado
    if (verificarLogin()) {
        // Já está logado, redirecionar para dashboard
        const urlParams = new URLSearchParams(window.location.search);
        const destino = urlParams.get('redirect') || 'dashboard.html';
        window.location.href = destino;
    }
    
    // Event listener do formulário de login
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const senha = document.getElementById('senha').value;
        const erroContainer = document.getElementById('erro-container');
        
        if (fazerLogin(senha)) {
            // Login bem-sucedido
            const urlParams = new URLSearchParams(window.location.search);
            const destino = urlParams.get('redirect') || 'dashboard.html';
            window.location.href = destino;
        } else {
            // Senha incorreta
            erroContainer.style.display = 'block';
            document.getElementById('senha').value = '';
            document.getElementById('senha').focus();
            
            // Esconder erro após 3 segundos
            setTimeout(() => {
                erroContainer.style.display = 'none';
            }, 3000);
        }
    });
}
