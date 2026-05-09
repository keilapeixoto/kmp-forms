# Arquivos para criar no GitHub

Crie um repositório novo no GitHub chamado `kmp-forms` e crie cada arquivo abaixo.

---

## 📄 `package.json`
```json
{
  "name": "kmp-forms",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

---

## 📄 `index.html`
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KMP Consulting — Formulários</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 📄 `vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## 📄 `src/main.jsx`
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 📄 `src/App.jsx`
→ Copie TODO o código do formulário que está no painel ao lado (botão de cópia no canto superior direito do artefato).

Depois de colar, localize a linha:
```js
const WEB3FORMS_KEY = "WEB3FORMS_KEY_AQUI";
```
E substitua `WEB3FORMS_KEY_AQUI` pela chave que você recebeu do Web3Forms.

---

# Passos para publicar no Vercel

1. Acesse **github.com** → clique em **"New repository"**
2. Nome: `kmp-forms` → clique em **"Create repository"**
3. Clique em **"creating a new file"** → crie cada arquivo acima copiando o conteúdo
4. Para criar a pasta `src`: escreva o nome do arquivo como `src/main.jsx`
5. Repita para todos os arquivos
6. Acesse **vercel.com** → **"Add New Project"**
7. Clique em **"Import"** ao lado do repositório `kmp-forms`
8. Clique em **"Deploy"** — pronto! ✅

Seu link será algo como: `kmp-forms.vercel.app`

---

# Para o segundo formulário (e outros futuros)

Basta criar um novo arquivo em `src/`, por exemplo `src/FormVistoEstudante.jsx`,
e eu gero o componente pronto para você colar lá.
No `src/App.jsx` você pode criar uma página inicial simples com links para cada formulário.
