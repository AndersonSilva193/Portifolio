# Storyboard

| ID | Objetivo | Composição | Mídia | Scroll | Ponte com a próxima | Mobile | Reduced motion / falha |
|---|---|---|---|---|---|---|---|
| HeroScene | Mostrar em um segundo o que ele faz e um site real funcionando | Título centralizado, linha de apoio, tela larga com o Açaí, legenda com link | Canvas com 80 quadros reais do Açaí (d_), pôster d_000 + PNG | Pin de 230%; 0–16% o texto sai; 2–44% a tela cresce até cobrir a viewport; quadros 0→80% da sequência (copo enche, granola cai); 62% entra a etiqueta "Açaí do GQ · Cliente real · Angular · No ar" | A tela em tela cheia rola para cima e revela o chão claro do Volt Ride | Tela vertical 0,62 com recorte central dos mesmos quadros (o copo fica no centro), 1 a cada 2 quadros, pin de 170% | Sem pin, pôster estático, texto e legenda visíveis |
| VoltScene | Mostrar direção de arte de bairro | Palavra "Volt Ride" gigante atrás da tela, texto e etiquetas embaixo | 48 quadros (scooter passa o dia) | Scrub de top 85% a bottom 15%; palavra com parallax de ±8% | Corte seco para o chão escuro da barbearia | Tela 4:3, foco horizontal em 76% (scooter) | Pôster d_000 |
| BarberScene | Provar o sistema real | Mesma gramática, chão #120e0b | 32 quadros (luzes acendem, placa vira Aberto) | Scrub | Chão escuro continua no Kumara | Tela 4:3 | Pôster |
| KumaraScene | Mostrar produto técnico | Mesma gramática, chão #0b0b0c | 52 quadros (teclado se desmonta) | Scrub | Corte para o branco da linha final | Tela 4:3 | Pôster |
| LineupScene | Fechar a seção de sites com a variedade | Título com máscara, CTA "Quero um site assim", quatro celulares | m_000 de cada site | Celulares sobem em sequência uma vez (stagger 70 ms); inclinação segue o ponteiro | Fundo bege do bloco Sistemas | Carrossel horizontal com snap | Estático |
| SystemsScene | Back-end Java para recrutador e cliente | Título com máscara, parágrafo, painel do AgendaBarber, lista de repositórios | Recorte do painel | Só o título revela | Branco do Sobre | Lista empilhada | Estático |
| CTASection | Converter | Pergunta grande, pílula do WhatsApp, botão de copiar e-mail com aviso, links | — | Título revela | Rodapé | Botões empilhados | Estático |

Teste de aceitação da assinatura: rolar para cima esvazia o copo sem salto; o quadro 0 é igual ao pôster; sem borda de canvas visível; com `img/seq/` bloqueada, ficam os pôsteres.
