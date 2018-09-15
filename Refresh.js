export default (refresh = () => {
  AsyncStorage.getItem("email").then(value => {
    if (value !== null) {
      this.setState({ isLogged: true });
    } else {
      this.setState({ isLogged: false });
    }
  });
});
