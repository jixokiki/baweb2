// "use client"; // Pastikan ini ditulis dengan benar

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import {
//   collection,
//   getDocs,
//   updateDoc as firestoreUpdateDoc,
//   doc as firestoreDoc,
//   getDoc, // Menambahkan impor getDoc di sini
// } from "firebase/firestore"; // Memastikan semua fungsi yang diperlukan diimpor

// import { db } from "@/firebase/firebase";

// const Payment = () => {
//   const [userList, setUserList] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState("");
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     duration: "",
//     bank: "BNI",
//     accountNumber: "",
//     employeeId: "",
//     salary: 0,
//     golongan: "",
//     amount: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserList = async () => {
//       try {
//         setIsLoading(true);
//         const usersCollection = collection(db, "usersCuti");
//         const querySnapshot = await getDocs(usersCollection);
//         const usersData = [];
//         querySnapshot.forEach((doc) => {
//           usersData.push({ id: doc.id, ...doc.data() });
//         });
//         setUserList(usersData);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         // Handle error
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserList();
//   }, []);

//   useEffect(() => {
//     const fetchSelectedUser = async () => {
//       try {
//         if (selectedUserId) {
//           setIsLoading(true);
//           const docRef = firestoreDoc(db, "usersCuti", selectedUserId);
//           const docSnap = await getDoc(docRef); // Menggunakan getDoc untuk mengambil dokumen

//           if (docSnap.exists()) {
//             const userDataFromFirestore = docSnap.data();
//             setFormData({
//               username: userDataFromFirestore.username || "",
//               fullname: userDataFromFirestore.fullname || "",
//               email: userDataFromFirestore.email || "",
//               duration: userDataFromFirestore.duration || "",
//               bank: userDataFromFirestore.bank || "BNI",
//               accountNumber: userDataFromFirestore.accountNumber || "",
//               employeeId: userDataFromFirestore.employeeId || "",
//               salary: userDataFromFirestore.salary || 0,
//               golongan: userDataFromFirestore.golongan || "",
//               amount: userDataFromFirestore.amount || "",
//             });
//           } else {
//             console.log("No such document!");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching document:", error);
//         // Handle error
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSelectedUser();
//   }, [selectedUserId]);

//   const handleSelectUser = (userId) => {
//     setSelectedUserId(userId);
//   };

//   const handleAcc = async () => {
//     const {
//       username,
//       fullname,
//       email,
//       duration,
//       bank,
//       accountNumber,
//       employeeId,
//       salary,
//       golongan,
//       amount,
//     } = formData;

//     try {
//       setIsLoading(true);

//       // Example: Update document in Firestore
//       const docRef = firestoreDoc(db, "usersCuti", email); // Sesuaikan dengan email user yang login
//       await firestoreUpdateDoc(docRef, {
//         username,
//         fullname,
//         email,
//         duration: parseInt(duration),
//         bank,
//         accountNumber,
//         employeeId,
//         salary,
//         golongan,
//         amount,
//         timeStamp: new Date(), // Example: Timestamp
//       });

//       router.push("/"); // Redirect after successful update
//     } catch (error) {
//       console.error("Error updating document:", error);
//       // Handle error
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <NavbarAdmin />
//       <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Payment Page</h2>
        
//         <div className="mb-4">
//           <select
//             value={selectedUserId}
//             onChange={(e) => handleSelectUser(e.target.value)}
//             className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
//           >
//             <option value="">Select User</option>
//             {userList.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.username} - {user.email}
//               </option>
//             ))}
//           </select>

//           <div className="mt-4">
//             <p><strong>Username:</strong> {formData.username}</p>
//             <p><strong>Fullname:</strong> {formData.fullname}</p>
//             <p><strong>Email:</strong> {formData.email}</p>
//             <p><strong>Duration:</strong> {formData.duration} Bulan</p>
//             <p><strong>Bank:</strong> {formData.bank}</p>
//             <p><strong>Account Number:</strong> {formData.accountNumber}</p>
//             <p><strong>Employee ID:</strong> {formData.employeeId}</p>
//             <p><strong>Salary:</strong> {formData.salary}</p>
//             <p><strong>Golongan:</strong> {formData.golongan}</p>
//             <p><strong>Amount:</strong> {formData.amount}</p>
//           </div>
//         </div>

//         <button
//           onClick={handleAcc}
//           className="w-full bg-gray-500 text-white p-3 rounded-md mt-6 hover:bg-gray-600"
//           disabled={isLoading}
//         >
//           Take Input Data and Update Firestore
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;





"use client"; // Pastikan ini ditulis dengan benar

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavbarAdmin from "@/components/NavbarAdmin";
import {
  collection,
  getDocs,
  updateDoc as firestoreUpdateDoc,
  doc as firestoreDoc,
  addDoc,
  getDoc, // Menambahkan impor getDoc di sini
} from "firebase/firestore"; // Memastikan semua fungsi yang diperlukan diimpor

import { db } from "@/firebase/firebase";

const Payment = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    jangka: 0,
    bank: "BNI",
    nomorAkun: "",
    employeeId: "",
    salary: 0,
    golongan: "",
    amount: "",
    timeStamp: null, // Menggunakan null sebagai nilai awal
    salaryCut: 0, // Menambahkan state untuk salary cut
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        setIsLoading(true);
        const usersCollection = collection(db, "usersCuti");
        const querySnapshot = await getDocs(usersCollection);
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        setUserList(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserList();
  }, []);

  useEffect(() => {
    const fetchSelectedUser = async () => {
      try {
        if (selectedUserId) {
          setIsLoading(true);
          const docRef = firestoreDoc(db, "usersCuti", selectedUserId);
          const docSnap = await getDoc(docRef); // Menggunakan getDoc untuk mengambil dokumen

          if (docSnap.exists()) {
            const userDataFromFirestore = docSnap.data();
            setFormData({
              username: userDataFromFirestore.username || "",
              fullname: userDataFromFirestore.fullname || "",
              email: userDataFromFirestore.email || "",
              jangka: userDataFromFirestore.jangka || 0,
              bank: userDataFromFirestore.bank || "BNI",
              nomorAkun: userDataFromFirestore.nomorAkun || "",
              timeStamp: userDataFromFirestore.timeStamp || null, // Atur ke null jika tidak ada timeStamp
              employeeId: userDataFromFirestore.employeeId || "",
              salary: userDataFromFirestore.salary || 0,
              golongan: userDataFromFirestore.golongan || "",
              amount: userDataFromFirestore.amount || "",
              salaryCut: 0, // Reset salaryCut saat data pengguna dipilih ulang
            });
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSelectedUser();
  }, [selectedUserId]);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleAcc = async () => {
    const {
      username,
      fullname,
      email,
      jangka,
      bank,
      nomorAkun,
      timeStamp,
      employeeId,
      salary,
      golongan,
      amount,
    } = formData;

    try {
      setIsLoading(true);

      // Example: Update document in Firestore
      const docRef = firestoreDoc(db, "usersCuti", email); // Sesuaikan dengan email user yang login
      await firestoreUpdateDoc(docRef, {
        username,
        fullname,
        email,
        jangka: parseInt(jangka),
        bank,
        nomorAkun,
        timeStamp,
        employeeId,
        salary,
        golongan,
        amount,
        timeStamp: new Date(), // Example: Timestamp
      });

      router.push("/"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating document:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };


 const handleAccCuti = async () => {
    const {
      username,
      fullname,
      email,
      jangka,
      bank,
      nomorAkun,
      timeStamp,
      employeeId,
      salary,
      golongan,
      amount,
      salaryCut, // Menambahkan salaryCut ke dalam state
    } = formData;
  
    try {
      setIsLoading(true);
  
      // Kurangi salary berdasarkan salary cut
      const newSalary = salary - parseFloat(salaryCut); // Pastikan salaryCut diubah ke tipe numerik yang sesuai
  
      // Update document in Firestore
      const docRef = firestoreDoc(db, "usersCuti", email); // Sesuaikan dengan email user yang login
      await firestoreUpdateDoc(docRef, {
        username,
        fullname,
        email,
        jangka: parseInt(jangka),
        bank,
        nomorAkun,
        timeStamp,
        employeeId,
        salary: newSalary, // Update salary yang baru
        golongan,
        amount,
        timeStamp: new Date(), // Example: Timestamp
      });
  
      // Add a new document to slipGaji collection
      await addDoc(collection(db, "slipGaji"), {
        username,
        fullname,
        email,
        jangka: parseInt(jangka),
        bank,
        nomorAkun,
        timeStamp: new Date(), // Example: Timestamp
        employeeId,
        salary, // Initial salary
        salaryCut: parseFloat(salaryCut), // Salary cut
        finalSalary: newSalary, // Final salary after cut
        golongan,
        amount,
      });
  
      router.push("/"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating document:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
        <h2 className="text-2xl font-semibold mb-6">Payment Page</h2>
        
        <div className="mb-4">
          <select
            value={selectedUserId}
            onChange={(e) => handleSelectUser(e.target.value)}
            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
          >
            <option value="">Select User</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} - {user.email}
              </option>
            ))}
          </select>

          <div className="mt-4">
            <p><strong>Username:</strong> {formData.username}</p>
            <p><strong>Fullname:</strong> {formData.fullname}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Duration:</strong> {formData.jangka} Bulan</p>
            <p><strong>Bank:</strong> {formData.bank}</p>
            <p><strong>Account Number:</strong> {formData.nomorAkun}</p>
            <p><strong>Tanggal Pengajuan Cuti:</strong> {formData.timeStamp ? new Date(formData.timeStamp.seconds * 1000).toLocaleDateString() : ""}</p>
            <p><strong>Employee ID:</strong> {formData.employeeId}</p>
            <p><strong>Salary:</strong> {formData.salary}</p>
            <p><strong>Golongan:</strong> {formData.golongan}</p>
            <p><strong>Amount:</strong> {formData.amount}</p>
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="salaryCut">
              Edit Salary Cut:
            </label>
            <input
              type="number"
              id="salaryCut"
              value={formData.salaryCut}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md outline-none border-none p-2"
            />
          </div>

          <button
            onClick={handleAccCuti}
            className="w-full bg-red-500 text-white p-3 rounded-md mt-6 hover:bg-red-600"
            disabled={isLoading}
          >
            ACC Cuti dan Potong Gaji
          </button>
        </div>

        <button
          onClick={handleAcc}
          className="w-full bg-gray-500 text-white p-3 rounded-md mt-6 hover:bg-gray-600"
          disabled={isLoading}
        >
          Take Input Data and Update Firestore
        </button>
      </div>
    </div>
  );
};

export default Payment;








    
