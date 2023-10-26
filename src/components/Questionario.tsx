import styles from "../styles/Questionario.module.css"
import QuestaoModel from "@/model/questaoModel";
import Questao from "@/components/Questao";
import Botao from "@/components/Botao";

interface QuestionarioProps {
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irParaProximoPasso: () => void
}


export default function Questionario(props: QuestionarioProps) {

    function respostaFornecida(indice: number) {
        if(props.questao.naoRespondida) {
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }

    return (
        <div className={styles.questionario} style={{height: "100vh"}}>
            {props.questao ?
                <Questao
                valor={props.questao}
                respostaFornecida={respostaFornecida}
                tempoEsgotado={props.irParaProximoPasso}
                tempoPraResposta={6}/> : false
            }

            <Botao
                texto={props.ultima ? "Finalizar" : "Próximo"}
                onClick={props.irParaProximoPasso}/>
        </div>
    )


}