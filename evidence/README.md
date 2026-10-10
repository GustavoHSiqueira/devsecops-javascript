# Evidências

Esta pasta armazena as evidências da execução automatizada da pipeline
de segurança.

## Evidências esperadas

### `pipeline-falhou.png`

Captura da execução em que a pipeline foi bloqueada depois que o
Semgrep encontrou uma vulnerabilidade.

### `finding-semgrep.png`

Captura dos detalhes do finding apresentado pelo Semgrep, incluindo:

- arquivo afetado;
- linha afetada;
- regra violada;
- mensagem de segurança;
- severidade.

### `pipeline-aprovada.png`

Captura da execução final, depois da correção, demonstrando a aprovação
dos controles:

- testes;
- SAST;
- SCA;
- DAST.

## Relatórios

A pipeline também disponibiliza relatórios para download na área de
artefatos da execução do GitHub Actions:

- `semgrep-report`;
- `npm-audit-report`;
- `zap-report`.