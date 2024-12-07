import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { makeRequest } from "../../utils/api";
import { auth, getIdToken } from "../../firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Results from "../Result/Result";
import { Button } from "@mui/material";

function HistoryEntry() {
  const location = useLocation();
  const { rowData } = location.state || {};
  const [entryData, setEntryData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const idToken = await getIdToken();
      const response = await makeRequest(`/history/${rowData.session_id}`, 'GET', {}, idToken);
      setEntryData(response.message);

      const userId = auth.currentUser.uid;
      const storage = getStorage();
      const storageRef = ref(storage, `user-files/${userId}/${rowData.session_id}/static.png`);
      const imageUrl = await getDownloadURL(storageRef);
      setImageUrl(imageUrl);
    };
    fetchData();
  }, [rowData.session_id]);

  if (!entryData && !imageUrl) {
    return null;
  }

  return (
    <div>
      <Results
        question={entryData.question}
        imageUrl={imageUrl}
        transcript={entryData.transcript}
        oralAnalysis={entryData.response}
        completionTime={entryData.completionTime}
      />
    </div>
  );
}

export default HistoryEntry;
