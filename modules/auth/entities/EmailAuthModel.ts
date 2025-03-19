import { create } from "zustand";

interface IEmailAuth {
    emailAddress: string;
    password: string;
    code: string;
};

class EmailAuthModel implements IEmailAuth {
    private repository = create<IEmailAuth>(() => ({
        emailAddress: '',
        password: '',
        code: '',
    }));

    public get useEmailAuth() {
        return this.repository;
    }

    public get emailAddress() {
        return this.repository.getState().emailAddress;
    }

    public set emailAddress(value: string) {
        this.repository.setState({ emailAddress: value });
    }

    public get password() {
        return this.repository.getState().password;
    }

    public set password(value: string) {
        this.repository.setState({ password: value });
    }

    public get code() {
        return this.repository.getState().code;
    }

    public set code(value: string) {
        this.repository.setState({ code: value });
    }

    public clear = () => {
        this.emailAddress = '';
        this.password = '';
        this.code = ''
    }
};

export const emailAuthModel = new EmailAuthModel();