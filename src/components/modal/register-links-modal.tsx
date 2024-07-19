import { Link2, X } from 'lucide-react';
import { useParams } from "react-router-dom";
import { Button } from "../button";
import { api } from '../../service/axios';
import { useEffect, useState } from 'react';

interface RegisterLinksProps {
    toggleRegisterLinksModal: () => void;
    _id: string;
    name: string;
    url: string;
}

export function RegisterLinksModal({ toggleRegisterLinksModal }: RegisterLinksProps) {
    const { tripId } = useParams();
    const [links, setLinks] = useState<RegisterLinksProps[]>([]);
    const [newLinkName, setNewLinkName] = useState('');
    const [newLinkUrl, setNewLinkUrl] = useState('');

    async function fetchLinks() {
        try {
            const response = await api.get(`/trips/${tripId}/links`);
            setLinks(response.data);
        } catch (error) {
            alert("Erro ao buscar os links");
        }
    }

    async function addLink() {
        try {
            const response = await api.post(`/trips/${tripId}/links`, {
                name: newLinkName,
                url: newLinkUrl,
            });
            setLinks(response.data);
            setNewLinkName('');
            setNewLinkUrl('');
        } catch (error) {
            alert("Erro ao adicionar o link");
        }
    }

    async function deleteLink(linkId: string) {
        try {
            const response = await api.delete(`/trips/${tripId}/links/${linkId}`);
            setLinks(response.data);
        } catch (error) {
            alert("Erro ao deletar o link");
        }
    }

    useEffect(() => {
        fetchLinks();
    }, [tripId]);

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[748px] rounded-xl py-10 px-5 shadow-shape bg-zinc-900 space-y-5'>
                <div className='flex items-center justify-between mx-5'>
                    <h2 className='text-lg font-semibold'>Gerencie seus Links importantes</h2>
                    <X onClick={toggleRegisterLinksModal} className='size-5 text-zinc-400 cursor-pointer' />
                </div>
                <div className='flex flex-wrap justify-around mb-6'>
                    {links.map((link) => (
                        <div key={link._id} className="flex w-56">
                            <div className="flex items-center justify-between w-56">
                                <div className="space-y-1.5 ">
                                    <div className='flex items-center justify-between'>
                                        <span className="block font-medium text-zinc-100">{link.name}</span>
                                        <X onClick={() => deleteLink(link._id)} className='size-5 text-zinc-400 cursor-pointer' />
                                    </div>
                                    <a href={link.url} target="_blank" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                                        {link.url}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex items-center gap-2 flex-1 mt-8'>
                    <Link2 className='size-5 text-zinc-400' />
                    <input
                        value={newLinkName}
                        onChange={event => setNewLinkName(event.target.value)}
                        placeholder="Nome do Link"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
                    <input
                        value={newLinkUrl}
                        onChange={event => setNewLinkUrl(event.target.value)}
                        placeholder="URL do Link"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
                </div>
                <Button tyButton="primary" size="full" onClick={addLink}>
                    Adicionar Link
                </Button>
            </div>
        </div>
    );
}
