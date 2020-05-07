import axios from '../axios';
const uploadPostAPI = (value) => {
    return axios.post('/uploadNewPost', {
        description: value.description,
        imageList: value.fileList
    });
}
export default uploadPostAPI;