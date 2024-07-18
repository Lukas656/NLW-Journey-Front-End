import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect, Key } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../service/axios";

interface Participant {
    _id: Key | null | undefined;
    id: string;
    name: string | null;
    url: string;
}

export function ImportntLinks() {
    const { tripId } = useParams()
    const [links, setParticipants] = useState<Participant[]>([])

    useEffect(() => {
        api.get(`trips/${tripId}/links`).then(response => setParticipants(response.data))

    }, [tripId])

    return (
        <div className="space-y-6 ">
            <h2 className="font-semibold text-xl">Links Importanes</h2>
            <div className="space-y-5">
                {links.map((link) => (
                    <div key={link._id} className="flex items-center justify-between gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5 ">
                                <span className="block font-medium text-zinc-100">{link.name}</span>
                                <a href={link.url} target="_blank" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                                    {link.url}
                                </a>
                            </div>
                            <Link2 className="text-zinc-400 size-5 shrink-0" />
                        </div>
                    </div>
                ))}
            </div>
            <Button tyButton="secondary" size="full">
                <Plus className='size-5' />
                Cadastrar Novo Link
            </Button>
        </div>
    )
}