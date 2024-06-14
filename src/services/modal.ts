import * as bootstrap from 'bootstrap';

export class Modal{
    static openModal(id: string){
        const modal = document.getElementById(id);
        if(modal) {
          const bsModal = new bootstrap.Modal(modal);
          bsModal.show();
        }
    }
}