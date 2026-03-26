import React, { useState, useEffect } from "react";

const NOC = ({ chit, user, chitAgreement, bidAgreement, gurantor }) => {
  const [marathiName, setMarathiName] = useState("");
  const [isNameEdited, setIsNameEdited] = useState(false);

  useEffect(() => {
    const translateName = async () => {
      // Only auto-translate if the name hasn't been manually edited
      if (isNameEdited) return;
      
      const fullName = `${user?.firstname || ""} ${user?.middlename || ""} ${user?.lastname || ""}`.trim();
      
      if (!fullName) return;

      try {
        // Using Google Input Tools API for phonetic transliteration
        const response = await fetch(
          `https://inputtools.google.com/request?text=${encodeURIComponent(
            fullName
          )}&itc=mr-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
        );
        const data = await response.json();

        if (data[0] === "SUCCESS") {
          // The API returns an array of suggestions; we take the first one [0]
          setMarathiName(data[1][0][1][0]);
        } else {
          setMarathiName(fullName); // Fallback to English if API fails
        }
      } catch (error) {
        console.error("Translation Error:", error);
        setMarathiName(fullName);
      }
    };

    translateName();
  }, [user, isNameEdited]);

  const handleNameChange = (e) => {
    setMarathiName(e.target.value);
    setIsNameEdited(true);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-black px-8 py-6 text-[15px] leading-8 text-justify print-page">
        {/* CIN */}
        <div className="text-end text-xs">CIN NO.U64990MH2023PTC400938</div>

        {/* HEADER */}
        <div className="flex items-center mt-2">
          <img src="/Logo2.png" alt="" className="w-20" />

          <div className="mx-auto text-center w-full flex flex-col items-center">
            <img src="/Logo.png" alt="" className="w-72" />
            <p className="text-xs mt-1">
              Plot No.7, Gut No.216 Satara Road Near Ahilyabai Holkar Chauk
              Satara Parisar Chh.Sambhajinagar.
            </p>
          </div>
        </div>
        <div className="bg-black text-white text-center text-[13px] font-bold py-1 mt-3">
          वर्गणीदार ना हरकत दाखला (NOC)
        </div>

        <div className="flex justify-end mt-4">
          <p>दिनांक -</p>
          <input className="border-b border-black w-40 outline-none bg-transparent" />
        </div>

        <div className="mt-4">
          <p>
            प्रति,
            <br />
            सह चिट प्रबंधक <br />
            माननीय महोदय,
          </p>
        </div>

        <div className="mt-6">
          <p>
            मी वर्गणीदार श्री./सौ.{" "}
            <input 
              className="border-b border-black w-72 outline-none bg-transparent px-2 text-center" 
              value={marathiName} 
              onChange={handleNameChange}
              placeholder="नाव येथे टाका"
            />{" "}
            ग्रुप नं.{" "}
            <input 
              className="border-b border-black w-32 outline-none bg-transparent text-center uppercase" 
              value={chit?.GroupCode || ""} 
              readOnly
            />{" "}
            तिकीट नं.{" "}
            <input 
              className="border-b border-black w-20 outline-none bg-transparent text-center" 
              value={chit?.TicketNmber || ""} 
              readOnly
            />{" "}
            मला सदर करडे कृष्णा चिट्स प्रायव्हेट लिमिटेड यांच्या कडून दिनांक{" "}
            <input className="border-b border-black w-40 outline-none bg-transparent" />{" "}
            रोजी{" "}
            <input className="border-b border-black w-48 outline-none bg-transparent" />{" "}
            या बँक खात्यातून{" "}
            <input className="border-b border-black w-48 outline-none bg-transparent" />{" "}
            या रकमेच्या{" "}
            <input className="border-b border-black w-48 outline-none bg-transparent" />{" "}
            या क्रमांकाच्या धनादेश / UTR NO. / IMPS द्वारे रक्कम मिळाली.
            त्यामुळे माझी कोणतीही तक्रार नाही व करडे कृष्णा चिट्स प्रायव्हेट
            लिमिटेड कडे माझे कोणतेही घेणे नाही. त्यामुळे मी माझा हा ना हरकत दाखला
            देत आहे.
          </p>
        </div>

        <div className="flex justify-end mt-12">
          <div className="text-center">
            <p className="text-sm">आपला विश्वासू</p>
            <div className="mt-8">
              <input
                type="text"
                className="border-b border-black w-64 outline-none bg-transparent text-center font-bold"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NOC;