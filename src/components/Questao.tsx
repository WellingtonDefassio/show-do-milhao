import QuestaoModel from "@/model/questaoModel";
import styles from "../styles/Questao.module.css"
import Enunciado from "@/components/Enunciado";
import Resposta from "@/components/Resposta";
import Temporizador from "@/components/Temporizador";

interface QuestaoProps {
    valor: QuestaoModel
    tempoPraResposta?: number
    respostaFornecida: (indice: number) => void
    tempoEsgotado: () => void

}
const letras = [
    {valor: 'A', cor: '#F2C866'},
    {valor: 'B', cor: '#F266BA'},
    {valor: 'C', cor: '#85D4F2'},
    {valor: 'D', cor: '#BCE596'},
]

export default function Questao(props: QuestaoProps) {
    const questao = props.valor

    function renderizarRespostas() {
        return questao.respostas.map((res, i) => {
            return (
                <Resposta valor={res} indice={i} key={i} letra={letras[i].valor} corFundoLetra={letras[i].cor} respostaFornecida={props.respostaFornecida}/>
            )
        })
    }


    return (
        <div className={styles.questao}>
            <Enunciado texto={questao.enunciado}/>
            <Temporizador duracao={props.tempoPraResposta ?? 10} tempoEsgotado={props.tempoEsgotado}/>
            {renderizarRespostas()}
        </div>
    )
}