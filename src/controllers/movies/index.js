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
      status: 200,
      data: {
        results,
        page: currentPage,
        total_pages,
      },
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Error",
    });
  }
};
