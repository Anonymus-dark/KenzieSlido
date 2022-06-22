import { Elementos } from "./elementos.js"

export class RenderizarCard extends Elementos {

    constructor( arrPerguntas ){
        super()

        this.arrPerguntas = arrPerguntas

        RenderizarCard.blocoPerguntas.innerHTML = ""

        this.arrPerguntas.sort( ( a, b ) => b.like - a.like )

        this.arrPerguntas.forEach( this.criarCard )
    }
    
    criarCard( pergunta ){

        const card = RenderizarCard.criarElemento( "div", "blocoPerguntas__pergunta" )
        card.id = pergunta.id

        const perguntaText = RenderizarCard.criarElemento( "p", "pergunta__texto" )
        perguntaText.innerText = pergunta.texto

        const blocoBotao = RenderizarCard.criarElemento( "div", "blocoBotaoCard" )

        RenderizarCard.criarArquivamento( pergunta, blocoBotao )

        const botaoLike = RenderizarCard.criarElemento( "button", "pergunta__like" )  

        const quantidadeLike = RenderizarCard.criarElemento( "p", "like__quantidade" )
        quantidadeLike.innerText = pergunta.like

        RenderizarCard.criarBordaLike( botaoLike, quantidadeLike )

        const imagem = RenderizarCard.criarElemento( "img", "like__imagem" )
        imagem.src = "./src/img/svg/like1.svg"
        imagem.alt = "Like"

        RenderizarCard.blocoPerguntas.appendChild( card )
        card.append( perguntaText, blocoBotao )
        blocoBotao.append( botaoLike )
        botaoLike.append( quantidadeLike, imagem )
    }

    static criarElemento( tipo, classs, ){

        const elemento = document.createElement(tipo)
        
        if( classs !== undefined ){

            elemento.classList.add(classs)
        }
        
        return elemento
    }

    static criarArquivamento( pergunta, blocoBotao ){

        if( !pergunta.arquivado ){

            const botaoArquivar = RenderizarCard.criarElemento( "button", "botaoArquivar" )
            botaoArquivar.innerText = "Arquivar"

            blocoBotao.append( botaoArquivar  )
        }
    }

    static criarBordaLike( botaoLike, quantidadeLike ){

        const verificarZero = quantidadeLike.outerText === "0"

        const verificarUm = quantidadeLike.outerText === "1"

        if( verificarZero ){

            botaoLike.style.border = "2px solid transparent"
        }
        if( verificarUm ){

            botaoLike.style.border = "2px solid green"
        }
    }
}