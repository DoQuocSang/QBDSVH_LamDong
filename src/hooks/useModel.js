import { useState } from "react";

export default function UseModel(){
    const [isOpen, setIsOpen] = useState(false);
    const closeModel = () => setIsOpen(false);
    const openModel = () => { setIsOpen(true); }

    return { isOpen, openModel, closeModel };
}