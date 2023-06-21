import React, { useState } from 'react'
import SvgComponent from './SvgComponent'
import FileUpload from './FileUpload'
import Modal from './Modal';
import Loader from './Loader';

export default function Home(props) {
    const { account, contract, provider } = props;
    const [files, setFiles] = useState([]);
    const [fetchAccount, setFetchAccount] = useState(account);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // TODO: get transaction hash (done) and share link to check on etherscan
    // const getTransactionHash = async () => {
    //     provider.getBlockNumber().then((blockNumber) => {
    //         provider.getBlock(blockNumber).then((block) => {
    //             const transactionHash  = block.transactions[0];
    //             console.log('trans: ', transactionHash)
    //         })
    //     })
    // }

    const handleFetch = async () => {
        console.log(fetchAccount)
        try {
            let ids = await contract.display(fetchAccount ? fetchAccount : account);
            console.log("ids: ", ids);
            setFiles(ids);

        } catch (error) {
            alert("Error: You don't have access!");
        }
    }

    return (
        <>
            <div>
                <div className={`${showModal ? 'blur-sm' : loading ? 'blur-xl' : ''}`}>
                    <div>
                        <p className='text-4xl z-10 font-bold text-center my-6 absolute w-full'>Google Drive 3.0</p>
                        <p className='absolute w-full text-center z-10'>User: {account}</p>

                        <button onClick={() => setShowModal((prev) => !prev)} type="button" className="py-2 px-4 absolute h-10 bottom-0 md:top-0 z-10 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-20 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg m-2">
                            Share
                        </button>

                        <SvgComponent />
                    </div>
                    <FileUpload setLoading={setLoading} account={account} contract={contract} />
                    <div className='w-full flex justify-center'>
                        <div className=" relative mx-2">
                            <input type="text" id="rounded-email" onChange={(e) => setFetchAccount(e.target.value)} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder={account} />
                        </div>

                        <button onClick={handleFetch} type="button" className="py-2 px-4 w-36 bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Fetch Files
                        </button>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-2'>
                        {files.map((item, index) => {
                            const link = `https://gateway.pinata.cloud/ipfs/${item.substring(6)}`
                            return (
                                <div key={index}>
                                    <a href={link} target='_blank' rel='noreferrer'>
                                        <img src={link} alt="img" />
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {showModal && (<div className='z-20 absolute bg-transparent w-full h-full top-0 flex items-center justify-center'>
                    <Modal setLoading={setLoading} showModal={showModal} setShowModal={setShowModal} account={account} contract={contract} />
                </div>)}
                {
                    loading && (
                        <div className='z-20 absolute bg-transparent w-full h-full top-0 flex items-center justify-center'>
                            <Loader />
                        </div>
                    )
                }
            </div>
            {/* <button type="button" onClick={getTransactionHash}>click me</button> */}

        </>
    )
}
