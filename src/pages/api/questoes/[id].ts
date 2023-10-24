import type {NextApiRequest, NextApiResponse} from 'next'
import questoes from "@/pages/api/bancoDeQuestoes";
import QuestaoModel from "@/model/questaoModel";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<QuestaoModel | null>
) {
    const questaoFiltrada = filterQuestion(req);
    if (questaoFiltrada.length === 1) {
        const questaoSelecionada = questaoFiltrada[0].embaralharRespostas()
        res.status(200).json(<QuestaoModel>questaoSelecionada.toObject())
    } else {
        res.status(204).send(null);
    }
}

function filterQuestion(req: NextApiRequest) {
    let id = req.query.id ? +req.query.id : 1
    return questoes.filter(questao => questao.id === id)
}