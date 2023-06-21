import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { AiFillCloseCircle } from 'react-icons/ai';
import { SiStackshare } from 'react-icons/si';

export default function Modal(props) {
  let { showModal, setShowModal, account, contract } = props;
  const [shareList, setShareList] = useState([]);
  const [shareAccount, setShareAccount] = useState("");
  const [showList, setShowList] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(null);

  const handleShare = async () => {
    await contract.allow(shareAccount);
    setShowModal(false);
  }

  const handleRemove = async () => {
    await contract.disAllow(deleteAccount.user);
    setShowModal(false);
  }

  useEffect(() => {
    const getShareList = async () => {
      let list = await contract.shareAccess();
      setShareList(list);
    }

    contract && getShareList();
  }, [contract]);


  return (
    <div className="w-72 p-4 m-auto bg-white shadow-2xl border-2 rounded-2xl dark:bg-gray-800">
      <div className="w-full h-full text-center">
        <div className="flex flex-col justify-between h-full">
          <div className='w-full justify-end flex'>
            <AiFillCloseCircle color='#DC2626' className='cursor-pointer' onClick={() => setShowModal((prev) => !prev)} size={20} />
          </div>
          <div className='w-full p-4 flex justify-center'>
            <SiStackshare size={50} color='#4ca2d8'/>
          </div>
          <div>
            <div className=" relative mx-2">
              <input type="text" id="rounded-email" className=" rounded-lg border-grey flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Account" onChange={(e) => { setShareAccount(e.target.value) }} value={shareAccount} />
            </div>
          </div>

          <div className="flex items-center justify-between w-full gap-4 mt-8 mb-4">
            <button onClick={handleShare} type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Share
            </button>
          </div>

          <div className="w-64">
            <div className="relative mt-2">
              <button type="button" onClick={() => setShowList((prev) => !prev)} className="relative w-full py-3 pl-3 pr-10 text-left bg-white border-2 rounded-md shadow-lg cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <span className="block ml-3 truncate">
                    {deleteAccount ? deleteAccount : "Select User to Remove"}
                  </span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd">
                    </path>
                  </svg>
                </span>
              </button>
              {showList && (<div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                <ul tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                  {shareList.map((item, index) => {
                    return item.access && (<li onClick={() => {
                      setShowList(false);
                      setDeleteAccount(item);
                    }} id="listbox-item-1" role="option" className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9" key={index}>
                      <div className="flex items-center">
                        <span className="block ml-3 font-normal truncate">
                          {item}
                        </span>
                      </div>
                    </li>)
                  })}
                </ul>
              </div>)}
              {deleteAccount && (<div className="flex items-center justify-between w-full gap-4 mt-2">
                <button onClick={handleRemove} type="button" className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Remove
                </button>
              </div>)}
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}
