export function convertSnapshots<T>(results) {
    return <T[]> results.docs.map(snap => {
        return {
            //we return the id that comes apartand include it on the rest of the spread
            id: snap.id, 
            ...<any>snap.data()
        }
    })
}