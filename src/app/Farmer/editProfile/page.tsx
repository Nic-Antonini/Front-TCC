'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import axios from 'axios';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';
import { Upload, Check } from 'lucide-react';
import Image from 'next/image';
import styles from './page.module.css';
import { Libraries } from '@react-google-maps/api';

type ImageType = 'profile' | 'cover';

interface ProfileProps {
  name: string;
  description: string;
  nameFarm: string;
  hectares: number;
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

export default function EditProfile({ name, description, nameFarm, hectares }: ProfileProps) {
  const [profileImage, setProfileImage] = useState<string>('/farmer.png');
  const [coverImage, setCoverImage] = useState<string>('/default-cover.png');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cultivos, setCultivos] = useState<Cultivo[]>([]);
  const [location, setLocation] = useState({ lat: -15.7942, lng: -47.8822 });
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        updateLocation(lat, lng); // Atualiza o mapa, sem alterar o input
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
    setLocation({ lat, lng }); // Atualiza o centro do mapa
    setMarker({ lat, lng }); // Coloca o marcador no novo local
  
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results) {
        const addressComponents = results[0]?.address_components || [];
        let city =
          addressComponents.find((component) => component.types.includes('locality'))?.long_name ||
          addressComponents.find((component) =>
            component.types.includes('administrative_area_level_2'),
          )?.long_name;
  
        if (!city) {
          city = 'Desconhecido';
        }
  
        const state =
          addressComponents.find((component) =>
            component.types.includes('administrative_area_level_1'),
          )?.short_name || 'Desconhecido';
  
        const locationData = {
          lat,
          lng,
          city,
          state,
        };
  
        console.log('Localização salva:', locationData);
        localStorage.setItem('userLocation', JSON.stringify(locationData));
      } else {
        console.error('Erro ao buscar endereço:', status);
      }
    });
  };
  

  const handleDrop = (files: File[], type: ImageType) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      if (type === 'profile') {
        setProfileImage(result);
      } else if (type === 'cover') {
        setCoverImage(result);
      }
    };

    reader.readAsDataURL(file);
    setErrorMessage(null);
  };

  const handleRejection = (fileRejections: FileRejection[]) => {
    const rejectedFile = fileRejections[0]?.file;
    if (rejectedFile) {
      setErrorMessage(
        `O formato ${rejectedFile.type} não é suportado. Por favor, use apenas arquivos PNG, JPEG ou JPG.`,
      );
    }
  };

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

  return (
    <main className={styles.main}>
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <div className={styles.cover}>
        <Dropzone
          onDrop={(files: File[], fileRejections: FileRejection[], event: DropEvent) => {
            handleDrop(files, 'cover');
            handleRejection(fileRejections);
          }}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
          }}
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
          onDrop={(files: File[], fileRejections: FileRejection[], event: DropEvent) => {
            handleDrop(files, 'profile');
            handleRejection(fileRejections);
          }}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
          }}
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
        <input type="text" name="name" className={styles.nameProfile} placeholder={name} />
      </div>

      <div className={styles.more}>
        <section className={styles.section1}>
          <div className={styles.descArea}>
            <p className={styles.descTitle}>Descrição</p>
            <textarea name="description" id="description" className={styles.description}>
              {description}
            </textarea>
          </div>
          <div className={styles.culturesArea}>
            <h1 className={styles.titleCultures}>Cultivos</h1>
            <div className={styles.cultures}>
              {cultivos.map((cultivo) => (
                <div key={cultivo.Cult_Id} className={styles.culture}>
                  <input type="checkbox" className={styles.checkbox} />
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
            <input type="text" name="nameFarm" className={styles.nameFarmEdit} placeholder={nameFarm} />
          </p>
          <p className={styles.hecFarm}>
            Hectares de plantação:
            <input
              type="number"
              name="hecFarm"
              className={styles.hecFarmEdit}
              placeholder={JSON.stringify(hectares)}
            />
          </p>

          <LoadScript googleMapsApiKey="AIzaSyCmwSFKGgAId-Qegv1-EMff3WFG4Y0mokI" libraries={libraries}>
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
                onClick={handleMapClick}
                onLoad={(map) => {
                  mapRef.current = map;
                }}
              >
                {marker && <Marker position={marker} />}
              </GoogleMap>
            </div>
          </LoadScript>
        </div>
      </div>
      <Check size={25} color="#fff" className={styles.confirmProfile}/>
    </main>
  );
}
