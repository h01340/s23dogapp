import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from "./Home";
import Products from "./Products";
import About from "./About";


function TabMenu() {
    const [value, setValue] = useState("About");

    const handleChange = (event, value) => {
        console.log("value is " + value);
        setValue(value);
    }
    return (
        <div>
            <Tabs value={value} onChange={handleChange} >
                <Tab label="Home" value = "Home"/>
                <Tab label="Products" value = "Products"/>
                <Tab label="About us" value="About"/>

            </Tabs>
            {value === "Home" && <Home/>}
            {value === "Products" && <Products/>}
            {value === "About" && <About/>}
        </div>
    );
}

export default TabMenu;