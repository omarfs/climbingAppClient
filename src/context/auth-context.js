import React from "react"

export default React.createContext({
  token: null,
  userId: "",
  currentProject: {},
  projectIndex: 0,
  projectsLength: 0,
  login: (token, userId, tokenExpiration) => { },
  logout: () => { },
  projectDispatch: () => { }

})