import './App.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [userInfos, setUserInfos] = useState([]);
  const [randomUserDataJSON, setRandomUserDataJSON] = useState('');

  const fetchRandomData = (pageNumber) => {
    return axios
      .get(`https://randomuser.me/api?page=${pageNumber}`)
      .then(({ data }) => data)
      .catch((err) => {
        console.log(err);
      });
  };

  const getFullUserName = (userInfo) => {
    const {
      name: { first, last },
    } = userInfo;
    return `${first} ${last}`;
  };

  const fetchNextUser = useRef(() => {});

  fetchNextUser.current = () => {
    fetchRandomData(nextPageNumber).then((randomData) => {
      // setRandomUserDataJSON(
      //   JSON.stringify(randomData, null, 2) || 'No user data found '
      // );
      if (randomData === undefined) return;
      const newUserInfos = [...userInfos, ...randomData.results];
      setRandomUserDataJSON(
        JSON.stringify(randomData, null, 2) || 'No user data found '
      );
      setUserInfos(newUserInfos);
      setNextPageNumber(randomData.info.page + 1);
    });
  };

  useEffect(() => {
    fetchNextUser.current();
    // fetchRandomData(nextPageNumber).then((randomData) => {
    // setRandomUserDataJSON(
    //   JSON.stringify(randomData, null, 2) || 'No user data found '
    // );
    //   setUserInfos(randomData.results);
    //   setNextPageNumber(randomData.info.page + 1);
    // });
  }, []);
  return (
    <div className='App'>
      <header className='App-header'>
        <p>{counter}</p>
        <button onClick={() => setCounter(counter + 1)} className='button'>
          Increase Counter
        </button>
        <button onClick={fetchNextUser.current} className='button'>
          {' '}
          Fetch Next User
        </button>
        {userInfos.map((userInfo, idx) => (
          <div key={idx}>
            <p>{getFullUserName(userInfo)}</p>
            <img src={userInfo.picture.thumbnail} alt='' />
          </div>
        ))}

        {/* <button onClick={fetchRandomData}>Fetch Random Data</button> */}
        <pre>{randomUserDataJSON}</pre>
      </header>
    </div>
  );
}

export default App;
