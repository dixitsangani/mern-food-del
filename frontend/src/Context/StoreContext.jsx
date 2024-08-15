import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});
    const url = "http://localhost:8001";

    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/cart/addtocart", { itemId }, { headers: { token } })
        }
    };

    const removeToCart = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            await axios.delete(`http://localhost:8001/cart/removetocart/${itemId}`, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
        }
        return totalAmount;
    };



    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/admin/viewfoodlist`);
            if (response.data.status === 1) {
                setFood_list(response.data.record)
            } else {
                setFood_list([]);
                console.log("No food records found");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };  
    

    const loadCartData = async (token)=>{
        const response = await axios.post("http://localhost:8001/cart/gettocart",{},{headers:{token}})
        setCartItem(response.data.cartData);
    }


    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeToCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
