#  APK Fotos y GPS

Elaborado por: Joshua Morocho

Esta aplicacion tendra la funcionalidad de obtener la ubicacion en coordenadas en donde se encuentre el dispositivo y a la vez de tomar una fotografia con su debida ubicación esto con los debidos permisos que se maneja en el archivo AndroidManifest.xml

## 1) GPS

Tomando en cuenta la documentacion del codigo alojado en el repositorio del docente, en el archivo "location.ts" funciona de la siguiente manera:

Se encarga de gestionar todas las operaciones relacionadas con la geolocalización del dispositivo.

Permite obtener la ubicación actual, hacer seguimiento en tiempo real y manejar los permisos de acceso a la ubicación.

### Funcionalidades principales:

- **ensurePermissions()**

Verifica si la aplicación tiene permisos para acceder a la ubicación del dispositivo caso contrario, solicita el permiso al usuario.

Y devuelve el estado actual de los permisos tal como se muestra en la imagen.

<img width="663" height="108" alt="image" src="https://github.com/user-attachments/assets/d6cce690-1c95-43f5-9a1c-ff09922730e2" />

- **getCurrentPosition()**

Obtiene la posición actual del usuario y usa la alta precisión "enableHighAccuracy: true" para mejorar la exactitud del GPS.

<img width="557" height="71" alt="image" src="https://github.com/user-attachments/assets/029b84e9-96df-4ca2-a471-759c24768a57" />

- **Resultado en html**

<img width="408" height="233" alt="image" src="https://github.com/user-attachments/assets/c439d7aa-719d-4949-928c-bd239f864533" />

## 2) Fotografia

Se utilizo el plugin de @capacitor/camera: Camera, CameraResultType, CameraSource, y funciona de la siguiente manera:

- **takePhotoAndSave()**

Esta función permite tomar una foto con la cámara del dispositivo, obtener la ubicación GPS actual y guardar ambos datos en un archivo de texto local mediante Capacitor.

<img width="418" height="376" alt="image" src="https://github.com/user-attachments/assets/1296cac4-d791-4b96-840b-24c20a81ece9" />

Luego se construye el texto que se almacenara en el archivo.txt incluyendo las coordenadas y enlace y se guarda la información como un archivo local dentro del directorio de documentos del dispositivo.

<img width="349" height="138" alt="image" src="https://github.com/user-attachments/assets/ac5203d4-1c30-4b9f-a566-1961558a709e" />

## Resultado
 
[video](./Evidencia_gps_foto.mp4)

