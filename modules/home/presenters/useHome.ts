import { useEffect } from "react";
import { phonesModel } from "../entities/PhonesModel";
import { useSheetRef } from "@/components/nativewindui/Sheet";
import { phonesService } from "../entities/PhonesService";
import { IPhone } from "../entities/IPhone";

export const useHome = () => {
    const { phones } = phonesModel.usePhones();
    const addPhoneRef = useSheetRef();
    const editPhoneRef = useSheetRef();

    useEffect(() => {
        getPhones();
    }, []);

    const getPhones = async () => {
        const phones = await phonesService.get();
        if (phones) {
            phonesModel.phones = phones;
        };
    };

    const onOpenPhoneAdding = () => {
        addPhoneRef.current?.present();
    };

    const onAddPhone = async () => {
        const updatedPhones = await phonesService.insert(phonesModel.newPhone);
        if (updatedPhones) {
            phonesModel.phones = updatedPhones;
            phonesModel.newPhone = { name: '', phone: null };
            addPhoneRef.current?.close();
        };
    };

    const onOpenPhoneEditing = (item: IPhone) => {
        phonesModel.newPhone = item;
        editPhoneRef.current?.present();
    };

    const onEditPhone = async () => {
        const updatedPhones = await phonesService.update(phonesModel.newPhone as IPhone);
        if (updatedPhones) {
            phonesModel.phones = updatedPhones;
            phonesModel.newPhone = { name: '', phone: null };
            editPhoneRef.current?.close();
        };
    };

    return { addPhoneRef, editPhoneRef, phones, onOpenPhoneAdding, onAddPhone, onOpenPhoneEditing, onEditPhone };
};