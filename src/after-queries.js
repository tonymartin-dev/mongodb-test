const afterFind = async (res) => {
    var documents = await res.toArray();
    console.log('> POSTS ARRAY: ', documents);
    return documents;
}

const afterFindNext = async (res) => {
    var documents= await [];
    while(await res.hasNext()){
        let document = await res.next();
        console.log('> POST: ', document);
        documents.push(document);
    }
    return documents;
}


module.exports = {
    afterFind: afterFind,
    afterFindNext: afterFindNext
}