import React, { useEffect, useCallback, useRef, useState } from "react";
import axios from "axios";
import "./booklist.css";

const BookList = ({ query }: any) => {
  const [pageNum, setPageNum] = useState(1);
  const [size, setSize] = useState(10);
  const [lastElement, setLastElement] = useState<any>(null);
  const [data, setData] = useState([]);
  const [charac, setCharac] = useState([]);
  const [loading, setLoading] = useState(true);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          if (size >= 50) {
            setPageNum((no) => no + 1);
            setSize(10);
          } else {
            setSize((yes) => yes + 10);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    )
  );
  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://www.anapioficeandfire.com/api/books/?page=${pageNum}&pageSize=${size}`
        );
        setData(response);
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [size, pageNum]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://www.anapioficeandfire.com/api/characters`
        );
        setCharac(response);
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const t = charac.filter(
    (o: any) =>
      o.name.toLowerCase().includes(query) ||
      o.culture.toLowerCase().includes(query)
  );

  return (
    <>
      <div className="book_container">
        {data
          .filter((o: any) => {
            if (o.name.toLowerCase().includes(query)) return true;
            if (o.isbn.toLowerCase().includes(query)) return true;
            if (o.publisher.toLowerCase().includes(query)) return true;
            if (o.released.toLowerCase().includes(query)) return true;
            let newArray = o.authors.map((item: any) => {
              if (item.toLowerCase().includes(query)) {
                return true;
              }
            });
            if (newArray[0]) return true;

            let test = t.map(({ url }) => {
              if (o.characters.includes(url)) {
                return true;
              }
            });
            if (test[0]) return true;
          })
          .map(({ authors, name, publisher, isbn, released }: any, i: any) => {
            return (
              <div className="item_container" ref={setLastElement}>
                <div className="book_box">
                  <span className="book_name">{name}</span>
                  <span className="book_author">{authors}</span>
                </div>
                <span className="book_publisher"> {publisher}</span>
                <span className="book_isbn">isbn: {isbn}</span>
                <span className="book_released">released: {released}</span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default BookList;
