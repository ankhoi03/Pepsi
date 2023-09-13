import {getStorage} from 'firebase/storage';
import {app} from './Config';

export const storage = getStorage(app);
