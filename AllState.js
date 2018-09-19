const AllState = {
  Register: {
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    usernamemsg: "",
    passwordmsg: "",
    emailmsg: "",
    firstnamemsg: "",
    lastnamemsg: "",
    RegisterCnf: "",
    Error: false,
    Cliecked: false,
    ShowRed: 0
  },
  Login: {
    password: "",
    email: "",
    passwordmsg: "",
    emailmsg: "",
    LoginCnf: "",
    Error: false,
    Cliecked: false
  },
  TimeLine: {
    isOpen: false,
    selectedItem: "TimeLine",
    image: null,
    title: "",
    category: "",
    description: "",
    titlemsg: "",
    categorymsg: "",
    descriptionmsg: "",
    imagemsg: "",
    email: "",
    PostUploadMsg: "",
    categoryUploadmsg: "",
    Post: [],
    Category: [],
    Username: "",
    SinglePost: false,
    Comment: "",
    Commentmsg: "",
    CategoryFilter: "",
    Error: false
  },
  Forget: {
    email: "",
    emailmsg: "",
    confirmationmsg: "",
    Error: false,
    Cliecked: false
  }
};
export default AllState;
