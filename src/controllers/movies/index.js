import Movie from "../../models/movies.js";
import { getPageData } from "../../utils/pageData.js";

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
