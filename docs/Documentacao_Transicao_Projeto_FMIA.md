# Documentação de Transição do Projeto FMIA

Data: 07 de Maio de 2025

## 1. Introdução e Escopo Geral do Projeto

O projeto FMIA (anteriormente Rádio Personalizada com Spotify) visa desenvolver um sistema de rádio ambiente personalizável para estabelecimentos comerciais. O sistema permitirá a alternância programada entre músicas provenientes do Spotify e vinhetas personalizadas (promocionais, institucionais, etc.), com gestão de acesso e diferentes níveis de controlo para administradores, técnicos e clientes finais (as lojas).

O desenvolvimento está a ser realizado em fases: Prova de Conceito (PoC), Produto Mínimo Viável (MVP) e Produto Completo.

## 2. Realizado na Prova de Conceito (PoC) - CONCLUÍDA

A fase de PoC foi concluída com sucesso, validando os conceitos técnicos e funcionais chave do sistema através de um protótipo de frontend simulado. Os principais marcos alcançados foram:

*   **Estrutura do Projeto e Ambiente:** Definição da estrutura de pastas e configuração inicial simulada do Firebase (Firestore, Storage, Hosting, Authentication).
*   **Mecanismo de Alternância:** Implementação de uma lógica no frontend para simular a reprodução alternada entre UMA vinheta (selecionada por admin/técnico) e UMA música do Spotify (selecionada por admin/técnico).
*   **Integração Simulada com Spotify:** Demonstração do fluxo de autenticação OAuth (simulado) e seleção de música de uma lista pré-definida.
*   **Níveis de Acesso Simulados:** Criação de um sistema de login simulado com três papéis (Cliente, Técnico, Administrador), com a interface do player a adaptar-se para mostrar/ocultar funcionalidades conforme o papel.
*   **Interface de Administração Mínima (Simulada):** Uma secção na interface do player, visível para Admin/Técnico, permitindo a seleção da vinheta e da música do Spotify para o ciclo de reprodução, além de controlos básicos de play/stop.
*   **Identidade Visual:** Aplicação das cores e logótipo "The Vox - Mídia Criativa" ao protótipo.

O protótipo final da PoC (`fmia_player_poc_final_v1.zip`) foi entregue e validado.

## 3. Planeado para o Produto Mínimo Viável (MVP) - Em Detalhamento

A fase de MVP focará em transformar as simulações da PoC em funcionalidades robustas e em adicionar os principais recursos para uma primeira versão utilizável do sistema. O planeamento detalhado do MVP está em progresso. As macro-funcionalidades prioritárias identificadas até ao momento incluem:

1.  **Autenticação e Gestão de Sessão Reais:**
    *   Login/registo com Firebase Authentication (email/password).
    *   Funcionalidade de "Esqueci-me da password".
    *   Botão de "Sair" (Logout) funcional.
    *   Persistência da sessão.

2.  **Painel de Utilizador (Cliente) - Estrutura Inicial:**
    *   Área dedicada para o cliente (informações da conta, gestão de vinhetas, estado do plano).

3.  **Sistema Completo de Gestão de Múltiplas Vinhetas:**
    *   **Admin/Técnico:** Upload, categorização e gestão de catálogo de vinhetas (Firebase Storage).
    *   **Admin/Técnico:** Atribuição de múltiplas vinhetas a clientes.
    *   **Cliente (Painel):** Visualizar e ATIVAR/DESATIVAR as suas vinhetas atribuídas.
    *   **Lógica de Reprodução:** Alternância entre TODAS as vinhetas ATIVAS do cliente e músicas do Spotify.

4.  **Gestão de Planos de Subscrição e Controlo de Acesso:**
    *   Sistema de planos (ex: 30/365 dias) no Firestore.
    *   Associação de clientes a planos e datas de validade.
    *   Interrupção automática do acesso ao fim do plano.
    *   Reativação de acesso por Admin/Técnico.

5.  **Integração Robusta com a API do Spotify:**
    *   Autenticação OAuth real (Firebase Functions).
    *   Gestão segura de tokens.
    *   Seleção de playlists REAIS do Spotify por Admin/Técnico.
    *   Reprodução real de músicas (ex: Web Playback SDK).
    *   Tratamento de erros e limitações da API.

6.  **Interface de Administração Funcional (Expansão):**
    *   Gestão de utilizadores (criar, editar papéis, associar planos).
    *   Configuração de regras de programação (se possível no MVP).
    *   Logs básicos.

7.  **Player Básico para Lojas (Interface Cliente Melhorada):**
    *   Login real, controlos funcionais, exibição de mídia real.

8.  **Testes com Clientes Selecionados.**

(Consulte o ficheiro `todo.md` para um detalhamento mais granular das tarefas planeadas para o MVP).

## 4. Próximos Passos (Ao Retomar o Trabalho)

1.  **Revisitar e Validar o Planeamento Detalhado do MVP:** Conforme a última interação, o próximo passo seria continuar o detalhamento técnico das funcionalidades do MVP (seguindo a ordem de prioridade discutida: Múltiplas Vinhetas, Planos, Spotify API, etc.) e apresentar o plano completo do MVP para validação final.
2.  **Iniciar o Desenvolvimento do MVP:** Após a validação do planeamento detalhado do MVP.

## 5. Ficheiros Relevantes

*   **Prototipo Final da PoC:** `fmia_player_poc_final_v1.zip` (entregue em anexo a esta documentação).
*   **Lista de Tarefas Detalhada:** `/home/ubuntu/fmia/docs/todo.md` (no ambiente de desenvolvimento).
*   **Relatório da PoC e Planeamento Inicial MVP:** `/home/ubuntu/fmia/docs/relatorio_poc_e_plano_mvp.md` (no ambiente de desenvolvimento).

Esta documentação serve como um ponto de situação para facilitar a continuidade do projeto.
