'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import axios from 'axios';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import styles from './page.module.css';
import { Libraries } from '@react-google-maps/api';
import { UserData } from '../../types';

type ImageType = 'profile' | 'cover';

interface ProfileProps {
  name: string;
  description: string;
  nameFarm: string;
  hectares: number;
  profileImage: string;
  profileCover: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  cultivosSelecionados: number[];
  onUpdate: (updatedFields: Partial<UserData>) => void;
}

interface Cultivo {
  Cult_Id: number;
  Cult_Nome: string;
}

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '15px',
};

const libraries: Libraries = ['places'];

export default function Farmer({
  name,
  description,
  nameFarm,
  hectares,
  lat,
  lng,
  city,
  state,
  cultivosSelecionados,
  onUpdate,
}: ProfileProps) {
  const [profileImage, setProfileImage] = useState<string>('/farmer.png');
  const [coverImage, setCoverImage] = useState<string>('/default-cover.png');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cultivos, setCultivos] = useState<Cultivo[]>([]);
  const [selectedCultivos, setSelectedCultivos] = useState<number[]>(cultivosSelecionados);
  const [location, setLocation] = useState({ lat, lng });
  const [currentCity, setCurrentCity] = useState(city);
  const [currentState, setCurrentState] = useState(state);
  const [currentName, setCurrentName] = useState<string>(name);
  const [currentDescription, setCurrentDescription] = useState<string>(description);
  const [currentnameFarm, setCurrentNameFarm] = useState<string>(nameFarm);
  


  const handleChange = (field: keyof UserData, value: any) => {
    onUpdate({ [field]: value });
  };

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Fetch cultivos on component mount
  useEffect(() => {
    const fetchCultivos = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/cultivo`);
        setCultivos(response.data.dados);
      } catch (error) {
        console.error('Erro ao buscar cultivos:', error);
      }
    };
    fetchCultivos();
  }, []);


  const handleDrop = async (files: File[], type: ImageType) => {
    try {
      const file = files[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type); // Informar se é imagem de perfil ou capa
  
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Usuário não autenticado.');
        return;
      }
  
      // Enviar arquivo ao backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Atualizar imagem no estado com a URL retornada pelo backend
      const { imageUrl } = response.data;
  
      if (type === 'profile') {
        setProfileImage(imageUrl);
        onUpdate({ profileImage: imageUrl }); // Atualiza no estado global
      } else if (type === 'cover') {
        setCoverImage(imageUrl);
        onUpdate({ profileCover: imageUrl }); // Atualiza no estado global
      }      
  
      setErrorMessage(null);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      alert('Erro ao enviar a imagem. Tente novamente.')
    }
  };
  

    const handleRejection = (fileRejections: FileRejection[]) => {
      const rejectedFile = fileRejections[0]?.file;
      if (rejectedFile) {
        setErrorMessage(
         'O formato ${rejectedFile.type} não é suportado. Por favor, use apenas arquivos PNG, JPEG ou JPG.'
        );
      }
    };

    const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
      autocompleteRef.current = autocomplete;
    };
  
    const handlePlaceChanged = () => {
      if (autocompleteRef.current) {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          updateLocation(lat, lng);
        }
      }
    };
  
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        updateLocation(lat, lng);
      }
    };
  
    const updateLocation = (lat: number, lng: number) => {
      setLocation({ lat, lng });
      onUpdate({ lat, lng });
  
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results) {
          const addressComponents = results[0]?.address_components || [];
          let city =
            addressComponents.find((comp) => comp.types.includes('locality'))?.long_name || 
            addressComponents.find((component) =>
              component.types.includes('administrative_area_level_2'),
            )?.long_name;

            if (!city) {
              city = 'Desconhecido';
            }
   
          const state =
            addressComponents.find((comp) => comp.types.includes('administrative_area_level_1'))
              ?.short_name || 'Estado não encontrado';
  
          setCurrentCity(city);
          setCurrentState(state);
          onUpdate({ city, state });
        } else {
          console.error('Erro ao buscar endereço:', status);
        }
      });
    };
  
    const toggleCultivo = (cultivoId: number) => {
      setSelectedCultivos((prev) => {
        const updatedCultivos = prev.includes(cultivoId)
          ? prev.filter((id) => id !== cultivoId)
          : [...prev, cultivoId];
        onUpdate({ cultivosSelecionados: updatedCultivos });
        return updatedCultivos;
      });
    };

  return (
    <main className={styles.main}>
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <div className={styles.cover}>
        <Dropzone
          onDrop={(files) => handleDrop(files, 'cover')}
          onDropRejected={handleRejection}
          accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg', '.jpg'] }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className={styles.imageContainer}>
              <input {...getInputProps()} />
              <Image
                src={coverImage}
                alt="Cover Image"
                layout="fill"
                className={styles.imgProfile}
                priority
              />
              <Upload color="#ffffff" strokeWidth={2.25} className={styles.uploadIcon} />
            </div>
          )}
        </Dropzone>
      </div>

      <div className={styles.profile}>
        <Dropzone
          onDrop={(files) => handleDrop(files, 'profile')}
          onDropRejected={handleRejection}
          accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg', '.jpg'] }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className={styles.imageContainerProfile}>
              <input {...getInputProps()} />
              <Image
                src={profileImage}
                alt="Profile Image"
                layout="fill"
                className={styles.imgProfile}
                priority
              />
              <Upload color="#ffffff" strokeWidth={2.25} className={styles.uploadIconProfile} />
            </div>
          )}
        </Dropzone>
        <input
          type="text"
          value={name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className={styles.nameProfile}
          placeholder={name}
        />
      </div>

      <div className={styles.more}>
        <section className={styles.section1}>
        <div className={styles.descArea}>
            <p className={styles.descTitle}>Descrição</p>
            <textarea name="description" id="description" value={currentDescription}
              onChange={(e) => {
                setCurrentDescription(e.target.value);
                handleChange('description', e.target.value); // Atualiza os dados no pai (EditProfile)
              }}
              className={styles.description}
            >
              {description}
            </textarea>
          </div>
          <div className={styles.culturesArea}>
            <h1 className={styles.titleCultures}>Cultivos</h1>
            <div className={styles.cultures}>
              {cultivos.map((cultivo) => (
                <div key={cultivo.Cult_Id} className={styles.culture}>
                  <input
                    type="checkbox"
                    className={styles.checkbox} 
                    checked={selectedCultivos.includes(cultivo.Cult_Id)}
                    onChange={() => toggleCultivo(cultivo.Cult_Id)}
                  />
                  <p>{cultivo.Cult_Nome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.farm}>
        <h1 className={styles.titleFarm}>Propriedade</h1>
          <p className={styles.nameFarm}>
            Nome da propriedade:
            <input type="text" name="nameFarm" className={styles.nameFarmEdit} value={currentnameFarm} 
              onChange={(e) => {
                setCurrentNameFarm(e.target.value);
                handleChange('nameFarm', e.target.value); // Atualiza os dados no pai (EditProfile)
              }} />
          </p>
          <p className={styles.hecFarm}>
            Hectares de plantação:
            <input
              type="number"
              name="hecFarm"
              className={styles.hecFarmEdit}
              step=".01"
              min={0}
              placeholder={JSON.stringify(hectares)}
              onChange={(e) => handleChange('hectares', e.target.value)} // Atualiza os dados no pai (EditProfile)
            />
          </p>
          <LoadScript googleMapsApiKey={'AIzaSyCmwSFKGgAId-Qegv1-EMff3WFG4Y0mokI'} libraries={libraries}>
            <div className={styles.map}>
            <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                <input
                  type="text"
                  placeholder="Digite o endereço ou localização aproximada"
                  className={styles.searchInput}
                />
              </Autocomplete>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={10}
                mapTypeId="hybrid"
                onClick={handleMapClick}
                onLoad={(map) => {
                  mapRef.current = map;
                }}
              >
              <Marker position={location} />
            </GoogleMap>
            </div>
          </LoadScript>
        </div>
      </div>
    </main>
  );
}


{/*AIzaSyCmwSFKGgAId-Qegv1-EMff3WFG4Y0mokI
            <LoadScript googleMapsApiKey={'AIzaSyCmwSFKGgAId-Qegv1-EMff3WFG4Y0mokI' || ''} libraries={libraries}>
            <div className={styles.map}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={10}
              onClick={handleMapClick}
            >
            <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
              <input
                type="text"
                placeholder="Digite o endereço ou localização aproximada"
                className={styles.searchInput}
              />
            </Autocomplete>
  */}