# Lista de Tarefas: Rádio Personalizada com Alternância de Vinhetas e Spotify

## Fase 0: Planeamento e Definição (Em Progresso)

- [X] Analisar documentação do projeto.
- [X] Identificar e listar os principais requisitos e objetivos do projeto.
- [X] Definir as etapas detalhadas de desenvolvimento com base no cronograma proposto (Prova de Conceito, MVP, Produto Completo).
- [X] Propor a estrutura inicial do projeto (tecnologias, organização de pastas, etc.).
- [X] Validar com o utilizador a estrutura, etapas e prioridades.

## Fase 1: Prova de Conceito (PoC) - (A iniciar após validação)

### Configuração do Ambiente Firebase
- [ ] Configurar Firebase Storage para vinhetas.
- [ ] Configurar Firebase Hosting para a aplicação web.
- [ ] Configurar Firebase Firestore para metadados e configurações.
- [ ] Configurar Firebase Authentication para gestão de utilizadores.

### Desenvolvimento do Mecanismo Básico de Alternância
- [ ] Implementar lógica de alternância entre uma vinheta local e uma música do Spotify.
- [ ] Garantir transição suave básica.

### Integração Inicial com Spotify API
- [ ] Implementar autenticação OAuth com a API do Spotify.
- [ ] Permitir a seleção e reprodução de uma música de uma playlist específica.

### Sistema Simples de Gestão de Vinhetas
- [ ] Permitir upload manual de vinhetas para o Firebase Storage (via script ou interface mínima).
- [ ] Permitir a seleção de uma vinheta para reprodução.

### Implementação dos Níveis de Acesso
- [ ] Criar sistema de login básico com Firebase Authentication.
- [ ] Definir papéis iniciais (administrador, técnico, cliente) com distinções mínimas.

### Interface de Administração Básica
- [ ] Criar uma interface web mínima para administradores controlarem a reprodução (iniciar/parar, selecionar vinheta/música de teste).

## Fase 2: MVP - (A iniciar após PoC)

### Sistema Completo de Gerenciamento de Vinhetas
- [ ] Desenvolver interface para upload e gestão de vinhetas (administradores/técnicos).
- [ ] Implementar categorização e metadados para vinhetas.
- [ ] Permitir atribuição de vinhetas a clientes específicos.

### Integração Robusta com Spotify
- [ ] Melhorar gestão de tokens e cache de metadados.
- [ ] Implementar seleção de playlists do Spotify na interface.
- [ ] Implementar sistema de fallback para limitações da API.

### Interface de Administração Funcional
- [ ] Expandir painel administrativo com gestão de utilizadores.
- [ ] Adicionar configuração de regras de programação simples.
- [ ] Incluir visualização de logs básicos.

### Player Básico para Lojas (Interface Cliente)
- [ ] Desenvolver interface de cliente com login.
- [ ] Implementar controlos básicos (play, pause, stop).
- [ ] Permitir seleção de conteúdo Spotify (gêneros/playlists pré-definidas).
- [ ] Exibir informações da mídia atual.
- [ ] Implementar visualização de vinhetas atribuídas (sem download).

### Testes com Clientes Selecionados
- [ ] Preparar ambiente para testes.
- [ ] Recolher feedback.

## Fase 3: Produto Completo - (A iniciar após MVP)

### Funcionalidades Avançadas de Programação
- [ ] Implementar motor de programação com regras de horário e dias da semana.
- [ ] Permitir rotação e priorização de vinhetas.

### Sistema de Relatórios e Estatísticas
- [ ] Desenvolver sistema de monitorização com logs detalhados.
- [ ] Criar alertas para problemas de conectividade.
- [ ] Gerar estatísticas de uso e desempenho.
- [ ] Fornecer relatórios para clientes.

### Otimizações de Performance e Escalabilidade
- [ ] Otimizar qualidade de áudio e transições (crossfade, normalização).
- [ ] Implementar funcionamento offline (cache de vinhetas, modo degradado).
- [ ] Reforçar proteção de conteúdo (streaming seguro, URLs assinadas).

### Interface Refinada para Utilizadores Finais
- [ ] Melhorar a usabilidade e design de todas as interfaces.
- [ ] Adicionar ferramentas de suporte ao cliente na interface de técnicos.

### Documentação Completa
- [ ] Criar documentação técnica do sistema.
- [ ] Criar manuais para utilizadores (administradores, técnicos, clientes).

## Considerações Contínuas (Aplicável a todas as fases)

- [ ] Garantir conformidade com os termos do Spotify.
- [ ] Gerir direitos autorais e licenciamento de vinhetas.
- [ ] Manter segurança e proteção de dados.
- [ ] Planear atualizações e melhorias contínuas.
- [ ] Definir estratégia de suporte técnico.
