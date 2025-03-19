import { ScreenContainer } from "@/components/screenContainer";
import { FC, memo, useCallback, useMemo } from "react";
import { FlatList, View } from "react-native";
import { useHome } from "../../presenters/useHome";
import { IPhone } from "../../entities/IPhone";
import { Text } from "@/components/nativewindui/Text";
import { MainHeader } from "@/components/mainHeader";
import { Button } from "@/components/nativewindui/Button";
import { getStyles } from "./styles";
import { sqliteService } from "@/lib/SQLite/SQLite";
import { phonesModel } from "../../entities/PhonesModel";
import { MainInput } from "@/components/mainInput";
import { Sheet } from "@/components/nativewindui/Sheet";
import { scaleHorizontal, scaleVertical } from "@/Utils";
import { BottomSheetView } from "@gorhom/bottom-sheet";

export const HomeView: FC = () => {
    const styles = useMemo(() => getStyles(), []);
    const { bottomSheetModalRef, newPhone, phones, onOpenSheet, onAddPhone } = useHome();

    const keyExtractor = useCallback((item: IPhone) => (item.id.toString()), []);

    const renderItem = useCallback(({ item }: { item: IPhone }) => (
        <PhoneItem item={item} />
    ), [])

    return (
        <ScreenContainer headerComponent={<MainHeader title={'Phones'} />}>
            <FlatList
                data={phones}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
            <Button style={styles.button} onPress={onOpenSheet}>
                <Text>Add phone</Text>
            </Button>
            <Sheet ref={bottomSheetModalRef} snapPoints={[450, 500, 600]}>
                <BottomSheetView style={styles.addPhoneWrapper}>
                    <MainInput
                        placeholder={'Name'}
                        value={newPhone?.name}
                        onChangeText={(name) => { phonesModel.newPhone = { ...newPhone, name } }}
                        containerStyle={styles.input}
                    />
                    <MainInput
                        placeholder={'Phone'}
                        value={newPhone?.phone?.toString()}
                        onChangeText={(phone) => { phonesModel.newPhone = { ...newPhone, phone: phone ? Number(phone) : null } }}
                        containerStyle={styles.input}
                    />
                    <Button onPress={onAddPhone} disabled={!newPhone.name || !newPhone.phone} >
                        <Text>Add phone</Text>
                    </Button>
                </BottomSheetView>
            </Sheet>
        </ScreenContainer>
    )
};

interface IProps {
    item: IPhone;
};

const PhoneItem: FC<IProps> = memo(({ item }) => {
    const styles = useMemo(() => getStyles(), []);

    const onDelete = async () => {
        const phones = await sqliteService.deletePhone(item.id);
        phonesModel.phones = phones;
    };

    return (
        <View style={styles.item}>
            <Text>{item.name}: {item.phone}</Text>
            <Button onPress={onDelete}>
                <Text>Delete</Text>
            </Button>
        </View>
    )
});