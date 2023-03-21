import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: any[] = [];
  ingresoEgresoSubs: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoEgresoSubs = this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.items = items;
    });
  }

  ngOnDestroy() {
    this.ingresoEgresoSubs.unsubscribe();
  }


  borrar(uid: string){
    this.ingresoEgresoService.borrarIngresosEgresos(uid)  
      .then( () => Swal.fire('Borrado', 'item borrado', 'success'))
      .catch( err => Swal.fire('Error', err.message, 'error'));
  }
}
