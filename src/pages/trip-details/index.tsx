import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "../../components/modal/create-activity-modal";
import { ImportntLinks } from "../../components/important-links";
import { Guests } from "../../components/guests";
import { Activities } from "../../components/activities";
import { DestinationAnddateHeader } from "../../components/destination-and-date-header";

export function TripDetailsPage() {
    const [isCreateactivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

    function toggleCreateActivityModal() {
        if (isCreateactivityModalOpen == true) {
            setIsCreateActivityModalOpen(false)
        } else {
            setIsCreateActivityModalOpen(true)
        }
    }


    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationAnddateHeader />
            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <button
                            onClick={toggleCreateActivityModal}
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
                <CreateActivityModal createActivityModal={toggleCreateActivityModal} />
            )}

        </div>
    )
}