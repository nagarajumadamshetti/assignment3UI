import axios from '../axios';
const getTimelineAPI = async (value) => {
    let id = localStorage.getItem("token");
    await axios.get(`/timeline/${id}`)
        .then((res) => {
            if (res.data.success) {
                return {
                    data: res.data.posts,
                    success: res.data.success
                }
            }
            else {
                return {
                    success: res.data.success
                }
            }
        })
        .catch((err) => {
            console.log(err)
            return {
                err,
                success: false
            };
        });
}
export default getTimelineAPI;
