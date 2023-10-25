import QuestaoModel from "@/model/questaoModel";
import {useEffect, useState} from "react";
import Questionario from "@/components/Questionario";
import {useRouter} from "next/router";


const BASE_URL = "http://localhost:3000/api"


export default function Home() {

    const router = useRouter()


    const [idsQuestoes, setIdsQuestoes] = useState<number[]>([])
    const [questao, setQuestao] = useState<QuestaoModel>()
    const [respostasCertas, setRespostasCertas] = useState<number>(0)

    async function getQuestoesIds(): Promise<void> {
        const res = await fetch(`${BASE_URL}/questionario`)
        const idsQuestoes = await res.json();
        setIdsQuestoes(idsQuestoes)
    }

    async function getQuestao(idQuestao: number) {
        const res = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
        const json = await res.json();
        const novaQuestao = QuestaoModel.fromObject(json);
        setQuestao(novaQuestao)
    }


    function questaoRespondida(questaoRespondida: QuestaoModel) {
        setQuestao(questaoRespondida)
        const acertou = questaoRespondida.acertou
        setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
    }

    function irParaProximoPasso() {
        const proximoId = idProximaPergunta()
        proximoId ? irParaProximaQuestao(proximoId) : finalizar()
    }

    function irParaProximaQuestao(proximoId: number) {
        getQuestao(proximoId)
    }

    function finalizar() {
        router.push({
            pathname: "/resultado",
            query: {
                total: idsQuestoes.length,
                certas: respostasCertas
            }
        })
    }


    useEffect(() => {
        getQuestoesIds()
    }, [])

    useEffect(() => {
        idsQuestoes.length > 0 && getQuestao(idsQuestoes[0])
    }, [idsQuestoes])


    function idProximaPergunta() {

        const proximoIndice = idsQuestoes.indexOf(questao?.id ?? 0) + 1;
        return idsQuestoes[proximoIndice]

    }

    return questao ? (
        <Questionario
            questao={questao}
            ultima={idProximaPergunta() === undefined}
            questaoRespondida={questaoRespondida}
            irParaProximoPasso={irParaProximoPasso}/>
    ) : false

}
