import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonList } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories } from '../services/GithubService';

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<RepositoryItem[]>([]);

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  }

  useIonViewDidEnter(() => {
    console.log("***** Cargando repositorios *******");
    loadRepos();
  })

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
        <IonList>
          {repos.map((repo, index) => (
            <RepoItem key={index} repo={repo} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;