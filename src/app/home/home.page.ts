import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, IonImg } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { LocationService } from '../services/location';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
 IonButton, IonImg, NgIf
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  latitude = signal<number | null>(null);
  longitude = signal<number | null>(null);
  watchId: string | null = null;
  errorMsg = signal<string | null>(null);

  photo = signal<string | null>(null);
  mapLink = computed(() => {
    const lat = this.latitude();
    const lon = this.longitude();
    return lat && lon ? `https://www.google.com/maps/@${lat},${lon}` : null;
  });

  constructor(private loc: LocationService) {}


  async ngOnInit() {
    await this.loc.ensurePermissions();
    await this.obtenerUbicacionActual();
    await this.iniciarSeguimiento();
  }

  async obtenerUbicacionActual() {
    try {
      const pos = await this.loc.getCurrentPosition();
      this.latitude.set(pos.coords.latitude);
      this.longitude.set(pos.coords.longitude);
      this.errorMsg.set(null);
    } catch (e: any) {
      this.errorMsg.set(e?.message ?? 'Error al obtener la ubicación actual');
    }
  }

  async iniciarSeguimiento() {
    try {
      this.watchId = await this.loc.watchPosition(
        (pos) => {
          this.latitude.set(pos.coords.latitude);
          this.longitude.set(pos.coords.longitude);
        },
        (err) => {
          this.errorMsg.set(err?.message ?? 'Error en seguimiento de ubicación');
        }
      );
    } catch (e: any) {
      this.errorMsg.set(e?.message ?? 'No se pudo iniciar el seguimiento');
    }
  }

  async detenerSeguimiento() {
    if (this.watchId) {
      await this.loc.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  ngOnDestroy() {
    if (this.watchId) this.loc.clearWatch(this.watchId);
  }

  async takePhotoAndSave() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      this.photo.set(image.webPath || null);

      const lat = this.latitude();
      const lon = this.longitude();
      const link = this.mapLink();

      if (!lat || !lon) {
        alert('No se han obtenido coordenadas aún.');
        return;
      }

      const content = `Foto tomada en:\nLatitud: ${lat}\nLongitud: ${lon}\nLink: ${link}`;

      await Filesystem.writeFile({
        path: `foto_ubicacion_${Date.now()}.txt`,
        data: content,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      alert('Foto y ubicación guardadas');
    } catch (err) {
      alert('No se pudo tomar la foto o guardar el archivo.');
    }
  }
}
