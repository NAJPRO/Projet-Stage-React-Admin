import { Datagrid, DateField, DateInput, EditButton, List, ReferenceField, ReferenceInput, SimpleForm, TextField, TextInput, Edit, Create, SelectInput, DeleteWithConfirmButton, BulkDeleteWithConfirmButton, ShowButton, Show, SimpleShowLayout, required } from 'react-admin';
import {PostStatusField} from './components/MyStatusField';

/**
 * Configuration des options de recherche
 * On va pouvoir effectuer une recherche Globale, une recherche depuis l'auteur du post et une recherche avec le status du Post
 */
const postFilter = [
    <TextInput source='q' label="Search" alwaysOn={true}/>,
    <ReferenceInput source='userId' label="Auteur" reference='users'/>,
    <SelectInput 
        source="status" 
        label="Statut" 
        choices={[
            { id: 'published', name: 'Publié' },
            { id: 'draft', name: 'Brouillon' }
        ]}
    />
];

/**
 * Mise en place d'un message de confirmation pour les actions de suppression
 */
const CustomBulkActionButtons = () => (
    <>
        <BulkDeleteWithConfirmButton 
            mutationMode="pessimistic" 
            confirmTitle="Confirmation"
            confirmContent="Êtes-vous sûr de vouloir supprimer ces éléments ?"
            label="DELETE"
        />
    </>
);

// Création de la Liste de posts
export const PostList = () => (
    <List filters={postFilter}>
        <Datagrid rowClick={false} bulkActionButtons={<CustomBulkActionButtons/>} >
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" link="show"/>
            <TextField source="title" />
            <DateField source="date" />
            <PostStatusField source="status" />
            <EditButton/>
            <CustomBulkActionButtons/>
            <ShowButton/>
        </Datagrid>
    </List>
);

// Edition d'un post
export const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="title" />
            <ReferenceInput source="userId" reference="users" />
            <DateInput source="date" />
            <SelectInput 
                source="status" 
                label="Status" 
                choices={[
                    { id: 'draft', name: 'Draft' },
                    { id: 'published', name: 'Published' }
                ]}
            />
            <TextInput source="content" multiline rows={5}/>
        </SimpleForm>
    </Edit>
);

// Création d'un post
export const PostCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="title" validate={required()} />
            <ReferenceInput source="userId" reference="users" validate={required()} />
            <DateInput source="date" />
            <SelectInput 
                source="status" 
                label="Status" 
                choices={[
                    { id: 'draft', name: 'Draft' },
                    { id: 'published', name: 'Published' }
                ]}
                validate={required()} 
            />
            <TextInput source="content" multiline rows={3}/>
        </SimpleForm>
    </Create>
);

// Voir un post
export const PostShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="title" />
            <ReferenceField source="userId" reference="users" />
            <DateField source="date" />
            <PostStatusField source="status" />
            <TextField source="content" />
            <TextField source="id" />
        </SimpleShowLayout>
        <DeleteWithConfirmButton/>
    </Show>
);