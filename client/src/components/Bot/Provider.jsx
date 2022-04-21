class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  handleCrearViaje() {
    const message = this.createChatBotMessage(
      "Ve al botón “Crear Viaje”, en el borde superior, y selecciona que tipo de viaje deseas crear. Llena el formulario y listo! Recibiras un mail de confirmación"
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
  handleReportar() {
    const message = this.createChatBotMessage(
      "Debes ingresar a su perfil. Ahí encontrarás un botón especifico para reportarlo, el cual notificará a la administración" 
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
  handleUnirseViaje() {
    const message = this.createChatBotMessage(
      "Ingresa al viaje que desee y ahi encontrarás el boton `Unirse`" 
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
  handlePerfil() {
    const message = this.createChatBotMessage(
      "Arriba a la derecha, tienes la opción para ingresar a tu perfil. Ahi tendrás la posibilidad de modificar tus datos. Revisalos bien!" 
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
  handleEsPago() {
    const message = this.createChatBotMessage(
      "El uso de la plataforma es totalmente gratuita; pero cada viaje es diferente! Chequea bien la información del viaje que deseas" 
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
  handleConQuien() {
    const message = this.createChatBotMessage(
      "Al Ingresar a tu viaje, encontrarás todes les miembres con un boton, a su derecha, para ver su perfil" 
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
  handleContacto() {
    const message = this.createChatBotMessage(
      "Via e-mail a pgsharerides@gmail.com" 
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;
