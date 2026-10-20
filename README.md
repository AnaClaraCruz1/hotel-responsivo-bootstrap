# Hotel Aurora — Site Responsivo

Projeto acadêmico desenvolvido para a **UC 4 do curso do SENAC**. A Atividade 4 criou a interface responsiva; a Atividade 5 amplia o projeto com um serviço simulado para registrar e consultar solicitações de reserva.

## Funcionalidades

- Página inicial responsiva com Bootstrap 5.3.3.
- Seções de apresentação, benefícios e quartos.
- Formulário com validação de campos e datas.
- Envio das solicitações para o JSON Server por meio de uma requisição `POST`.
- Página `reservas.html`, que consulta o serviço e apresenta os registros em uma tabela.
- Mensagens de carregamento, lista vazia e falha de comunicação.
- Layout adaptável a computadores, tablets e celulares.

> **Nota:** o JSON Server é um serviço simulado para fins educacionais. O formulário registra solicitações de teste; não realiza nem confirma reservas reais. Os dados ficam no arquivo local `db.json` durante o uso do serviço.

## Tecnologias utilizadas

- **HTML5** — estrutura das páginas.
- **CSS3** — estilos personalizados e responsividade.
- **JavaScript** — validação, envio e recuperação dos dados com Fetch API.
- **Bootstrap 5.3.3** e **Bootstrap Icons** — componentes, grid e ícones.
- **JSON Server** — simulação de uma API REST.

O Bootstrap, os ícones e as imagens são carregados de URLs externas (CDN), então é necessária conexão com a internet para esses recursos.

## Estrutura do repositório

```text
hotel-responsivo-bootstrap/
├── README.md
└── hotel-responsivo-bootstrap/
    ├── index.html
    ├── reservas.html
    ├── db.json
    ├── css/
    │   └── style.css
    └── js/
        ├── script.js
        └── reservas.js
```

## Como executar

### 1. Instalar o Node.js

É necessário ter o Node.js instalado para executar o JSON Server. Verifique no terminal:

```bash
node --version
npm --version
```

### 2. Iniciar o JSON Server

No terminal, entre na pasta interna do projeto, onde está o arquivo `db.json`:

```bash
cd hotel-responsivo-bootstrap
npx json-server db.json --port 3000
```

Se o terminal já estiver aberto dentro da pasta interna, não execute o `cd` novamente. Caso o comando solicite instalação temporária do JSON Server, confirme para continuar.

O serviço disponibiliza a coleção de solicitações em:

`http://localhost:3000/reservas`

Mantenha esse terminal aberto enquanto testa o site.

### 3. Abrir as páginas

Com o JSON Server em execução, abra a pasta interna do projeto no VS Code e inicie `index.html` com a extensão Live Server. Use o mesmo servidor para abrir `reservas.html`.

1. Preencha o formulário da página inicial com dados de teste e envie.
2. Aguarde a mensagem de sucesso.
3. Abra **Solicitações** no menu ou acesse `reservas.html`.
4. Confira se o registro aparece na tabela.
5. Use **Atualizar lista** para consultar os registros novamente.

Se o envio ou a consulta falhar, confira se o JSON Server continua em execução na porta 3000 e se a URL da página foi aberta pelo Live Server, não diretamente pelo protocolo `file://`.

## Testes recomendados

- Tentar enviar o formulário com campos obrigatórios vazios.
- Verificar se a data de saída é posterior à data de entrada.
- Enviar uma solicitação válida e confirmar que aparece na tabela.
- Abrir a página de consulta antes de enviar qualquer solicitação para verificar o estado de lista vazia.
- Parar temporariamente o JSON Server para conferir a mensagem de erro e iniciá-lo novamente.

## Objetivo educacional

Praticar a elaboração de páginas web responsivas, validação de formulários, requisições HTTP com Fetch API, integração com uma API REST simulada e depuração do comportamento da aplicação.

---

**Projeto acadêmico para fins educacionais.**
