import axios from '../axios';
const uploadPostAPI = (value) => {
    return axios.post('/uploadNewPost', {
        description: value.description,
        imageList: value.fileList
    },
        {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }
        })
    }
export default uploadPostAPI;