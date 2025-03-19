import { sqliteService } from "@/lib/SQLite/SQLite";
import { useEffect } from "react";
import { phonesModel } from "../entities/PhonesModel";

export const useHome = () => {
    const { newPhone, phones } = phonesModel.usePhones();

    useEffect(() => {
        getPhones();
    }, []);

    const getPhones = async () => {
        phonesModel.phones = await sqliteService.getPhones();
    };

    const onAddPhone = async () => {
        phonesModel.phones = await sqliteService.insertPhone(newPhone);
        phonesModel.newPhone = { name: '', phone: null };
    };

    return { newPhone, phones, onAddPhone };
};