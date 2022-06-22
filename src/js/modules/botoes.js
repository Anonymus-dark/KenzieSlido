import { Elementos } from "./elementos.js"

import { dados } from "../main.js"

import { RenderizarCard } from "./criarPergunta.js"

export class Botoes extends Elementos{

    constructor(){
        super()

        Botoes.botaoBarra.addEventListener( "click", this )

        Botoes.blocoPerguntas.addEventListener("click", this)

        Botoes.BotaoPerguntas.addEventListener("click", this )
    }

    handleEvent( event ){

        this.iniciarBlocoPesquisa( event )

        this.addOuRemoverLike( event )

        this.arquivar( event )

        this.botaoSessoes( event )

    }

    iniciarBlocoPesquisa( event ){

        const { className } = event.target

        if( className === "blocoBotao__botao" || className === "botao__imagem"){

            this.verificarBotao()
        }

    }

    verificarBotao( enderecoBotao ){

        Botoes.blocoSuspenco.style.display = "flex"
        Botoes.barraPesquisa.style.display = "flex"

        const botaoAparecer = Botoes.blocoSuspenco.className === "blocoSuspenco"

        const botaoRetrair = Botoes.blocoSuspenco.className === "blocoSuspenco--retrair"

        if( botaoAparecer ){

            Botoes.blocoSuspenco.classList.add("blocoSuspenco--retrair") 
            Botoes.blocoSuspenco.classList.remove("blocoSuspenco")

            Botoes.barraPesquisa.classList.add("blocoSuspenco__texto--retrair") 
            Botoes.barraPesquisa.classList.remove("blocoSuspenco__texto")

            setTimeout( ()=> {

                Botoes.blocoSuspenco.style.display = "none"
                Botoes.barraPesquisa.style.display = "none"
            } , 1000)
        }
        if( botaoRetrair ){

            Botoes.blocoSuspenco.classList.add("blocoSuspenco") 
            Botoes.blocoSuspenco.classList.remove("blocoSuspenco--retrair")

            Botoes.barraPesquisa.classList.add("blocoSuspenco__texto") 
            Botoes.barraPesquisa.classList.remove("blocoSuspenco__texto--retrair")
        }
    }

    addOuRemoverLike( event ){

        const { target:{ className }, path } = event

        if( className === "pergunta__like" || className === "like__imagem" || className ==="like__quantidade" ){

            this.editarCardLike( event, path )
        }
    }

    editarCardLike( event, path ){

        const pergunta = document.querySelector(".pergunta__like")

        const id = Number( path[3].id  ) + Number( path[2].id )

        const produto = dados.perguntas.filter( ( pergunta ) => pergunta.id === id )

        const igualZero = produto[0].like === 0

        const igualUm = produto[0].like === 1

        if( igualZero ){

            this.adicionarLike( pergunta, id )
        }
        if( igualUm ){

            this.removerLike( pergunta, id )
        }

    }   
    
    adicionarLike( pergunta, id ){

        dados.perguntas.forEach( ( perguntaAtual ) => {

            if( perguntaAtual.id === id ){
                perguntaAtual.like = 1
            }

            return perguntaAtual
        } ) 

        dados.atualizarLocalStorage( dados.perguntas, "perguntas" )

        new RenderizarCard( dados.perguntas )
    }
    
    removerLike( pergunta, id ){

        dados.perguntas.forEach( ( perguntaAtual ) => {

            if( perguntaAtual.id === id ){
                perguntaAtual.like = 0
            }

            return perguntaAtual
        } ) 

        dados.atualizarLocalStorage( dados.perguntas, "perguntas" )

        new RenderizarCard( dados.perguntas )
    }

    arquivar( event ){

        const { target:{ className }, path } = event

        if( className === "botaoArquivar" ){

            const id = Number( path[2].id )

            const pegarProduto = dados.perguntas.filter( ( pergunta, indice, array ) => {

                const produtoAtual = {...pergunta}

                if( pergunta.id === id ){
                    
                    array.splice( indice, 1 )
                    return produtoAtual
                }
            } ) 

            pegarProduto[0].arquivado = true 

            dados.arquivado.push( ...pegarProduto )
            
            dados.atualizarLocalStorage( dados.perguntas, "perguntas" )

            dados.atualizarLocalStorage( dados.arquivado, "arquivado" )

            new RenderizarCard( dados.perguntas )
        }
        
    }

    botaoSessoes( event ){

        const { target:{ className } } = event

        this.botaoAtual( className )
    
        this.botaoArquivado( className )
        
    }

    botaoAtual( className ){

        if( className === "botaoGeralPergunta BotaoPerguntas__atual" ){

            new RenderizarCard( dados.perguntas )
        }

    }

    botaoArquivado( className ){

        if( className === "botaoGeralPergunta BotaoPerguntas__arquivadas" ){
            
            new RenderizarCard( dados.arquivado )
        }

    }   
}