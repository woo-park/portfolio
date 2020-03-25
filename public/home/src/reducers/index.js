const initialPageState = {
  projectsLength: 0,
  projects: [],
}

export function page(state = initialPageState, action) {
  switch (action.type) {
	  case 'RECEIVE_ENTITIES': {
      const { projects } = action.payload;


	    return {
        ...state,
        projects: projects,
        projectsLength: projects.length,
	    }
	  }
    // case 'CHANGE_PAGE':
    //   return {
    //     ...state,
    //     myAction: 'CHANGE_PAGE'
    //   }
    case 'CREATE_COMMENT':
      const { projectIdComment } = action.payload;
      const { comment } = action.payload;

      console.log(projectIdComment + 'aa ' + comment + 'create comment');
      let myProjects = state.projects;
      // myProjects.forEach((each) => {if (each.id == projectIdComment) {
      //   each.comment = {
      //     [each.comment != undefined ? each.comment.length : 0]: comment}
      // }})
      myProjects.forEach((each) => {    //figure out arr or whateve
        if (each.id === projectIdComment) {
           // if (!each.comment) {
           //   each.comment = [];
           //   each.comment.push(comment);
           // } else {
           //   each.comment.push(comment);
           // }
           let newArr = [];
           comment.forEach(each => {
             newArr.push(each)
           })
           // each.comment = [...comment];
           each.comment = newArr
      }})   //changes inplace

      console.log(myProjects, 'MA PROJ')

      return {
        ...state,
        projects: [...myProjects]
      }

    case 'COUNT_UP':
      console.log(state.projects)
      const { projects } = state;
      const { projectId } = action.payload;
      if (projects.length > 0) {

        const pushedProject = getProjectByProjectId(projects, projectId);   //dont even need this
        console.log(pushedProject)
        // projects = projects.filter(each => each.id != projectId);
        projects.forEach((each) => {if (each.id === projectId) { each.counts += 1}})   //changes inplace

        return {
          ...state,
          projectsLength: projects.length,
          projects: [...projects]
        }
      }
	  default: {
	    return state;
	  }
  }
}

function getProjectByProjectId(projects, projectId) {

  let matchingProject = projects.filter(each => each.id === projectId);
  console.log(matchingProject,'matchingProject')

  return matchingProject[0];
}

export function lastAction(state = null, action) {
  return action;
}
