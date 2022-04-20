class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    if (message == "1") {
      this.actionProvider.handleCrearViaje();
    }
    if (message == "2") {
      this.actionProvider.handleUnirseViaje();
    }
    if (message == "3") {
      this.actionProvider.handleReportar();
    }

    if (message == "4") {
      this.actionProvider.handlePerfil();
    }
    if (message == "5") {
      this.actionProvider.handleEsPago();
    }
    if (message == "6") {
      this.actionProvider.handleConQuien();
    }
    if (message == "7") {
      this.actionProvider.handleContacto();
    }
  }
}

export default MessageParser;
