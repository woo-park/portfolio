import * as api from '../api';

const mockProjects = [
  {
    id: 1,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/wave',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
    counts: 0

  },
  {
    id: 2,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/',
    videoURL:'./vids/altgenerator_0x.mp4',
    counts: 0,
  },
  {
    id: 3,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
    counts: 0,
  },
  {
    id: 4,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
  {
    id: 5,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
  },
  {
    id: 6,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
  {
    id: 7,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
  },
  {
    id: 8,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
  {
    id: 9,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
  },
  {
    id: 10,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
  {
    id: 11,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
  },
  {
    id: 12,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
  {
    id: 13,
    title: 'Wave Generator',
    description: 'wave descrip',
    link: '/whatever',
    videoURL: './vids/wavegenerator_0x_540p.mp4',
  },
  {
    id: 14,
    title: 'Alt Tage Generator',
    description: 'temp',
    link: '/whatever',
    videoURL:'./vids/altgenerator_0x.mp4',
  },
]

// export function fetchProjects(projects) {
//   return {
//     type: 'RECEIVE_ENTITIES',
//     payload: {
//       projects: mockProjects
//     }
//   }
// }

function fetchProjectsStarted(boards) {
  return { type: 'FETCH_PROJECTS_STARTED', payload: { boards } };
}

function fetchProjectsFailed(err) {
  return { type: 'FETCH_PROJECTS_FAILED', payload: err };
}

function receiveEntities(entities) {
  return {
    type: 'RECEIVE_ENTITIES',
    payload: {
        projects: entities
    }
  }
}

export function fetchProjects() {
  return (dispatch, getState) => {
    dispatch(fetchProjectsStarted());

    return api
      .fetchProjects()
      .then(resp => {
        // console.log(resp.data,'resp');

        dispatch(receiveEntities(resp.data))
      })
      .catch(err => {
        fetchProjectsFailed(err);
      })
  }
}


export function thumbsUp(projectId) {
  return {
    type: 'COUNT_UP',
    payload: {
      projectId: projectId
    }
  }
}


function recieveComment(entities){
  console.log(entities,'ENTITIES');
  const {id, comment} = entities //PROBLEM WHOLE BUNCH
  return {
    type: 'CREATE_COMMENT',
    payload: {
      projectIdComment: id,
      comment: [...comment]
    }
  }
}

function createCommentStarted() {
  return { type: 'CREATE_COMMENT_STARTED' };
}

function createCommentFailed() {
  return { type: 'CREATE_COMMENT_FAILED' }
}

export function createComment(projectId, comment, author) {
  return (dispatch, getState) => {
    dispatch(createCommentStarted());

    return api
      .createComment({projectId, comment, author})
      .then(resp => {
        console.log(resp, 'response after post');
        dispatch(recieveComment(resp.data[0]))
      })
      .catch(err => {
        createCommentFailed(err);
      })
  }
}


//
// export function createComment(projectId, comment) {
//   return {
//     type: 'CREATE_COMMENT',
//     payload: {
//       projectIdComment: projectId,
//       comment: comment
//     }
//   }
// }
