import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { api } from "../../service/axios";

interface CreateActivityModalProps {
    createActivityModal: () => void;
}

export function CreateActivityModal({
    createActivityModal
}: CreateActivityModalProps) {
    const { tripId } = useParams();
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

    async function createActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newActivity = {
            title,
            date,
        };

        try {
            await api.post(`trips/${tripId}/activites`, newActivity);
            window.document.location.reload();
        } catch (error) {
            console.error('Erro ao criar atividade:', error);
        }
    }

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[748px] rounded-xl py-10 px-5 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>Cadastrar Atividade</h2>
                        <X onClick={createActivityModal} className='size-5 text-zinc-400 cursor-pointer' />
                    </div>
                    <p className='text-sm text-zinc-400'>
                        Todos os Convidados podem visualizar as atividades.
                    </p>
                </div>
                <form onSubmit={createActivity} className='space-y-3 '>
                    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Tag className='text-zinc-400 size-4' />
                        <input
                            name='title'
                            placeholder="Qual a Atividade?"
                            className="bg-transparent text-lg placeholder-zinc-400 w-full outline-none flex-1"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className='h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                            <Calendar className='text-zinc-400 size-4' />
                            <input
                                type='datetime-local'
                                name='date'
                                placeholder="Data e horário da atividade"
                                className="bg-transparent text-lg placeholder-zinc-400 w-full outline-none flex-1"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button tyButton="primary" size="full">
                        Salvar atividade
                    </Button>
                </form>
            </div>
        </div>
    );
}
