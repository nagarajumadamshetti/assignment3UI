import axios from '../axios';
const getCommentsAPI = async (value) => {
    try {
        let v = value;
        return await await axios.get(`/getComments/${v}`)
        
    } catch (error) {
        console.log(error)
    }

    // let v = value;
    // await axios.get(`/getComments/${v}`)
    //     .then((res) => {
    //         if (res.data.success) {
    //             return {
    //                 success: res.data.success,
    //                 data: res.data.data[0].comments,
    //             }
    //         }
    //         else {
    //             return {
    //                 success: res.data.success
    //             }
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         return {
    //             success: false,
    //             err
    //         }
    //     })
}
export default getCommentsAPI;
