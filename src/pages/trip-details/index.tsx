import { Plus} from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "../create-trip/create-activity-modal";
import { ImportntLinks } from "../create-trip/important-links";
import { Guests } from "../create-trip/guests";
import { Activities } from "../create-trip/activities";
import { DestinationAnddateHeader } from "../create-trip/destination-and-date-header";

export function TripDetailsPage() {
    const [isCreateactivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true)
    }
    function createActivityModal() {
        setIsCreateActivityModalOpen(false)
    }
    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationAnddateHeader />
            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <button
                            onClick={openCreateActivityModal}
                            className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                            <Plus className='size-5' />
                            Cadastrar Atividade
                        </button>
                    </div>
                    <Activities />
                </div>
                <div className="w-88 space-y-6">
                    <ImportntLinks />
                    <div className='w-full h-px bg-zinc-800' />
                    <Guests />
                </div>
            </main>

            {isCreateactivityModalOpen && (
                <CreateActivityModal createActivityModal={createActivityModal} />
            )}
        </div>
    )
}