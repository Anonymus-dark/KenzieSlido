import { Botoes } from "./modules/botoes.js"

import { Dados } from "./modules/dadosPergunta.js"

const botaoBarraSuspenca = new Botoes()

export const dados = new Dados()

dados.igualarComStorge()

dados.renderizar()

