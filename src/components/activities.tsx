import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "../service/axios";

interface Activity {
    _id: string;
    title: string;
    date: string;
}

export function Activities() {
    const { tripId } = useParams();
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        api.get(`trips/${tripId}/activites`)
            .then(response => {
                setActivities(response.data);
            })
            .catch(error => console.error('Erro ao buscar atividades:', error));
    }, [tripId]);

    return (
        <div className="space-y-8">
            {activities.length > 0 ? (
                activities.map(activity => (
                    <div key={activity._id} className="space-y-2.5">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-xl text-zinc-300 font-semibold">
                                Dia {format(new Date(activity.date), 'd')}
                            </span>
                            <span className="text-xs text-zinc-500">
                                {format(new Date(activity.date), 'EEEE', { locale: ptBR })}
                            </span>
                        </div>
                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                            <CircleCheck className="size-5 text-lime-300" />
                            <span className="text-zinc-100">{activity.title}</span>
                            <span className="text-zinc-400 text-sm ml-auto">
                                {format(new Date(activity.date), 'HH:mm')}h
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada.</p>
            )}
        </div>
    );
}
