import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // react-router-dom에서 Link 가져오기
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";

const ListPage = () => {
  const [contents, setContents] = useState<{ id: string; title: string; content: string; imageUrl: string | null; }[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contents"));
        const fetchedContents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          imageUrl: doc.data().imageUrl || null,
        }));
        setContents(fetchedContents);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, []);

  return (
    <div>
      <h1>업로드된 컨텐츠 목록</h1>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            {/* Link 컴포넌트를 사용하여 해당 항목의 ID를 URL에 전달 */}
            <Link to={`/contents/${content.id}`}>
              <h3>{content.title}</h3>
              <p>{content.content}</p>
              {content.imageUrl && <img src={content.imageUrl} alt="Uploaded" />}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
