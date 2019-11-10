import { url } from './../config';
import PubSub from './../utils/PubSub';

class CarroService {
    constructor() {
        this.resource = '/carros';
        this.namespace = 'carros';

    }

    list(){
        fetch(url + this.resource)
        .then(r => r.json())
        .then(r => {
            PubSub.emit(this.namespace + '.list', r);
        })
        .catch(e => console.log(e));
    }

    save(carro) {
        let method = carro.id ? 'PUT' : 'POST';

        fetch(url + this.resource + ( carro.id ? '/' + carro.id : ''), {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carro)
        })
        .then(r => r.json())
        .then(r => {
            PubSub.emit(this.namespace + '.save', {});
        })
        .catch(e => console.log(e));
    }

    remove(id) {
        console.log('ID: ' + id + ' | ROTA: ' + url + this.resource + '/' + id);
        fetch(url + this.resource + '/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(r => {
            PubSub.emit(this.namespace + '.deleted', {});
        })
        .catch(e => console.log(e));
    }
}

export default CarroService;