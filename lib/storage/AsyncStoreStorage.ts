import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStorage } from '.';

class AsyncStoreStorage implements IStorage {
    private static instance: AsyncStoreStorage;

    constructor() {
        if (AsyncStoreStorage.instance) {
            return AsyncStoreStorage.instance;
        }
        AsyncStoreStorage.instance = this;
    }

    cleanAll = async (services: string[]) => {
        try {
            await AsyncStorage.multiRemove(services);
        } catch (error) {
            console.warn('AsyncStoreStorage -> cleanAll: ', error);
        }
    }

    get = async (service: string) => {
        try {
            let payload = await AsyncStorage.getItem(service) as any;
            if (payload) {
                payload = JSON.parse(payload);
            }
            return payload;
        } catch (error) {
            console.warn('AsyncStoreStorage -> get: ', error);
            return null;
        }
    }

    set = async (service: string, payload: object | string | number | Array<any> | boolean) => {
        try {
            const payloadJSON = JSON.stringify(payload)
            console.log(payloadJSON)
            await AsyncStorage.setItem(service, payloadJSON);
            return true;
        } catch (error) {
            console.warn('AsyncStoreStorage -> set: ', error);
            return false;
        }
    }

    remove = async (service: string) => {
        try {
            await AsyncStorage.removeItem(service);
            return true;
        } catch (error) {
            console.warn('AsyncStoreStorage -> remove: ', error);
            return false;
        }
    }

}

export const storage = new AsyncStoreStorage();
