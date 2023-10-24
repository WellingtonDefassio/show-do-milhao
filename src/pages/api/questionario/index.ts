import type {NextApiRequest, NextApiResponse} from "next";
import questoes from "@/pages/api/bancoDeQuestoes";
import {embaralhar} from "@/functions/arrays";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<number[]>
) {
    const ids = questoes.map(questao => questao.id)

    res.status(200).json(embaralhar(ids))
}