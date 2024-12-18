export const loginUser = (data) => {
  return {
    type: "LOGIN_USER",
    payload: data,
  };
};

export const loginAdmin = (data) => {
  return {
    type: "LOGIN_ADMIN",
    payload: data,
  };
};

export const loginType = (data) => {
  return {
    type: "LOGIN_TYPE",
    payload: data,
  };
};

export const logOutAdmin = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};

export const updateData = (data) => {
  return {
    type: "UPDATE",
    payload: data,
  };
};

export const bannerDataList = (data) => {
  return {
    type: "BANNER",
    payload: data,
  };
};

export const editBanner = (data) => {
  return {
    type: "EDITIMG",
    payload: data,
  };
};
export const updateImageData = (data) => ({
  type: "UPDATE_IMAGE_DATA",
  payload: data,
});

export const howtoplayList = (data) => {
  return {
    type: "HOW_TO_PLAY",
    payload: data,
  };
};
export const setTearmAndConditionData = (data) => {
  return {
    type: "SET_DATA",
    payload: data,
  };
};

export const setContestData = (contestData) => ({
  type: "SET_CONTEST_DATA",
  payload: contestData,
});

export const addClassesData = (data) => ({
  type: "ADD_CLASSES_DATA",
  payload: data,
});

export const editContestData = (data) => ({
  type: "EDIT_CONTEST_DATA",
  payload: data,
});

export const contestTypeData = (data) => ({
  type: "CONTEST_TYPE",
  payload: data,
});

export const editContestTypeData = (data) => ({
  type: "EDIT_CONTEST_TYPE_DATA",
  payload: data,
});

export const subjectList = (data) => ({
  type: "SUBJECT_LIST",
  payload: data,
});
export const subtopicList = (data) => ({
  type: "SUBTOPICS",
  payload: data,
});

export const editSubjectData = (data) => ({
  type: "SUBJECT_EDIT",
  payload: data,
});

export const setPrivacyPolicyData = (policy) => ({
  type: "SET_PRIVACY_POLICY",
  payload: policy,
});

export const editClassesPanel = (policy) => ({
  type: "EDIT_CLASS_PANEL",
  payload: policy,
});