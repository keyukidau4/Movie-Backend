import Movie from "../../models/movies.js";
import { getPageData } from "../../utils/pageData.js";

import logger from "../../lib/logger.js";
import Genres from "../../models/genre.js";
import Videos from "../../models/video.js";

//lâý phim theo Top Trending, trả về 20 record và số lượng page có
export const TrendingMovie = async (req, res) => {
  try {
    const page = req.body["page"];

    const data = Movie.all();
    data.sort((a, b) => b.popularity - a.popularity);

    const pageSize = 20;
    const total_pages = Math.ceil(data.length / pageSize);
    const currentPage = page ? page : 1;

    const results = await getPageData(data, currentPage, pageSize);

    res.status(200).send({
      code: 200,
      data: {
        results,
        page: currentPage,
        total_pages,
      },
    });
  } catch (error) {
    return res.status(400).send({
      code: 400,
      message: "Error",
    });
  }
};

//lâý phim theo Top Rating, trả về 20 record và số lượng page có
export const RatingMovie = async (req, res) => {
  const params = req.params.page;

  try {
    const data = Movie.all();
    data.sort((a, b) => b.vote_average - a.vote_average);

    const pageSize = 20;
    const currentPage = params ? params : 1;
    const totalPage = Math.ceil(data.length / pageSize);

    if (params > totalPage) {
      return res.status(400).send({
        code: 400,
        message: "Select Page is not in page size",
      });
    }

    const response = await getPageData(data, currentPage, pageSize);

    res.status(200).send({
      code: 200,
      data: {
        results: response,
        page: currentPage,
        total_pages: totalPage,
      },
    });
  } catch (error) {
    console.log({ error });
    res.status(500).send({
      code: 500,
      message: "Server Error!",
    });
  }
};

//lâý phim theo thể loại, trả về 20 record và số lượng page có theo thể loại phim đó
export const GenreMovie = async (req, res) => {
  try {
    const genreParams = parseInt(req.params.genre);
    const page = parseInt(req.params.page);

    logger.info(`genre: ${genreParams} and page: ${page}`);
    if (!genreParams || !page) {
      return res.status(400).send({
        code: 400,
        message: "Request Failed! Not found genre param",
      });
    }

    const genreData = await Genres.all();
    const genreName = genreData.find((genre) => genre.id === genreParams);

    if (genreName === undefined) {
      return res.status(400).send({
        code: 400,
        message: "Not found that genre id",
      });
    }

    const movieData = await Movie.all();
    const listFormGenre = await movieData.filter((movie) =>
      movie.genre_ids.includes(genreParams)
    );
    const pageSize = 20;
    const currentPage = page ? page : 1;
    const totalPage = Math.ceil(listFormGenre.length / pageSize);

    const responseData = await getPageData(
      listFormGenre,
      currentPage,
      pageSize
    );
    return res.status(200).send({
      code: 200,
      message: "Successfully!",
      results: responseData,
      page: page,
      total_pages: totalPage,
      genre_name: genreName.name,
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).send({
      code: 500,
      message: "Server Error",
    });

    return;
  }
};

//Lâý video trailer của phim
export const TrailerMovie = async (req, res) => {
  try {
    const filmId = parseInt(req.body.film_id);

    if (!filmId) {
      return res.status(400).send({
        code: 400,
        message: "Not found film_id",
      });
    }

    const videoData = await Videos.all();
    const typeString = "Trailer Teaser";
    const videoForId = await videoData.find((video) => video.id === filmId);

    if (!videoForId) {
      return res.status(404).send({
        code: 404,
        message: "Not found video",
      });
    }
    const videos = videoForId.videos;

    const getVideo = await videos.filter(
      (video) =>
        video.official === true &&
        video.site === "YouTube" &&
        typeString.includes(video.type)
    );

    let trailerVideo = await getVideo.filter(
      (video) => video.type === "Trailer"
    );

    if (trailerVideo.length === 0) {
      trailerVideo = await getVideo.filter((video) => video.type === "Teaser");
    }

    if (trailerVideo.length === 0) {
      return res.status(404).send({
        code: 404,
        message: "Not Found Video",
      });
    }

    trailerVideo.sort((a, b) => b.published_at - a.published_at);

    logger.info({ trailerVideo });

    return res.status(200).send({
      code: 200,
      message: "Get Video Successfully",
      results: trailerVideo[0],
    });
  } catch (error) {
    logger.info({ error });

    return res.status(500).send({
      code: 500,
      message: "Server Error",
    });
  }
};

//Lấy video theo search keyword
export const SearchMovie = async (req, res) => {
  const keyword = req.body.keyword;
  const page = req.body.page;

  logger.info(`keyword: ${keyword}, page:${page}`);

  if (!keyword) {
    return res.status(400).send({
      code: 400,
      message: "Not found keyword param",
    });
  }

  try {
    const movieData = await Movie.all();

    const movieByKeyword = await movieData.filter(
      (movie) =>
        movie.overview?.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.title?.toLowerCase().includes(keyword.toLowerCase())
    );

    const pageSize = 20;
    const currentPage = page ? page : 1;
    const totalPage = Math.ceil(movieByKeyword.length / pageSize);

    if (page > totalPage) {
      logger.error(
        `Error With keyword: ${keyword}, page:${page} , Message: Page is not in Total Page , page: ${page} / total_page: ${totalPage}`
      );
      return res.status(400).send({
        code: 400,
        message: "Page is not in Total Page",
      });
    }

    const getDataForPage = await getPageData(
      movieByKeyword,
      currentPage,
      pageSize
    );

    return res.status(200).send({
      code: 200,
      message: "Successfully!",
      results: getDataForPage,
      total_pages: totalPage,
    });
  } catch (error) {
    logger.error({ error });

    return res.status(500).send({
      code: 500,
      message: "Server Error!",
    });
  }
};
