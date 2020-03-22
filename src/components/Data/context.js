import { RemoteMongoClient, Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'
import React, { useState, useEffect } from "react"


const client = Stitch.initializeDefaultAppClient("geo-protection-vaqca")
const mongo = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
const db = mongo.db("geodatadev").collection('healthmap')

const get_docs = () => db.find({}, { limit: 100}).asArray().catch(console.log)
export const { Provider, Consumer } = React.createContext()



export const DBProvider = ({ children }) => {
    const [ id, setId ] = useState(null)
    const [ docs, setDocs ] = useState([])
  
    useEffect(() => {
      async function fetchData(){
        const { id } = await client.auth.loginWithCredential(new AnonymousCredential())
        setId(id)

        const docs = await get_docs()
        setDocs(docs)
        console.log(docs)
      }
      
      fetchData()
    }, [])

    return <Provider value={{docs: docs, db: db, id: id}}>{children}</Provider>
}

