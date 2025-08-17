// // import React, { useEffect, useState } from "react";
// // import { QRCodeCanvas } from "qrcode.react";
// // import { FaEdit } from "react-icons/fa";
// // import axiosInstance from "../../utils/axiosInstance";
// // import { useGlobalContext } from "../../context/globalContext";
// // import "./ConnectWapp.css";

// // const ConnectWapp = () => {
// // //   const [user, setUser] = useState(null);
// // const { user, setUser } = useGlobalContext();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     whatsappNumber: "",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// // useEffect(() => {
// //   const storedUser = localStorage.getItem("user");
// //   if (storedUser) {
// //     const parsedUser = JSON.parse(storedUser);
// //     setUser(parsedUser);
// //     setFormData({
// //       name: parsedUser.name || "",
// //       email: parsedUser.email || "",
// //       whatsappNumber: parsedUser.whatsappNumber || "",
// //     });
// //   }

// //   const fetchProfile = async () => {
// //     try {
// //       const response = await axiosInstance.get("/profile");
// //       const fetchedUser = response.data.user || response.data;
// //       console.log("Fetched user:", fetchedUser);
// //       setUser(fetchedUser);
// //       setFormData({
// //         name: fetchedUser.name || "",
// //         email: fetchedUser.email || "",
// //         whatsappNumber: fetchedUser.whatsappNumber || "",
// //       });
// //       localStorage.setItem("user", JSON.stringify(fetchedUser));
// //     } catch (err) {
// //       console.error("Error fetching profile:", err);
// //     }
// //   };

// //   fetchProfile();
// // }, [setUser]);


// //   const handleChange = (field, value) => {
// //     setFormData((prev) => ({ ...prev, [field]: value }));
// //   };

// //   const handleSave = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axiosInstance.put("/profile", formData);
// //       const updatedUser = response.data.user;

// //       setUser(updatedUser);
// //       localStorage.setItem("user", JSON.stringify(updatedUser));

// //       setIsEditing(false);
// //       setError("");
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to update");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// // const twilioJoinLink = import.meta.env.REACT_APP_TWILIO_JOIN_LINK;


// //   if (!user) return <p>Loading profile...</p>;

// //   return (
// //     <div className="profile-container">
// //       <div className="profile-header">
// //         <h1 className="profile-title">
// //           Profile
// //           <FaEdit className="edit-icon" onClick={() => setIsEditing(true)} />
// //         </h1>
// //       </div>

// //       <div className="profile-details">
// //         {/* Name */}
// //         <div className="profile-field">
// //           <p className="field-label">Name:</p>
// //           {isEditing ? (
// //             <input
// //               type="text"
// //               value={formData.name}
// //               onChange={(e) => handleChange("name", e.target.value)}
// //               className="edit-input"
// //             />
// //           ) : (
// //             <span className="field-value">{formData.name}</span>
// //           )}
// //         </div>

// //         {/* Email */}
// //         <div className="profile-field">
// //           <p className="field-label">Email:</p>
// //           {isEditing ? (
// //             <input
// //               type="email"
// //               value={formData.email}
// //               onChange={(e) => handleChange("email", e.target.value)}
// //               className="edit-input"
// //             />
// //           ) : (
// //             <span className="field-value">{formData.email}</span>
// //           )}
// //         </div>

// //         {/* WhatsApp */}
// //         <div className="profile-field">
// //           <p className="field-label">WhatsApp:</p>
// //           {isEditing ? (
// //             <input
// //               type="text"
// //               value={formData.whatsappNumber}
// //               onChange={(e) => handleChange("whatsappNumber", e.target.value)}
// //               className="edit-input"
// //               placeholder="10-digit number"
// //             />
// //           ) : (
// //             <span className="field-value">
// //               {formData.whatsappNumber
// //                 ? `+91 ${formData.whatsappNumber}`
// //                 : "Not added"}
// //             </span>
// //           )}
// //         </div>
// //       </div>

// //       {error && <p className="error-text">{error}</p>}

// //       {isEditing && (
// //         <div className="edit-actions">
// //           <button onClick={handleSave} disabled={loading} className="save-btn">
// //             {loading ? "Saving..." : "Save"}
// //           </button>
// //           <button onClick={() => setIsEditing(false)} className="cancel-btn">
// //             Cancel
// //           </button>
// //         </div>
// //       )}

// //       {/* WhatsApp Integration */}
// //       <div className="whatsapp-integration">
// //         <h2 className="integration-title">WhatsApp Integration</h2>
       
// //         {formData.whatsappNumber ? (
// //           <div>
// //             <p className="integration-desc">
// //               Connect your WhatsApp to log expenses via messages.
// //             </p>
// //             <a
// //               href={twilioJoinLink}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="connect-btn"
// //             >
// //               ✅ Connect with WhatsApp
// //             </a>
// //             <p className="qr-hint">Or scan the QR code below:</p>
// //             <div className="qr-container">
// //               <QRCodeCanvas value={twilioJoinLink} size={150} />
// //             </div>
// //           </div>
// //         ) : (
// //           <p className="error-text">
// //             Please add your WhatsApp number above to enable integration.
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ConnectWapp;


// import React, { useEffect, useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import { FaEdit } from "react-icons/fa";
// import axiosInstance from "../../utils/axiosInstance";
// import { useGlobalContext } from "../../context/globalContext";

