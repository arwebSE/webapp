import React, { useState } from "react";

import AuthModel from "../models/auth";
import AuthFields from "../components/AuthFields";
import { toast } from "../utils/misc";

export default function Login({ navigation }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    const USEREXISTSERROR = "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email, users.apiKey";

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);

            if (result.data) {
                toast(result.data.message);
                console.log("User register success!");
            } else if (result.errors) {
                if (result.errors.detail == USEREXISTSERROR) {
                    console.log("Error: User already registered!");
                    toast("That email is already registered.");
                } else console.log("Error registering user!", result);
            } else {
                console.log("Error registering user!", result);
            }
        }
    }

    return <AuthFields auth={auth} setAuth={setAuth} submit={doRegister} title="Register" navigation={navigation} />;
}
