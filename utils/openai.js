const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const openaiComments = async (position, statName, statValue) => { 
  const test = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Generate a comment on this stat ${statName} with this rating ${statValue} for a scouting report on a college football prospect playing ${position}. Do not explicitly mention the stat name or rating in the comment. The comment should be a one sentence general comment on the stat. For example, if the stat is "Throw Power" and the rating is 95, the comment could be "Elite arm strength with the ability to get the ball anywhere on the field". For reference any stat with a rating of 90 or higher is considered "elite", any stat with a rating of 80 to 90 is considered "great". Any stat with a rating of 75 to 80 is considered "above average". Any stat with a rating of 70 to 75 is considered "average". Any stat with a rating of 60 to 70 is considered "below average", any stat with a rating of 50 to 60 is considered "poor", any stat with a rating of 50 or lower is considered "terrible".`,
    temperature: 0.7,
    max_tokens: 100,
  });
  // console.log(statName, statValue);
  // console.log(test.data.choices[0].text);
  return test.data.choices[0].text;
}

// const openaiResponse = async (options) => { 
//   const test = await openai.createCompletion({
//     model: "text-davinci-002",
//     prompt: "Generate a scouting report for a college football prospect",
//     temperature: 0.7,
//     max_tokens: 10,
//   });
//   console.log(test.data.choices[0].text);
// }

module.exports = openaiComments;
// module.exports = openaiResponse;