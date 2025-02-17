import {ID, storage} from '@/appwrite';
const uploadImage = async (file: File)=>{
    if(!file) return;
    const fileUploaded = await storage.createFile(
        "66818cee003be583ebd4",
        ID.unique(),
        file
    );
    return fileUploaded;
}
export default uploadImage