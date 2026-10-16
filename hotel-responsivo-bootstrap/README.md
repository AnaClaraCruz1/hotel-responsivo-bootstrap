# Hotel Aurora — página responsiva com Bootstrap

Projeto acadêmico da UC 4: criação de uma página responsiva para um hotel, com base no wireframe fornecido.

## Tecnologias
- HTML5 semântico
- CSS3 personalizado
- JavaScript
- Bootstrap 5.3.3 (CDN)
- Bootstrap Icons (CDN)

## Como executar
1. Extraia a pasta do projeto.
2. Abra `index.html` em um navegador atualizado.
3. É necessário estar conectado à internet para carregar o Bootstrap e as imagens externas.

## Estrutura
- `index.html`: conteúdo e estrutura da página.
- `css/style.css`: cores, tipografia e ajustes visuais.
- `js/script.js`: validação do formulário e atualização do ano no rodapé.
- `img/`: pasta reservada para imagens locais, caso queira substituir as imagens externas.

## Responsividade
O layout utiliza o sistema de grid do Bootstrap (`container`, `row` e `col-*`) para reorganizar os conteúdos conforme a largura da tela. O menu se recolhe em telas menores, os cartões dos quartos passam de três colunas para duas e depois uma, e o formulário reorganiza os campos para dispositivos móveis.

## Observação
O formulário serve apenas para demonstrar validação no navegador. Ele não envia informações a um servidor nem cria reservas reais.
