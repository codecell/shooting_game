import axios from 'axios';

const scoreSorter = (arr) => arr.sort((a, b) => b.score - a.score);

const getLeaderBoard = async () => {
  const gameId = 'V6thFacpVMUs0SvMfe9S';
  const api = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;

  let scoreData;

  await axios.get(api)
    .then(res => res.data)
    .then(data => {
      const { result } = data;

      scoreData = result;
      scoreData = scoreSorter(scoreData);
      window.scoreSheet = scoreData;
    })
    .catch(err => err.response.data.message);
};

const leaderBoard = getLeaderBoard();

const postScore = async (user, score) => {
  const gameId = 'V6thFacpVMUs0SvMfe9S';
  const api = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
  const flashTag = document.querySelector('#flashTag');

  await axios({
    method: 'post',
    url: api,
    data: {
      user,
      score,
    },
  })
    .then(res => res.data)
    .then(async data => {
      const { result } = await data;
      flashTag.textContent = 'Sending Your Score';

      if (result === 'Leaderboard score created correctly.') {
        flashTag.classList.add('success');
        flashTag.textContent = 'Score succesfully sent';
      }
    }).catch(err => {
      flashTag.classList.add('error');

      const flashMessage = err.response.data.message.split('user').join('NAME');
      flashTag.textContent = flashMessage;

      return err;
    });
};

export {
  getLeaderBoard, leaderBoard, postScore, scoreSorter,
};