import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function MarkdownContent() {
  const { '*': filePath } = useParams();
  const [content, setContent] = useState('');
  useEffect(() => {
    const fetchHtml = async  () => {
      const response = await fetch(`/html/${filePath.replace('.md', '.html')}`);
      const text = await response.text();
      setContent(text)
    }
    fetchHtml()
  }, [filePath]);
  
  return (
    <div className="markdown-content" dangerouslySetInnerHTML={{ __html: content }}/>
  );
}

export default MarkdownContent;