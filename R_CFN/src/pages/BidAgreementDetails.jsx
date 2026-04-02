import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useNavigate, useParams } from "react-router";
import { createBidAgreement, getChitAgreementbyID } from "../api/endpoint";
import { ShipWheel, X, Paperclip, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const BidAgreementDetails = () => {
    const { id } = useParams();
    const [chitAgreementData, setChitAgreementData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitloading, setSubmitLoading] = useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [images, setImages] = useState({
        pan1: null,
        aadharFront1: null,
        aadharBack1: null,
        pan2: null,
        aadharFront2: null,
        aadharBack2: null,
    });

    // Preview states for Guarantor 1
    const [preview1, setPreview1] = useState({
        pan_image: null,
        pan_name: null,
        aadhar_image: null,
        aadhar_name: null,
        aadhar_image_back: null,
        aadhar_back_name: null,
    });

    // Preview states for Guarantor 2
    const [preview2, setPreview2] = useState({
        pan_image: null,
        pan_name: null,
        aadhar_image: null,
        aadhar_name: null,
        aadhar_image_back: null,
        aadhar_back_name: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getChitAgreementbyID(id);
                setChitAgreementData(data);
                console.log("Chit Agreement Data:", data);
                console.log("User ID to send:", data?.user);
            } catch (err) {
                console.error("Error fetching chit agreement:", err);
                setError("Failed to load chit agreement details");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleImageChange = (e, key, type, guarantor = 1) => {
        const file = e.target.files[0];
        if (file) {
            // Update images state
            setImages((prev) => ({
                ...prev,
                [key]: {
                    file,
                    preview: URL.createObjectURL(file),
                    name: file.name,
                },
            }));

            // Update preview state based on guarantor
            if (guarantor === 1) {
                if (type === 'pan') {
                    setPreview1((prev) => ({ 
                        ...prev, 
                        pan_image: URL.createObjectURL(file),
                        pan_name: file.name 
                    }));
                } else if (type === 'aadhar') {
                    setPreview1((prev) => ({ 
                        ...prev, 
                        aadhar_image: URL.createObjectURL(file),
                        aadhar_name: file.name 
                    }));
                } else if (type === 'aadhar_back') {
                    setPreview1((prev) => ({ 
                        ...prev, 
                        aadhar_image_back: URL.createObjectURL(file),
                        aadhar_back_name: file.name 
                    }));
                }
            } else if (guarantor === 2) {
                if (type === 'pan') {
                    setPreview2((prev) => ({ 
                        ...prev, 
                        pan_image: URL.createObjectURL(file),
                        pan_name: file.name 
                    }));
                } else if (type === 'aadhar') {
                    setPreview2((prev) => ({ 
                        ...prev, 
                        aadhar_image: URL.createObjectURL(file),
                        aadhar_name: file.name 
                    }));
                } else if (type === 'aadhar_back') {
                    setPreview2((prev) => ({ 
                        ...prev, 
                        aadhar_image_back: URL.createObjectURL(file),
                        aadhar_back_name: file.name 
                    }));
                }
            }
        }
    };

    // Remove image functions for Guarantor 1
    const removePanImage1 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImages((p) => ({ ...p, pan1: null }));
        setPreview1((p) => ({ ...p, pan_image: null, pan_name: null }));
    };

    const removeAadharImage1 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImages((p) => ({ ...p, aadharFront1: null }));
        setPreview1((p) => ({ ...p, aadhar_image: null, aadhar_name: null }));
    };

    const removeAadharBackImage1 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImages((p) => ({ ...p, aadharBack1: null }));
        setPreview1((p) => ({ ...p, aadhar_image_back: null, aadhar_back_name: null }));
    };

    // Remove image functions for Guarantor 2
    const removePanImage2 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImages((p) => ({ ...p, pan2: null }));
        setPreview2((p) => ({ ...p, pan_image: null, pan_name: null }));
    };

    const removeAadharImage2 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImages((p) => ({ ...p, aadharFront2: null }));
        setPreview2((p) => ({ ...p, aadhar_image: null, aadhar_name: null }));
    };

    const removeAadharBackImage2 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImages((p) => ({ ...p, aadharBack2: null }));
        setPreview2((p) => ({ ...p, aadhar_image_back: null, aadhar_back_name: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true)
        // Validate that required data exists
        if (!chitAgreementData?.user) {
            alert("Unable to submit: Missing user information");
            console.error("Missing user ID in chitAgreementData:", chitAgreementData);
            return;
        }

        // Extract the user ID - handle both object and primitive cases
        const userId = typeof chitAgreementData.user === 'object'
            ? chitAgreementData.user.id
            : chitAgreementData.user;

        const form = new FormData(e.target);
        const payload = new FormData();

        // --- BID FIELDS ---
        payload.append("user", userId);
        payload.append("chitAgreement", id);
        payload.append("dateofAuction", form.get("dateofAuction"));
        payload.append("totalBidAmount", form.get("totalBidAmount"));
        payload.append("auctionNumber", form.get("auctionNumber"));
        payload.append("prizedAmount", form.get("prizedAmount"));
        payload.append("dividend", form.get("dividend"));
        payload.append("totalMemberofGroup", form.get("totalMemberofGroup"));
        payload.append("suretyReceived", form.get("suretyReceived"));
        payload.append("suretiesVerified", form.get("suretiesVerified"));
        payload.append("dateOfPayment", form.get("dateOfPayment"));
        payload.append("chequeNo", form.get("chequeNo"));
        payload.append("cheqDate", form.get("cheqDate"));
        payload.append("cheqBank", form.get("cheqBank"));
        payload.append("foremanCommision", form.get("foremanCommision"));
        payload.append("debitBankName", form.get("debitBankName"));

        // --- GUARANTOR 1 ---
        payload.append("gurantors[0][user]", userId);
        payload.append("gurantors[0][firstname]", form.get("firstname"));
        payload.append("gurantors[0][middlename]", form.get("middlename"));
        payload.append("gurantors[0][lastname]", form.get("lastname"));
        payload.append("gurantors[0][pancard_no]", form.get("pancard_no"));
        payload.append("gurantors[0][aadharcard_no]", form.get("aadharcard_no"));
        payload.append("gurantors[0][dob]", form.get("dob"));
        payload.append("gurantors[0][mobile_no]", form.get("mobile_no"));

        if (images.pan1?.file)
            payload.append("gurantors[0][pan_image]", images.pan1.file);
        if (images.aadharFront1?.file)
            payload.append("gurantors[0][aadhar_image]", images.aadharFront1.file);
        if (images.aadharBack1?.file)
            payload.append("gurantors[0][aadhar_image_back]", images.aadharBack1.file);

        // --- GUARANTOR 2 ---
        payload.append("gurantors[1][user]", userId);
        payload.append("gurantors[1][firstname]", form.get("g2_firstname"));
        payload.append("gurantors[1][middlename]", form.get("g2_middlename"));
        payload.append("gurantors[1][lastname]", form.get("g2_lastname"));
        payload.append("gurantors[1][pancard_no]", form.get("g2_pancard_no"));
        payload.append("gurantors[1][aadharcard_no]", form.get("g2_aadharcard_no"));
        payload.append("gurantors[1][dob]", form.get("g2_dob"));
        payload.append("gurantors[1][mobile_no]", form.get("g2_mobile_no"));

        if (images.pan2?.file)
            payload.append("gurantors[1][pan_image]", images.pan2.file);
        if (images.aadharFront2?.file)
            payload.append("gurantors[1][aadhar_image]", images.aadharFront2.file);
        if (images.aadharBack2?.file)
            payload.append("gurantors[1][aadhar_image_back]", images.aadharBack2.file);

        const errors = [];

        if (!images.pan1) errors.push("Guarantor 1: PAN image is required");
        if (!images.aadharFront1) errors.push("Guarantor 1: Aadhaar front is required");
        if (!images.aadharBack1) errors.push("Guarantor 1: Aadhaar back is required");

        const g2_firstname = form.get("g2_firstname");

        const isG2Filled = g2_firstname && g2_firstname.trim() !== "";

        if (isG2Filled) {
            if (!images.pan2) errors.push("Guarantor 2: PAN image is required");
            if (!images.aadharFront2) errors.push("Guarantor 2: Aadhaar front is required");
            if (!images.aadharBack2) errors.push("Guarantor 2: Aadhaar back is required");
        }

        if (errors.length > 0) {
            errors.forEach((err) => toast.error(err));
            return;
        }

        try {
            const response = await createBidAgreement(payload);
            console.log(response)
            if(response.success){
                toast.success("Bid agreement submitted successfully!");
                setTimeout(()=>{
                    navigate(`/authenticationform/${response.bid.id}`)
                }, 1000)
            }
            
        } catch (err) {
            console.error("Error:", err);

            if (err?.response?.data) {
                const data = err.response.data;

                let message = data.error || "Something went wrong";

                // 🔥 Extract detailed errors
                if (data.details && Array.isArray(data.details)) {
                    const detailMessages = data.details
                        .map((item, index) => {
                            const fields = Object.entries(item)
                                .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
                                .join("\n");
                            return `Guarantor ${index + 1} → ${fields}`;
                        })
                        .join("\n\n");

                    message += "\n\n" + detailMessages;
                }

                toast.error(message);
            } else {
                toast.error("Failed to submit bid agreement.");
            }
            setSubmitLoading(false)
        }finally{
            setSubmitLoading(false)
        }
    };

    // Loading state
    if (loading) {
        return (
            <Layout>
                <div className="max-w-7xl mx-auto print-container">
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="flex items-center gap-2 text-neutral-500">
                            <ShipWheel size={18} className="animate-spin" />{" "}
                            <span>Loading chit details...</span>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Error state
    if (error) {
        return (
            <Layout>
                <div className="max-w-6xl mx-auto rounded-md p-15">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        <p className="font-medium">Error</p>
                        <p>{error}</p>
                    </div>
                </div>
            </Layout>
        );
    }

    // Data validation
    if (!chitAgreementData) {
        return (
            <Layout>
                <div className="max-w-6xl mx-auto rounded-md p-15">
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
                        <p className="font-medium">No Data</p>
                        <p>Chit agreement data not available.</p>
                    </div>
                </div>
            </Layout>
        );
    }

    const tableRowClass =
        "border-b border-neutral-200 last:border-none hover:bg-gray-50 transition-colors";
    const labelCellClass =
        "w-1/3 bg-neutral-50 px-6 py-4 text-sm font-semibold text-neutral-700 border-r border-neutral-200";
    const inputCellClass = "px-6 py-3";
    const inputClass =
        "w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-1 focus:ring-[#004f9e] outline-none";
    const fileBtnClass =
        "px-3 py-1 border border-neutral-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 shadow-inner text-xs whitespace-nowrap";
    const previewContainerClass = "mt-2 flex gap-2 flex-wrap";
    const previewImageClass = "relative w-20 h-20 rounded-md overflow-hidden border border-neutral-300";
    const removeBtnClass = "absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 cursor-pointer hover:bg-red-600";
    const fileInfoClass = "flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md border border-neutral-200";
    const fileNameClass = "text-xs text-gray-600 truncate max-w-[150px]";

    return (
        <Layout>
            <div className=" mx-auto rounded-md p-15">
                <h1 className="text-lg font-medium w-full text-start px-5 py-2 rounded-t-md bg-[#004f9e] text-white tracking-tight">
                    Bid Agreement Details
                </h1>

                <form className="bg-white shadow-lg rounded-b-md border border-neutral-300 overflow-hidden" onSubmit={handleSubmit}>
                    <table className="w-full border-collapse">
                        <tbody>
                            {/* --- Basic Details --- */}
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Date of Auction <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input type="date" name="dateofAuction" className={inputClass} required />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Total Bid Amount (Bid Offer){" "}
                                    <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        placeholder="Total Bid Amount"
                                        className={inputClass}
                                        required
                                        name="totalBidAmount"
                                        type="text"
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Auction Number <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        placeholder="Auction Number"
                                        className={inputClass}
                                        required
                                        type="text"
                                        name="auctionNumber"
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Prized Amount <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        placeholder="Prized Amount"
                                        className={inputClass}
                                        required
                                        type="text"
                                        name="prizedAmount"
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Dividend <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        placeholder="Dividend"
                                        className={inputClass}
                                        required
                                        type="number"
                                        name="dividend"
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Total Members of Group <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        placeholder="Total Members of Group"
                                        className={inputClass}
                                        required
                                        type="number"
                                        name="totalMemberofGroup"
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Surety Papers Received From p/s On{" "}
                                    <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        placeholder="Surety Papers Received From p/s On"
                                        className={inputClass}
                                        required
                                        type="date"
                                        name="suretyReceived"
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Sureties Verified On <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input type="date" className={inputClass} name="suretiesVerified" required />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Date of Payment Prized Amount{" "}
                                    <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input type="date" className={inputClass} name="dateOfPayment" required />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Cheque Number <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        placeholder="Cheque Number"
                                        className={inputClass}
                                        required name="chequeNo"
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Cheque Date <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input type="date" className={inputClass} required name="cheqDate" />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Bank <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        type="text"
                                        placeholder="Bank Name"
                                        className={inputClass}
                                        required
                                        name="cheqBank"
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Forman's Commission <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        type="number"
                                        placeholder="Forman's Commission"
                                        className={inputClass}
                                        name="foremanCommision"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Debit Bank Name <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        type="text"
                                        placeholder="Debit Bank Name"
                                        className={inputClass}
                                        required
                                        name="debitBankName"
                                    />
                                </td>
                            </tr>

                            {/* --- Guarantor KYC Section Header --- */}
                            <tr>
                                <td
                                    colSpan="2"
                                    className="bg-[#004c9e] text-white px-5 py-2 text-lg font-semibold"
                                >
                                    Guarantor KYC
                                </td>
                            </tr>

                            {/* --- Guarantor 1 --- */}
                            <tr className="bg-neutral-100">
                                <td colSpan="2" className="px-5 py-2 font-bold">
                                    Guarantor 1
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Full Name <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <div className="flex gap-2">
                                        <input
                                            placeholder="First"
                                            name="firstname"
                                            className={inputClass}
                                            required
                                        />
                                        <input
                                            placeholder="Middle"
                                            className={inputClass}
                                            required
                                            name="middlename"
                                        />
                                        <input placeholder="Last" className={inputClass} required name="lastname" />
                                    </div>
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Date of Birth <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input type="date" className={inputClass} required name="dob" />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Mobile Number <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        placeholder="Mobile Number"
                                        className={inputClass}
                                        required
                                        name="mobile_no"
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    PAN Number <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                placeholder="PAN"
                                                className={`${inputClass} uppercase`}
                                                required name="pancard_no"
                                            />
                                            <label className={fileBtnClass}>
                                                PAN Front
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept=".png,.jpg,.jpeg"
                                                    onChange={(e) => handleImageChange(e, 'pan1', 'pan', 1)}
                                                />
                                            </label>
                                        </div>
                                        {preview1.pan_name && (
                                            <div className={fileInfoClass}>
                                                <Paperclip size={14} className="text-gray-500" />
                                                <span className={fileNameClass}>{preview1.pan_name}</span>
                                                <button
                                                    type="button"
                                                    onClick={removePanImage1}
                                                    className="ml-auto text-red-500 hover:text-red-700"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Aadhar Number <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            name="aadharcard_no"
                                            placeholder="Enter your 12 digit Aadhar number"
                                            className={inputClass}
                                            required
                                        />
                                        <div className="flex gap-2">
                                            <label className={fileBtnClass}>
                                                Aadhaar Front{" "}
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={(e) => handleImageChange(e, 'aadharFront1', 'aadhar', 1)}
                                                />
                                            </label>
                                            <label className={fileBtnClass}>
                                                Aadhaar Back{" "}
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={(e) => handleImageChange(e, 'aadharBack1', 'aadhar_back', 1)}
                                                />
                                            </label>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {preview1.aadhar_name && (
                                                <div className={fileInfoClass}>
                                                    <Paperclip size={14} className="text-gray-500" />
                                                    <span className={fileNameClass}>Front: {preview1.aadhar_name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={removeAadharImage1}
                                                        className="ml-auto text-red-500 hover:text-red-700"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            )}
                                            {preview1.aadhar_back_name && (
                                                <div className={fileInfoClass}>
                                                    <Paperclip size={14} className="text-gray-500" />
                                                    <span className={fileNameClass}>Back: {preview1.aadhar_back_name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={removeAadharBackImage1}
                                                        className="ml-auto text-red-500 hover:text-red-700"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/* --- Guarantor 2 --- */}
                            <tr className="bg-neutral-100 border-t border-neutral-300">
                                <td colSpan="2" className="px-5 py-2 font-bold">
                                    Guarantor 2
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Full Name <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <div className="flex gap-2">
                                        <input
                                            placeholder="First"
                                            className={inputClass}
                                            
                                            name="g2_firstname"
                                        />
                                        <input
                                            placeholder="Middle"
                                            className={inputClass}
                                            
                                            name="g2_middlename"
                                        />
                                        <input placeholder="Last" className={inputClass}  name="g2_lastname" />
                                    </div>
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Date of Birth <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input type="date" className={inputClass}  name="g2_dob" />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Mobile Number <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <input
                                        placeholder="Mobile Number"
                                        className={inputClass}
                                        
                                        name="g2_mobile_no"
                                    />
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    PAN Number <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                placeholder="PAN"
                                                className={`${inputClass} uppercase`}
                                                
                                                name="g2_pancard_no"
                                            />
                                            <label className={fileBtnClass}>
                                                PAN Front
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept=".png,.jpg,.jpeg"
                                                    onChange={(e) => handleImageChange(e, 'pan2', 'pan', 2)}
                                                />
                                            </label>
                                        </div>
                                        {preview2.pan_name && (
                                            <div className={fileInfoClass}>
                                                <Paperclip size={14} className="text-gray-500" />
                                                <span className={fileNameClass}>{preview2.pan_name}</span>
                                                <button
                                                    type="button"
                                                    onClick={removePanImage2}
                                                    className="ml-auto text-red-500 hover:text-red-700"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            <tr className={tableRowClass}>
                                <td className={labelCellClass}>
                                    Aadhar Number <span className="text-red-500">*</span>
                                </td>
                                <td className={inputCellClass}>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            name="g2_aadharcard_no"
                                            placeholder="Enter your 12 digit Aadhar number"
                                            className={inputClass}
                                            
                                        />
                                        <div className="flex gap-2">
                                            <label className={fileBtnClass}>
                                                Aadhaar Front{" "}
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={(e) => handleImageChange(e, 'aadharFront2', 'aadhar', 2)}
                                                />
                                            </label>
                                            <label className={fileBtnClass}>
                                                Aadhaar Back{" "}
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={(e) => handleImageChange(e, 'aadharBack2', 'aadhar_back', 2)}
                                                />
                                            </label>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {preview2.aadhar_name && (
                                                <div className={fileInfoClass}>
                                                    <Paperclip size={14} className="text-gray-500" />
                                                    <span className={fileNameClass}>Front: {preview2.aadhar_name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={removeAadharImage2}
                                                        className="ml-auto text-red-500 hover:text-red-700"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            )}
                                            {preview2.aadhar_back_name && (
                                                <div className={fileInfoClass}>
                                                    <Paperclip size={14} className="text-gray-500" />
                                                    <span className={fileNameClass}>Back: {preview2.aadhar_back_name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={removeAadharBackImage2}
                                                        className="ml-auto text-red-500 hover:text-red-700"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex justify-center py-6 bg-neutral-50 border-t border-neutral-200">
                        {submitloading ? (
                            <button
                            type="submit"
                            className="px-10 py-2 bg-[#06c] transition-all text-white rounded-md text-sm font-medium shadow-md flex items-center gap-2"
                        ><Loader2 className="animate-spin " size={18}/>
                            Proceeding...
                        </button>
                        ) : (
                            <button
                            type="submit"
                            className="px-10 py-2 bg-[#004f9e] hover:bg-[#06c] transition-all text-white rounded-md text-sm font-medium shadow-md cursor-pointer"
                        >
                            Proceed
                        </button>
                        )}
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default BidAgreementDetails;