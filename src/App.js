import React from "react";
import axios from "axios";
import { useState, useCallback, useEffect, useReducer } from "react";
import { useSemiPersistentState } from "./hooks/useSemiPersistentState";
import { InputWithLabel } from "./components/InputWithLabel";
import { List } from "./components/List";
import { TextRender } from "./components/TextRender";
const debounce = (fn, delay = 200) => {
  let timer = null;
  if (timer) {
    console.log(111);
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  }
  timer = setTimeout(fn, delay);
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

// 使用reducer管理组件状态
const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

function App() {
  const initialStories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  // 本地持久化保持search的值，刷新后显示上一次的搜索词
  const [searchValue, setSearchValue] = useSemiPersistentState(
    "search",
    "React"
  );
  // 利用reducer统一管理状态
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // 后端数据请求接口
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchValue}`);

  // searchValue仅用于更新输入框的值
  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  // url更新触发副作用以获取新的数据
  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchValue}`);
    // 阻止浏览器默认事件，否则会导致页面重新加载
    event.preventDefault();
  };

  // 移除指定列表项的回调函数
  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  // 初始化reducer
  // 模拟异步获取数据, 点击submit，更新url, 调用handleFetchStories,更新数据
  const handleFetchStories = useCallback(async () => {
    if (searchValue === "") return;
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    const result = await axios.get(url);
    try {
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url]);

const SearchForm = ({
  searchValue,
  onSearchInput,
  onSearchSubmit
}) => (
  <form onSubmit={handleSearchSubmit}>
    <InputWithLabel
      id="search"
      label="Search"
      isFocused
      onInputChange={handleSearchInput}
      value={searchValue}
    >
      <TextRender fontWeight={300}>Search: </TextRender>
    </InputWithLabel>
    <button type="submit" disabled={!searchValue}>
      SUBMIT
    </button>
  </form>
)

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <SearchForm
        searchValue={searchValue}
        onSearchInput = {handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <hr />
      {stories.isError && <p>Something went wrong</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
}

export default App;
