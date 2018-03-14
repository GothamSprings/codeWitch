import firebase from 'firebase'
import { secrets } from './secrets.json'

var fire = firebase.initializeApp(secrets);
export default fire;
