import API from "./API";

const getInternetData = () => {
  const fetchYoutube = async () => {
    const currentDate = new Date().toLocaleDateString("en-CA"); //YYYY-MM-DD

    try {
      const response = await API.fetchYoutube(currentDate);
      return response;
    } catch (error) {
      throw new Error("Error Fetching Youtube Data !");
    }
  };

  return { fetchYoutube };
};

export default getInternetData;
