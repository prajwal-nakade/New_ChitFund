import React from "react";

const NOC = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-black px-8 py-6 text-[15px] leading-8 text-justify">
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
        <div className="bg-black text-white text-center text-[13px] font-bold py-0.75 mt-3">
          वर्गणीदार ना हरकत दाखला (NOC)
        </div>

        <div className="flex justify-end">
          <p>दिनांक -</p>
          <input className="border-b border-black w-64 outline-none bg-transparent" />
        </div>

        <div>
          <p>
            प्रति,
            <br />
            सह चिट प्रबंधक <br />
            माननीय महोदय,
          </p>
        </div>

        <div>
          <p>
            मी वर्गणीदारश्री./सौ.{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent" />{" "}
            ग्रुप नं.{" "}
            <input className="border-b border-black w-50 outline-none bg-transparent" />{" "}
            तिकीट नं.{" "}
            <input className="border-b border-black w-30 outline-none bg-transparent" />{" "}
            मला सदर करडे कृष्णा चिट्स प्रायव्हेट लिमिटेड यांच्या कडून दिनांक{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent" />{" "}
            रोजी{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent" />{" "}
            या बँक खात्यातून{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent" />{" "}
            या रकमेच्या{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent" />{" "}
            या क्रमांकाच्या धनादेश / UTR NO. / IMPS द्वारे रक्कम मिळाली.
            त्यामुळे माझी कोणतीही तक्रार नाही व करडे कृष्णा चिट्स प्रायव्हेट
            लिमिटेड कडे माझे कोणतेही घेणे नाही.त्यामुळे मी माझा हा ना हरकत दाखला
            देत आहे.
          </p>
        </div>

        <div className="flex justify-end py-2 ">
          <div className="text-center">
            <p className="text-sm mt-2">आपला विश्वासू</p>
            <input
              type="text"
              className="border-b border-black w-56 outline-none bg-transparent mt-3"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NOC;