// const ConnectWapp = () => {
//   const { user, setUser } = useGlobalContext();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     whatsappNumber: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ Vite env variable
//   const twilioJoinLink = import.meta.env.VITE_TWILIO_JOIN_LINK;

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       setFormData({
//         name: parsedUser.name || "",
//         email: parsedUser.email || "",
//         whatsappNumber: parsedUser.whatsappNumber || "",
//       });
//     }

//     const fetchProfile = async () => {
//       try {
//         const response = await axiosInstance.get("/profile");
//         const fetchedUser = response.data.user || response.data;
//         setUser(fetchedUser);
//         setFormData({
//           name: fetchedUser.name || "",
//           email: fetchedUser.email || "",
//           whatsappNumber: fetchedUser.whatsappNumber || "",
//         });
//         localStorage.setItem("user", JSON.stringify(fetchedUser));
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };

//     fetchProfile();
//   }, [setUser]);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.put("/profile", formData);
//       const updatedUser = response.data.user;

//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       setIsEditing(false);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return <p className="text-center">Loading profile...</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-lg">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
//         <FaEdit
//           className="text-gray-500 hover:text-gray-700 cursor-pointer"
//           onClick={() => setIsEditing(true)}
//         />
//       </div>

//       {/* Profile Fields */}
//       <div className="space-y-4">
//         {/* Name */}
//         <div>
//           <p className="text-sm text-gray-500">Name:</p>
//           {isEditing ? (
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => handleChange("name", e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//           ) : (
//             <span className="text-lg font-medium">{formData.name}</span>
//           )}
//         </div>

//         {/* Email */}
//         <div>
//           <p className="text-sm text-gray-500">Email:</p>
//           {isEditing ? (
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => handleChange("email", e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//           ) : (
//             <span className="text-lg font-medium">{formData.email}</span>
//           )}
//         </div>

//         {/* WhatsApp */}
//         <div>
//           <p className="text-sm text-gray-500">WhatsApp:</p>
//           {isEditing ? (
//             <input
//               type="text"
//               value={formData.whatsappNumber}
//               onChange={(e) => handleChange("whatsappNumber", e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               placeholder="10-digit number"
//             />
//           ) : (
//             <span className="text-lg font-medium">
//               {formData.whatsappNumber
//                 ? `+91 ${formData.whatsappNumber}`
//                 : "Not added"}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

//       {/* Action Buttons */}
//       {isEditing && (
//         <div className="flex gap-3 mt-4">
//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//           <button
//             onClick={() => setIsEditing(false)}
//             className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//         </div>
//       )}

//       {/* WhatsApp Integration */}
//       <div className="border-t border-gray-300 pt-8 mt-8 text-center">
//         <h2 className="text-lg sm:text-xl font-semibold mb-3">
//           WhatsApp Integration
//         </h2>

//         {formData.whatsappNumber ? (
//           <>
//             <p className="text-sm text-gray-600 mb-3">
//               Connect your WhatsApp to log expenses via messages.
//             </p>
//             <a
//               href={twilioJoinLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
//             >
//               ✅ Connect with WhatsApp
//             </a>
//             <p className="text-xs mt-2 text-gray-500">
//               Or scan the QR code below:
//             </p>
//             <div className="mt-3 flex justify-center">
//               <QRCodeCanvas value={twilioJoinLink} size={150} />
//             </div>
//           </>
//         ) : (
//           <p className="text-red-500 text-sm">
//             Please add your WhatsApp number above to enable integration.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ConnectWapp;


import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaEdit } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import { useGlobalContext } from "../../context/globalContext";
import "./index.css";

const ConnectWapp = () => {
  const { user, setUser } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const twilioJoinLink = import.meta.env.VITE_TWILIO_JOIN_LINK;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        whatsappNumber: parsedUser.whatsappNumber || "",
      });
    }

    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        const fetchedUser = response.data.user || response.data;
        setUser(fetchedUser);
        setFormData({
          name: fetchedUser.name || "",
          email: fetchedUser.email || "",
          whatsappNumber: fetchedUser.whatsappNumber || "",
        });
        localStorage.setItem("user", JSON.stringify(fetchedUser));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [setUser]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/profile", formData);
      const updatedUser = response.data.user;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="connectwapp-container">
      {/* Header */}
      <div className="header">
        <h1>Profile</h1>
        <FaEdit className="edit-icon" onClick={() => setIsEditing(true)} />
      </div>

      {/* Profile Fields */}
      <div className="profile-fields">
        <div className="field">
          <p className="label">Name:</p>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            <span className="value">{formData.name}</span>
          )}
        </div>

        <div className="field">
          <p className="label">Email:</p>
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          ) : (
            <span className="value">{formData.email}</span>
          )}
        </div>

        <div className="field">
          <p className="label">WhatsApp:</p>
          {isEditing ? (
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => handleChange("whatsappNumber", e.target.value)}
              placeholder="10-digit number"
            />
          ) : (
            <span className="value">
              {formData.whatsappNumber
                ? `+91 ${formData.whatsappNumber}`
                : "Not added"}
            </span>
          )}
        </div>
      </div>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Action Buttons */}
      {isEditing && (
        <div className="action-buttons">
          <button onClick={handleSave} disabled={loading} className="save-btn">
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      )}

      {/* WhatsApp Integration */}
      <div className="whatsapp-section">
        <h2>WhatsApp Integration</h2>
        {formData.whatsappNumber ? (
          <>
            <p className="description">
              Connect your WhatsApp to log expenses via messages.
            </p>
            <a
              href={twilioJoinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="connect-btn"
            >
              ✅ Connect with WhatsApp
            </a>
            <p className="small-text">Or scan the QR code below:</p>
            <div className="qr-container">
              <QRCodeCanvas value={twilioJoinLink} size={150} />
            </div>
          </>
        ) : (
          <p className="error">
            Please add your WhatsApp number above to enable integration.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConnectWapp;
