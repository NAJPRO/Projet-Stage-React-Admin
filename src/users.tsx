import { Theme, useMediaQuery } from '@mui/material';
import {BulkUpdateWithConfirmButton, Create, Datagrid, DeleteWithConfirmButton, Edit, EditButton, EmailField, List, SelectInput, Show, SimpleForm, SimpleList, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import MyCustomBulkUpdateButton from './components/MyCustomBulkUpdateButton';
import {UserStatusField} from './components/MyStatusField';




/**
 * Configuration des options de recherche
 * On va pouvoir effectuer une recherche Globale, une recherche depuis l'auteur du post et une recherche avec le status du Post
 */
const usersFilter = [
    <TextInput source='q' label="Search" alwaysOn={true}/>,
    <SelectInput 
        source="status" 
        label="Statut" 
        choices={[
            { id: 'active', name: 'Active' },
            { id: 'inactive', name: 'Inactive' }
        ]}
    />
];

const MyBulkActionPerso = (props) => {
    return (
        <BulkUpdateWithConfirmButton
            confirmTitle="Confirmation"
            confirmContent="Êtes-vous sûr de vouloir activer ces éléments ?"
            label="Activate"
            data={{ status: 'active' }} // Ajout de la clé "status" pour l'update
            {...props} // Props passées au composant 
        />
    );
};
export default MyBulkActionPerso

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
    return(
        <List filters={usersFilter} >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ):
            (
                <>
                    
                    <Datagrid bulkActionButtons={<MyCustomBulkUpdateButton/>} >
                        <TextField source="id" />
                        <TextField source="name" />
                        <TextField source="username" />
                        <EmailField source="email" />
                        <UserStatusField source='status'/>
                        <EditButton/>
                        <DeleteWithConfirmButton/>
                    </Datagrid>
                </>
            )}
        </List>
    )
}


export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <UserStatusField source='status'/>
            <EmailField source="email" />
        </SimpleShowLayout>
    </Show>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" required/>
            <SelectInput 
                required
                source="status" 
                label="Statut" 
                choices={[
                    { id: 'active', name: 'Active' },
                    { id: 'inactive', name: 'Inactive' }
                ]}
            />
            <TextInput source="password" required />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            {/* <TextInput source="id" disabled/> */}
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" required/>
            <SelectInput 
                required
                source="status" 
                label="Statut" 
                choices={[
                    { id: 'active', name: 'Active' },
                    { id: 'inactive', name: 'Inactive' }
                ]}
            />
            <TextInput source="password" required />
        </SimpleForm>
    </Create>
);