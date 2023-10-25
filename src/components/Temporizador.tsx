import styles from "../styles/Temporizador.module.css"
import {CountdownCircleTimer} from "react-countdown-circle-timer";

interface TemporizadorProps {
    duracao: number
    tempoEsgotado: () => void
    key: any
}

export default function Temporizador(props: TemporizadorProps) {

    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer
                duration={props.duracao}
                size={120}
                isPlaying
                onComplete={props.tempoEsgotado}
                colors={['#BCE596','#F7B801', '#ED827A',]}
                colorsTime={[props.duracao, 5, 0]}
            >
                {({remainingTime}) => remainingTime}
            </CountdownCircleTimer>

        </div>
    )
}