import './RepoItem.css';
import React from 'react';
import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton,
  IonIcon,
  IonButtons
} from '@ionic/react';
import { trash, create } from 'ionicons/icons'; 
import { RepositoryItem } from '../interfaces/RepositoryItem';

// Interfaz para definir que este componente espera recibir funciones del padre
interface RepoItemProps {
  repo: RepositoryItem;
  onDelete: (repo: RepositoryItem) => void;
  onEdit: (repo: RepositoryItem) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onDelete, onEdit }) => {
  return (
    <IonItem>
        <IonThumbnail slot="start">
            <img 
              alt="Repo Image" 
              src={repo.imageUrl || "https://ionicframework.com/docs/img/demos/thumbnail.svg"} 
            />
        </IonThumbnail>
        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description || "Sin descripción"}</p>
          <p>
            <strong>Propietario: </strong>{repo.owner}<br/>
            <strong>Lenguaje: </strong>{repo.language || "N/A"}
          </p>
        </IonLabel>
        
        {/* Botones de acción a la derecha */}
        <IonButtons slot="end">
          <IonButton color="primary" onClick={() => onEdit(repo)}>
            <IonIcon icon={create} />
          </IonButton>
          <IonButton color="danger" onClick={() => onDelete(repo)}>
            <IonIcon icon={trash} />
          </IonButton>
        </IonButtons>
    </IonItem>
  );
};

export default RepoItem;