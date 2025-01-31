import { Admin, Button, defaultLightTheme, Resource } from "react-admin";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

import { dataProvider } from "./dataProvider";
import { UserEdit, UserList, UserShow, UserCreate } from "./users";
import { PostCreate, PostEdit, PostList, PostShow } from "./posts";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";
import myCustomTheme from "./components/theme1";

import { useState } from "react";
import { ThemeProvider } from "@mui/material";

export const App = () => {
    const [theme, setTheme] = useState(defaultLightTheme);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === defaultLightTheme ? myCustomTheme : defaultLightTheme));
    };

    return (
        <ThemeProvider theme={theme}>
    {/* <Button onClick={toggleTheme} sx={{ position: 'absolute', top: 10, right: 10 }}>
        {theme.palette.mode === 'light' ? 'Mode sombre' : 'Mode clair'}
    </Button> */}

            <Admin
                authProvider={authProvider}
                dataProvider={dataProvider}
                dashboard={Dashboard}
                theme={myCustomTheme}
            >
                <Resource
                    name="users"
                    list={UserList}
                    show={UserShow}
                    icon={UserIcon}
                    edit={UserEdit}
                    create={UserCreate}
                />
                <Resource
                    name="posts"
                    list={PostList}
                    edit={PostEdit}
                    create={PostCreate}
                    icon={PostIcon}
                    show={PostShow}
                />
            </Admin>
        </ThemeProvider>
    );
};
