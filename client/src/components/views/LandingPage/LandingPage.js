import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./Section/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
        console.log(response);
      });
  };

  useEffect(() => {
    console.log(process.env.NODE_ENV);
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* Main image */}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by lastest</h2>
        <hr />

        {/* Movie Grid Cards */}
        {/* gutter: 상하좌우 여백 생성 */}
        <Row gutter={[16, 16]}>
          {/* 에러 방지 목적으로 Movies && 추가(Movies state 미생성 시 에러 발생) */}
          {Movies &&
            Movies.map((movie, index) => (
              // TODO: React.Fragment의 기능은?
              <React.Fragment key={index}>
                {/* GridCards의 props로 img, movieId, movieName 전달
                TODO: movieId가 필요한 이유는? */}
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
              CurrentPage + 1
            }`;
            fetchMovies(endpoint);
          }}
        >
          {" "}
          Load More{" "}
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
