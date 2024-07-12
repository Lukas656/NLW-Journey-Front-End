import { Calendar, Settings2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";

interface CreateActivityModalProps {
    createActivityModal: () => void,
}

export function CreateActivityModal(props: CreateActivityModalProps) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[748px] rounded-xl py-10 px-5 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>Cadastrar Atividade</h2>
                        <X onClick={props.createActivityModal} className='size-5 text-zinc-400 cursor-pointer' />
                    </div>
                    <p className='text-sm text-zinc-400'>
                        Todos os Convidados podem visualizar as atividades.
                    </p>
                </div>
                <form className='space-y-3 '>
                    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Tag className='text-zinc-400 size-4' />
                        <input
                            name='title'
                            placeholder="Qual a Atividade?"
                            className="bg-transparent text-lg placeholder-zinc-400 w-full  outline-none flex-1" />
                    </div>
                    <div className="flex  items-center gap-2">
                        <div className=' h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                            <Calendar className='text-zinc-400 size-4' />
                            <input
                                type='datetime-local'
                                name='occurs_at'
                                placeholder="Data e horário da atividade"
                                className="bg-transparent text-lg placeholder-zinc-400 w-full  outline-none flex-1" />
                        </div>
                    </div>
                    <Button tyButton="primary" size="full">
                        Salvar atividade
                    </Button>
                </form>
            </div>
        </div>
    )
}