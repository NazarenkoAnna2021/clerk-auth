import { ScreenContainer } from "@/components/screenContainer";
import { FC, memo, useCallback, useMemo } from "react";
import { FlatList, View } from "react-native";
import { useHome } from "../../presenters/useHome";
import { IPhone } from "../../entities/IPhone";
import { Text } from "@/components/nativewindui/Text";
import { MainHeader } from "@/components/mainHeader";
import { Button } from "@/components/nativewindui/Button";
import { getStyles } from "./styles";
import { phonesModel } from "../../entities/PhonesModel";
import { phonesService } from "../../entities/PhonesService";
import { PhoneInputsSheet } from "../components/phoneInputsSheet";

export const HomeView: FC = () => {
    const styles = useMemo(() => getStyles(), []);
    const { addPhoneRef, editPhoneRef, phones, onOpenPhoneAdding, onAddPhone, onOpenPhoneEditing, onEditPhone } = useHome();

    const keyExtractor = useCallback((item: IPhone) => (item.id.toString()), []);

    const renderItem = useCallback(({ item }: { item: IPhone }) => (
        <PhoneItem item={item} onEdit={onOpenPhoneEditing} />
    ), [])

    return (
        <ScreenContainer headerComponent={<MainHeader title={'Phones'} />}>
            <FlatList
                data={phones}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
            <Button style={styles.button} onPress={onOpenPhoneAdding}>
                <Text>Add phone</Text>
            </Button>
            <PhoneInputsSheet bottomSheetModalRef={addPhoneRef} buttonTitle={'Add phone'} onPress={onAddPhone} />
            <PhoneInputsSheet bottomSheetModalRef={editPhoneRef} buttonTitle={'Edit phone'} onPress={onEditPhone} />
        </ScreenContainer>
    )
};

interface IProps {
    item: IPhone;
    onEdit: (item: IPhone) => void;
};

const PhoneItem: FC<IProps> = memo(({ item, onEdit }) => {
    const styles = useMemo(() => getStyles(), []);

    const onDelete = async () => {
        const phones = await phonesService.delete(item.id);
        if (phones) {
            phonesModel.phones = phones;
        };
    };

    const handelOnEdit = () => {
        onEdit(item);
    };

    return (
        <View style={styles.item} >
            <Text style={{ flex: 1 }}>{item.name}: {item.phone}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Button variant={'plain'} onPress={handelOnEdit}>
                    <Text>Edit</Text>
                </Button>
                <Button variant={'plain'} onPress={onDelete}>
                    <Text>Delete</Text>
                </Button>
            </View>
        </View>
    )
});