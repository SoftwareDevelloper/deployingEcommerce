import chair from '../Products/chair.png';
import controlleur from '../Products/controlleur.png';
import keyboardGamer from '../Products/gamerKeyboard.png';
import tv from '../Products/TV.png';

let bestSellerProducs =[
    {
        id:1,
        title:"HAVIT HV-G92 GAMEPAD",
        image:controlleur,
        oldprice:160,
        newprice:96,
        rating:"5",
        discount:-40,
    },
    {
        id:2,
        title:"AK-900 Wired Keyboard",
        image:keyboardGamer,
        oldprice:1160,
        newprice:754,
        rating:"4",
        discount:-35,
    },
    {
        id:3,
        title:"IPS LCD Gaming Monitor",
        image:tv,
        oldprice:400,
        newprice:280,
        rating:"5",
        discount:-30,
    },
    {
        id:"4",
        title:"S-serie Comfort Chair ",
        image:chair,
        oldprice:400,
        newprice:320,
        rating:"4.5",
        discount:-20,
    }
]

export default bestSellerProducs
