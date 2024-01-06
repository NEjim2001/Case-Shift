import axios from "axios";

export const fetchPhrases = async (phrase) => {
  try {
    const response = await axios.post(
      "https://api.ai21.com/studio/v1/paraphrase",
      {
        text: phrase,
      },
      {
        headers: {
          Authorization: "bYEokH4hIIiCo1K6ack3Y1ikUTJKYuwd",
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
  } catch (err) {
    console.error("Error fetching phrases:", err);
  }
};
