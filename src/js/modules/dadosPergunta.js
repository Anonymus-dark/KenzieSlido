import { Elementos } from "./elementos.js"

import { RenderizarCard } from "./criarPergunta.js"

export class Dados extends Elementos{

    constructor(){
        super()

        this.perguntas = []

        this.arquivado = []

        Dados.botaoEnviar.addEventListener("click", this )
    }

    handleEvent( evento ){

        this.igualarComStorge()

        this.criarObjPerguntas()

        this.renderizar()

    }

    igualarComStorge(){

        if( localStorage.getItem( "perguntas" ) !== null ){

            const data = JSON.parse( localStorage.getItem( "perguntas" ) )

            const perguntasArquivas = JSON.parse( localStorage.getItem( "arquivado" ) )

            this.perguntas = data

            this.arquivado = perguntasArquivas
        }
        if( localStorage.getItem( "perguntas" ) === null ){

            localStorage.setItem( "perguntas", JSON.stringify( [] ) )

            localStorage.setItem( "arquivado", JSON.stringify( [] ) )
        }

    }

    criarObjPerguntas(){

        const idAtual = this.perguntas.length + 1

        const perguntaEntrada = Dados.barraPesquisa.value
      
        const criarPergunta = new pergunta( idAtual, perguntaEntrada )

        this.perguntas.push( criarPergunta )

        this.atualizarLocalStorage( this.perguntas, "perguntas" )
    }   

    renderizar(){

        new RenderizarCard( this.perguntas, "perguntas" )
    }

    atualizarLocalStorage( arrPerguntas, chave ){

        localStorage.setItem( chave, JSON.stringify( arrPerguntas ) )
    }

}

class pergunta {

    constructor( id, pergunta ){

        this.id = id
        this.texto = pergunta
        this.like = 0
        this.arquivado = false
    }
}