let dsSP = [];
document.querySelectorAll('.tch-product__card').forEach(sp => {
    let name = sp.querySelector('.tch-product-content__title').innerText;
    // console.log(name);
    let price = Number(sp.querySelector('.tch-product__content__footer p').innerText.replace('.', '').replace('đ', ''));
    let image = sp.querySelector('.tch-product__image img').src.split('/').pop();
    // console.log(name, price, image);
    dsSP.push({ id:Math.floor(Math.random()*10000).toString(), name, price, image });

})
console.log(dsSP);

let a = [
    {
        "id": "1907",
        "name": "Oolong Tứ Quý Kim Quất Trân Châu",
        "price": 49000,
        "image": "1709005899_kimquat-xuan-1_400x400.jpg"
    },
    {
        "id": "2540",
        "name": "Oolong Tứ Quý Vải",
        "price": 49000,
        "image": "1709004168_vai-xuan-1_400x400.jpg"
    },
    {
        "id": "8493",
        "name": "Trà Đào Cam Sả - Nóng",
        "price": 59000,
        "image": "tdcs-nong_288997_400x400.jpg"
    },
    {
        "id": "5450",
        "name": "Trà Hạt Sen - Nóng",
        "price": 59000,
        "image": "tra-sen-nong_025153_400x400.jpg"
    },
    {
        "id": "4145",
        "name": "Trà Đào Cam Sả - Đá",
        "price": 49000,
        "image": "1669736819_tra-dao-cam-sa-da_400x400.png"
    },
    {
        "id": "2881",
        "name": "Trà Hạt Sen - Đá",
        "price": 49000,
        "image": "tra-sen_905594_400x400.jpg"
    },
    {
        "id": "355",
        "name": "Hi-Tea Vải",
        "price": 49000,
        "image": "1669736893_hi-tea-vai_400x400.png"
    },
    {
        "id": "183",
        "name": "Hi-Tea Yuzu Trân Châu",
        "price": 49000,
        "image": "1669736859_hi-tea-yuzu-tran-chau_400x400.png"
    },
    {
        "id": "9427",
        "name": "Hi-Tea Đào",
        "price": 49000,
        "image": "1669737919_hi-tea-dao_400x400.jpg"
    },
    {
        "id": "2025",
        "name": "Hi-Tea Đào Kombucha",
        "price": 59000,
        "image": "1686716517_kombucha-dao_400x400.jpg"
    },
    {
        "id": "9501",
        "name": "Hi-Tea Yuzu Kombucha",
        "price": 59000,
        "image": "1686716508_kombucha-yuzu_400x400.jpg"
    }
];
let b = [
    {
        "id": "7108",
        "name": "Trà sữa Oolong Nướng (Nóng)",
        "price": 55000,
        "image": "oolong-nuong-nong_948581_400x400.jpg"
    },
    {
        "id": "2682",
        "name": "Hồng Trà Sữa Nóng",
        "price": 55000,
        "image": "hong-tra-sua-nong_941687_400x400.jpg"
    },
    {
        "id": "6899",
        "name": "CloudTea Trà Xanh Tây Bắc",
        "price": 69000,
        "image": "1700837666_tra-sua-tra-xanh-tay-bac-ly-thuy-tinh_400x400.jpg"
    },
    {
        "id": "2185",
        "name": "CloudTea Oolong Berry",
        "price": 69000,
        "image": "1700837685_tra-sua-oolong-berry-ly-thuy-tinh_400x400.jpg"
    },
    {
        "id": "7991",
        "name": "Trà Sữa Oolong BLao",
        "price": 39000,
        "image": "1697442155_ts-oolong-blao_400x400.jpg"
    },
    {
        "id": "6801",
        "name": "Trà sữa Oolong Nướng Trân Châu",
        "price": 55000,
        "image": "1669736878_tra-sua-oolong-nuong-tran-chau_400x400.png"
    },
    {
        "id": "1088",
        "name": "Hồng Trà Sữa Trân Châu",
        "price": 55000,
        "image": "hong-tra-sua-tran-chau_326977_400x400.jpg"
    },
    {
        "id": "1110",
        "name": "Trà Đen Macchiato",
        "price": 55000,
        "image": "tra-den-matchiato_430281_400x400.jpg"
    }
];
let c = [
    {
        "id": "2800",
        "name": "Trà Xanh Latte (Nóng)",
        "price": 45000,
        "image": "1699287050_tra-xanh-latte-nong_400x400.jpg"
    },
    {
        "id": "5214",
        "name": "Chocolate Nóng",
        "price": 55000,
        "image": "chocolatenong_949029_400x400.jpg"
    },
    {
        "id": "7315",
        "name": "CloudTea Trà Xanh Tây Bắc",
        "price": 69000,
        "image": "1700837666_tra-sua-tra-xanh-tay-bac-ly-thuy-tinh_400x400.jpg"
    },
    {
        "id": "3265",
        "name": "Trà Xanh Latte",
        "price": 45000,
        "image": "1699287044_tra-xanh-latte_400x400.jpg"
    },
    {
        "id": "252",
        "name": "Frosty Trà Xanh",
        "price": 59000,
        "image": "1699287066_frosty-tra-xanh_400x400.jpg"
    },
    {
        "id": "1484",
        "name": "Trà Xanh Đường Đen",
        "price": 55000,
        "image": "1699287058_tra-xanh-duong-den_400x400.jpg"
    },
    {
        "id": "9976",
        "name": "Chocolate Đá",
        "price": 55000,
        "image": "chocolate-da_877186_400x400.jpg"
    },
    {
        "id": "3743",
        "name": "Trà Xanh Espresso Marble",
        "price": 49000,
        "image": "1703471715_bg-vang-tra-xanh-espresso-marble_400x400.jpg"
    }
];
let data= [...a, ...b, ...c];
console.log(data);