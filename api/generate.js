export default async function handler(req, res) {
  // Apenas POST é permitido
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const {
    imovel_nome,
    imovel_ano,
    imovel_estilo,
    imovel_andares,
    imovel_valor,
    imovel_carac,
    comprador_perfil,
    imovel_historia
  } = req.body;

  // Validação básica
  if (!imovel_nome || !imovel_carac || !comprador_perfil) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key não configurada' });
  }

  const prompt = `
# GERADOR DE COPY ECOAR - IMÓVEL

## DADOS DO IMÓVEL
**Nome/Endereço:** ${imovel_nome}
**Ano:** ${imovel_ano || '(não informado)'}
**Estilo:** ${imovel_estilo || '(não informado)'}
**Configuração:** ${imovel_andares || '(não informado)'}
**Valor/Tipo:** ${imovel_valor || '(não informado)'}

**Características principais:**
${imovel_carac}

**Contexto/História:**
${imovel_historia || '(não informado)'}

## PERFIL DO COMPRADOR IDEAL
${comprador_perfil}

---

## AJUSTES IMPORTANTES:

### SOBRE A ABERTURA (STEP 2 - ATENÇÃO)
- Reconheça a DOR PRESENTE do comprador (o problema real que ele tá vivendo)
- Seja conversável, como se falasse com um amigo
- Evite ser ofensivo com o local onde a pessoa mora atualmente
- Exemplos que funcionam: "Seu espaço não acompanha seu crescimento" / "Estar numa região que te afasta do que importa"
- Evite: aberturas óbvias, poéticas ou que soem como "tentando convencer"

### SOBRE LINGUAGEM
- Nada de metáforas vazias tipo "cômodos que respiram" ou "estrutura que funciona"
- Seja específico e factual: "pé-direito generoso", "bem iluminado", "planta clara"
- Sem elevador não é problema a defender — é um dado factual
- Evite: "construção direta", frases vagas

### SOBRE TOM
- Vendedor sim, mas AUTÊNTICO (não forçado)
- Reconheça a realidade do comprador, não venda ilusão
- Quando funciona, usa jogada de palavras inteligente

---

## TAREFA: GERAR 3 OUTPUTS

### STEP 1: ANÁLISE CLASSIFICADO (JORNAL)
Se escrevesse um classificado de jornal (máx 50 palavras), quais 5-7 características destacaria?
Responda em tópicos curtos, factuais.

---

### STEP 2: COPY PARA WEBSITE
Fórmula **AIDA** (Atenção → Interesse → Desejo → Ação)

1. **ATENÇÃO** (2-3 linhas): Reconheça a DOR PRESENTE (coloquial, conversável)
2. **INTERESSE** (4-6 linhas): Características principais — factuais, sem poetizar
3. **DESEJO** (6-8 linhas): História + arquitetura equilibrando valor (vendedor) + autenticidade (Ecoar)
4. **AÇÃO** (1-2 linhas): CTA clara

**Tom:** Vendedor, autêntico, factual com contexto.
**Extensão:** 180-250 palavras

---

### STEP 3: COPY PARA INSTAGRAM
Fórmula **AIDA** para rede social

1. **ATENÇÃO** (hook - 1 linha): Captura scroll
2. **INTERESSE + DESEJO** (4-6 linhas): Características + história, com quebras de linha
3. **AÇÃO** (CTA + hashtags): Convite para ação

**Tom:** Envolvente, direto, conversacional.
**Estilo:** 1-2 emojis máximo, quebras de linha estratégicas.
**Extensão:** 80-120 palavras + hashtags

---

## FORMATO DE RESPOSTA

\`\`\`
STEP 1: CARACTERÍSTICAS PRINCIPAIS (ÂNGULO JORNAL)
- [caracteristica 1]
- [caracteristica 2]
(...)

STEP 2: COPY WEBSITE
[seu copy aqui]

STEP 3: COPY INSTAGRAM
[seu copy aqui]
\`\`\`

Comece!
`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', error);
      return res.status(response.status).json({ error: 'Erro ao chamar Claude API' });
    }

    const data = await response.json();
    const content = data.content[0].text;

    return res.status(200).json({ copy: content });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Erro ao processar requisição' });
  }
}
