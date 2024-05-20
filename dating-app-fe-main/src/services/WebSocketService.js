import { showToast } from '../common/CommonUtils';
import { ERROR_CODE, SOCKET_URL } from '../common/Constants'

class WebSocketService {
    constructor(url) {
      this.url = url;
      this.socket = null;
    }
  
    isConnected = false;

    connect(userId, token, onMessage) {
     try {
      const socketUrl = `${this.url}${userId}/?Accesstoken=${token}`
      this.socket = new WebSocket(socketUrl);
  
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
      };
  
      this.socket.onerror = (error) => {
        this.isConnected = false;
        showToast(ERROR_CODE._137, error);
      };

      this.socket.onmessage = (event) => {
        onMessage(event.data);
      };
  
      this.socket.onclose = () => {
        this.isConnected = false;
        console.log('WebSocket closed');
      };
     }
     catch(er) {
      onMessage(null);
      showToast(ERROR_CODE._138, 'Web scoket is not inialized');
      return;
     }
    }
  
    send(message) {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      } else {
        //console.error('WebSocket is not open. Cannot send message.');
        showToast(ERROR_CODE._139, 'WebSocket is not open. Cannot send message.');
      }
    }
  
    close() {
      this.socket.close();
    }

  };

  const wss = new WebSocketService(SOCKET_URL);

  export default wss;