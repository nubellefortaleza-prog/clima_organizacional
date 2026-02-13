/* ============================================
   APP.JS - Lógica Principal do Sistema
   ============================================ */

// Utilitários globais
const Utils = {
    // Formatar data
    formatarData(isoString) {
        const data = new Date(isoString);
        return data.toLocaleString('pt-BR');
    },
    
    // Calcular média
    calcularMedia(array) {
        if (!array || array.length === 0) return 0;
        const soma = array.reduce((a, b) => a + Number(b), 0);
        return (soma / array.length).toFixed(2);
    },
    
    // Calcular eNPS
    calcularENPS(notas) {
        if (!notas || notas.length === 0) return { enps: 0, promotores: 0, neutros: 0, detratores: 0 };
        
        const promotores = notas.filter(n => n >= 9).length;
        const neutros = notas.filter(n => n >= 7 && n < 9).length;
        const detratores = notas.filter(n => n < 7).length;
        const total = notas.length;
        
        const enps = ((promotores - detratores) / total * 100).toFixed(0);
        
        return {
            enps: Number(enps),
            promotores,
            neutros,
            detratores,
            total
        };
    },
    
    // Exportar para CSV
    exportarCSV(dados, nomeArquivo) {
        let csv = '';
        
        // Cabeçalhos
        if (dados.length > 0) {
            csv += Object.keys(dados[0]).join(',') + '\n';
        }
        
        // Dados
        dados.forEach(row => {
            csv += Object.values(row).map(v => `"${v}"`).join(',') + '\n';
        });
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = nomeArquivo;
        link.click();
    }
};

// Exportar para uso global
window.Utils = Utils;
