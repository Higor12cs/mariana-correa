# Guia de imagens — site Mariana Corrêa

Especificação das imagens de cada parte do site: onde cada uma aparece, em que
tamanho exportar e o que evitar no enquadramento.

Não é preciso entender de programação para usar este guia. Basta entregar os
arquivos no tamanho e com o nome indicados aqui.

---

## Regras que valem para todas as imagens

**Formato**

- Imagens do site: **WebP**, qualidade 84.
- Imagens de compartilhamento (as que aparecem no WhatsApp e no LinkedIn): **JPG**.
  Nesse caso o WebP não funciona.

**Peso**

- Até **300 KB** por imagem. Acima disso o site fica lento no celular.

**Nome do arquivo**

- Tudo minúsculo, sem acento e sem espaço. Use hífen no lugar do espaço.
- Certo: `salvi-clinica-cover.webp`
- Errado: `Salví Clínica capa.webp`

**Enquadramento**

- O site preenche o espaço com a imagem e corta o que sobra. O corte acontece
  **nas bordas**, mantendo o centro.
- Deixe uma folga em volta do assunto principal. Nada importante (logo, rosto,
  texto) encostado na borda.
- Cada imagem aparece em telas de tamanhos diferentes, então o corte varia um
  pouco. Quem projeta pensando no centro não erra.

**Resolução**

- Exporte exatamente no tamanho pedido em cada seção. Maior que isso só deixa o
  arquivo pesado; menor deixa a imagem borrada nas telas grandes.

---

## Página inicial

### Topo

Não tem imagem. O fundo é um degradê verde gerado pelo próprio site.

### Faixa de números e frase

Não tem imagem.

### Lista de projetos

| | |
| --- | --- |
| **Imagem** | Capa do projeto |
| **Tamanho** | 1200 × 1080 px |
| **Proporção** | 10:9 (quase quadrada) |
| **Formato** | WebP |
| **Nome** | `nome-do-projeto-cover.webp` |

Onde aparece: no computador, essa capa surge flutuando ao lado do mouse quando a
pessoa passa por cima do nome do projeto. No celular, aparece como imagem do card.

Cuidado: a imagem flutuante é pequena (cerca de 380 px de largura na tela).
Evite peças com texto miúdo, que fica ilegível nesse tamanho. Prefira uma
aplicação marcante da marca: o logo, uma embalagem, um material impresso.

### Faixa horizontal "A marca fora do papel"

| | |
| --- | --- |
| **Imagens** | As mesmas dos projetos (abertura e galeria) |
| **Tamanho** | 1920 × 1080 px |
| **Proporção** | 16:9 |
| **Formato** | WebP |

Essas imagens **não são escolhidas separadamente**. O site monta essa faixa
sozinho, juntando a imagem de abertura e as imagens de galeria de todos os
projetos publicados.

Para mudar o que aparece aqui, mude as imagens dos projetos. Para incluir mais
peças nessa faixa, basta acrescentar mais imagens na galeria de um projeto.

Observação: nessa faixa a imagem aparece cortada em **4:3**, mais quadrada que o
arquivo original de 16:9. As laterais são cortadas. Mantenha o assunto no centro.

### Seção de serviços

Não tem imagem.

### Seção "Sobre" (resumo)

| | |
| --- | --- |
| **Imagem** | Retrato da Mariana |
| **Tamanho** | 1200 × 1600 px |
| **Proporção** | 3:4 (vertical) |
| **Formato** | WebP |
| **Nome** | `mariana-retrato.webp` |

É a mesma foto usada na página Sobre. Um arquivo só serve aos dois lugares.

Enquadramento: retrato vertical, do busto para cima, com folga acima da cabeça.
A foto aparece em cerca de 380 px de largura, então o rosto precisa estar
razoavelmente próximo.

> **Pendente:** a foto em uso hoje está em 507 × 793 px, abaixo do ideal. Assim
> que houver uma versão em alta, exporte em 1200 × 1600 px.

### Seção de contato e rodapé

Não têm imagem.

---

## Página de projetos

| | |
| --- | --- |
| **Imagem** | Capa do projeto |
| **Tamanho** | 1200 × 1080 px |
| **Proporção** | 10:9 |
| **Formato** | WebP |
| **Nome** | `nome-do-projeto-cover.webp` |

É o mesmo arquivo usado na lista da página inicial. Aqui ele aparece grande, em
cards lado a lado, cortado em **4:3**. As laterais são cortadas.

Ao passar o mouse, a imagem dá um leve zoom. Por isso deixe uma margem de
segurança de uns 5% em volta do assunto: no zoom, a borda sai da tela.

---

## Página de um projeto

Cada projeto usa quatro imagens.

### 1. Capa

