import React, { useState } from 'react';
import axios from "axios";

export default function FileUpload(props) {
  const { account, contract, setLoading } = props;

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const JWT = `Bearer ${process.env.REACT_APP_PINATA_JWT}`;

  const handleSubmission = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append('file', file)

    const metadata = JSON.stringify({
      name: fileName,
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      });
      console.log(res.data);
      const imgHash = `ipfs://${res.data.IpfsHash}`;
      await contract.add(imgHash);
      setLoading(false);
    } catch (error) {
      alert("Pinata Error occurred! Try again later.");
      setLoading(false);
    }

    setFile(null);
    setFileName("No file selected");
  };


  return (
    <>
      <div className='text-center w-full text-xl md:-mt-16'>

        <label htmlFor="dropzone-file" className="flex flex-col items-center w-full max-w-md p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>

          <h2 className="w-64 truncate mt-1 font-medium text-gray-700 dark:text-gray-200">{fileName}</h2>

          <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">Upload or darg & drop your file SVG, PNG or JPG </p>

          <input id="dropzone-file" type="file" onChange={(e) => handleChange(e)} className="hidden" />
        </label>
      </div>

      <button type="button" className="w-32 my-2 mx-auto py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" onClick={handleSubmission}>
        <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
          </path>
        </svg>
        Upload
      </button>

    </>
  )
}
