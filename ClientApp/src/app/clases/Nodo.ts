/**
 * @class Nodo
 */
export default class Nodo {
    private data: any;
    private next: Nodo;
    
    /**
     * @constructor constructor de la clase
     * @param data {any} el dato que quieres que el nodo contenga
     */
    constructor(data: any) {
      this.data = data;
      this.next = null;
    }
    /**
     * @function getNext
     * @return null si el siguiente nodo es null o el siguiente nodo de la lista
     */
    public getNext(): Nodo {
      return this.next;
    }
    public getData(): any {
      return this.data;
    }
  
    public setNext(next: Nodo): void {
      this.next = next;
    }
  
    public setData(data: any): void {
      this.data = data;
    }
  
  }