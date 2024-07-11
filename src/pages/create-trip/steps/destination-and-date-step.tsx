import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

interface DestinationAndDateStepProps{
    isOpen: boolean,
    closeGestInput: () => void,
    openGestInput: ()=> void 
}

export function DestinationAndDateStep(props: DestinationAndDateStepProps){
    return(
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
        <div className='flex items-center gap-2 flex-1'>
          <MapPin className='size-5 text-zinc-400' />
          <input
            disabled={props.isOpen}
            placeholder="Para onde Você vai?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none " />
        </div>
        <div className='flex items-center gap-2'>
          <Calendar className='size-5 text-zinc-400' />
          <input
            disabled={props.isOpen}
            placeholder="Quando?"
            className="bg-transparent text-lg placeholder-zinc-400 w-40  outline-none" />
        </div>

        <div className='w-px h-6 bg-zinc-800' />

        {props.isOpen ? (
          <button
            onClick={props.closeGestInput}
            className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'>
            Alterar Local/data
            <Settings2 className='size-5' />
          </button>
        ) : (
          <button
            onClick={props.openGestInput}
            className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
            Continuar
            <ArrowRight className='size-5' />
          </button>
        )}
      </div>

    )
}