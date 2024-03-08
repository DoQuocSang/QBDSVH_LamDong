import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Moment from 'moment';
import tw from "twin.macro";
import { remove } from 'diacritics';
import PostDefault from "images/post-default.png";
import { ReactComponent as SvgDotPatternIcon } from "images/dot-pattern.svg";


export function isEmptyOrSpaces(str) {
    return str == null || (typeof str === 'string' && str.match(/^ *$/) !== null);
}

export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function toVND(value) {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

export function formatDateTme(value) {
    const time = " - " + Moment(value).format("kk:mm:ss");
    const date = Moment(value).format("DD/MM/YYYY");
    return date + time;
}

export function FormatParagraph({ props }) {
    //console.log(props.split('\n')); 
    const newText = props.split('\r\n\r\n').map(str => <p css={tw`pb-2`}>{str}</p>);
    return newText;
}

export function AddOrUpdateText(type, mainText) {
    let item = {
        headingText: "",
        buttonText: ""
    }

    if (type === "add") {
        item.headingText = "Thêm " + mainText;
        item.buttonText = "Thêm";
    }
    else {
        item.headingText = "Cập nhật " + mainText;
        item.buttonText = "Cập nhật";
    }
    return item;
}

export function isInterger(str) {
    return Number.isInteger(Number(str)) && Number(str) > 0;
}

export function decode(str) {
    let txt = new DOMParser().parseFromString(str, "text/html");
    return txt.documentElement.textContent;
}

export function upperCaseFirstCharacter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//Tạo slug tự động
export function generateSlug(value) {
    // Sử dụng hàm remove của thư viện sanitized để loại bỏ dấu tiếng Việt
    const sanitizedValue = remove(value);
    const slug = sanitizedValue
        .toLowerCase()
        // ^ phủ định, kí tự chữ cái và số \w, kí tự khoảng trắng \s
        // Thay thế mọi kí tự không phải là khoảng trắng trắng hoặc chữ thành ''
        .replace(/[^\w\s-]/g, '')
        // Thay thế một hoặc nhiều kí tự khoảng trắng thành '-'
        .replace(/\s+/g, '-')
        // Thay thế một hoặc nhiều kí tự '-' trắng thành '-'
        .replace(/--+/g, '-')
        .trim();
    return slug;
};

//Chặt chuỗi theo kí tự và trả về mảng kết quả
export const handleSplitString = (str) => {
    const trimmedString = str.trim(); // Xóa khoảng trắng hai đầu chuỗi
    const resultArray = trimmedString.split(','); // Chia chuỗi thành mảng các phần tử
    return resultArray;
};

// Chặt chuỗi và trả về chuỗi đầu tiên
export const handleGetFirstString = (str) => {
    const trimmedString = str.trim(); // Xóa khoảng trắng hai đầu chuỗi
    const resultArray = trimmedString.split(','); // Chia chuỗi thành mảng các phần tử
    return resultArray[0]; // Trả về phần tử đầu tiên của mảng
};

// Chặt chuỗi các hình ảnh và trả về mảng
export const splitImageUrls = (imageUrlString) => {
    return imageUrlString.split(",").map((url) => url.trim());
};

// export function formatNumber(number) {
//     if (number < 10 && number !== 0) {
//       return '0' + number;
//     }
//     return number.toString();
//   }

// Định dạng số 1.000.000
export const toThousandFormat = (str) => {
    return str.toLocaleString('en');
};

// Làm mượt hoạt ảnh cuộn lên đầu trang
export const scrollToTop = () => {
    // Điều chỉnh tốc độ
    const scrollStep = window.scrollY / (1000 / 5);

    const scrollAnimation = () => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, -scrollStep);
            requestAnimationFrame(scrollAnimation);
        }
    };

    requestAnimationFrame(scrollAnimation);
};

export const checkImageDescriptionArray = (value) => {
    //console.log(value)
    if(value.length === 0) {
        return ["Không có mô tả cho ảnh này"];
    }
    const arr = value.map(item => item !== '' ? item : "Không có mô tả cho ảnh này");
    return arr;
}

export const checkImageArray = (value) => {
    //console.log(value)
    if(value.length === 0) {
        return [PostDefault];
    }
    const arr = value.map(item => item !== '' ? item : PostDefault);
    return arr;
}

export const checkImageUrl = (value) => {
    if (isEmptyOrSpaces(value)) {
        return PostDefault;
    } else {
        return value;
    }
}

// // Hiển thị ảnh theo vị trí trong thuộc tính mô tả
// export const DescriptionWithImage = ({ title, description, image_description, image_url, index }) => {
//     const imageTag = '<image>';

