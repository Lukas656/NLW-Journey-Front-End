import { CheckCircle2, UserCog } from "lucide-react";
import { Button } from "../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../service/axios";
import { GestsEmailModal } from "./modal/gests-emails-modal";

interface Participant {
  email: string;
}
export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isGestsEmailModal, setIsGestsEmailModal] = useState(false);

  async function fetchEmails() {
    try {
        const response = await api.get(`/trips/${tripId}/gests`);
        setParticipants(response.data.map((email: string) => ({ email })));
    } catch (error) {
        alert("Erro ao buscar os e-mails");
    }
}
  function toggleGestsEmailModal() {
    if (isGestsEmailModal === true) {
      window.document.location.reload()
      setIsGestsEmailModal(false)
    } else {
      setIsGestsEmailModal(true)
    }
  }

  useEffect(() => {
    fetchEmails();
}, [tripId]);
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div key={participant.email} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{`Convidado ${index + 1}`}</span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            <CheckCircle2 className="text-green-400 size-5 shrink-0" />
          </div>
        ))}
      </div>
      <Button tyButton="secondary" size="full" onClick={toggleGestsEmailModal}>
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isGestsEmailModal && (
        <GestsEmailModal toggleGestsEmailModal={toggleGestsEmailModal} />
      )}
    </div>
  )
}
