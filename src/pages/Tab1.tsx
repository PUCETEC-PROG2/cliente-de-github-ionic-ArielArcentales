import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  useIonViewDidEnter, IonList, IonAlert, useIonToast, IonLoading 
} from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, deleteRepository, updateRepository } from '../services/GithubService';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const [presentToast] = useIonToast();

  // Estados para controlar qué ítem se está editando o borrando
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [repoToEdit, setRepoToEdit] = useState<RepositoryItem | null>(null);
  const [repoToDelete, setRepoToDelete] = useState<RepositoryItem | null>(null);

  const loadRepos = async () => {
    setLoading(true); 
    const reposData = await fetchRepositories();
    setRepos(reposData);
    setLoading(false);
  }

  useIonViewDidEnter(() => {
    loadRepos();
  });

  
  const handleDeleteClick = (repo: RepositoryItem) => {
    setRepoToDelete(repo); 
  };

  const handleEditClick = (repo: RepositoryItem) => {
    setRepoToEdit(repo);
    setShowEditAlert(true); 
  };

  
  const confirmDelete = async () => {
    if (!repoToDelete || !repoToDelete.owner || !repoToDelete.name) return;

    const success = await deleteRepository(repoToDelete.owner, repoToDelete.name);
    
    if (success) {
      setRepos(currentRepos => currentRepos.filter(r => r.name !== repoToDelete.name));

      presentToast({
        message: 'Eliminado correctamente',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
    } else {
      presentToast({
        message: 'Error al eliminar.',
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      });
    }
    setRepoToDelete(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading isOpen={loading} message="Cargando repositorios..." />
        
        <IonList>
          {repos.map((repo, index) => (
            <RepoItem 
              key={index} 
              repo={repo} 
              onDelete={handleDeleteClick} 
              onEdit={handleEditClick}     
            />
          ))}
        </IonList>

        {/* ALERTA DE ELIMINACIÓN */}
        <IonAlert
          isOpen={!!repoToDelete}
          onDidDismiss={() => setRepoToDelete(null)}
          header="Confirmar eliminación"
          subHeader={`Vas a eliminar: ${repoToDelete?.name}`}
          message="¿Estás seguro? Esta acción no se puede deshacer."
          buttons={[
            { text: 'Cancelar', role: 'cancel', handler: () => setRepoToDelete(null) },
            { text: 'Eliminar', role: 'destructive', handler: confirmDelete }
          ]}
        />

        {/* ALERTA DE EDICIÓN */}
        <IonAlert
          isOpen={showEditAlert}
          onDidDismiss={() => setShowEditAlert(false)}
          header={`Editar ${repoToEdit?.name}`}
          inputs={[
            {
              name: 'description',
              type: 'textarea',
              placeholder: 'Nueva descripción',
              value: repoToEdit?.description 
            }
          ]}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            {
              text: 'Guardar',
              handler: async (data) => {
                if (repoToEdit && repoToEdit.owner && repoToEdit.name) {
                  const success = await updateRepository(
                    repoToEdit.owner, 
                    repoToEdit.name, 
                    { description: data.description }
                  );
                  
                  if (success) {
                    setRepos(currentRepos => currentRepos.map(repo => {
                      if (repo.name === repoToEdit.name) {
                         return { ...repo, description: data.description };
                      }
                      return repo;
                    }));
                  }
                }
              },
            },
          ]}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab1;