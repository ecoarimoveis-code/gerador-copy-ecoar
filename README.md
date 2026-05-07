# 🚀 Gerador de Copy Ecoar - Instruções de Deploy

Esse projeto é um formulário que seu time usa para gerar copy de imóveis automaticamente.

## **Estrutura de Arquivos**

```
gerador-ecoar/
├── api/
│   └── generate.js          (Backend - chama Claude API)
├── public/
│   └── index.html           (Frontend - formulário)
├── package.json             (Dependências)
├── vercel.json              (Configuração Vercel)
└── README.md                (Este arquivo)
```

---

## **PASSO 1: Preparar os Arquivos**

1. **Cria uma pasta no seu computador:**
   ```
   gerador-ecoar/
   ```

2. **Dentro dela, cria:**
   - Pasta `api/`
   - Pasta `public/`

3. **Coloca os arquivos:**
   - `api/generate.js` → dentro da pasta `api/`
   - `index.html` → dentro da pasta `public/`
   - `package.json` → na raiz
   - `vercel.json` → na raiz

---

## **PASSO 2: Conectar com GitHub (ou Vercel direto)**

### **Opção A: Via GitHub (Recomendado)**

1. **Cria um repositório no GitHub:**
   - Vai em https://github.com/new
   - Nome: `gerador-copy-ecoar`
   - Cria o repo

2. **No seu computador, abre terminal na pasta e faz:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USER/gerador-copy-ecoar.git
   git push -u origin main
   ```

### **Opção B: Upload direto em Vercel**

Você pode fazer upload direto sem GitHub. Vamos para o passo 3.

---

## **PASSO 3: Deploy em Vercel**

1. **Vai em:** https://vercel.com/
2. **Clica "Sign Up"** (ou faz login se já tiver)
3. **Escolhe:**
   - Se criou GitHub: **"Import Git Repository"** → conecta o repo
   - Se não: **"Create a Project"** → upload dos arquivos

4. **Depois que importar/fazer upload:**
   - Vercel vai pedir para adicionar **Environment Variable**
   - Nome: `ANTHROPIC_API_KEY`
   - Valor: **Cole sua API Key do Claude** (aquela que você criou em console.anthropic.com)
   - ⚠️ **IMPORTANTE:** Essa chave fica segura no servidor Vercel, não é visível pra ninguém

5. **Clica "Deploy"**

---

## **PASSO 4: Pronto!**

Vercel vai gerar um link tipo:
```
https://gerador-copy-ecoar.vercel.app
```

Você compartilha esse link com seu time. Eles:
1. Entram no link
2. Preenchem o formulário
3. Clicam "Gerar"
4. Recebem os 3 textos prontos
5. Copiam e usam onde quiserem

---

## **Quanto Vai Custar?**

- **Vercel:** Gratuito (incluso)
- **Claude API:** Você paga conforme usa
  - Cada geração consome ~2000 tokens
  - Modelo `claude-opus-4-6` custa ~$0.015 por 1K tokens
  - **Estima:** R$ 0.05 por imóvel (bem barato)

---

## **E Se Quiser Mudar Algo?**

Se você quer mudar um campo do formulário ou ajustar o prompt:

1. **Edita os arquivos localmente**
2. **Faz commit e push** (se estiver usando GitHub)
3. **Vercel faz redeploy automaticamente**

---

## **Troubleshooting**

### "Erro ao gerar copy"
- Verifica se a API Key está correta em Vercel (Environment Variables)
- Verifica se você tem créditos em console.anthropic.com

### "Página em branco"
- Verifica se o arquivo `index.html` está na pasta `public/`
- Verifica o console do navegador (F12 → Console)

### "API Key não configurada"
- Vai em Vercel → Settings → Environment Variables
- Adiciona: `ANTHROPIC_API_KEY` = sua chave

---

## **Próximas Melhorias (Futuro)**

- [ ] Salvar histórico de imóveis gerados
- [ ] Dashboard com estatísticas de uso
- [ ] Integração com CRM Ecoar
- [ ] Templates customizados por bairro

---

**Dúvidas?** Me chama que ajudo.
