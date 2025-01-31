import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import StatFullTemplate from "./components/model";
// import { Card, CardContent, Typography } from '@mui/material';
import { useGetList } from 'react-admin';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export const Dashboard = () => {
    const [userCount, setUserCount] = useState(0)
    const [postCount, setPostCount] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await fetch(import.meta.env.VITE_JSON_SERVER_URL + "/users")
                const postsResponse = await fetch(import.meta.env.VITE_JSON_SERVER_URL + "/posts")
    
                const users = await usersResponse.json()
                const posts = await postsResponse.json()
    
                setUserCount(users.length)
                setPostCount(posts.length)
    
    
            } catch (error) {
                console.error("Une erreur est survenu lors de la récupération des données : ", error);
            }
        }
        fetchData();
    }, []);

    const { data: posts, isLoading: postsLoading } = useGetList('posts');
    const { data: users, isLoading: usersLoading } = useGetList('users');

    if (postsLoading || usersLoading) return <div>Chargement...</div>;

    // 1. Données pour le diagramme à barres : nombre de publications par utilisateur
    const postsByUser = users.map(user => ({
        name: user.name,
        posts: posts.filter(post => post.userId === user.id).length,
    }));

    // 2. Données pour le diagramme circulaire : répartition des statuts des publications
    const publishedCount = posts.filter(post => post.status === 'published').length;
    const draftCount = posts.length - publishedCount;

    const statusData = [
        { name: 'Published', value: publishedCount },
        { name: 'Draft', value: draftCount }
    ];

    const COLORS = ['#0088FE', '#FFBB28'];

    return (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Card style={{ flex: 1, minWidth: 300 }}>
                <CardContent>
                    <Typography variant="h6">Nombre de publications par utilisateur</Typography>
                    <BarChart width={400} height={300} data={postsByUser}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="posts" fill="#8884d8" />
                    </BarChart>postsLoading
                </CardContent>
            </Card>

            <Card style={{ flex: 1, minWidth: 300 }}>
                <CardContent>
                    <Typography variant="h6">Répartition des publications</Typography>
                    <PieChart width={400} height={300}>
                        <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </CardContent>
            </Card>
            <Card style={{flex:1, minWidth: 300}}>
                {/* <CardHeader title ="Mon tableau de bord"/> */}
                <CardContent>
                    <Stack direction={"row"} spacing={4}>
                        {StatFullTemplate(userCount, "Users")}

                        {StatFullTemplate(postCount, "Posts")}
                    </Stack>
                </CardContent>
            </Card>
        </div>
        
    );

  

}