import React from "react";
import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DesignIllustration from "images/stats-illustration.svg";


export default () => {
    document.title = 'Quản lý chung';

    return (
        <main>
            <div className="pt-6 px-4">
                <div className="w-full mb-8">
                    <div className="h-full flex flex-col justify-center items-center content-center justify-items-center my-20">
                        <img className="h-80 w-auto mb-20" src={DesignIllustration} alt="Neil image" />
                        <span className="self-center whitespace-nowrap text-4xl font-extrabold">Chào mừng bạn đến với Admin</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
