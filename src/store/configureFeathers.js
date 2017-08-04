import io from 'socket.io-client';
import feathers from 'feathers/client';
import fHooks from 'feathers-hooks';
import fSocketio from 'feathers-socketio/client';
import fAuthentication from 'feathers-authentication-client';

const socket = io('http://localhost:3030');
const fClient = feathers();

fClient.configure(fHooks());
fClient.configure(fSocketio(socket));
fClient.configure(fAuthentication({
  storage: window.localStorage
}));

export default fClient;