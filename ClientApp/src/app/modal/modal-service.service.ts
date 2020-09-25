import {
  Injectable,
  ComponentFactoryResolver,
  ComponentFactory,
  ApplicationRef,
  ComponentRef,
  Inject,
  Type
} from '@angular/core';

//import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { Modal } from './models/modal.model';
import { ModalRef } from './models/modal-ref.model';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import Nodo from '../clases/Nodo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Importo el archivo JSON 
import parametros from 'src/assets/json/parametros.json';

@Injectable()
export class ModalService {
  public listAbm : Nodo; //Es la lista de nodos de navegacion que el usuario recorre cuando navega hacia otro abm
  public lista : string[] = new Array<string>(); //es una lista de string de los componentes abm que el usuario recorre
  public actual : string ; //representa el componente abm actual
  private modalContainer: HTMLElement;
  private modalContainerFactory: ComponentFactory<ModalContainerComponent>;
  public filtro: any[]; //se obtiene un array componente del abm-seleccionado para identificar sus parámetros para el filtrado
  public estados: string[];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private http: HttpClient, @Inject('BASE_URL') private baseUrl: string
  ) {
    this.setupModalContainerFactory();
  }

  open<T extends Modal>(component: Type<T>, inputs?: any): ModalRef {
    this.setupModalContainerDiv();

    const modalContainerRef = this.appRef.bootstrap(this.modalContainerFactory, this.modalContainer);

    const modalComponentRef = modalContainerRef.instance.createModal(component);

    if (inputs) {
      modalComponentRef.instance.onInjectInputs(inputs);
    }

    const modalRef = new ModalRef(modalContainerRef, modalComponentRef);

    return modalRef;
  }

  private setupModalContainerDiv(): void {
    this.modalContainer = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(this.modalContainer);
  }

  private setupModalContainerFactory(): void {
    this.modalContainerFactory = this.componentFactoryResolver.resolveComponentFactory(ModalContainerComponent);
  }

  //Busca el objeto de cualquier id seleccionado dentro de la ventana de abm
  public getDescripcion(id: string, tabla :string) : Observable<any>{
    let token = localStorage.getItem("Access_Token");
        if (token == undefined || token == null){token ='';}
          let headers = new HttpHeaders({'Content-Type':'application/json', 'token' : token});
    //const headers = new HttpHeaders({ });
    return this.http.get<any>(this.baseUrl + 'api/'+tabla+'/'+id, { headers: headers });
  }

  //Actualiza la lista que figura en el navbar de los componentes abmque el usuario recorre
  public setListaAbm () {
    this.lista = new Array<string>();
    if (this.listAbm == null || this.listAbm == undefined){ return [];}
    let node = this.listAbm;
    while (node.getData() != null && node.getData() != undefined){
      this.lista.push(node.getData().name);
      if (node.getNext() != null && node.getNext() != undefined){
        node = node.getNext();}
        else {break;}
    }

    this.lista = this.lista.reverse();
  } 

  //crea un array de filtros para que la ventana de filtros identifique a que abm se hace referencia 
  // y el usuario pueda filtrar los campos
  public setFiltro(objeto){
    this.filtro = new Array<any>();
    for(var i in objeto){
        let tp: string = "text";
        if(i.toString().startsWith('id')){
          tp = "list";
          i = i.replace("id","");
        }
        else if (i.toString()=='estado'){
          tp = "case";
        }
        else if (Number.isInteger(objeto[i])) {
          tp = "number";
        }
        else if (objeto[i] instanceof Date) {
          tp = "date"
        }

        if(!(i.toString()=='id')&&!(i.toString().startsWith('codigo'))){
          this.filtro.push({'campo' : i.toString(), 'tipo' : tp})}
    }
  }
  
  public setCaseEstado(abm: string) {
    let parame = parametros;
    for (let p in parame){
      if(p==abm){
        this.estados = parame[p];
      }
    }
  }
  
}
