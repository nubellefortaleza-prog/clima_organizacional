# 🚀 Sistema de Avaliação Organizacional - Web

Sistema completo de avaliação de desempenho, clima organizacional e perfil DISC.

## 📦 O que está incluído

- ✅ Pesquisa de Clima Organizacional (18 perguntas)
- ✅ Autoavaliação de Performance
- ✅ Avaliação 360º (com dropdown de colaboradores)
- ✅ Questionário DISC
- ✅ Dashboard de Análise
- ✅ Geração de Relatórios
- ✅ Exportação de dados (JSON/Excel)

## 🎯 Como Usar

### OPÇÃO 1: Usar Localmente (Mais Simples)

1. Baixe todos os arquivos
2. Abra o arquivo `index.html` no navegador
3. Pronto! O sistema está funcionando

**Não precisa instalar NADA!**

### OPÇÃO 2: Hospedar no GitHub Pages (Online e Grátis)

1. Crie uma conta no GitHub (se não tiver)
2. Crie um novo repositório chamado `sistema-avaliacao`
3. Faça upload de todos os arquivos
4. Vá em Settings > Pages
5. Selecione "main branch" e clique em Save
6. Seu site estará online em: `seuusuario.github.io/sistema-avaliacao`

**Link completo com instruções:** https://pages.github.com/

## 📊 Como Funciona

### Dados Locais
- Todos os dados são salvos no **localStorage** do navegador
- Nenhum dado é enviado para servidor externo
- 100% privado e seguro
- Cada computador tem seus próprios dados

### Exportar Dados
1. Na página inicial, clique em "💾 Exportar Dados"
2. Um arquivo JSON será baixado com todas as respostas
3. Você pode importar este arquivo em Excel/Google Sheets

### Analisar Dados
1. Clique em "📊 Dashboard" na página inicial
2. Veja gráficos e estatísticas em tempo real
3. Clique em "📈 Relatórios" para relatórios individuais

## 🔧 Arquivos do Sistema

```
sistema-avaliacao-web/
├── index.html              # Página inicial
├── clima.html              # Formulário de Clima
├── autoavaliacao.html      # Formulário de Autoavaliação
├── avaliacao360.html       # Formulário 360º
├── disc.html               # Formulário DISC
├── dashboard.html          # Dashboard de análise
├── relatorios.html         # Relatórios individuais
├── css/
│   └── styles.css          # Estilos modernos
├── js/
│   ├── storage.js          # Gerenciamento de dados
│   ├── clima-questions.js  # Perguntas do clima
│   ├── app.js              # Lógica principal
│   └── analytics.js        # Análise de dados
└── README.md               # Este arquivo
```

## 💡 Dicas Importantes

### Para o Gestor/RH:
1. **Compartilhe o link** do sistema com a equipe
2. **Defina um prazo** para preenchimento (ex: 7 dias)
3. **Exporte os dados** após o prazo
4. **Analise no Dashboard** ou importe para Excel

### Para os Colaboradores:
1. Acesse o link fornecido
2. Preencha os formulários com sinceridade
3. Seus dados são **anônimos** (exceto autoavaliação e 360º)
4. Pode pausar e voltar depois (dados salvos localmente)

## 🎨 Personalização

### Mudar Cores
Edite o arquivo `css/styles.css`, nas variáveis:
```css
:root {
    --primary: #6366f1;  /* Cor principal */
    --secondary: #8b5cf6; /* Cor secundária */
}
```

### Adicionar Logo
No arquivo `index.html`, adicione:
```html
<img src="logo.png" alt="Logo" style="max-width: 200px;">
```

### Mudar Nomes dos Colaboradores
No arquivo `avaliacao360.html`, edite o dropdown com os 11 nomes:
```html
<option value="nome1">Nome do Colaborador 1</option>
```

## 📱 Compatibilidade

- ✅ Chrome, Edge, Firefox, Safari
- ✅ Funciona em celular (design responsivo)
- ✅ Offline (depois de carregar pela primeira vez)
- ✅ Não precisa de internet (se usar localmente)

## ⚠️ Limitações

- Dados salvos apenas no navegador usado
- Se limpar cache do navegador, perde os dados (por isso exporte!)
- Cada computador/navegador tem dados separados
- Não tem login/senha (acesso aberto)

## 🆘 Problemas Comuns

**Pergunta:** Os dados sumiram!
**Resposta:** Você limpou o cache do navegador. **Sempre exporte os dados regularmente!**

**Pergunta:** Não consigo ver as respostas dos outros
**Resposta:** Cada pessoa tem dados locais. Use "Exportar Dados" e junte tudo em uma planilha.

**Pergunta:** Como juntar dados de vários computadores?
**Resposta:** Peça para cada pessoa exportar seus dados, depois importe tudo em uma planilha Excel.

## 📈 Próximos Passos

Após coletar os dados:

1. **Exporte tudo** (botão na página inicial)
2. **Abra no Excel** ou Google Sheets
3. **Use o Dashboard** para visualização rápida
4. **Gere Relatórios** individuais
5. **Prepare Devolutivas** (1:1 com cada colaborador)

## 🔒 Conformidade NR-1

Este sistema atende aos requisitos da NR-1 sobre avaliação de riscos psicossociais:
- ✅ Coleta dados sobre clima organizacional
- ✅ Avalia relacionamentos interpessoais
- ✅ Identifica riscos (sobrecarga, falta de clareza, etc.)
- ✅ Gera relatório para plano de ação

Lembre-se de:
- Coletar Termos de Consentimento (assinados)
- Arquivar dados por 20 anos
- Implementar plano de ação baseado nos resultados

## 💾 Backup dos Dados

**SUPER IMPORTANTE:**
1. Exporte os dados **SEMANALMENTE**
2. Salve o arquivo JSON em local seguro
3. Faça backup na nuvem (Google Drive, Dropbox, etc.)

## 📞 Suporte

Se tiver dúvidas:
1. Leia este README completo
2. Verifique os comentários no código
3. Consulte os arquivos de exemplo

## 📄 Licença

Sistema criado para uso interno da empresa.
Pode modificar e usar livremente.

---

**Versão:** 1.0  
**Última atualização:** Fevereiro 2025  
**Criado para:** Clínica de Estética (12 colaboradores)

✨ **Bom uso!** ✨
