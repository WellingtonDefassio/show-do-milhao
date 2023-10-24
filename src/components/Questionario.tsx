import styles from "../styles/Questionario.module.css"
import QuestaoModel from "@/model/questaoModel";

interface QuestionarioProps {
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irParaProximoPasso: () => void
}


export default function Questionario(props: QuestionarioProps) {

    return (
        <div className={styles.questionario}>

        </div>
    )


}