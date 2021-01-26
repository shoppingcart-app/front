import Axios from 'axios';
export const search=(item)=>{
   return Axios.get(`book/search/${item}`).then((itemList)=>{
            return itemList.data;
    }).catch((err)=>{return {message:err.message}});
}

export const getCartItems=(userName)=>{
   return Axios.get(`cart/getCartItems?userName=${userName}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const decrement=(id,userName)=>{
    return Axios.post(`cart/dec?id=${id}&userName=${userName}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const increment=(id,userName)=>{
    return Axios.post(`cart/inc?id=${id}&userName=${userName}`).then((res)=>{  
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const deleteBook=(id,userName)=>{
   return Axios.post(`cart/deleteBook?id=${id}&userName=${userName}`).then((res)=>{
        return res.data;  
    }).catch((err)=>{return {message:err.message}});
}
export const placeOrder=(orderItems)=>{
    return Axios.post(`order/placeOrder`,orderItems).then((res)=>{
         return res.data;  
     }).catch((err)=>{return {message:err.message}});
 }
 export const orders=(userName)=>{
    return Axios.get(`order/orderedItems?userName=${userName}`).then((res)=>{
         return res.data;  
     }).catch((err)=>{return {message:err.message}});
 }
export const getCategories=()=>{
    return Axios.get('book/getCategories').then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const getAuthors=()=>{
    return Axios.get('book/getAuthors').then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const getBookByCategory=(category)=>{
    return Axios.get(`book/getBookByCategory/${category}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const getBookByAuthor=(author)=>{
    return Axios.get(`book/getBookByAuthor/${author}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const deleteCategory=(id)=>{
    return Axios.post(`book/deleteCategory/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const deleteAuthor=(id)=>{
    return Axios.post(`book/deleteAuthor/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const addBook=(book)=>{
    return Axios.post(`book/addBook/`,book).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const getBooks=()=>{
    return Axios.get(`book/getBooks`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const deleteBookById=(id)=>{
    return Axios.post(`book/deleteBook/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const getBookById=(id)=>{
    return Axios.get(`book/getBookById/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}