//     if (description && image_url && description.includes(imageTag)) {
//         const parts = description.split(imageTag);
//         const textBeforeImage = parts[0];
//         const textAfterImage = parts[1];

//         return (
//             <>
//                 <h2 className="title" id={`paragraph-${index}`}>{title}</h2>
//                 <p className="description">{textBeforeImage}</p>
//                 <div className="imageContainer">
//                     <img className="imageSection"  src={image_url} alt={image_description}/>
//                     <p className="imageDescription">{image_description + " (Ảnh minh họa)"}</p>
//                 </div>
//                 <p className="description">{textAfterImage} </p>
//             </>
//         );
//     }else if (description && image_url) {
//         return (
//           <>
//             <h2 className="title" id={`paragraph-${index}`}>{title}</h2>
//             <p className="description">{description}</p>
//             <div className="imageContainer">
//               <img className="imageSection" src={image_url} alt={image_description} />
//               <p className="imageDescription">
//                 {image_description + " (Ảnh minh họa)"}
//               </p>
//             </div>
//           </>
//         );
//       }

//     return (
//         <>
//             <h2 className="title" id={`paragraph-${index}`}>{title}</h2>
//             <p className="description">{description}</p>
//         </>
//     );
// };

export const toStringArray = (str) => {
    if (str.includes("<br>")) {
        const parts = str.split("<br>");
        return parts;
    } else {
        return [str];
    }
};

// Hiển thị ảnh theo vị trí trong thuộc tính mô tả
export const DescriptionWithImage = ({ title, description, image_description, image_url, index }) => {
    const imageTag = '<image>';
    const imageUrls = image_url ? image_url.split(',') : []; // Tách các URL thành một mảng
    const imageDescriptions = image_description ? image_description.split(',') : []; // Tách các mô tả ảnh thành một mảng

    //Trường hợp có thẻ <image> và image_url có giá trị
    if (description && image_url && description.includes(imageTag)) {
        const parts = description.split(imageTag);
        const descriptionElements = parts.map((part, index) => {
            // chỉ hiển thị ảnh cùng mô tả trừ item cuối cùng vì
            // TH1: <image> content of description : thì chuỗi cuối cùng trong mảng là description
            // TH2: content of description <image> : thì chuỗi cuối cùng trong mảng là ""
            // nên cả 2 trường hợp đều không cần ảnh hiển thị
            if (index < parts.length - 1) {
                return (
                    <>
                        {/* Tách nội dung nếu có <br> */}
                        {toStringArray(part).map((partItem, partIndex) => (
                            <p className="description" key={partIndex}>{partItem}</p>
                        ))}
                        
                        <div className="imageContainer" key={index}>
                            <img className="imageSection" src={imageUrls[index]} alt={image_description} />
                            <p className="imageDescription">{imageDescriptions[index] + " (Ảnh minh họa)"}</p>
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        {toStringArray(part).map((partItem, partIndex) => (
                            <p className="description">{partItem}</p>
                        ))}
                    </>
                )
            }
        });

        return (
            <>
                <h2 className="title" id={`paragraph-${index}`}>{title}</h2>
                {descriptionElements}
            </>
        );

    //Trường hợp không có thẻ <image> nhưng image_url có giá trị
    } else if (description && image_url) {
        return (
            <>
                <h2 className="title" id={`paragraph-${index}`}>{title}</h2>
                {toStringArray(description).map((part, descriptionIndex) => (
                    <p className="description" key={descriptionIndex}>{part}</p>
                ))}
                {imageUrls.map((imageUrl, imageIndex) => (
                    <div className="imageContainer" key={imageIndex}>
                        <img className="imageSection" src={imageUrl.trim()} alt={imageDescriptions[imageIndex]} />
                        <p className="imageDescription">{imageDescriptions[imageIndex] + " (Ảnh minh họa)"}</p>
                    </div>
                ))}
            </>
        );
    }

    //Trường hợp không có thẻ <image> và image_url không có giá trị
    return (
        <>
            <h2 className="title" id={`paragraph-${index}`}>{title}</h2>
            {toStringArray(description).map((part, descriptionIndex) => (
                <p className="description" key={descriptionIndex}>{part}</p>
            ))}
        </>
    );
};



// Lấy Id video youtube
export const getVideoIdFromUrl = (url) => {
    // Kiểm tra xem URL có đúng định dạng không
    const regex = /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^\s/]+)/;
    const match = url.match(regex);

    //match[0] là https://youtu.be/
    //match[1] là phần Id
    if (match && match[1]) {
        // Trả về videoId nếu tìm thấy
        return match[1];
    } else {
        // Trả về null nếu không tìm thấy videoId
        return null;
    }
}
