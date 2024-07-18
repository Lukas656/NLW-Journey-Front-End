import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../button";
import { useState } from "react";
import { format } from 'date-fns'
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
  isOpen: boolean,
  eventStartAndEndDates: DateRange | undefined
  closeGestInput: () => void,
  openGestInput: () => void
  setDestination: (destination: string) => void
  seteventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  isOpen,
  closeGestInput,
  openGestInput,
  setDestination,
  eventStartAndEndDates,
  seteventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)


  function isDatePicker(){
    if(isDatePickerOpen === true){
        setIsDatePickerOpen(false)
    }else{
        setIsDatePickerOpen(true)
    }
}


  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d 'de' LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d 'de' LLL"))
    : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className='flex items-center gap-2 flex-1'>
        <MapPin className='size-5 text-zinc-400' />
        <input
          onChange={event => setDestination(event.target.value)}
          disabled={isOpen}
          placeholder="Para onde Você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
      </div>

      <button onClick={isDatePicker} className='flex items-center gap-2 outline-none text-left w-[250px]' disabled={isOpen}>
        <Calendar className='size-5 text-zinc-400'/>
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='rounded-xl py-10 px-5 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecione a Data </h2>
                <button type="button" onClick={isDatePicker} >
                  <X className='size-5 text-zinc-400 cursor-pointer' />
                </button>
              </div>
            </div>
            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={seteventStartAndEndDates} />

          </div>
        </div>
      )}
      <div className='w-px h-6 bg-zinc-800' />

      {isOpen ? (
        <Button tyButton="secondary" size="default" onClick={closeGestInput}>
          Alterar Local/data
          <Settings2 className='size-5' />
        </Button>
      ) : (
        <Button tyButton="primary" size="default" onClick={openGestInput}>
          Continuar
          <ArrowRight className='size-5' />
        </Button>
      )}
    </div>

  )
}