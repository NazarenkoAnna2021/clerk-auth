import { create } from "zustand";
import { IPhone } from "./IPhone";

interface IPhoneModel {
    newPhone: Omit<IPhone, 'id'>;
    phones: IPhone[];
};

class PhonesModel implements IPhoneModel {
    private repository = create<IPhoneModel>(() => ({
        newPhone: { phone: null, name: '' },
        phones: []
    }));

    public get usePhones() {
        return this.repository
    }

    public get newPhone() {
        return this.repository.getState().newPhone;
    }

    public set newPhone(value: Omit<IPhone, 'id'>) {
        this.repository.setState({ newPhone: value });
    }

    public get phones() {
        return this.repository.getState().phones;
    }

    public set phones(value: IPhone[]) {
        this.repository.setState({ phones: value });
    }

    public clear = () => {
        this.newPhone = { name: '', phone: null };
        this.phones = [];
    }

};

export const phonesModel = new PhonesModel();