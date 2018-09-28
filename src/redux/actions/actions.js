import axios from 'axios';

const url = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:5000/api/';

export function loadArticles() {
    return (dispatch) => {
        axios.get(`${url}articles`).then((res) => {
            let articles = res.data;
            dispatch({type: 'LOAD_ARTICLES'}, articles);
        }).catch((err) => {
            console.log(err);
        });
    };
}

export function getUser (id){
    return axios.get(`${url}user/${id}`).then((res) => {
        return res.data;
    }).catch((err)=>{
        console.log(err);
    })
}

export function getUserProfile(id) {
    return (dispatch) =>{
        axios.get(`${url}user/profile/${id}`).then((res)=>{
            let profile = res.data;
            dispatch ({type: 'VIEW_ARTICLE', article});
        }).catch((err)=>{
            console.log(err);
        });
    }
}
