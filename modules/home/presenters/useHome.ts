import { sqliteService } from "@/lib/SQLite/SQLite";
import { useEffect } from "react";
import { phonesModel } from "../entities/PhonesModel";
import { useSheetRef } from "@/components/nativewindui/Sheet";

export const useHome = () => {
    const { newPhone, phones } = phonesModel.usePhones();
    const bottomSheetModalRef = useSheetRef();

    useEffect(() => {
        getPhones();
    }, []);

    const getPhones = async () => {
        phonesModel.phones = await sqliteService.getPhones();
    };

    const onOpenSheet = () => {
        bottomSheetModalRef.current?.present();
    };

    const onAddPhone = async () => {
        phonesModel.phones = await sqliteService.insertPhone(newPhone);
        phonesModel.newPhone = { name: '', phone: null };
        bottomSheetModalRef.current?.close();
    };

    return { bottomSheetModalRef, newPhone, phones, onOpenSheet, onAddPhone };
};