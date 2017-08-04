import feathers from '../store/configureFeathers';

// WRAPPER SERVICE AROUND FEATHERS CLIENT
export class FeatherService {

    service(name) {
      return feathers.service(name)
    }
    
    on(event, cb) {
      return feathers.on(event, cb)
    }

    authenticate(payload) {
      return feathers.authenticate(payload)
    }
  
}
