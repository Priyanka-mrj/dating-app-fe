import {AsyncStorage} from 'react-native';

class AsyncUtils {

    storeData = async (data, key) => {
        try {
          const stringifiedData = typeof data === 'string' ? data : JSON.stringify(data);
          await AsyncStorage.setItem(stringifiedData, key);
        } 
        catch (error) {
          console.error('error in saving : ', error)
        }
      };

      retrieveData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            return JSON.parse(value);
          }
          return value;
        } 
        catch (error) {
          // Error retrieving data
          console.error('error in getting stored data : ', error)
          return null;
        }
      };

};

const ansyncUtils = new AsyncUtils();

export default ansyncUtils;
