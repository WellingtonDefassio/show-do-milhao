import Questao from "@/components/Questao";
import QuestaoModel from "@/model/questaoModel";
import RespostaModel from "@/model/respostaModel";
import {useEffect, useRef, useState} from "react";
import Botao from "@/components/Botao";

const questaoMock = new QuestaoModel(1, "Melhor cor?", [
    RespostaModel.errada("Azul"),
    RespostaModel.errada("Amarela"),
    RespostaModel.errada("Verde"),
    RespostaModel.certa("Preta")
])

export default function Home() {
    const [questao, setQuestao] = useState(questaoMock)



    function respostaFornecida(indice: number) {
        const responderCom = questao.responderCom(indice);
        setQuestao(responderCom)
    }
    function tempoEsgotado() {
        if(questao.naoRespondida) {
            const responderCom = questao.responderCom(-1);
            setQuestao(responderCom)
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Questao tempoPraResposta={5}
                     valor={questao}
                     respostaFornecida={respostaFornecida}
                     tempoEsgotado={tempoEsgotado}/>

            <Botao texto={"Próxima"} href={"/resultado"}/>
        </div>

    )
}
