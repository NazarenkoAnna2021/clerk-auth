import { FC, LegacyRef, memo, useMemo } from "react";
import { Text } from "@/components/nativewindui/Text";
import { Button } from "@/components/nativewindui/Button";
import { getStyles } from "./styles";
import { MainInput } from "@/components/mainInput";
import { Sheet } from "@/components/nativewindui/Sheet";
import { BottomSheetModal, BottomSheetModalProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { phonesModel } from "@/modules/home/entities/PhonesModel";

interface IProps extends Omit<BottomSheetModalProps, 'children'> {
    bottomSheetModalRef: LegacyRef<BottomSheetModal>;
    buttonTitle: string;
    onPress: () => void;
};

export const PhoneInputsSheet: FC<IProps> = memo(({ bottomSheetModalRef, buttonTitle, onPress, snapPoints, ...props }) => {
    const styles = useMemo(() => getStyles(), []);
    const { newPhone } = phonesModel.usePhones();

    return (
        <Sheet {...props} ref={bottomSheetModalRef} snapPoints={snapPoints || [450, 500, 600]}>
            <BottomSheetView style={styles.addPhoneWrapper}>
                <MainInput
                    maxLength={30}
                    placeholder={'Name'}
                    value={newPhone?.name}
                    onChangeText={(name) => { phonesModel.newPhone = { ...newPhone, name } }}
                    containerStyle={styles.input}
                />
                <MainInput
                    maxLength={10}
                    placeholder={'Phone'}
                    value={newPhone?.phone?.toString()}
                    onChangeText={(phone) => { phonesModel.newPhone = { ...newPhone, phone: phone ? Number(phone) : null } }}
                    containerStyle={styles.input}
                />
                <Button onPress={onPress} disabled={!newPhone.name || !newPhone.phone} >
                    <Text>{buttonTitle}</Text>
                </Button>
            </BottomSheetView>
        </Sheet>
    )
});
