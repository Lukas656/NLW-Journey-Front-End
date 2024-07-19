import { CheckCircle2, X } from 'lucide-react';
import { useParams } from "react-router-dom";
import { Button } from "../button";
import { api } from '../../service/axios';
import { useEffect, useState } from 'react';

interface GestsEmailModalProps {
    toggleGestsEmailModal: () => void;
}

interface Participant {
    email: string;
    name?: string;
}

export function GestsEmailModal({ toggleGestsEmailModal }: GestsEmailModalProps) {
    const { tripId } = useParams();
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [newEmail, setNewEmail] = useState('');

    async function fetchEmails() {
        try {
            const response = await api.get(`/trips/${tripId}/gests`);
            setParticipants(response.data.map((email: string) => ({ email })));
        } catch (error) {
            alert("Erro ao buscar os e-mails");
        }
    }

    async function addEmail() {
        try {
            const response = await api.post(`/trips/${tripId}/gests`, { email: newEmail });
            setParticipants(response.data.map((email: string) => ({ email })));
            setNewEmail('');
        } catch (error) {
            alert("Erro ao adicionar o e-mail");
        }
    }

    async function deleteEmail(email: string) {
        try {
            const response = await api.delete(`/trips/${tripId}/gests/${email}`);
            setParticipants(response.data.map((email: string) => ({ email })));
        } catch (error) {
            alert("Erro ao deletar o e-mail");
        }
    }

    useEffect(() => {
        fetchEmails();
    }, [tripId]);

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[748px] rounded-xl py-10 px-5 shadow-shape bg-zinc-900 space-y-5'>
                <div className='flex items-center justify-between mx-5'>
                    <h2 className='text-lg font-semibold'>Gerencie seus Convidados</h2>
                    <X onClick={toggleGestsEmailModal} className='size-5 text-zinc-400 cursor-pointer' />
                </div>
                <div className='flex flex-wrap justify-around mb-6'>
                    {participants.map((participant, index) => (
                        <div key={participant.email} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index + 1}`}</span>
                                <span className="block text-sm text-zinc-400 truncate">
                                    {participant.email}
                                </span>
                            </div>
                            <X onClick={() => deleteEmail(participant.email)} className='size-5 text-zinc-400 cursor-pointer' />
                        </div>
                    ))}
                </div>
                <div className='flex items-center gap-2 flex-1 mt-8'>
                    <input
                        value={newEmail}
                        onChange={event => setNewEmail(event.target.value)}
                        placeholder="Email do Novo Convidado"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                </div>
                <Button tyButton="primary" size="full" onClick={addEmail}>
                    Adicionar Convidado
                </Button>
            </div>
        </div>
    );
}
