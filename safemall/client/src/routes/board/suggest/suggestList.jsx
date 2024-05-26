import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SuggestService from '../../../service/suggest';
import styles from "./suggestList.module.css";

function SuggestList() {
  const [suggestList, setSuggestList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [lastNo, setLastNo] = useState(null);
  const [showMoreButton, setShowMoreButton] = useState(true);

  const fetchSuggestList = async (reset = false) => {
    try {
      const suggestService = new SuggestService();
      const fetchedData = await suggestService.getSuggestList(lastNo);
      
      if (fetchedData) {
        if (reset) {
          setSuggestList(fetchedData);
        } else {
          setSuggestList(prevList => [...prevList, ...fetchedData]);
        }

        if (fetchedData.length > 0) {
          setLastNo(fetchedData[fetchedData.length - 1].no);
        }

        if (fetchedData.length % 5 !== 0) {
          setShowMoreButton(false);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Report list:', error);
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (lastNo !== null) {
      try {
        const suggestService = new SuggestService();
        const fetchedData = await suggestService.getSuggestList(lastNo);
        if (fetchedData.length > 0) {
          setSuggestList(prevList => [...prevList, ...fetchedData]);
          setLastNo(fetchedData[fetchedData.length - 1].no);
        }
        if (fetchedData.length % 5 !== 0) {
          setShowMoreButton(false);
        }
      } catch (error) {
        console.error('Error fetching more Report list:', error);
      }
    }
  };

  useEffect(() => {
    fetchSuggestList(true);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.content}>
      <header className={styles.appheader}>
          <h1>건의사항</h1>
          <div className={styles.searchbar}>
              <input type="search" placeholder="검색"></input>
              <button className={styles.submit} type="submit">&#128269;</button>
          </div>
          <div className={styles.createBtnArea}>
            <Link to="/suggest/create" className={`${styles.btn} ${styles.createbtn}`}>작성하기</Link>
          </div>
        </header>
        <div className={styles.notices}>
          <div className={styles.noticeheader}>
              <span>No</span>
              <span>제목</span>
              <span>작성일</span>
              <span>작성자</span>
              <span>처리여부</span>
          </div>
          {suggestList.length === 0 ? (
            <div className={styles.noData}>
              <p>등록된 건의사항 없습니다.</p>
            </div>
          ) : (
            <>
            {suggestList.map((suggest, index) => (
              <Link className={styles.noticeitem} to={`/board/report/${suggest.no}`} key={`${suggest.no}-${index}`}>
                <span>{suggest.no}</span>
                <span>{suggest.Title}</span>
                <span>{suggest.createdAt.split('T')[0]}</span>
                <span>{suggest.Author}</span>
                <span>{suggest.State ? '완료' : '처리중'}</span>
              </Link>
            ))}
            {showMoreButton && (
              <div className={styles.loadmore}>
                <button type="button" onClick={handleLoadMore}>더보기▼</button>
              </div>
            )}
          </>
          )}
        </div>
    </div>
  );
}

export default SuggestList;
