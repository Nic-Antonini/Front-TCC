'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import axios from 'axios';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';
import { Upload, Check } from 'lucide-react';
import Image from 'next/image';
import styles from './page.module.css';
import { Libraries } from '@react-google-maps/api';
import { UserData } from '../../types';

type ImageType = 'profile' | 'cover';

interface ProfileProps {
    name: string;
    description: string;
    nameApiary: string;
    availability: number;
    profileImage: string;
    profileCover: string;
    lat: number;
    lng: number;
    city: string;
    state: string;
    especiesSelecionadas: number[];
    onUpdate: (updatedFields: Partial<UserData>) => void;
}

interface Especie {
    Espe_Id: number;
    Espe_Nome: string;
}

const containerStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '15px',
  };
  
  const libraries: Libraries = ['places'];

export default function EditProfile({ name, description, nameApiary, availability, lat, lng, especiesSelecionadas, city, state, onUpdate}: ProfileProps) {
    const [profileImage, setProfileImage] = useState<string>('/beekeeper.png'); // Imagem padrão do profile
    const [coverImage, setCoverImage] = useState<string>('/default-cover.png'); // Imagem padrão do cover
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para armazenar a mensagem de erro
    const [especies, setEspecies] = useState<Especie[]>([]);
    const [selectedEspecies, setSelectedEspecies] = useState<number[]>(especiesSelecionadas); // Estado local dos cultivos selecionados
    const [location, setLocation] = useState({ lat, lng });
    const [currentCity, setCurrentCity] = useState(city);
    const [currentState, setCurrentState] = useState(state);
    const [currentName, setCurrentName] = useState<string>(name);
    const [currentDescription, setCurrentDescription] = useState<string>(description);
    const [currentnameApiary, setCurrentNameApiary] = useState<string>(nameApiary);

      // Verifica se as coordenadas recebidas são números válidos
      const handleChange = (field: keyof UserData, value: any) => {
        onUpdate({ [field]: value });
      };
    
      const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
      const mapRef = useRef<google.maps.Map | null>(null);
  
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
    // Fetch espécies da API
    useEffect(() => {
        const fetchEspecies = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/especie`);
                setEspecies(response.data.dados); // Assuma que o JSON tem uma propriedade "dados"
            } catch (error) {
                console.error('Erro ao buscar especies:', error);
            }
        };

        fetchEspecies();
    }, []);

    const toggleEspecie = (especieId: number) => {
      setSelectedEspecies((prev) => {
        const updatedEspecies = prev.includes(especieId)
          ? prev.filter((id) => id !== especieId)
          : [...prev, especieId];
        onUpdate({ especiesSelecionadas: updatedEspecies});
        return updatedEspecies;
      });
    };

    return (
        <main className={styles.main}>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>} {/* Mostrar mensagem de erro se houver */}

            <div className={styles.cover}>
                <Dropzone
                    onDrop={(files: File[], fileRejections: FileRejection[], event: DropEvent) => {
                        handleDrop(files, 'cover');
                        handleRejection(fileRejections);
                    }}
                    accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpeg', '.jpg'],
                    }}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.imageContainer}>
                            <input {...getInputProps()} />
                            <Image src={coverImage} alt="Cover Image" layout="fill" className={styles.imgProfile} />
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
                    }}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.imageContainerProfile}>
                            <input {...getInputProps()} />
                            <Image src={profileImage} alt="Profile Image" layout="fill" className={styles.imgProfile} />
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
                    <div className={styles.speciesArea}>
                        <h1 className={styles.titleSpecies}>
                            Espécies
                        </h1>
                        <div className={styles.species}>
                            {especies.map((especie) => (
                                <div key={especie.Espe_Id} className={styles.specie}>
                                    <input type="checkbox" className={styles.checkbox} 
                                    checked={selectedEspecies.includes(especie.Espe_Id)} 
                                    onChange={() => toggleEspecie(especie.Espe_Id)} />
                                    <p>{especie.Espe_Nome}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <div className={styles.farm}>
                    <h1 className={styles.titleFarm}>Apiário</h1>
                    <p className={styles.nameFarm}>Nome do apiário: 
                    <input type="text" name="nameApiary" className={styles.nameFarmEdit} value={currentnameApiary} 
                    onChange={(e) => {
                      setCurrentNameApiary(e.target.value);
                      handleChange('nameApiary', e.target.value); // Atualiza os dados no pai (EditProfile)
                    }} />
                    </p>
                    <p className={styles.hecFarm}>Colméias disponíveis: 
                    <input
                    type="number"
                    name="availability"
                    className={styles.hecFarmEdit}
                    min={0}
                    placeholder={JSON.stringify(availability)}
                    onChange={(e) => handleChange('availability', e.target.value)} // Atualiza os dados no pai (EditProfile)
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