import { DateRange, DayPicker } from "react-day-picker"
import { format } from 'date-fns'
import { Calendar, MapPin, X } from 'lucide-react'
import { api } from "../../service/axios"
import { useParams } from "react-router-dom"
import { Button } from "../button"
import { useState } from "react"

interface UpdateTripModalProps {
    eventStartAndEndDates: DateRange | undefined
    seteventStartAndEndDates: (dates: DateRange | undefined) => void
    toggleUpdateTripModal: () => void;
}

export function UpdateTripModal({

    toggleUpdateTripModal,
}: UpdateTripModalProps) {
    const { tripId } = useParams();
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [eventStartAndEndDates, seteventStartAndEndDates] = useState<DateRange | undefined>()
    const [destination, setDestination] = useState('')

    function isDatePicker() {
        if (isDatePickerOpen === true) {
            setIsDatePickerOpen(false)
        } else {
            setIsDatePickerOpen(true)
        }
    }
    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "d 'de' LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d 'de' LLL"))
        : null


    async function updateTrip() {
        try {
            const response = await api.put(`/trips/${tripId}`, {
                destination: destination,
                starts_at: eventStartAndEndDates?.from,
                ends_at: eventStartAndEndDates?.to,
            })

            alert('Ao mudar a sua viagem suas atividades serão deletadas!!')
            window.document.location.reload()
        } catch (error) {
            alert("Erro ao atualizar a viagem:");
        }
    }

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[748px] rounded-xl py-10 px-5 shadow-shape bg-zinc-900 space-y-5'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-semibold'>Atualizar Viagem</h2>
                    <X onClick={toggleUpdateTripModal} className='size-5 text-zinc-400 cursor-pointer' />
                </div>
                <div className="h-16 bg-zinc-900 px-4  flex items-center gap-3">
                    <div className='flex items-center gap-2 flex-1'>
                        <MapPin className='size-5 text-zinc-400' />
                        <input
                            onChange={event => setDestination(event.target.value)}
                            placeholder="Para onde Você vai?"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
                    </div>

                    <button onClick={isDatePicker} className='flex items-center gap-2 outline-none text-left w-[250px]'>
                        <Calendar className='size-5 text-zinc-400' />
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
                </div>
                <Button tyButton="primary" size="full" onClick={updateTrip}>
                    Confirmar Atualização da Viagem
                </Button>
            </div>
        </div>
    )
}