import './RepoItem.css';
import React from 'react';
import {
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/react';
import { RepositoryItem } from '../interfaces/RepositoryItem';


const RepoItem: React.FC<{repo: RepositoryItem}> = ({ repo }) => {
  return (
    <IonItem>
        <IonThumbnail slot="start">
            <img alt="Silhouette of mountains" src={repo.imageUrl || "https://ionicframework.com/docs/img/demos/thumbnail.svg"} />
        </IonThumbnail>
        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>
            <strong>Propietario: </strong>
            {repo.owner}
          </p>
          <p>
            <strong>Lenguaje: </strong>
            {repo.language}
          </p>
        </IonLabel>
    </IonItem>
  );
};

export default RepoItem;