# 🚀 Dashboard com React, Node.js e API 💻📊

Este é um projeto de **Dashboard** interativo desenvolvido com **React** no frontend, **Node.js** no backend, e **API customizada** para gerenciar e fornecer dados. Ele permite visualizar gráficos dinâmicos, como o **Monthly Earnings** e **Yearly Breakup**, e interagir com os dados em tempo real. 🎉

## 🌟 Funcionalidades

- **Gráficos Dinâmicos** 📈: Visualize os dados de vendas e ganhos mensais e anuais.
- **Dashboard Responsivo** 📱💻: Totalmente responsivo para visualização em dispositivos móveis e desktops.
- **Interação com API** 🌐: A comunicação entre o frontend (React) e o backend (Node.js) é feita via uma API REST.
- **Página de Tarefas** ✅: Gerencie tarefas com adição, edição, exclusão e marcação como concluída.
- **Autenticação de Usuários** 🔐: Apenas usuários autenticados podem acessar páginas protegidas como o Dashboard e Tasks.
- **Interface Clean e Moderna** ✨: Utiliza o **Material-UI** para uma interface de usuário simples e elegante.

## 🔧 Tecnologias Usadas

- **React** ⚛️: Para construir a interface de usuário.
- **Node.js** 🟩: Backend para gerenciar as APIs e dados.
- **Express** 🖥️: Framework para construir o servidor da API.
- **ApexCharts** 📊: Biblioteca para renderizar gráficos dinâmicos.
- **Material-UI** 💅: Para componentes de UI responsivos e personalizados.
- **Fetch API** 🌍: Para buscar dados da API no frontend.

## ⚙️ Como Rodar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/OseiasSilva021/dashboard-com-react-e-node.js.git
```

### 2. Configurar o Backend (Node.js)

- Acesse o diretório do backend:

```bash
cd backend
```

- Instale as dependências:

```bash
npm install
```

- Inicie o servidor:

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`.

### 3. Configurar o Frontend (React)

- Acesse o diretório do frontend:

```bash
cd package
```

- Instale as dependências:

```bash
npm install
```

- Inicie o servidor:

```bash
npm start
```

O aplicativo React será iniciado em `http://localhost:3001` ou `http://localhost:5173`.

### 4. Acesse o Dashboard

Agora, acesse o dashboard no seu navegador em `http://localhost:3001` ou `http://localhost:5173` e aproveite a visualização dos dados! 🚀

## 🔄 Como Funciona

### 🖥️ Frontend (React)

O **React** é usado para criar uma interface interativa com gráficos, tarefas e informações dinâmicas. Utilizando **ApexCharts** para gerar gráficos e **Material-UI** para componentes de interface, ele faz requisições à **API RESTful** construída com **Node.js** para buscar os dados.

### 🌐 Backend (Node.js)

O backend é desenvolvido em **Node.js** com **Express** para gerenciar as rotas da API. As informações como **Monthly Earnings**, **Yearly Breakup** e tarefas são fornecidas pela API e consumidas pelo frontend para atualização em tempo real.

## 📊 Exemplos de Funcionalidades

### Yearly Breakup

Gráfico de divisão de ganhos anuais.

### Monthly Earnings

Gráfico de ganhos mensais.

### Gerenciamento de Tarefas

- **Adicionar Tarefas**: Insira uma nova tarefa na lista.
- **Editar Tarefas**: Altere o título de uma tarefa existente.
- **Concluir Tarefas**: Marque uma tarefa como concluída.
- **Excluir Tarefas**: Remova tarefas da lista.

## 🤝 Contribuição

1. Fork o repositório 🍴
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`) 🌱
3. Faça commit das suas mudanças (`git commit -m 'Adicionando nova feature'`) 📝
4. Push para a branch (`git push origin feature/nova-feature`) 🚀
5. Abra um Pull Request para revisão 💬

## 📜 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