| | |
| --- | --- |
| **Tamanho** | 1200 × 1080 px |
| **Proporção** | 10:9 |
| **Formato** | WebP |
| **Nome** | `nome-do-projeto-cover.webp` |

Não aparece dentro da página do projeto. Serve para a listagem e para o preview
que segue o mouse. É o "cartão de visita" do projeto.

### 2. Imagem de abertura

| | |
| --- | --- |
| **Tamanho** | 1920 × 1080 px |
| **Proporção** | 16:9 |
| **Formato** | WebP |
| **Nome** | `nome-do-projeto-01.webp` |

Faixa larga logo abaixo do título, ocupando a largura inteira da tela. É a imagem
de maior impacto do projeto. Costuma funcionar bem uma aplicação ampla: fachada,
papelaria montada, mockup em ambiente.

Cuidado: em tela larga essa faixa fica bem baixa em relação à largura. Nada
importante nas bordas de cima e de baixo.

### 3. Imagens de galeria

| | |
| --- | --- |
| **Tamanho** | 1920 × 1080 px |
| **Proporção** | 16:9 |
| **Formato** | WebP |
| **Nome** | `nome-do-projeto-02.webp`, `-03`, `-04`... |

Aparecem empilhadas no fim do projeto, uma embaixo da outra. Pode ter quantas
quiser. São essas imagens que também alimentam a faixa horizontal da página
inicial.

Para cada imagem da galeria é preciso entregar junto uma **descrição em uma
frase** do que aparece nela. Exemplo: "Relatórios de pacientes e ecobag com o
padrão gráfico da Salví Clínica". Essa frase é lida em voz alta por leitores de
tela e também é usada pelo Google.

### 4. Imagem de compartilhamento

| | |
| --- | --- |
| **Tamanho** | 1200 × 630 px |
| **Proporção** | 1,91:1 (bem horizontal) |
| **Formato** | **JPG** |
| **Nome** | `nome-do-projeto-og.jpg` |

É o que aparece quando alguém cola o link do projeto no WhatsApp, LinkedIn ou
Instagram. Normalmente é feita a partir da capa, recortada nesse formato.

Se um projeto não tiver a sua, o link usa a imagem geral do site.

---

## Página Sobre

| | |
| --- | --- |
| **Imagem** | Retrato da Mariana |
| **Tamanho** | 1200 × 1600 px |
| **Proporção** | 3:4 (vertical) |
| **Formato** | WebP |
| **Nome** | `mariana-retrato.webp` |

Mesma foto da página inicial. Aparece à esquerda do texto e acompanha a rolagem
enquanto o texto passa ao lado.

---

## Imagem de compartilhamento do site

| | |
| --- | --- |
| **Tamanho** | 1200 × 630 px |
| **Proporção** | 1,91:1 |
| **Formato** | **JPG** |
| **Nome** | `og.jpg` |

É o que aparece quando alguém cola o endereço do site em qualquer lugar.
Hoje traz a assinatura MARIANA//CORRÊA e a frase de abertura do site.

Cada rede social corta essa imagem de um jeito diferente. Deixe uma margem de
segurança de cerca de 60 px em todas as bordas, sem texto nem logo.

Depois de trocar, o WhatsApp e o LinkedIn continuam mostrando a imagem antiga por
algum tempo, porque guardam uma cópia. Para forçar a atualização:

- Facebook e WhatsApp: https://developers.facebook.com/tools/debug/
- LinkedIn: https://www.linkedin.com/post-inspector/

---

## Resumo de todos os tamanhos

| Imagem | Tamanho | Formato | Nome do arquivo |
| --- | --- | --- | --- |
| Retrato da Mariana | 1200 × 1600 px | WebP | `mariana-retrato.webp` |
| Capa de projeto | 1200 × 1080 px | WebP | `nome-do-projeto-cover.webp` |
| Abertura do projeto | 1920 × 1080 px | WebP | `nome-do-projeto-01.webp` |
| Galeria do projeto | 1920 × 1080 px | WebP | `nome-do-projeto-02.webp` |
| Compartilhamento do projeto | 1200 × 630 px | JPG | `nome-do-projeto-og.jpg` |
| Compartilhamento do site | 1200 × 630 px | JPG | `og.jpg` |

---

## Ao entregar um projeto novo

Envie o pacote com:

- [ ] Capa em 1200 × 1080 px (WebP)
- [ ] Imagem de abertura em 1920 × 1080 px (WebP)
- [ ] Pelo menos uma imagem de galeria em 1920 × 1080 px (WebP)
- [ ] Imagem de compartilhamento em 1200 × 630 px (JPG)
- [ ] Uma frase de descrição para cada imagem de galeria
- [ ] Todos os arquivos com o mesmo prefixo, minúsculo e sem acento
- [ ] Nenhum arquivo acima de 300 KB
