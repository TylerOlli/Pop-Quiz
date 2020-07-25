let users = {
  lolaramirez: {
    id: 'lolaramirez',
    name: 'Lola Ramirez',
    avatarURL: "https://i.pravatar.cc/150?img=48",
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  tylerolli: {
    id: 'tylerolli',
    name: 'Tyler Olli',
    avatarURL: "https://i.pravatar.cc/150?img=68",
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  dangoldman: {
    id: 'dangoldman',
    name: 'Dan Goldman',
    avatarURL: "https://i.pravatar.cc/150?img=53",
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'lolaramirez',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['lolaramirez'],
      text: 'Version control with Github',
    },
    optionTwo: {
      votes: [],
      text: 'Version control with Bitbucket'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'dangoldman',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'Write backend using Node.js',
    },
    optionTwo: {
      votes: ['dangoldman', 'lolaramirez'],
      text: 'Write backend using Java'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'lolaramirez',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'Develop Website',
    },
    optionTwo: {
      votes: ['lolaramirez'],
      text: 'Develop Mobile App'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylerolli',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "Design App's UI",
    },
    optionTwo: {
      votes: ['lolaramirez'],
      text: 'Write API Endpoints'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'tylerolli',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['tylerolli'],
      text: 'Style using Sass',
    },
    optionTwo: {
      votes: ['dangoldman'],
      text: 'Style using LESS'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'dangoldman',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['dangoldman'],
      text: 'Develop site using React',
    },
    optionTwo: {
      votes: ['tylerolli'],
      text: 'Develop site using Angular'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }
      
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}
