const baseURL = 'https://e-commerce-rest-api-afg8.onrender.com/';

const token = localStorage.getItem('token');

const getCart = async(id, setData)=> {
    try{
    const result = await fetch(`https://e-commerce-rest-api-afg8.onrender.com/cart/${id}`,{headers:{
        Authorization:token
    },
      method:"GET", credentials:'include'});
    if(!result.ok){
        console.log(result.message);
        return;
    }
    const data = await result.json();
    if(data){
        setData(data);
    }
    return data;
    }catch(err){
        console.log(err);
    }
};

const gotoCart = async(id, product_id)=>{
    try{
        const result = await fetch(`https://e-commerce-rest-api-afg8.onrender.com/cart`,{
            method:"POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({id: id, product_id: product_id}),
        });
        const data = await result.json();
        if(!result.ok){
            console.log(data.message);
            return;
        }
        if(result.ok){
            console.log(data.message);
            return;
        }
    }catch(err){
        console.log(err);
    }
}

const incart = async(user_id, product_id)=>{
    try{
        const result = await fetch(`https://e-commerce-rest-api-afg8.onrender.com/cart/inc/${user_id}`,
        { method :"POST",
          headers:{
            "Content-Type": "application/json",
            Authorization:token
            },
            credentials:"include",
            body: JSON.stringify({product_id: product_id})    
        });
        const data = await result.json();
        console.log(data.message);
        return;
    }catch(err){
        console.log(err);
    }
};

const decart = async(user_id, product_id)=>{
    try{
        const result = await fetch(`https://e-commerce-rest-api-afg8.onrender.com/cart/dec/${user_id}`,
        { method :"POST",
          headers:{
            "Content-Type": "application/json",
            Authorization: token
            },
            credentials:"include",
            body: JSON.stringify({product_id: product_id})    
        });
        const data = await result.json();
        console.log(data.message);
        return;
    }catch(err){
        console.log(err);
    }
};

const getProducts = async (setProducts) => {
    try {
        const result = await fetch('https://e-commerce-rest-api-afg8.onrender.com/products', { method: "GET" });
        if (!result.ok) {
            const data = await result.json();
            console.log(data.message);
            return;
        } else {
            const data = await result.json();
            setProducts(data);
            return data;
        }
    } catch (err) {
        console.log(err);
    }
};

const getSearchResult = async (searchTerm, setProducts) => {
    try {    
        const result = await fetch(`https://e-commerce-rest-api-afg8.onrender.com/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ searchterm: searchTerm.toLowerCase() })
        });

        const data = await result.json();

        if (!result.ok) {
            console.log(data.message, data.result);
            return;
        } else {
            setProducts(data);
            return data;
        }
    } catch (err) {
        console.log(err);
    }
};

const getCategory = async(category)=>{
    try{
        const result = await fetch(`https://e-commerce-rest-api-afg8.onrender.com/category`,{method:"GET", body:{category: category}});
        if(!result.ok){
            const data = await result.json()
            console.log(data.message);
        }
            return result.json();
    }catch(e){
        console.log(e);
    }
};

const login = async(username, password, setLogged, setErr, setName, setid)=>{
    try{
        const result = await fetch(`https://e-commerce-rest-api-afg8.onrender.com/login`,
        {method:"POST", 
            headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify({username: username, password: password}),
            credentials:"include"
        });
        if(!result.ok){
            setErr(true);
        }
        if(result.ok){
            const responseData = await result.json();
            // sessionStorage.setItem("sessionId", responseData.sessionId)
            console.log(responseData);
            if(responseData.user.user_name){
                // setName(responseData.user.user_name);
                // setid(responseData.user.user_id);
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('sessionID', responseData.session);
                localStorage.setItem('id', responseData.user.user_id);
                localStorage.setItem('name', responseData.user.user_name);
            }
            setLogged(true)
        }
    }catch(e){
        console.log(e);
    }
};

const signup = async (username, password, user_id, setLogged, setErr, setName) => {
    try {
        const result = await fetch(`https://e-commerce-rest-api-afg8.onrender.com/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Specify JSON content type
            },
            credentials:"include",
            body: JSON.stringify({ // Convert object to JSON string
                username: username,
                password: password,
                user_id: user_id
            })
        });
        if(result.ok){
            const responseData = await result.json();
            if(responseData.user.user_name){
                // setName(responseData.user.user_name);
                localStorage.setItem('name', responseData.user.user_name);
                localStorage.setItem('id', responseData.user.user_id);
            }
            setLogged(true)
        }
        if (!result.ok) {
            setErr(true);
        }
    } catch (e) {
        console.log(e);
    }
};

const logout = async(setLogged)=>{
    try{
        const result = fetch('https://e-commerce-rest-api-afg8.onrender.com/logout', {
            method: "POST",
            credentials:"include"
        });
        if(result){
            setLogged(false);
            localStorage.removeItem('token');
            console.log("logged out");
        }
    }catch(e){
        console.log(e);
    }
}

const register = async(username, password, user_id, setLogged, setErr)=>{
    await signup(username, password, String(user_id), setLogged, setErr);
    console.log("register called")
}

module.exports = {
    register: register,
    login:login,
    gotoCart: gotoCart,
    getCart:getCart,
    logout: logout,
    getProducts:getProducts,
    incart: incart,
    decart: decart,
    getSearchresult: getSearchResult
}



