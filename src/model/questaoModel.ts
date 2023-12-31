import RespostaModel from "@/model/respostaModel";
import {embaralhar} from "@/functions/arrays";

export default class QuestaoModel {
    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean


    constructor(id: number, enunciado: string, respostas: RespostaModel[], acertou: boolean = false) {
        this.#id = id;
        this.#enunciado = enunciado;
        this.#respostas = respostas;
        this.#acertou = acertou;
    }

    static fromObject(obj: QuestaoModel) : QuestaoModel {
       const respostas = obj.respostas.map(obj => {
            return RespostaModel.fromObject(obj);
        })

        return new QuestaoModel(obj.id, obj.enunciado, respostas, obj.acertou)
    }


    get id(): number {
        return this.#id;
    }

    get enunciado(): string {
        return this.#enunciado;
    }

    get respostas(): RespostaModel[] {
        return this.#respostas;
    }

    get acertou(): boolean {
        return this.#acertou;
    }

    get naoRespondida(): boolean {
        return !this.respondida
    }

    get respondida(): boolean {
        return this.respostas.reduce((acumulador, valorAtual) => {
            if (valorAtual.revelada) {
                acumulador = true
            }
            return acumulador
        }, false)

    }

    responderCom(indice: number): QuestaoModel {
        const acertou = this.respostas[indice]?.certa
        const respostas = this.respostas.map((resposta, i) => {
            const respostaSelecionada = indice === i
            const deveRevelar = respostaSelecionada || resposta.certa
            return deveRevelar ? resposta.revelar() : resposta
        })
        return new QuestaoModel(this.id, this.enunciado, respostas, acertou)
    }

    embaralharRespostas(): QuestaoModel {
        let respostasEmbaralhadas = embaralhar(this.#respostas)
        return new QuestaoModel(this.id, this.enunciado, respostasEmbaralhadas, this.acertou)
    }

    toObject() {
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            acertou: this.#acertou,
            respondida: this.respondida,
            respostas: this.respostas.map(resp => resp.toObject()),
        }
    }
}