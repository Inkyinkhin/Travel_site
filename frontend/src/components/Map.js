import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import axios from "axios";

const customIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  shadowUrl: "https://maps.google.com/mapfiles/ms/icons/msmarker.shadow.png",
  iconSize: [32, 32], // Adjust the size based on your preference
  shadowSize: [59, 32], // Adjust the size based on your preference
  iconAnchor: [16, 32], // Adjust the anchor based on your preference
  shadowAnchor: [16, 32], // Adjust the anchor based on your preference
  popupAnchor: [0, -32], // Adjust the popup position based on your preference
});

const statesAndCities = {
  Kachin: {
    Mogaung: [25.3018588, 96.9416995],
    Putao: [27.3275045, 97.4208809],
    Waimaw: [25.3537725, 97.4440251],
    Hpakant: [25.6123483, 96.3125388],
    Momauk: [24.2496398, 97.3456239],
    "Man Jae": [24.1202038, 97.2951775],
    Shwegu: [24.2278257, 96.7874052],
    Lwegel: [24.2001166, 97.7232522],
    Hopin: [24.9915677, 96.5279517],
    Chipwi: [25.885789, 98.1305242],
    Sumprabum: [26.5448191, 97.5683626],
    Hsawlaw: [26.1537756, 98.2711332],
    Sadung: [25.3962189, 97.8984954],
    "Kan Paik Ti": [25.4058664, 98.1181275],
    Kawnglanghpu: [27.061073, 98.3599129],
    Nawngmun: [27.5065429, 97.8143815],
    Dawthponeyan: [24.6157413, 97.4623535],
    Machanbaw: [27.2827003, 97.5859084],
    Injangyang: [25.8303708, 97.728043],
    Shingbwiyang: [26.69478, 96.2094],
    Tanai: [26.3555615, 96.7212432],
    Mohnyin: [24.779057, 96.373198],
    Hsinbo: [24.779234, 97.039169],
    Kamaing: [25.522595, 96.711534],
    Myohla: [24.479419, 96.632228],
    "Pang War": [25.5982638, 98.3782978],
  },
  Kayah: {
    Bawlakhe: [19.1710509, 97.3421041],
    Hpasawng: [18.8724927, 97.3168235],
    Demoso: [19.538319, 97.158813],
    Hpruso: [19.4177837, 97.1305041],
    Mese: [18.6722261, 97.662883],
    Shadaw: [19.631742, 97.520729],
    Ywarthit: [19.166731, 97.499496],
  },
  Kayin: {
    Myawaddy: [16.6871674, 98.507114],
    "Hlaing Bwe": [17.1251593, 97.8190019],
    Kawkareik: [16.555531, 98.23996],
    Payathonzu: [15.3040495, 98.3818582],
    Kyaikdon: [16.0028042, 98.393413],
    Kyondoe: [16.594461, 98.043526],
    "Su Ka Li": [16.155241, 98.5958167],
    "Waw Lay Myaing": [16.293922, 98.713243],
    "Baw Ga Li": [18.914513, 96.785645],
    Hpapun: [18.06496, 97.444878],
    Kamarmaung: [17.346884, 97.652899],
    "Leik Tho": [19.222353, 96.580974],
    Paingkyon: [17.0217676, 97.9866681],
    "Shan Ywar Thit": [17.42438, 97.887784],
    "Than Daung": [19.0204101, 96.5874421],
    Thandaunggyi: [19.0703572, 96.6775065],
  },
  Chin: {
    Falam: [22.9139433, 93.6790091],
    Rihkhawdar: [23.3632468, 93.3898227],
    Kanpetlet: [21.1933082, 94.0586224],
    Matupi: [21.596511, 93.444026],
    Tonzang: [23.605598, 93.6923764],
    Tedim: [23.3717349, 93.655654],
    Cikha: [23.889757, 93.53347],
    Mindat: [21.371757, 93.973654],
    Rezua: [22.052887, 93.408569],
    Samee: [21.2929285, 93.0961863],
    Thantlang: [22.69843, 93.4278],
    Paletwa: [21.303783, 92.8555754],
  },
  Mon: {
    Kyaikto: [17.31296781748397, 97.01402988597646],
    Bilin: [17.216967853234504, 97.23059148485942],
    Thaton: [16.927803753396148, 97.36796265615983],
    Paung: [16.62290002444955, 97.45849541566506],
    Mawlamyine: [16.456200384940505, 97.64322162306216],
    Mudon: [16.25847225734969, 97.72512634461894],
    Thanbyuzayat: [15.964647112736214, 97.74772633414655],
    Chaungzon: [16.35572054453176, 97.54395955967988],
    Ye: [15.248636657199368, 97.85293940977478],
    Kyaikkhami: [16.07587547965074, 97.58481487064316],
  },
  Rakhine: {
    Gwa: [17.5958274, 94.5801887],
    Thandwe: [18.4664443, 94.3668616],
    Taungup: [18.8548345, 94.2387634],
    Kyaukpyu: [19.4266675, 93.5479844],
    Pauktaw: [20.1818024, 93.0691395],
    "Ma-Ei": [19.3424147, 94.1386439],
    Ann: [19.7808466, 94.0312875],
    Maungdaw: [20.8269243, 92.3661178],
    Buthidaung: [20.8747257, 92.5280099],
    Kyeintali: [18.0128728, 94.4872053],
    Kyauktaw: [20.843957, 92.97282],
    Ponnagyun: [20.331985, 93.004295],
    Rathedaung: [20.488342, 92.754158],
    Minbya: [20.364523, 93.27269],
    Myebon: [20.046762, 93.373764],
    Ramree: [19.091339, 93.8632293],
  },
  Shan: {
    "Nyaung Shwe": [20.658783, 96.9317297],
    Shwenyaung: [20.7614941, 96.9376843],
    Pekon: [19.8687118, 97.0053025],
    Mongpan: [20.3186811, 98.361903],
    Aungpan: [20.6599788, 96.6329522],
    "Keng Tawng": [20.7636453, 98.3328549],
    Monghpyak: [20.8784297, 99.9255692],
    Namtu: [23.09574, 97.3980881],
    Chinshwehaw: [23.4771282, 98.8252284],
    Nangteung: [23.474372, 98.8694878],
    "Man Hio": [23.9518466, 97.8005208],
    Namhkam: [23.8350995, 97.6830998],
    "Pang Hseng": [24.0767288, 98.0678873],
    Monghsu: [21.9056166, 98.3641488],
    Tarmoenye: [23.5794868, 98.1004351],
    Hsenwi: [23.3035179, 97.9661142],
    Namhsan: [22.9637241, 97.1611404],
    Kunhing: [21.3046935, 98.4283692],
    Kalaw: [20.6356031, 96.5656373],
    "Mong Sang": [21.660114, 98.366485],
    "Mong Nawng": [21.6454239, 98.1203512],
    Langhko: [20.3438933, 98.0057791],
    Kyethi: [21.9286912, 97.820598],
    "Keng Lat": [20.8681043, 100.5342495],
    Hkolam: [21.1005303, 98.109316],
    Hopong: [20.7946278, 97.1723822],
    "Mong Nai": [20.509504, 97.8727339],
    Kali: [21.2872486, 98.5339259],
    Intaw: [21.6323677, 96.9234073],
    Mabein: [23.4713483, 96.6273203],
    Konkyan: [23.8324005, 98.5362597],
    "Mong Ko": [24.1012181, 98.3083826],
    Kunlong: [23.41799, 98.655021],
    Hopang: [23.4248439, 98.7523069],
    Matman: [21.954129, 98.870626],
    Mongyawng: [21.1807341, 100.3569344],
    "Mong Ton": [20.2964333, 98.8961533],
    Hsihseng: [20.160643, 97.252818],
    Mawkmai: [20.226544, 97.725056],
    Monghsat: [20.535314, 99.256089],
    "Mong Ping": [21.350414, 99.0225863],
    Mongyai: [22.4267906, 98.0390793],
    Mongyang: [21.8457189, 99.6867409],
    Mongkhet: [21.7497897, 99.4632118],
    "Mong Ngaw": [22.77315, 96.98238],
    "Mong Long": [22.79395, 96.62272],
    Pinlaung: [20.1230034, 96.7821404],
    Vengkao: [22.3019515, 98.9414135],
    "Na-hpan": [22.6071933, 99.0925952],
    Panlong: [23.2566426, 98.7868059],
    Manton: [23.2466707, 97.1223834],
    Naungtayar: [20.291801, 96.757105],
    "Mong Koke": [20.7400271, 99.4624551],
    Tarlay: [20.7123532, 100.093864],
    "Mong Yu": [21.3297589, 100.5515057],
    Tongta: [21.3309461, 99.2884216],
    "Ho-mong": [19.759361, 97.980414],
    Cheungmiang: [22.7643189, 99.2238658],
    Taomie: [22.9794, 99.46016],
    "Mong Hta": [19.8516369, 98.5490493],
    Hoxtao: [22.0406794, 99.5514407],
    Klawngpa: [22.7567595, 98.7119974],
    Kyauktalonegyi: [20.371, 97.024],
    Moekraix: [22.77647, 98.83702],
    Longtan: [22.90568, 99.36871],
    "Man Kan": [22.6874546, 98.5951183],
    Manshiang: [22.5034484, 98.7670474],
    Manton: [22.9438476, 98.6389365],
    Mawhtike: [24.0921809, 98.8020701],
    Meungphing: [21.9858184, 99.5986802],
    Meungka: [21.8441342, 99.4192933],
    Nangkhangvu: [22.4771387, 99.1869961],
    Namphat: [21.9284765, 99.2001918],
    Naxkao: [22.3737042, 98.7104969],
    Naxvi: [23.111166, 98.663544],
    Noungkied: [22.43836, 98.9248],
    Pangyang: [22.12747, 98.79648],
    Pangvai: [23.0833113, 99.2253962],
    Pindaya: [20.9415263, 96.6626154],
    Yaongleen: [22.95939, 99.31197],
    Kawnmau: [22.62819, 99.28307],
    Ywangan: [21.162815, 96.442291],
    Ponparkyin: [19.8887047, 98.9391209],
  },

  Yangon: {
    Yangon: [16.866069, 96.195132],
    Hlegu: [16.673887, 96.334961],
    Dawbon: [16.923308, 96.270027],
    Hmawbi: [16.963614, 96.104646],
    Kyimyindaing: [16.842142, 96.182979],
    "North Okkalapa": [16.89707, 96.15807],
    "South Okkalapa": [16.866645, 96.138481],
    Mayangone: [16.84787, 96.1448],
    Sanchaung: [16.831681, 96.151423],
    Pazundaung: [16.849934, 96.163849],
    Tamwe: [16.806736, 96.155206],
    Hlaing: [16.823317, 96.179048],
    Bahan: [16.807264, 96.155932],
    Kyeemyindaing: [16.843903, 96.191482],
    Lanmadaw: [16.794078, 96.177927],
    Botataung: [16.822366, 96.166646],
    Latha: [16.77608, 96.164468],
    Zabuthiri: [16.798055, 96.154122],
    Kamayut: [16.80445, 96.158536],
    Insein: [16.8897, 96.16714],
    Pegu: [17.621047, 96.493147],
    Thingangyun: [16.84786, 96.17754],
    Kawthoung: [10.423005, 98.537413],
    Nyaungshwe: [20.57282, 97.028009],
    Pabedan: [16.7701, 96.1746],
    "Ngwe Saung": [16.801768, 94.53887],
    Thongwa: [16.6729, 96.2585],
    Thaketa: [16.825496, 96.165095],
    Hlaingthaya: [16.871254, 96.186401],
  },
  Mandalay: {
    Yamethin: [20.4318725, 96.1399956],
    Bagan: [21.1317111, 94.8623644],
    Kyaukpadaung: [20.8410724, 95.1279364],
    "Tada-U": [21.8162339, 95.9700599],
    Pyawbwe: [20.5910458, 96.0505821],
    Takaung: [23.5025071, 96.0152879],
    Sintgaing: [21.7322063, 96.1082034],
    Nganzun: [21.898103, 95.6877173],
    Madaya: [22.21036, 96.106392],
    Singu: [22.549781, 95.998993],
    Thabeikkyin: [22.885933, 95.97525],
    Amarapura: [21.903139, 96.049483],
    Myitnge: [21.85418, 96.068555],
    Patheingyi: [22.012563, 96.154303],
    Myittha: [21.424265, 96.130859],
    Mahlaing: [21.098669, 95.64698],
    Natogyi: [21.423702, 95.654495],
    Ngathayauk: [21.150579, 95.137718],
    Taungtha: [21.27603, 95.445412],
    Thazi: [20.8506295, 96.0591951],
    Wundwin: [21.09691, 96.030014],
  },
  "Nay Pyi Daw": {
    Pyinmana: [19.738964, 96.2088371],
    Tatkon: [20.1288844, 96.2019535],
    "Det Khi Na Thi Ri": [19.7190116, 96.0670902],
    Lewe: [19.63467, 96.110069],
    "Oke Ta Ra Thi Ri": [19.891, 96.043],
    "Poke Ba Thi Ri": [19.8092455, 96.1665242],
    "Za Bu Thi Ri": [19.764, 96.061],
    "Zay Yar Thi Ri": [19.862, 96.309],
  },
  Bago: {
    Paungde: [18.4928344, 95.5071615],
    Thayarwady: [17.654413, 95.786285],
    Nyaunglebin: [17.9532219, 96.7259854],
    Pyu: [18.483333, 96.433333],
    Thanatpin: [17.2932802, 96.5786126],
    Letpadan: [17.783333, 95.75],
    Kawa: [17.0891732, 96.4603044],
    Gyobingauk: [18.2314748, 95.6443229],
    Nattalin: [18.4287288, 95.5526552],
    Zigon: [18.336437, 95.6226683],
    Paukkaung: [18.9087198, 95.5490934],
    Shwegyin: [17.9230219, 96.8781686],
    Hpayargyi: [17.4743026, 96.5249877],
    Waw: [17.4771259, 96.6756871],
    Thetkala: [17.02939, 96.59657],
    Oakshitpin: [18.6851224, 95.013776],
    Padaung: [18.717974, 95.153526],
    Puteekone: [18.57236, 95.456451],
    Shwedaung: [18.705099, 95.214043],
    Thegon: [18.646975, 95.417206],
    Hswar: [19.264978, 96.29072],
    Htantabin: [18.842371, 96.4877525],
    Kanyutkwin: [18.340401, 96.49218],
    Kaytumati: [19.014324, 96.403572],
    Kyaukkyi: [18.32733, 96.76947],
    Oktwin: [18.832928, 96.413628],
    Yedashe: [19.156925, 96.342339],
    Zayyawadi: [18.540972, 96.430844],
    Minhla: [17.9738523, 95.7086428],
    Monyo: [18.027185, 95.511848],
    Okpho: [18.130222, 95.671768],
    Thonse: [17.629881, 95.789848],
    "Daik-U": [17.789671, 96.669693],
    Inntakaw: [17.180867, 96.376365],
    Kyauktaga: [18.158672, 96.613907],
    Madauk: [17.9132529, 96.8444748],
    Peinzalok: [18.0699, 96.66836],
    Penwegon: [18.222708, 96.568855],
    Pyuntaza: [17.875173, 96.71597],
  },
  Magway: {
    Taungdwingyi: [20.001873, 95.546135],
    Pakokku: [21.3343349, 95.0944271],
    Yenangyaung: [20.4608216, 94.872961],
    Thayet: [19.322687, 95.1794744],
    Aunglan: [19.366667, 95.216667],
    Chauk: [20.8947519, 94.8198211],
    Minbu: [20.1838382, 94.8767117],
    Yesagyo: [21.632949, 95.2487324],
    Gangaw: [22.1769278, 94.1328898],
    Saw: [21.1523995, 94.1558364],
    Kyaukhtu: [21.4087795, 94.1349581],
    Tilin: [21.6959068, 94.0941855],
    Kyaw: [21.9269569, 94.3590573],
    Kamma: [21.3824585, 94.8151927],
    Saku: [20.2265994, 94.7642875],
    Ngape: [20.0756891, 94.4681737],
    Sidoktaya: [20.4463888, 94.2466664],
    Myaing: [21.61256, 94.854317],
    Pauk: [21.45215, 94.473737],
    Seikphyu: [20.906509, 94.792427],
    Myothit: [20.2017408, 95.4451482],
    Natmauk: [20.353386, 95.399658],
    Pwintbyu: [20.363335, 94.669334],
    Salin: [20.5772, 94.659363],
    Sinphyukyun: [20.6637, 94.69162],
    Kamma: [19.028971, 95.09594],
    Mindon: [19.346293, 94.731941],
    Minhla: [19.965587, 95.0367],
    Sinbaungwe: [19.727261, 95.166204],
  },
  Ayeyarwady: {
    Maubin: [16.72667066096863, 95.64847440658072],
    Pathein: [16.777043723879117, 94.73918326401066],
    Hinthada: [17.64692328050054, 95.45273756158383],
    Myaungmya: [16.58152990614699, 94.90359178083786],
    Labutta: [16.14940996866798, 94.75701561919308],
    Bogale: [16.28646537243571, 95.40220465041763],
    Pyapon: [16.284036700868008, 95.68031758329673],
    Kyaiklat: [16.44279282825231, 95.72085118064528],
    Dedaye: [16.40821616338955, 95.88578576011469],
    Wakema: [16.603560592869403, 95.1767278159378],
    Ingapu: [17.814233818898057, 95.27146328298815],
    Yekyi: [17.340558603178806, 95.10924318836555],
    Danubyu: [17.257935265054233, 95.58556061806907],
    Nyaungdon: [17.04429057591436, 95.64360366103887],
    Pantanaw: [16.983453248598263, 95.47013987581028],
    Thabaung: [17.042239021705907, 94.803128128161],
    Kyaunggon: [17.100881829303557, 95.18001053125246],
  },
  Sagaing: {
    Mawlaik: [23.633333, 94.416667],
    Budalin: [22.3871145, 95.1436405],
    Homalin: [24.8688705, 94.9168779],
    Tamu: [24.2157468, 94.3040852],
    "Ye-U": [22.7675123, 95.4256908],
    Pansaung: [27.2368905, 96.1667765],
    Wetlet: [22.3680785, 95.7880232],
    "Khin U": [22.771583, 95.6217428],
    Pale: [21.933992, 94.874673],
    Kalewa: [23.1986756, 94.3007869],
    Hkamti: [26.0021393, 95.6912728],
    Tigyaing: [23.7528084, 96.1463674],
    Kanbalu: [23.2058492, 95.5149329],
    Kawlin: [23.7939666, 95.6776956],
    Pinlebu: [24.0904272, 95.3811532],
    Wuntho: [23.8989024, 95.6855946],
    Kyunhla: [23.3173416, 95.5315473],
    Katha: [24.1716852, 96.3430992],
    Banmauk: [24.4010161, 95.8562462],
    "Don Hee": [26.816068, 95.798842],
    "Htan Par Kway": [25.965885, 95.241478],
    "Lay Shi": [25.4463832, 94.9560249],
    "Mo Paing Lut": [25.046708, 94.787483],
    Nanyun: [26.9798882, 96.1671674],
    "Sum Ma Rar": [25.36455, 94.68729],
    Khampat: [23.77977, 94.14575],
    Myothit: [24.5176972, 94.5174352],
    Paungbyin: [24.267681, 94.816857],
    "Shwe Pyi Aye": [24.6848991, 94.731397],
    Taze: [22.944071, 95.373607],
    Mingin: [22.877808, 94.494197],
    Indaw: [24.2226633, 96.1411781],
    Ayadaw: [22.28525, 95.450677],
    "Chaung-U": [21.95693, 95.273628],
    Tabayin: [22.685286, 95.321213],
    Myaung: [21.833411, 95.42128],
    Myinmu: [21.92514, 95.575851],
    Kani: [22.43291, 94.848469],
    Kyaukmyaung: [22.593286, 95.944946],
    Yinmabin: [22.077789, 94.900139],
    Salingyi: [21.9724628, 95.0801873],
    Lahe: [26.3252881, 95.4423223],
  },
  Tanintharyi: {
    Bokpyin: [11.256244488491642, 98.76142485902575],
    Dawei: [14.081422148250757, 98.19082148040506],
    Kawthoung: [9.996130211533506, 98.5514729734617],
    Kyunsu: [11.797520021224827, 98.51721319356545],
    Launglon: [13.974310004546592, 98.11550611323891],
    Myeik: [12.4496229929352, 98.62647714999811],
    Tanintharyi: [12.09117739336516, 98.99643161945316],
    Thayetchaung: [13.86672577505229, 98.25768463827038],
    Yebyu: [14.245322258039819, 98.20353619934797],
  },
};
const MapView = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};
const GeocodeOnClick = ({ setGeocodeResult, setLandmarkData }) => {
  const map = useMap();
  const navigate = useNavigate();
  React.useEffect(() => {
    const handleMapClick = async (e) => {
      const { latlng } = e;
      const geocoder = L.Control.Geocoder.nominatim();
      geocoder.reverse(latlng, 18, (results) => {
        if (results.length > 0) {
          const name = results[0].name;
          setGeocodeResult(name);
          setLandmarkData({
            title: name,
            description: "Description of " + name,
            photos: [
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
            ],
          });
          navigate("/landmark", {
            state: {
              landmarkData: {
                title: name,
                description:
                  "Description of Description ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription ofDescription of" +
                  name,
                photos: [
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                ],
              },
            },
          });
        } else {
          setGeocodeResult("No address found");
          setLandmarkData(null);
        }
      });
    };
    map.on("click", handleMapClick);
    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, setGeocodeResult, setLandmarkData, navigate]);
  return null;
};
const Home = () => {
  const [geocodeResult, setGeocodeResult] = useState(null);
  const [landmarkData, setLandmarkData] = useState(null);
  const [mapCenter, setMapCenter] = useState([21.9162, 95.956]);
  const [mapZoom, setMapZoom] = useState(6);
  const [activeCity, setActiveCity] = useState(null); // State for active city
  const [expandedState, setExpandedState] = useState(null); // State for expanded state
  const handleCityClick = (city, coords) => {
    setMapCenter(coords);
    setMapZoom(13);
    setActiveCity(city); // Set active city
  };
  const handleAccordionChange = (state) => (event, isExpanded) => {
    setExpandedState(isExpanded ? state : null);
  };

  const [markers, setMarkers] = useState([]);
  const initialPosition = [21.619344477294792, 95.69970689713956]; // Initial map center

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/landmarks/get_landmarks/"
        );

        const landmarkData = response.data; // Assuming API returns an array of landmarks

        // Transforming landmarkData into markers array with positions
        const markersArray = landmarkData.map((landmark) => ({
          position: [landmark.lad, landmark.lung],
          name: landmark.name,
          id: landmark.id, // Assuming each landmark has an id
        }));

        setMarkers(markersArray);
      } catch (error) {
        console.error("Error fetching landmarks:", error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Paper
        elevation={3}
        style={{
          width: "200px",
          maxHeight: "100vh",
          overflowY: "auto",
          padding: "5px",
          margin: "3px",
          backgroundColor: "#F9F9F9",
          marginBottom: "30px",
        }}
      >
        {Object.entries(statesAndCities).map(([state, cities]) => (
          <Accordion
            key={state}
            expanded={expandedState === state}
            onChange={handleAccordionChange(state)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${state}-content`}
              id={`${state}-header`}
              style={{
                backgroundColor: "#E0E0E0",
                padding: "8px",
                height: "50px",
              }}
            >
              <Typography variant="h6" style={{ flex: 1 }}>
                {state}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ padding: "3px", maxHeight: "500px", overflowY: "auto" }}
            >
              <List>
                {Object.entries(cities).map(([city, coords]) => (
                  <ListItem
                    key={city}
                    button
                    onClick={() => handleCityClick(city, coords)}
                    style={{
                      backgroundColor:
                        activeCity === city ? "#D1C4E9" : "transparent", // Highlight active city
                      borderRadius: "4px",
                      marginBottom: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <ListItemText
                      primary={city}
                      primaryTypographyProps={{ style: { fontWeight: "500" } }}
                    />
                    <Divider />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{
            height: "100vh",
            width: "100%",
            marginTop: "5px",
            marginBottom: "40px",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapView center={mapCenter} zoom={mapZoom} />
          <GeocodeOnClick
            setGeocodeResult={setGeocodeResult}
            setLandmarkData={setLandmarkData}
          />
          {/* Render markers */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={customIcon}
            >
              <Popup>
                <Link to={`${marker.name}`}>{marker.name}</Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
export default Home;
