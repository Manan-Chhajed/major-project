import axios from "axios";
import { toast } from "react-toastify";

export const uploadToIPFSHelper = async (file) => {
  const fileData = new FormData();
  fileData.append("file", file);

  const responseData = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: fileData,
    headers: {
      pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
      pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
      "Content-Type": "multipart/form-data",
    },
  });

  // console.log(import.meta.env.VITE_IPFS_URL);
  const fileUrl = `${import.meta.env.VITE_IPFS_URL}${responseData.data.IpfsHash}`;
  console.log("URL: ", fileUrl);
  // setFileUrl(fileUrl);
  // setFileHash(responseData.data.IpfsHash);
  // toast("File uploaded to IPFS");
  return responseData.data.IpfsHash;
};
