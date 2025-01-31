import { useRecordContext } from "react-admin"

const PostStatusField = ({source}: {source: string}) => {
    const record = useRecordContext()
    if(!record) return null
    return(
        <label  style={{color: (record[source] == "published" ? "green" : "grey")}}>
            {record[source]}
        </label>
    )
}


const UserStatusField = ({source}: {source: string}) => {
    const record = useRecordContext()
    if(!record) return null
    return(
        <label  style={{color: (record[source] == "active" ? "green" : "grey")}}>
            {record[source]}
        </label>
    )
}
export { UserStatusField, PostStatusField };
