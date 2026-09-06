import { motion } from "framer-motion";

export default function Button({

    children,

    variant="primary",

}){

const styles={

primary:
"bg-[#0F4C81] hover:bg-[#123E67] text-white",

outline:
"border border-white text-white hover:bg-white hover:text-[#0F4C81]",

white:
"bg-white text-[#0F4C81] hover:bg-slate-100",

};

return(

<motion.button

whileHover={{scale:1.05}}

whileTap={{scale:.96}}

className={`${styles[variant]} px-8 py-4 rounded-xl font-semibold shadow-xl duration-300`}

>

{children}

</motion.button>

);

}