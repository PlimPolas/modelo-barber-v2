# Nova hero split do Atelier Barbers

## Objetivo
Substituir somente a abertura atual por uma hero split inspirada no Design System 01 e ajustar o cabeçalho apenas para integrá-lo visualmente, preservando todas as seções e recursos abaixo.

## Alterações
- Criar uma configuração central reutilizável da hero com:
  - a foto Unsplash `photo-1621605815971-fbc98d665033`;
  - eyebrow, headline em três linhas, subtítulo e CTAs em PT/EN/ES;
  - itens do marquee em PT/EN/ES.
- Trocar apenas o markup da hero em `LandingPage`:
  - coluna escura de conteúdo à esquerda;
  - coluna fotográfica à direita;
  - transição central suave escura sobre a borda da imagem;
  - headline editorial em três linhas, com a terceira em outline fino;
  - CTAs existentes ligados aos dados centralizados de localização e telefone.
- Inserir imediatamente após a hero um marquee com dois grupos idênticos, movimento contínuo da direita para a esquerda e divisores dourados discretos.
- Refinar somente a aparência do cabeçalho necessária para ele se fundir ao topo escuro da nova hero, sem alterar navegação, menu móvel ou seletor PT/EN/ES.
- No celular, reorganizar a hero em composição vertical: conteúdo legível acima, foto em bloco inferior relevante e fusão vertical por gradiente, sem rolagem horizontal.
- Reaproveitar a camada de animação existente:
  - eyebrow → três linhas → subtítulo → CTAs em sequência;
  - imagem com fade e escala sutil;
  - início preservado após o preloader;
  - marquee com redução/pausa específica em `prefers-reduced-motion`, sem afetar as demais animações.

## Limites preservados
- Não alterar métricas, serviços, preços, equipe, experiência, avaliações, galeria, mapa ou rodapé.
- Não remover nem redesenhar traduções, preloader, seletor de idioma ou animações existentes fora da hero.
- Não alterar tipografia global; usar a fonte display já adotada pelo Modelo Barber V2.
- Não adicionar biblioteca nem criar um novo sistema visual.

## Detalhes técnicos
- Manter tokens atuais como `--ink`, `--paper`, `--gold` e `--line`.
- Usar `clamp()` na headline e `-webkit-text-stroke`/`text-stroke` fino na terceira linha.
- Deixar a URL da foto em uma única configuração para troca futura.
- Garantir dois grupos de marquee com conteúdo e largura equivalentes para o loop não apresentar salto.

## Validação
- Confirmar que o projeto compila.
- Validar visualmente em desktop e celular:
  - split real no desktop e composição vertical no celular;
  - foto correta e bem enquadrada;
  - outline fino funcionando;
  - marquee contínuo, sem salto e sem overflow horizontal;
  - seletor de idioma atualiza headline, eyebrow, subtítulo, CTAs e marquee;
  - preloader continua antecedendo a entrada da hero;
  - todas as seções abaixo permanecem presentes e inalteradas.
