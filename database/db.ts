import mongoose from "mongoose";
/**
 * 0 = disconected
 * 1 = connected
 * 2 = connecting
 * 3 = disconecting
 */

const mongoConnection = {
    isConnecting: 0
}
export const connect = async ()=>{
    console.log('database',mongoConnection.isConnecting);
    console.log("connections",mongoose.connections.length);
   if( mongoConnection.isConnecting !== 0 ){
    console.log('database was already connected connected')
    return;
}
if(mongoose.connections.length > 0 ){
    mongoConnection.isConnecting = mongoose.connections[0].readyState;
    if(mongoConnection.isConnecting === 1 ){
        console.log('using previous connection');
        return 
    } 
      await mongoose.disconnect();
}
await mongoose.connect(process.env.MONGO_URL||'');
mongoConnection.isConnecting = 1;
console.log('connected to mongoDB',)  
}
export const disconect =  async ()=>{
    if(process.env.NODE_ENV === 'development'){
        console.log("development Environment db no disconnected")
        return 
    } 
    await mongoose.disconnect();
    mongoConnection.isConnecting = 0;
    console.log("Disconected from the database");
}