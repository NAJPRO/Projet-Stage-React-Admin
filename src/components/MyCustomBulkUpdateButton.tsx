import { useState } from 'react';
import { BulkDeleteWithConfirmButton, Button, Confirm, useListContext, useNotify, useRedirect, useRefresh } from 'react-admin';

/** Mise à jour du statut des utilisateurs
 * 
 * Ce composant personnalisé permet de mettre à jour le statut des utilisateurs.
 * On récupère d'abord les IDs sélectionnés par l'utilisateur, puis on recherche les informations des utilisateurs concernés et on met à jour le statut.
 */
const MyCustomBulkUpdateButton = () => {
    const { selectedIds } = useListContext(); // On récupère les IDs sélectionnés
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    const handleClick = (status: string) => {
        setNewStatus(status);
        setConfirmOpen(true);
    };

    const handleConfirm = async () => {
        try {
            // Récupération des informations des utilisateurs
            const usersToUpdate = await Promise.all(
                selectedIds.map(id =>
                    fetch(`${import.meta.env.VITE_JSON_SERVER_URL}/users/${id}`)
                        .then(response => response.json())
                        .then(user => ({ ...user, status: newStatus }))
                )
            );

            // Envoi des données mises à jour à l'API
            await Promise.all(
                usersToUpdate.map(user =>
                    fetch(`${import.meta.env.VITE_JSON_SERVER_URL}/users/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    })
                )
            );

            notify('Statut mis à jour pour les utilisateurs sélectionnés', { type: 'info' });
            refresh(); // Rafraîchit la liste
            redirect('list', 'users'); // Redirige vers la liste des utilisateurs
        } catch (error) {
            console.error('Error during bulk update:', error);
            notify('Erreur lors de la mise à jour des statuts', { type: 'warning' });
        } finally {
            setConfirmOpen(false); // Ferme la boîte de dialogue
        }
    };

    return (
        <>
            <Button onClick={() => handleClick('active')} label="Activer" />
            <Button onClick={() => handleClick('inactive')} label="Désactiver" />
            <Confirm
                isOpen={confirmOpen}
                title="Confirmation"
                content={`Êtes-vous sûr de vouloir ${newStatus === 'active' ? 'activer' : 'désactiver'} ces utilisateurs ?`}
                onConfirm={handleConfirm} // Appelle handleConfirm sans arguments
                onClose={() => setConfirmOpen(false)}
            />
            <BulkDeleteWithConfirmButton 
                label='Supprimer' 
                mutationMode="pessimistic" 
                confirmTitle="Confirmation"
                confirmContent="Êtes-vous sûr de vouloir supprimer ces utilisateurs ?"
            />
        </>
    );
};

export default MyCustomBulkUpdateButton;