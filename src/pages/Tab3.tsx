import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';
import { useState } from 'react';
import { getUserInfo } from '../services/GithubService';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'No se puede cargar el usuario',
    username: 'no-username',
    bio: 'Sin biografía disponible',
    avatar_url: 'https://ionicframework.com/docs/img/demos/card-media.png'  
  });

  const loadUserInfo = async () => {
    const response = await getUserInfo();
    if (response) {
      setUserInfo({
        name: response.name,
        username: response.login,
        bio: response.bio || 'Sin biografía disponible',
        avatar_url: response.avatar_url || 'https://ionicframework.com/docs/img/demos/card-media.png'
      });
    }
  }

  useIonViewDidEnter(() => {
    loadUserInfo();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="card-container">
          <IonCard className="card">
            <img alt="Silhouette of mountains" src={userInfo.avatar_url} />
            <IonCardHeader>
              <IonCardTitle>{userInfo.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo.username}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{userInfo.bio}</IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;