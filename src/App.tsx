import { Admin, defaultLightTheme, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";

import { UserEdit, UserList, UserShow } from "./users";
import { PostCreate, PostEdit, PostList, PostShow } from "./posts";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";
import myCustomTheme from "./components/MyTheme";

import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

export const App = () => {

    return (
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
            dashboard={Dashboard}
            lightTheme={defaultLightTheme}
            darkTheme={myCustomTheme}
            defaultTheme="light"

        >
            <Resource
                name="users"
                list={UserList}
                show={UserShow}
                icon={UserIcon}
                edit={UserEdit}
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
    );
};
