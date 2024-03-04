import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";

const ContentsPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!id) {
          console.error("Invalid ID!");
          return;
        }

        const docRef = doc(db, "contents", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [id]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
      {content.imageUrl && <img src={content.imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ContentsPage;
